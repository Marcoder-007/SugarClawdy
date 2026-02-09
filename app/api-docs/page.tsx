"use client"

import { useEffect, useRef } from "react"

export default function ApiDocsPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Load Scalar API Reference
    const script = document.createElement("script")
    script.id = "scalar-script"
    script.src = "https://cdn.jsdelivr.net/npm/@scalar/api-reference"
    script.onload = () => {
      // Scalar auto-initializes when the script loads and finds the element
    }
    document.head.appendChild(script)

    return () => {
      const existing = document.getElementById("scalar-script")
      if (existing) existing.remove()
    }
  }, [])

  return (
    <div
      ref={containerRef}
      id="scalar-api-reference"
      data-url="/api/openapi"
      data-proxy-url=""
      data-theme="deepSpace"
      data-layout="modern"
      data-default-http-client-state='{ "targetKey": "node", "clientKey": "fetch" }'
      style={{ minHeight: "100vh" }}
    />
  )
}
