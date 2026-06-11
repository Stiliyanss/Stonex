import { motion } from 'framer-motion'
import { LayoutIcon, AppsIcon, DashboardIcon, RobotIcon } from './icons'

const services = [
  {
    icon: LayoutIcon,
    title: 'Websites & Landing Pages',
    description:
      'Fast, responsive, conversion-focused sites that represent your brand and turn visitors into customers.',
  },
  {
    icon: AppsIcon,
    title: 'Web Applications',
    description:
      'Custom apps with user accounts, databases and real business logic — built to scale with your needs.',
  },
  {
    icon: DashboardIcon,
    title: 'Management Software',
    description:
      'CRM, ERP and internal tools that streamline operations and give you full control over your data.',
  },
  {
    icon: RobotIcon,
    title: 'Automations & Integrations',
    description:
      'API connections and automated workflows that remove repetitive work and connect your tools.',
  },
]

const sectionHeader = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
}

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
}

const card = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function Services() {
  return (
    <section id="services" className="bg-subtle py-24 sm:py-28">
      <div className="mx-auto max-w-content px-5 sm:px-8">
        <motion.div
          variants={sectionHeader}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl"
        >
          <span className="text-sm font-semibold uppercase tracking-wide text-teal">What we do</span>
          <h2 className="mt-3 text-3xl font-extrabold tracking-tightish text-ink sm:text-4xl">
            Everything your business needs on the web.
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ink-soft">
            From a simple landing page to a full management platform — one studio, end to end.
          </p>
        </motion.div>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.title}
                variants={card}
                whileHover={{ y: -8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                className="group rounded-2xl border border-slate-200/80 bg-white p-7 shadow-[0_1px_3px_rgba(15,23,42,0.04)] transition-shadow hover:shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal/10 text-teal transition-colors group-hover:bg-teal group-hover:text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 text-lg font-bold tracking-tight text-ink">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{s.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
