import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRightIcon, ChevronDownIcon, CheckIcon } from './icons'

const subjects = ['Website', 'Web App', 'Management Software', 'Automation', 'Other']

const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const fieldClass =
  'w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-ink placeholder:text-slate-400 outline-none transition-colors focus:border-teal focus:ring-2 focus:ring-teal/20'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: 'Website', message: '' })
  const [sent, setSent] = useState(false)

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    // No backend wired up — show a confirmation state.
    setSent(true)
  }

  return (
    <section id="contact" className="bg-subtle py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
          >
            <span className="text-sm font-semibold uppercase tracking-wide text-teal">Contact</span>
            <h2 className="mt-3 text-3xl font-extrabold tracking-tightish text-ink sm:text-4xl">
              Let’s build something together.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Tell us about your project and we’ll get back to you shortly. No obligation — just a
              conversation about what’s possible.
            </p>
          </motion.div>

          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.25 }}
            className="rounded-2xl border border-slate-200 bg-white p-7 shadow-[0_2px_16px_rgba(15,23,42,0.05)] sm:p-9"
          >
            {sent ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-teal/10 text-teal">
                  <CheckIcon className="h-7 w-7" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-ink">Message sent!</h3>
                <p className="mt-2 max-w-sm text-sm text-ink-soft">
                  Thanks for reaching out, {form.name || 'there'}. We’ll be in touch soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-ink">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Jane Doe"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-ink">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update('email')}
                      placeholder="jane@company.com"
                      className={fieldClass}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-ink">
                    Subject
                  </label>
                  <div className="relative">
                    <select
                      id="subject"
                      value={form.subject}
                      onChange={update('subject')}
                      className={`${fieldClass} appearance-none pr-10`}
                    >
                      {subjects.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                    <ChevronDownIcon className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell us a bit about your project…"
                    className={`${fieldClass} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-teal px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-dark sm:w-auto"
                >
                  Send message
                  <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
