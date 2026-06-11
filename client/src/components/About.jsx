import { motion } from 'framer-motion'
import { CheckIcon } from './icons'

const fadeLeft = {
  hidden: { opacity: 0, x: -28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const fadeRight = {
  hidden: { opacity: 0, x: 28 },
  show: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
}

const highlights = ['Clean, maintainable code', 'Fast delivery', 'Clear communication']

export default function About() {
  return (
    <section id="about" className="bg-white py-24 sm:py-28">
      <div className="mx-auto grid max-w-content items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <motion.div
          variants={fadeLeft}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-teal">About Stonex</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tightish text-ink sm:text-4xl">
            One developer. Full attention on your project.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft">
            Stonex is a one-person studio run by a full-stack developer with a focus on clean code,
            fast delivery, and clear communication. Every project gets full attention.
          </p>

          <ul className="mt-8 space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 text-ink">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <CheckIcon className="h-4 w-4" />
                </span>
                <span className="font-medium">{h}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          variants={fadeRight}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          className="relative"
        >
          {/* photo placeholder */}
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-slate-200 bg-subtle">
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-ink-soft">
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal/10 text-3xl font-extrabold text-teal">
                S
              </div>
              <span className="text-sm font-medium">Your photo here</span>
            </div>
          </div>
          {/* flat decorative accent block behind */}
          <div
            className="absolute -bottom-5 -right-5 -z-10 hidden h-32 w-32 rounded-3xl bg-teal/10 sm:block"
            aria-hidden
          />
        </motion.div>
      </div>
    </section>
  )
}
