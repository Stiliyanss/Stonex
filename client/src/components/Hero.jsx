import { motion } from 'framer-motion'
import { ArrowRightIcon } from './icons'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.05 },
  },
}

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const stats = [
  { value: 'Full-stack', label: 'design to deploy' },
  { value: 'Fast', label: 'delivery & support' },
  { value: '1:1', label: 'direct communication' },
]

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-bg">
      {/* subtle flat decorative blocks — no gradients */}
      <div className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-3xl bg-subtle" aria-hidden />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-3xl bg-midnight-bg" aria-hidden />

      <div className="relative mx-auto max-w-content px-5 pb-24 pt-20 sm:px-8 sm:pt-28">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-3xl">
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-teal/25 bg-teal/5 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-teal-dark"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-teal" />
            Web development studio
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tightish text-ink sm:text-6xl"
          >
            We build digital products that work.
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft sm:text-xl"
          >
            Websites, web apps, management software and automations — crafted for businesses
            that want results.
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#services"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-teal px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-dark"
            >
              See our work
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:border-teal hover:text-teal-dark"
            >
              Get in touch
            </a>
          </motion.div>

          <motion.dl variants={item} className="mt-14 grid max-w-xl grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.value} className="border-l-2 border-teal/30 pl-4">
                <dt className="text-xl font-bold text-ink sm:text-2xl">{s.value}</dt>
                <dd className="mt-1 text-xs text-ink-soft sm:text-sm">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>
      </div>
    </section>
  )
}
