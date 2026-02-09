"use client"

import { useEffect, useState } from "react"

interface Round {
  number: number
  status: "live" | "ended"
  isActive: boolean
}

export function RoundsPanel() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Fixed Round 1
  const round: Round = {
    number: 1,
    status: "live",
    isActive: true,
  }

  if (!mounted) {
    return (
      <aside className="w-full lg:w-1/3 flex flex-col">
        <div className="flex items-center justify-between px-2 mb-4 shrink-0 h-[48px]">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">ROUNDS</h3>
          <span className="text-[10px] font-black text-primary px-3 py-1 bg-primary/10 border border-primary/20 rounded-full tracking-tighter uppercase">
            Season 01
          </span>
        </div>
        <div className="flex-1 bg-card-dark premium-texture rounded-3xl border border-border-dark flex flex-col p-6 overflow-hidden">
          <div className="flex-1 flex items-center justify-center">
            <div className="animate-pulse text-slate-500">Loading...</div>
          </div>
        </div>
      </aside>
    )
  }

  return (
    <aside className="w-full lg:w-1/3 flex flex-col">
      <div className="flex items-center justify-between px-2 mb-4 shrink-0 h-[48px]">
        <h3 className="text-xl font-black text-white uppercase tracking-tight">ROUNDS</h3>
        <span className="text-[10px] font-black text-primary px-3 py-1 bg-primary/10 border border-primary/20 rounded-full tracking-tighter uppercase">
          Season 01
        </span>
      </div>
      <div className="flex-1 bg-card-dark premium-texture rounded-3xl border border-border-dark flex flex-col p-6 overflow-hidden">
        <div className="flex-1 pr-2 space-y-3">
          <div className="cycle-card p-5 rounded-xl border-2 relative overflow-hidden transition-all border-primary bg-black/30 active">
            <div className="absolute top-0 right-0 p-2">
              <span className="flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="font-black text-xl text-primary">ROUND {round.number}</span>
              <span className="text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border text-primary bg-primary/20 border-primary/30">
                Live
              </span>
            </div>
            <div className="flex items-center justify-center">
              <p className="text-sm text-slate-400 font-medium tracking-wide">Sponsored by NOFA.ai</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}
