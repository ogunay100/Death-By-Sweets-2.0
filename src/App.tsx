import { useState, useEffect, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Phone, Mail, MapPin, Instagram, Facebook, X, Send, ChevronDown, Cookie, Cake, CakeSlice, Menu as MenuIcon } from 'lucide-react'
import { Skull, MiniSkull, Rose, Heart, Sparkle } from './components/Decorations'

/* ═══════════════════════════════════════
   MENU DATA (from the actual menu image)
   ═══════════════════════════════════════ */

const MENU_CATEGORIES = [
  {
    id: 'cookies',
    title: 'Cookies',
    emoji: '🍪',
    items: ['Chocolate Chip', 'Triple Chocolate', 'M&M', 'Stuffed', 'Seasonal'],
    pricing: '$3 ea or $30/dozen',
    note: 'Mix-ins for cookies will be an additional $2–$4 per dozen',
    color: '#F5A0C0',
  },
  {
    id: 'brownies',
    title: 'Brownies',
    emoji: '🟫',
    items: ['Fudge', 'Brookie', 'Nutella Blondie', 'Cinnamon Roll Blondie', 'Seasonal'],
    pricing: '$3 ea or $30/box',
    note: null,
    color: '#C4917B',
  },
  {
    id: 'cupcakes',
    title: 'Cupcakes & Cakes',
    emoji: '🧁',
    items: ['Vanilla', 'Chocolate', 'Red Velvet', 'Seasonal'],
    pricing: 'Mini cakes & cupcakes $3.50 ea or $38/dozen',
    note: 'Frosting: Vanilla, Chocolate, Coffee, Strawberry\nPlease message us for WHOLE CAKE pricing.',
    color: '#FF69B4',
    frostings: ['Vanilla', 'Chocolate', 'Coffee', 'Strawberry'],
  },
  {
    id: 'loaves',
    title: 'Loaves',
    emoji: '🍞',
    items: ['Lemon Glazed', 'Banana (With Nuts or Chocolate Chips)', 'Cinnamon Crumb Cake', 'Seasonal'],
    pricing: '$2.50 per slice or $20 per loaf',
    note: null,
    color: '#E8D5BF',
  },
]

/* ═══════════════════════════════════════
   ANIMATED SECTION WRAPPER
   ═══════════════════════════════════════ */

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ═══════════════════════════════════════
   FLOATING DECORATIONS BACKGROUND
   ═══════════════════════════════════════ */

function FloatingDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Floating hearts */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute"
          style={{
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.06, 0.12, 0.06],
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 5 + i * 0.8,
            repeat: Infinity,
            delay: i * 0.7,
          }}
        >
          <Heart size={12 + i * 3} color="#8B2252" />
        </motion.div>
      ))}
      {/* Roses in corners */}
      <Rose className="absolute top-20 left-8 opacity-[0.08]" size={100} color="#3A1F33" />
      <Rose className="absolute top-40 right-12 opacity-[0.06]" size={80} color="#3A1F33" />
      <Rose className="absolute bottom-40 left-16 opacity-[0.07]" size={90} color="#3A1F33" />
      <Rose className="absolute bottom-20 right-8 opacity-[0.05]" size={110} color="#3A1F33" />
      {/* Sparkles */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{
            left: `${20 + i * 15}%`,
            top: `${10 + (i % 4) * 25}%`,
          }}
          animate={{
            scale: [0.5, 1.2, 0.5],
            opacity: [0, 0.15, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1.2,
          }}
        >
          <Sparkle size={10 + i * 2} />
        </motion.div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════ */

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { label: 'Menu', href: '#menu' },
    { label: 'Order', href: '#order' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-midnight/95 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-blush/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <MiniSkull size={36} className="transition-transform group-hover:scale-110 group-hover:rotate-6" />
          <span className="font-display text-2xl text-blush tracking-wide">
            Death By Sweets
          </span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm uppercase tracking-[0.2em] font-body font-semibold text-bone/70 hover:text-blush transition-colors relative group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blush transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-bone/70 hover:text-blush transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-midnight/98 backdrop-blur-xl border-b border-blush/10 overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-4">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-lg font-body font-semibold text-bone/80 hover:text-blush transition-colors py-2"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

/* ═══════════════════════════════════════
   HERO SECTION
   ═══════════════════════════════════════ */

function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-midnight to-crypt" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,160,192,0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,34,82,0.12)_0%,_transparent_50%)]" />

      {/* Decorative skulls */}
      <motion.div
        className="absolute top-[15%] right-[8%] opacity-[0.06]"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Skull size={200} />
      </motion.div>
      <motion.div
        className="absolute bottom-[20%] left-[5%] opacity-[0.05]"
        animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      >
        <Skull size={160} />
      </motion.div>

      {/* Main hero content */}
      <div className="relative z-10 text-center px-6 mt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        >
          <Skull size={180} className="mx-auto mb-8 drop-shadow-2xl" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-blush text-shadow-glow tracking-wider mb-6"
        >
          Death By Sweets
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-script text-2xl md:text-3xl text-bone/70 mb-4 max-w-2xl mx-auto"
        >
          Sinfully rich. Deathly delicious.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="font-body text-bone/40 text-sm uppercase tracking-[0.3em] mb-12"
        >
          Handcrafted cookies · brownies · cupcakes · cakes · loaves
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#menu"
            className="group bg-blush/10 border-2 border-blush text-blush hover:bg-blush hover:text-midnight px-10 py-4 font-body font-bold uppercase tracking-[0.2em] text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,160,192,0.3)]"
          >
            View Menu
          </a>
          <a
            href="#order"
            className="group bg-transparent border-2 border-bone/20 text-bone/70 hover:border-blush hover:text-blush px-10 py-4 font-body font-bold uppercase tracking-[0.2em] text-sm transition-all duration-300"
          >
            Place an Order
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="text-blush/30" size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   MENU SECTION
   ═══════════════════════════════════════ */

function MenuSection() {
  return (
    <section id="menu" className="relative py-28 px-6">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-crypt via-abyss to-crypt" />
      <div className="absolute inset-0 bg-noise" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-7xl text-blush text-shadow-glow mb-4">
              Menu
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-blush/40" />
              <MiniSkull size={28} />
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-blush/40" />
            </div>
            <p className="font-script text-xl text-bone/50">
              Every bite is to die for
            </p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {MENU_CATEGORIES.map((cat, idx) => (
            <AnimatedSection key={cat.id} delay={idx * 0.15}>
              <MenuCard category={cat} />
            </AnimatedSection>
          ))}
        </div>

        {/* Cookie mix-in note */}
        <AnimatedSection delay={0.6}>
          <div className="mt-16 text-center">
            <p className="font-script text-lg text-blush/80 italic">
              Mix-ins for cookies will be an additional $2–$4 per dozen
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

function MenuCard({ category }: { category: typeof MENU_CATEGORIES[0] }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ y: -4 }}
      className="relative group"
    >
      {/* Glow effect behind card */}
      <div
        className="absolute -inset-[1px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{ background: `linear-gradient(135deg, ${category.color}20, transparent, ${category.color}10)` }}
      />

      <div className="relative bg-gradient-to-br from-crypt to-tomb border border-bone/[0.06] rounded-lg overflow-hidden p-8 md:p-10 hover:border-bone/[0.12] transition-all duration-500">
        {/* Category header */}
        <div className="flex items-center gap-3 mb-8">
          <span className="text-3xl">{category.emoji}</span>
          <h3
            className="font-display text-3xl md:text-4xl tracking-wide"
            style={{ color: category.color }}
          >
            {category.title}
          </h3>
        </div>

        {/* Items list */}
        <ul className="space-y-3 mb-8">
          {category.items.map((item, i) => (
            <motion.li
              key={item}
              className="flex items-center gap-3 font-body text-bone/80"
              initial={false}
              animate={hovered ? { x: 4 } : { x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Heart size={10} color={category.color} />
              <span className="text-lg">{item}</span>
            </motion.li>
          ))}
        </ul>

        {/* Frostings sub-section (cupcakes only) */}
        {'frostings' in category && category.frostings && (
          <div className="mb-8 pl-4 border-l-2 border-bone/10">
            <p className="font-body font-bold text-bone/60 text-sm uppercase tracking-wider mb-2">
              Frosting Options
            </p>
            <p className="font-body text-bone/50 text-sm">
              {category.frostings.join(' · ')}
            </p>
          </div>
        )}

        {/* Pricing */}
        <div className="border-t border-bone/[0.06] pt-6">
          <p
            className="font-script text-xl font-bold"
            style={{ color: category.color }}
          >
            {category.pricing}
          </p>
          {category.note && (
            <p className="font-body text-bone/40 text-sm mt-2 whitespace-pre-line">
              {category.note}
            </p>
          )}
        </div>

        {/* Decorative corner rose */}
        <div className="absolute top-4 right-4 opacity-[0.06] group-hover:opacity-[0.12] transition-opacity duration-500">
          <Rose size={50} color={category.color} />
        </div>
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════
   ORDER SECTION
   ═══════════════════════════════════════ */

function OrderSection() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    items: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', phone: '', items: '', message: '' })
  }

  return (
    <section id="order" className="relative py-28 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-crypt via-tomb to-abyss" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,160,192,0.04)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-7xl text-blush text-shadow-glow mb-4">
              Order
            </h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-blush/40" />
              <MiniSkull size={28} />
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-blush/40" />
            </div>
            <p className="font-body text-bone/50 max-w-md mx-auto">
              Tell us what you're craving and we'll get back to you to confirm your order details, pickup, or delivery.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="relative">
            <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-br from-blush/10 via-transparent to-darkrose/10 blur-sm" />

            <form
              onSubmit={handleSubmit}
              className="relative bg-gradient-to-br from-crypt to-tomb border border-bone/[0.06] rounded-lg p-8 md:p-12 space-y-6"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-body text-bone/40 text-xs uppercase tracking-[0.2em] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-midnight/60 border border-bone/[0.08] rounded px-4 py-3 font-body text-bone placeholder:text-bone/20 focus:outline-none focus:border-blush/40 transition-colors"
                    placeholder="Jane Doe"
                  />
                </div>
                <div>
                  <label className="block font-body text-bone/40 text-xs uppercase tracking-[0.2em] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-midnight/60 border border-bone/[0.08] rounded px-4 py-3 font-body text-bone placeholder:text-bone/20 focus:outline-none focus:border-blush/40 transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>

              <div>
                <label className="block font-body text-bone/40 text-xs uppercase tracking-[0.2em] mb-2">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-midnight/60 border border-bone/[0.08] rounded px-4 py-3 font-body text-bone placeholder:text-bone/20 focus:outline-none focus:border-blush/40 transition-colors"
                  placeholder="jane@example.com"
                />
              </div>

              <div>
                <label className="block font-body text-bone/40 text-xs uppercase tracking-[0.2em] mb-2">
                  What would you like to order?
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.items}
                  onChange={(e) => setFormData({ ...formData, items: e.target.value })}
                  className="w-full bg-midnight/60 border border-bone/[0.08] rounded px-4 py-3 font-body text-bone placeholder:text-bone/20 focus:outline-none focus:border-blush/40 transition-colors resize-none"
                  placeholder="e.g. 1 dozen Chocolate Chip Cookies, 1 box Fudge Brownies..."
                />
              </div>

              <div>
                <label className="block font-body text-bone/40 text-xs uppercase tracking-[0.2em] mb-2">
                  Special Requests / Pickup Date
                </label>
                <textarea
                  rows={2}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-midnight/60 border border-bone/[0.08] rounded px-4 py-3 font-body text-bone placeholder:text-bone/20 focus:outline-none focus:border-blush/40 transition-colors resize-none"
                  placeholder="Any allergies, customizations, or preferred pickup date?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blush/10 border-2 border-blush text-blush hover:bg-blush hover:text-midnight py-4 font-body font-bold uppercase tracking-[0.2em] text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,160,192,0.3)] rounded flex items-center justify-center gap-2"
              >
                <Send size={16} />
                Submit Order Request
              </button>

              <AnimatePresence>
                {submitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="text-center py-4"
                  >
                    <p className="font-script text-2xl text-blush">
                      Thank you! 💀🖤
                    </p>
                    <p className="font-body text-bone/50 text-sm mt-1">
                      We'll reach out soon to confirm your order.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </form>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   CONTACT SECTION
   ═══════════════════════════════════════ */

function ContactSection() {
  return (
    <section id="contact" className="relative py-28 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-abyss to-midnight" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-7xl text-blush text-shadow-glow mb-4">
              Find Us
            </h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-blush/40" />
              <MiniSkull size={28} />
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-blush/40" />
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <Phone size={24} />,
              label: 'Call or Text',
              value: 'Message us on social media',
              detail: 'for quickest response',
            },
            {
              icon: <Mail size={24} />,
              label: 'Email Us',
              value: 'deathbysweets@email.com',
              detail: 'We reply within 24 hours',
            },
            {
              icon: <MapPin size={24} />,
              label: 'Location',
              value: 'Houston, TX Area',
              detail: 'Pickup & local delivery',
            },
          ].map((item, idx) => (
            <AnimatedSection key={item.label} delay={idx * 0.15}>
              <div className="text-center p-8 bg-gradient-to-br from-crypt to-tomb border border-bone/[0.06] rounded-lg hover:border-blush/20 transition-all duration-500 group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blush/10 text-blush mb-4 group-hover:bg-blush/20 transition-colors">
                  {item.icon}
                </div>
                <h3 className="font-body font-bold text-bone/60 text-xs uppercase tracking-[0.2em] mb-2">
                  {item.label}
                </h3>
                <p className="font-script text-xl text-bone mb-1">
                  {item.value}
                </p>
                <p className="font-body text-bone/30 text-sm">
                  {item.detail}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        {/* Social Links */}
        <AnimatedSection delay={0.5}>
          <div className="mt-16 text-center">
            <p className="font-body text-bone/40 text-xs uppercase tracking-[0.2em] mb-6">
              Follow the sweetness
            </p>
            <div className="flex justify-center gap-4">
              {[
                { icon: <Instagram size={22} />, label: 'Instagram', href: '#' },
                { icon: <Facebook size={22} />, label: 'Facebook', href: '#' },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-12 h-12 flex items-center justify-center border border-bone/[0.08] rounded-full text-bone/40 hover:text-blush hover:border-blush/40 hover:bg-blush/5 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════ */

function Footer() {
  return (
    <footer className="relative py-16 px-6 border-t border-bone/[0.04]">
      <div className="absolute inset-0 bg-midnight" />
      <div className="relative z-10 max-w-6xl mx-auto text-center">
        <MiniSkull size={40} className="mx-auto mb-4 opacity-30" />
        <h2 className="font-display text-2xl text-blush/60 mb-2">Death By Sweets</h2>
        <p className="font-body text-bone/20 text-xs uppercase tracking-[0.3em]">
          © {new Date().getFullYear()} All rights reserved
        </p>
        <div className="mt-4 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <Heart key={i} size={8} color="#F5A0C0" />
          ))}
        </div>
      </div>
    </footer>
  )
}

/* ═══════════════════════════════════════
   APP
   ═══════════════════════════════════════ */

export default function App() {
  return (
    <div className="min-h-screen bg-midnight text-bone relative">
      <FloatingDecorations />
      <Navigation />
      <Hero />
      <MenuSection />
      <OrderSection />
      <ContactSection />
      <Footer />
    </div>
  )
}
