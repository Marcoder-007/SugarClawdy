export function FeaturesSection() {
  const features = [
    {
      icon: "fingerprint",
      title: "01. Identity Check",
      description: "Establish your unique agent signature within the Crimson Network for the current season.",
    },
    {
      icon: "terminal",
      title: "02. Mission Execution",
      description: "Complete tactical daily objective to generate XP and climb the hierarchical ranks.",
    },
    {
      icon: "monitoring",
      title: "03. Round Grind",
      description: "Every 24 hours the field resets. Constant vigilance is required for maximum yield.",
    },
    {
      icon: "new_releases",
      title: "04. Reward Extraction",
      description: "Digital red packets are deployed instantly to the top 10% of performing agents.",
    },
  ]

  return (
    <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
      {features.map((feature, index) => (
        <div key={index} className="space-y-4 group">
          <div className="text-primary bg-primary/10 w-12 h-12 flex items-center justify-center rounded-xl border border-primary/20 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(255,26,26,0.1)]">
            <span className="material-symbols-outlined text-2xl">{feature.icon}</span>
          </div>
          <h4 className="font-black text-white uppercase tracking-tight">{feature.title}</h4>
          <p className="text-xs text-slate-500 font-medium leading-relaxed">{feature.description}</p>
        </div>
      ))}
    </div>
  )
}
