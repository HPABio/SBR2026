import type { ComponentKind } from "@/data/component-registry"

export interface ComponentCaptureRecord {
  id: string
  name: string
  category: string
  path: string
  type: ComponentKind
  tags: string[]
  description: string
  capturedAt: string
  thumbnailDataUrl: string
  width: number
  height: number
}

const DB_NAME = "sbr-component-gallery"
const DB_VERSION = 1
const STORE_NAME = "captures"

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, { keyPath: "id" })
        store.createIndex("capturedAt", "capturedAt", { unique: false })
        store.createIndex("category", "category", { unique: false })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error ?? new Error("Failed to open IndexedDB"))
  })
}

function runTransaction<T>(
  mode: IDBTransactionMode,
  handler: (store: IDBObjectStore) => IDBRequest<T>,
): Promise<T> {
  return openDatabase().then(
    (db) =>
      new Promise<T>((resolve, reject) => {
        const transaction = db.transaction(STORE_NAME, mode)
        const store = transaction.objectStore(STORE_NAME)
        const request = handler(store)

        request.onsuccess = () => resolve(request.result as T)
        request.onerror = () => reject(request.error ?? new Error("IndexedDB request failed"))
        transaction.oncomplete = () => db.close()
        transaction.onerror = () => reject(transaction.error ?? new Error("IndexedDB transaction failed"))
      }),
  )
}

export async function saveComponentCapture(record: ComponentCaptureRecord) {
  await runTransaction("readwrite", (store) => store.put(record))
}

export async function getAllComponentCaptures() {
  const records = await runTransaction<ComponentCaptureRecord[]>("readonly", (store) =>
    store.getAll(),
  )

  return records.sort(
    (a, b) => new Date(b.capturedAt).getTime() - new Date(a.capturedAt).getTime(),
  )
}

export async function getComponentCapture(id: string) {
  return runTransaction<ComponentCaptureRecord | undefined>("readonly", (store) => store.get(id))
}

export async function clearComponentCaptures() {
  await runTransaction("readwrite", (store) => store.clear())
}
