import React, { createContext, useContext } from "react"

type ExportPngProps = {
  /**
   * Variable name for the mapped input array, e.g. "supportingSponsors".
   * Used for file naming.
   */
  exportKey?: string
  /** Optional item name (e.g. item.name) appended to file name. */
  name?: string
  /** Optional index of the item in the map. */
  index?: number
  /**
   * Optional component name for folder naming.
   * Defaults to exportKey (or "Export" fallback).
   */
  componentName?: string
  children: React.ReactNode
}

const ExportPngPathContext = createContext<string | null>(null)

function isExportEnabled() {
  // Use PUBLIC_ so it can be set at build time and is visible to SSR/client bundles.
  return import.meta.env.PUBLIC_EXPORT_COMPONENT_PNGS === "true"
}

/**
 * Wrap any element you want exported as a PNG during `bun run build`.
 *
 * Enable export by running:
 *   PUBLIC_EXPORT_COMPONENT_PNGS=true bun run build
 */
export function ExportPng({ exportKey, name, index, componentName, children }: ExportPngProps) {
  const enabled = isExportEnabled()
  const parentPath = useContext(ExportPngPathContext)

  const selfName = componentName ?? exportKey ?? "Export"
  const componentPath = parentPath ? `${parentPath}_${selfName}` : selfName

  if (!enabled) return <>{children}</>

  return (
    <ExportPngPathContext.Provider value={componentPath}>
      <div
        // Don't affect layout flow.
        style={{ display: "contents" }}
        data-export-png="true"
        data-export-key={exportKey ?? ""}
        data-export-name={name ?? ""}
        data-export-index={typeof index === "number" ? String(index) : ""}
        data-export-component-path={componentPath}
      >
        {children}
      </div>
    </ExportPngPathContext.Provider>
  )
}

