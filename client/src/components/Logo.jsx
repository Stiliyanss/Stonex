// Stonex logo — full wordmark image (hexagon mark + "stonex" + tagline).
export default function Logo({ className = '' }) {
  return (
    <a
      href="#top"
      className={`group inline-flex items-center ${className}`}
      aria-label="Stonex — home"
    >
      <img
        src="/logo.png"
        alt="Stonex — Digital Solutions"
        className="h-11 w-auto transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-12"
      />
    </a>
  )
}
