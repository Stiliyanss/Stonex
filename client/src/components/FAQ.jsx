import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDownIcon } from './icons'

const faqs = [
  {
    q: 'Is there a monthly fee?',
    a: "There's no mandatory monthly fee. Once your project is delivered and paid for, it's yours. However, we do offer optional maintenance plans that cover updates, monitoring, and small changes. We can also manage hosting and a custom domain on your behalf, keeping everything in one place — completely up to you whether you need it.",
  },
  {
    q: 'How long does it take?',
    a: "It depends on the complexity of the project. A landing page can be ready in a matter of days, while a full web application may take several weeks. We always agree on a clear timeline before we start, so you'll know exactly what to expect.",
  },
  {
    q: 'Do I pay everything upfront?',
    a: "No. We split the payment in two — half at the start of the project, and the other half upon delivery. If your situation requires different terms, we're open to discussing an arrangement that works for both sides.",
  },
  {
    q: 'Can I make changes after completion?',
    a: "Absolutely. Your product is built to grow with you. Small changes can be handled through a maintenance plan, while larger additions are treated as a new project scope — always discussed and agreed on beforehand.",
  },
  {
    q: 'Will it work on mobile?',
    a: 'Every project we deliver is fully responsive by default. We build mobile-first and test across phones, tablets, and desktops before anything goes live.',
  },
  {
    q: 'What happens after launch?',
    a: "We don't disappear after launch. We offer ongoing support plans to keep your product running smoothly — covering updates, performance monitoring, and any issues that come up. You'll always have someone to reach out to.",
  },
  {
    q: 'Do you work with international clients?',
    a: "Yes. We work remotely with clients regardless of location. Communication happens via video calls, email, or messaging — whatever works best for you. Language is no barrier either, as we're comfortable working in both English and Bulgarian.",
  },
  {
    q: 'Do you provide training for how to use the software?',
    a: "Yes. Every project comes with a handover session where we walk you through how everything works. If your product has an admin panel or CMS, we make sure you feel confident managing it independently. We also provide written documentation and video instructions so you always have a reference to come back to.",
  },
]

const header = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const item = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
}

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="bg-midnight-bg py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <motion.div
          variants={header}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl"
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-teal">FAQ</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tightish text-midnight-deep sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-slate-500">
            Everything you need to know before we get started.
          </p>
        </motion.div>

        <motion.div
          variants={list}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 max-w-2xl"
        >
          {faqs.map((faq, i) => (
            <motion.div key={i} variants={item}>
              <button
                onClick={() => setOpen(open === i ? -1 : i)}
                className="group flex w-full items-start justify-between gap-4 border-b border-slate-200 py-5 text-left transition-colors hover:text-teal sm:py-6"
              >
                <span className="pr-2 font-semibold leading-relaxed text-midnight-deep sm:text-lg">
                  {faq.q}
                </span>
                <motion.div
                  animate={{ rotate: open === i ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="mt-1 flex-shrink-0 text-teal"
                >
                  <ChevronDownIcon className="h-5 w-5" />
                </motion.div>
              </button>

              <AnimatePresence mode="wait">
                {open === i && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="pb-5 pl-0 text-ink-soft sm:pb-6">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
