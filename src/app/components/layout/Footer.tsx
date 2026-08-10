export function Footer() {
  return (
    <footer
      className="px-6 md:px-10 py-8 flex items-center justify-between flex-wrap gap-4"
      style={{ borderTop: "1px solid rgba(0,245,196,0.05)", position: "relative", zIndex: 2 }}
    >
      <span className="font-['DM_Mono'] text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(237,234,225,0.1)" }}>
        &copy; {new Date().getFullYear()} — Portfolio
      </span>
      <span className="font-['DM_Mono'] text-[10px] tracking-[0.2em] uppercase" style={{ color: "rgba(237,234,225,0.1)" }}>
        Designed and Built by Alexander Brian Susanto
      </span>
    </footer>
  );
}
