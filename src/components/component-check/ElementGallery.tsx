import * as React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  clearComponentCaptures,
  getAllComponentCaptures,
  type ComponentCaptureRecord,
} from "@/lib/component-gallery-store"
import { cn } from "@/lib/utils"

interface ElementGalleryProps {
  className?: string
}

export function ElementGallery({ className }: ElementGalleryProps) {
  const [records, setRecords] = React.useState<ComponentCaptureRecord[]>([])
  const [loading, setLoading] = React.useState(true)
  const [error, setError] = React.useState<string | null>(null)

  const loadRecords = React.useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const captures = await getAllComponentCaptures()
      setRecords(captures)
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load gallery captures.",
      )
    } finally {
      setLoading(false)
    }
  }, [])

  React.useEffect(() => {
    void loadRecords()
  }, [loadRecords])

  const handleClear = async () => {
    await clearComponentCaptures()
    await loadRecords()
  }

  return (
    <div className={cn("min-h-screen bg-background text-foreground", className)}>
      <div className="border-b border-border/70 bg-background/90 px-6 py-8 backdrop-blur">
        <div className="mx-auto flex max-w-[1600px] flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
              Internal reference
            </p>
            <h1 className="mt-2 text-3xl font-semibold tracking-tight md:text-4xl">
              Element Gallery
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Thumbnails and metadata captured from the component check page.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Button asChild variant="outline">
              <a href="/component-check">Back to component check</a>
            </Button>
            <Button variant="secondary" onClick={() => void loadRecords()}>
              Refresh
            </Button>
            <Button variant="destructive" onClick={() => void handleClear()}>
              Clear gallery
            </Button>
          </div>
        </div>
      </div>

      <div className="px-6 py-8">
        <div className="mx-auto max-w-[1600px]">
          {loading && (
            <p className="text-sm text-muted-foreground">Loading captures…</p>
          )}

          {!loading && error && (
            <p className="text-sm text-destructive">{error}</p>
          )}

          {!loading && !error && records.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-10 text-center">
              <p className="text-base font-medium">No captures yet</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Visit the component check page first to generate thumbnails.
              </p>
              <Button asChild className="mt-4">
                <a href="/component-check">Open component check</a>
              </Button>
            </div>
          )}

          {!loading && !error && records.length > 0 && (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {records.map((record) => (
                <article
                  key={record.id}
                  className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
                >
                  <div className="border-b border-border/70 bg-muted/20 p-3">
                    <img
                      src={record.thumbnailDataUrl}
                      alt={`${record.name} preview`}
                      className="h-auto w-full rounded-lg border border-border/60 bg-background object-contain"
                    />
                  </div>

                  <div className="flex flex-col gap-4 p-5">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h2 className="text-lg font-semibold tracking-tight">
                          {record.name}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {record.category}
                        </p>
                      </div>
                      <Badge variant="outline">{record.type}</Badge>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {record.description}
                    </p>

                    <dl className="grid gap-2 text-sm">
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 text-muted-foreground">Path</dt>
                        <dd className="font-mono text-xs break-all">{record.path}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 text-muted-foreground">Captured</dt>
                        <dd>{new Date(record.capturedAt).toLocaleString()}</dd>
                      </div>
                      <div className="flex gap-2">
                        <dt className="w-24 shrink-0 text-muted-foreground">Size</dt>
                        <dd>
                          {record.width}×{record.height}px
                        </dd>
                      </div>
                    </dl>

                    <div className="flex flex-wrap gap-2">
                      {record.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
