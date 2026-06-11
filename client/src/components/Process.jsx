import { motion } from 'framer-motion'

const steps = [
  {
    title: "Let's Talk",
    description:
      'We start with a short online or in-person meeting to understand your goals, preferences, and desired style. Together we define the structure, content, and main features.',
  },
  {
    title: 'Craft the Vision',
    description:
      'We create the first visual concept of your product — layout, colors, and overall atmosphere. You’ll receive a preview and can share your feedback before we continue.',
  },
  {
    title: 'Bring It to Life',
    description:
      'Once the design is approved, we build a responsive, fast, and optimized product using modern technologies tailored to your business needs.',
  },
  {
    title: 'Review & Refine',
    description:
      'We present a live demo version. Together we review every detail, discuss possible changes, and make adjustments until you’re 100% satisfied.',
  },
  {
    title: 'Go Live',
    description:
      'After final approval, we launch your product to the world. We also provide hosting, maintenance, and continuous support to keep everything running smoothly.',
  },
]

const header = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14 } },
}

const stepItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

export default function Process() {
  return (
    <section id="process" className="bg-midnight-bg py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <motion.div
          variants={header}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl"
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-teal">How we work</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tightish text-midnight-deep sm:text-4xl">
            A clear path from idea to launch.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Five simple steps. No surprises — just steady progress and constant communication.
          </p>
        </motion.div>

        <motion.div
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="relative mt-16"
        >
          {/* connecting line — teal at 30% opacity */}
          <div
            className="absolute left-[27px] top-3 bottom-3 hidden w-px bg-teal/30 sm:block"
            aria-hidden
          />

          <ol className="space-y-10">
            {steps.map((step, i) => (
              <motion.li key={step.title} variants={stepItem} className="relative flex gap-5 sm:gap-7">
                <div className="relative z-10 flex-shrink-0">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-teal/30 bg-white text-xl font-extrabold text-teal shadow-[0_2px_10px_rgba(29,158,117,0.12)]">
                    {i + 1}
                  </div>
                </div>
                <div className="pt-1.5 sm:pt-2.5">
                  <h3 className="text-lg font-bold tracking-tight text-midnight-deep sm:text-xl">
                    {step.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-500 sm:text-base">
                    {step.description}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </div>
    </section>
  )
}
