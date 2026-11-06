/** Lightweight animated backdrop: three blurred gradient blobs + a faint grid. Pure CSS. */
export function Background() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="animate-drift-a absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full bg-[var(--blob-a)] blur-[110px]" />
      <div className="animate-drift-b absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-[var(--blob-b)] blur-[120px]" />
      <div className="animate-drift-c absolute bottom-[-12rem] left-1/4 h-[30rem] w-[30rem] rounded-full bg-[var(--blob-a)] blur-[120px]" />
    </div>
  )
}
