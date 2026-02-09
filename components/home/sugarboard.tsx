"use client"

import { useEffect, useRef, useState } from "react"

interface Agent {
  name: string
  claimTime: string
}

const nameTemplates = [
  "CRYPTO{WORD}.ETH",
  "{WORD}_MASTER_{NUM}",
  "SHADOW_{WORD}",
  "OPERATIVE_X{NUM}",
  "{WORD}_RAIDER",
  "CYBER_{WORD}",
  "VOID_{WORD}",
  "SILENT_{WORD}",
  "KINETIC_{WORD}",
  "VECTOR_{NUM}",
  "NEON_{WORD}",
  "{WORD}_GHOST",
  "ZERO_{WORD}",
  "NIGHT_{WORD}_{NUM}",
  "SKILL{WORD}_{NUM}",
  "RED_{WORD}",
  "AGENT_{WORD}",
  "THE_{WORD}",
]

const words = [
  "ALPHA",
  "BETA",
  "GAMMA",
  "DELTA",
  "OMEGA",
  "PHOENIX",
  "HUNTER",
  "STRIKER",
  "CORE",
  "OPS",
  "WALKER",
  "PUNK",
  "GHOST",
  "RAIDER",
]

function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000
  return x - Math.floor(x)
}

function generateAgent(index: number, totalCount: number): Agent {
  const seed = index * 12345 + Date.now()
  const template = nameTemplates[Math.floor(seededRandom(seed) * nameTemplates.length)]
  const word = words[Math.floor(seededRandom(seed + 1) * words.length)]
  const num = Math.floor(seededRandom(seed + 2) * 100)

  const name = template.replace("{WORD}", word).replace("{NUM}", num.toString())

  const maxPastHours = 24
  const maxPastMs = maxPastHours * 3600 * 1000
  const randomPastMs = seededRandom(seed) * maxPastMs * 0.8 + (index / totalCount) * maxPastMs * 0.2
  const timeDiffMinutes = Math.floor(randomPastMs / (1000 * 60))
  const timeDiffHours = Math.floor(randomPastMs / (1000 * 60 * 60))

  let claimTime: string
  if (timeDiffMinutes <= 10) {
    claimTime = "recently"
  } else if (timeDiffMinutes < 60) {
    claimTime = `${timeDiffMinutes} mins ago`
  } else {
    claimTime = `${timeDiffHours} hours ago`
  }

  return { name, claimTime }
}

export function Sugarboard() {
  const [agents, setAgents] = useState<Agent[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    const totalCount = 94
    const generatedAgents: Agent[] = []
    for (let i = 0; i < totalCount; i++) {
      generatedAgents.push(generateAgent(i, totalCount))
    }
    setAgents(generatedAgents)
  }, [])

  useEffect(() => {
    if (!containerRef.current || isPaused) return

    const container = containerRef.current
    const scrollInterval = setInterval(() => {
      const maxScroll = container.scrollHeight - container.clientHeight
      if (container.scrollTop >= maxScroll) {
        container.scrollTop = 0
      } else {
        container.scrollTop += 1
      }
    }, 50)

    return () => clearInterval(scrollInterval)
  }, [isPaused])

  return (
    <div className="w-full lg:w-2/3 flex flex-col">
      <div className="flex items-center justify-between px-2 mb-4 shrink-0 h-[48px]">
        <div className="flex items-center gap-4">
          <h3 className="text-xl font-black text-white uppercase tracking-tight">Sugarboard</h3>
        </div>
      </div>
      <div className="flex-1 bg-card-dark premium-texture rounded-3xl border border-border-dark flex flex-col overflow-hidden">
        <div
          ref={containerRef}
          className="flex-1 overflow-y-auto custom-scrollbar auto-scroll"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <table className="w-full text-left border-collapse">
            <thead className="bg-black/50 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] sticky top-0 z-10 backdrop-blur-md">
              <tr>
                <th className="px-8 py-4 border-b border-border-dark">Operative</th>
                <th className="px-8 py-4 border-b border-border-dark">Claim Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark">
              {agents.map((agent, index) => (
                <tr key={index} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-4">
                    <p className="font-black text-white text-sm">{agent.name}</p>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-xs font-black text-white">{agent.claimTime}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
