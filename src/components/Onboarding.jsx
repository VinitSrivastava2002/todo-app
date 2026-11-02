function Zigzag({ className, rows = 4 }) {
  const row = (y) => {
    let d = `M0 ${y}`
    for (let i = 0; i < 8; i++) d += ` l7 ${i % 2 === 0 ? -9 : 9}`
    return <path key={y} d={d} />
  }
  return (
    <svg className={className} width="76" height={rows * 14 + 10} viewBox={`0 0 56 ${rows * 14 + 10}`}
      fill="none" stroke="rgba(255,255,255,.2)" strokeWidth="5" strokeLinecap="square" aria-hidden="true">
      {Array.from({ length: rows }, (_, i) => row(14 + i * 14))}
    </svg>
  )
}

export default function Onboarding({ onStart }) {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <div className="relative flex-[65] overflow-hidden bg-brand">
        <div className="absolute -right-6 -top-9 h-24 w-24 rounded-full border-[14px] border-white/20" />
        <Zigzag className="absolute left-0 top-[26%]" rows={4} />
        <Zigzag className="absolute bottom-[6%] right-0" rows={4} />
      </div>

      <div className="flex flex-[35] flex-col justify-between px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-7">
        <div>
          <h1 className="text-[26px] font-semibold leading-tight">Manage What To Do</h1>
          <p className="mt-3 max-w-[260px] text-xs leading-relaxed text-slate-500">
            The best way to manage what you have to do, don’t forget your plans
          </p>
        </div>
        <button onClick={onStart} className="h-12 w-full rounded-[3px] bg-brand text-sm font-medium text-white hover:bg-brand-navy">
          Get Started
        </button>
      </div>
    </div>
  )
}
