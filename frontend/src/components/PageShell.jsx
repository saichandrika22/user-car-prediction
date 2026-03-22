export function PageShell({ children }) {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="pointer-events-none absolute -top-24 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -top-16 left-1/4 h-[420px] w-[420px] rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-[520px] w-[520px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-5 py-10 md:py-14">
        {children}
      </div>
    </div>
  )
}

