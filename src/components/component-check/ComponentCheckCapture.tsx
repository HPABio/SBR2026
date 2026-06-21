import * as React from "react"
import { toPng } from "html-to-image"

import type { ComponentRegistryEntry } from "@/data/component-registry"
import {
  saveComponentCapture,
  type ComponentCaptureRecord,
} from "@/lib/component-gallery-store"
import { cn } from "@/lib/utils"

interface ComponentCheckCaptureProps {
  entries: ComponentRegistryEntry[]
  className?: string
}

type CaptureStatus = "idle" | "capturing" | "done" | "error"

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function waitForStableRender() {
  if (document.fonts?.ready) {
    await document.fonts.ready
  }
  await wait(400)
}

function readMetadata(frame: HTMLElement): ComponentRegistryEntry | null {
  const id = frame.dataset.componentId
  if (!id) return null

  return {
    id,
    name: frame.dataset.componentName ?? id,
    category: frame.dataset.componentCategory ?? "Uncategorized",
    path: frame.dataset.componentPath ?? "",
    type: frame.dataset.componentType === "astro" ? "astro" : "react",
    tags: (frame.dataset.componentTags ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    description: frame.dataset.componentDescription ?? "",
  }
}

export function ComponentCheckCapture({
  entries,
  className,
}: ComponentCheckCaptureProps) {
  const [status, setStatus] = React.useState<CaptureStatus>("idle")
  const [progress, setProgress] = React.useState({ current: 0, total: 0 })
  const [message, setMessage] = React.useState("Waiting for components to render…")
  const hasCapturedRef = React.useRef(false)

  const captureFrames = React.useCallback(async () => {
    setStatus("capturing")
    setMessage("Capturing component frames…")

    await waitForStableRender()

    const frames = Array.from(
      document.querySelectorAll<HTMLElement>("[data-component-frame]"),
    )

    setProgress({ current: 0, total: frames.length })

    for (let index = 0; index < frames.length; index += 1) {
      const frame = frames[index]
      const metadata = readMetadata(frame)

      if (!metadata) {
        setProgress({ current: index + 1, total: frames.length })
        continue
      }

      try {
        frame.scrollIntoView({ block: "center", behavior: "auto" })
        await wait(120)

        const dataUrl = await toPng(frame, {
          cacheBust: true,
          pixelRatio: 2,
          backgroundColor: "#0a0a0a",
        })

        const rect = frame.getBoundingClientRect()
        const record: ComponentCaptureRecord = {
          ...metadata,
          capturedAt: new Date().toISOString(),
          thumbnailDataUrl: dataUrl,
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        }

        await saveComponentCapture(record)

        const thumb = frame.querySelector<HTMLImageElement>("[data-component-thumb]")
        if (thumb) {
          thumb.src = dataUrl
          thumb.classList.remove("hidden")
        }
      } catch (error) {
        console.error(`[component-check] Failed to capture ${metadata.id}`, error)
      }

      setProgress({ current: index + 1, total: frames.length })
    }

    setStatus("done")
    setMessage(`Saved ${frames.length} thumbnails to the element gallery.`)
  }, [])

  React.useEffect(() => {
    if (hasCapturedRef.current) return
    hasCapturedRef.current = true

    const timer = window.setTimeout(() => {
      void captureFrames()
    }, 1200)

    return () => window.clearTimeout(timer)
  }, [captureFrames])

  return (
    <div
      className={cn(
        "sticky bottom-4 z-20 mx-auto flex w-fit max-w-[min(100%,42rem)] flex-col gap-3 rounded-2xl border border-border/80 bg-background/95 p-4 shadow-xl backdrop-blur",
        className,
      )}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-foreground">Component capture</p>
          <p className="text-xs text-muted-foreground">{message}</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/element-gallery"
            className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:bg-accent"
          >
            Open gallery
          </a>
          <button
            type="button"
            onClick={() => void captureFrames()}
            disabled={status === "capturing"}
            className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground transition-opacity disabled:opacity-50"
          >
            {status === "capturing" ? "Capturing…" : "Recapture"}
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300"
            style={{
              width:
                progress.total > 0
                  ? `${(progress.current / progress.total) * 100}%`
                  : "0%",
            }}
          />
        </div>
        <span className="text-xs tabular-nums text-muted-foreground">
          {progress.current}/{progress.total || entries.length}
        </span>
      </div>
    </div>
  )
}
