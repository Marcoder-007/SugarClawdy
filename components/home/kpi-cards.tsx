export function KPICards() {
  const kpis = [
    {
      icon: "groups",
      label: "Total Active Agents",
      value: "94",
      badge: "+0%",
      badgeColor: "text-primary bg-primary/10 border-primary/20",
      progress: 66,
    },
    {
      icon: "bolt",
      label: "Skills Used",
      value: "105",
      badge: "Active",
      badgeColor: "text-primary bg-primary/10 border-primary/20",
      progress: 85,
    },
    {
      icon: "payments",
      label: "Total Sugar Money Pool",
      value: "$500",
      badge: "Increasing",
      badgeColor: "text-emerald-500 bg-emerald-500/10 border-emerald-500/20",
      progress: 2.5,
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
      {kpis.map((kpi, index) => (
        <div
          key={index}
          className="bg-card-dark p-8 rounded-2xl border kpi-glow flex flex-col gap-4 group transition-all duration-300 hover:scale-[1.02]"
        >
          <div className="flex justify-between items-start">
            <div className="bg-primary/10 p-3 rounded-xl text-primary border border-primary/20">
              <span className="material-symbols-outlined text-3xl">{kpi.icon}</span>
            </div>
            <span className={`text-xs font-black px-2 py-1 rounded-full border ${kpi.badgeColor}`}>{kpi.badge}</span>
          </div>
          <div>
            <p className="text-slate-500 text-xs font-black uppercase tracking-widest mb-1">{kpi.label}</p>
            <span className="text-4xl font-black text-white tracking-tight">{kpi.value}</span>
          </div>
          <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary shadow-[0_0_8px_rgba(255,26,26,0.8)]"
              style={{ width: `${kpi.progress}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
