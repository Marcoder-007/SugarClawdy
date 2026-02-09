"use client"

import { useState } from "react"

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy text: ", err)
    }
  }

  return (
    <button
      onClick={handleCopy}
      className={`copy-button absolute top-4 right-4 p-2.5 border border-border-dark rounded-lg transition-all ${
        copied ? "bg-primary text-white" : "bg-card-dark hover:bg-primary text-slate-400 hover:text-white"
      }`}
      title="Copy text"
    >
      <span className="material-symbols-outlined text-sm">{copied ? "check" : "content_copy"}</span>
    </button>
  )
}
