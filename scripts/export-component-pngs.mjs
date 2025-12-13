import fs from "node:fs/promises"
import path from "node:path"
import net from "node:net"
import { spawn } from "node:child_process"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const enabled = process.env.PUBLIC_EXPORT_COMPONENT_PNGS === "true"

if (!enabled) {
  // Keep this script safe to run on every build.
  process.exit(0)
}

const projectRoot = path.resolve(__dirname, "..")
const distDir = path.join(projectRoot, "dist")
const pagesDir = path.join(projectRoot, "src", "pages")

function slugify(input) {
  return String(input)
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 120)
}

async function fileExists(p) {
  try {
    await fs.access(p)
    return true
  } catch {
    return false
  }
}

async function walk(dir) {
  const out = []
  const entries = await fs.readdir(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

function pageRouteFromFile(filePath) {
  const rel = path.relative(pagesDir, filePath).replaceAll(path.sep, "/")
  // ignore dynamic routes like [id].astro
  if (/\[.*\]/.test(rel)) return null
  const noExt = rel.replace(/\.(astro|mdx|md)$/, "")
  if (noExt === "index") return "/"
  if (noExt.endsWith("/index")) return "/" + noExt.slice(0, -"/index".length) + "/"
  return "/" + noExt
}

function pageNameFromRoute(route) {
  const cleaned = route.replace(/^\/+/, "").replace(/\/+$/, "")
  return cleaned.length ? cleaned : "index"
}

function waitForPortOpen({ host, port, timeoutMs }) {
  const start = Date.now()
  return new Promise((resolve, reject) => {
    const tick = () => {
      const socket = net.connect({ host, port })
      socket.once("connect", () => {
        socket.destroy()
        resolve()
      })
      socket.once("error", () => {
        socket.destroy()
        if (Date.now() - start > timeoutMs) reject(new Error(`Timed out waiting for ${host}:${port}`))
        else setTimeout(tick, 150)
      })
    }
    tick()
  })
}

async function main() {
  if (!(await fileExists(distDir))) {
    throw new Error(`dist/ not found at ${distDir}. Did "astro build" run?`)
  }

  // Collect routes from src/pages (works for SSR output too).
  const pageFiles = (await walk(pagesDir)).filter((p) => /\.(astro|mdx|md)$/.test(p))
  const routes = Array.from(
    new Set(pageFiles.map(pageRouteFromFile).filter(Boolean)),
  ).sort((a, b) => a.localeCompare(b))

  // Start the built server (node adapter standalone).
  const entry = path.join(distDir, "server", "entry.mjs")
  if (!(await fileExists(entry))) {
    throw new Error(`Expected server entry at ${entry}. Your build output may not be node-standalone.`)
  }

  const host = "127.0.0.1"
  const port = Number(process.env.EXPORT_PNG_PORT || 4369)
  const baseUrl = `http://${host}:${port}`

  const server = spawn(process.execPath, [entry], {
    cwd: projectRoot,
    stdio: "inherit",
    env: {
      ...process.env,
      HOST: host,
      PORT: String(port),
      // Keep exporter enabled inside server-render/hydration.
      PUBLIC_EXPORT_COMPONENT_PNGS: "true",
    },
  })

  const killServer = () => {
    if (!server.killed) server.kill("SIGTERM")
  }
  process.on("exit", killServer)
  process.on("SIGINT", () => process.exit(130))
  process.on("SIGTERM", () => process.exit(143))

  await waitForPortOpen({ host, port, timeoutMs: 30_000 })

  // Import Playwright only when enabled.
  const { chromium } = await import("playwright")

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  })
  const page = await context.newPage()

  for (const route of routes) {
    const url = new URL(route, baseUrl).toString()
    const pageName = pageNameFromRoute(route)

    await page.goto(url, { waitUntil: "networkidle" })
    // If the page has zero export markers, skip.
    const markers = await page.$$('[data-export-png="true"]')
    if (!markers.length) continue

    // Ensure deterministic order.
    for (let i = 0; i < markers.length; i++) {
      const marker = markers[i]
      const data = await marker.evaluate((el) => ({
        exportKey: el.getAttribute("data-export-key") || "",
        exportName: el.getAttribute("data-export-name") || "",
        exportIndex: el.getAttribute("data-export-index") || "",
        componentPath: el.getAttribute("data-export-component-path") || "",
      }))

      const componentFolder = data.componentPath || data.exportKey || "Export"

      let fileBase = ""
      if (data.exportKey && data.exportName) {
        fileBase = `${data.exportKey}_${slugify(data.exportName)}`
      } else if (data.exportKey) {
        const idx = data.exportIndex || String(i)
        fileBase = `${data.exportKey}_${idx}`
      } else {
        fileBase = `${pageName}_Export_${i}`
      }

      const outDir = path.join(distDir, pageName, componentFolder)
      await fs.mkdir(outDir, { recursive: true })

      // Ensure uniqueness.
      let outPath = path.join(outDir, `${fileBase}.png`)
      let n = 2
      while (await fileExists(outPath)) {
        outPath = path.join(outDir, `${fileBase}_${n}.png`)
        n++
      }

      // Keep it stable: scroll into view and screenshot just this element.
      await marker.scrollIntoViewIfNeeded()
      await marker.screenshot({ path: outPath, type: "png" })
    }
  }

  await browser.close()
  killServer()
}

await main()

