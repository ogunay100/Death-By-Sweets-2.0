import { useState, useEffect, useRef, createContext, useContext, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { ShoppingBag, Phone, Mail, MapPin, Instagram, Facebook, X, Send, ChevronDown, Plus, Minus, Trash2, Menu as MenuIcon, ChevronRight } from 'lucide-react'
import { Skull, MiniSkull, Rose, Heart, Sparkle } from './components/Decorations'

/* ═══════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════ */

interface CartItem {
  id: string
  name: string
  category: string
  quantity: number
  unitPrice: number
  extras?: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (id: string, name: string, category: string, unitPrice: number, extras?: string) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null)

function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be inside CartProvider')
  return ctx
}

const COOKIE_MIXINS = ['Sprinkles', 'Oreo Pieces', 'Peanut Butter Cups', 'Caramel Drizzle', 'White Chocolate Chips', 'Toffee Bits']
const FROSTING_OPTIONS = ['Vanilla', 'Chocolate', 'Coffee', 'Strawberry']

const MENU_CATEGORIES = [
  {
    id: 'cookies',
    title: 'Cookies',
    emoji: '🍪',
    type: 'cookies' as const,
    items: [
      { name: 'Chocolate Chip', price: 3 },
      { name: 'Triple Chocolate', price: 3 },
      { name: 'M&M', price: 3 },
      { name: 'Stuffed', price: 3 },
      { name: 'Seasonal', price: 3 },
    ],
    pricing: '$3 ea or $30/dozen',
    note: null,
    color: '#F5A0C0',
  },
  {
    id: 'brownies',
    title: 'Brownies',
    emoji: '🟫',
    type: 'brownies' as const,
    items: [
      { name: 'Fudge', price: 3 },
      { name: 'Brookie', price: 3 },
      { name: 'Nutella Blondie', price: 3 },
      { name: 'Cinnamon Roll Blondie', price: 3 },
      { name: 'Seasonal', price: 3 },
    ],
    pricing: '$3 ea or $30/box',
    note: null,
    color: '#C4917B',
  },
  {
    id: 'cupcakes',
    title: 'Cupcakes & Cakes',
    emoji: '🧁',
    type: 'cupcakes' as const,
    items: [
      { name: 'Vanilla', price: 3.50 },
      { name: 'Chocolate', price: 3.50 },
      { name: 'Red Velvet', price: 3.50 },
      { name: 'Seasonal', price: 3.50 },
    ],
    pricing: 'Mini cakes & cupcakes $3.50 ea or $38/dozen',
    note: 'Please message us for WHOLE CAKE pricing.',
    color: '#FF69B4',
  },
  {
    id: 'loaves',
    title: 'Loaves',
    emoji: '🍞',
    type: 'loaves' as const,
    items: [
      { name: 'Lemon Glazed', price: 2.50, loafPrice: 20 },
      { name: 'Banana (With Nuts or Chocolate Chips)', price: 2.50, loafPrice: 20 },
      { name: 'Cinnamon Crumb Cake', price: 2.50, loafPrice: 20 },
      { name: 'Seasonal', price: 2.50, loafPrice: 20 },
    ],
    pricing: '$2.50 per slice or $20 per loaf',
    note: null,
    color: '#E8D5BF',
  },
]

/* ═══════════════════════════════════════
   CART PROVIDER (freeze bug fixed)
   ═══════════════════════════════════════ */

function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [cartOpen, setCartOpen] = useState(false)

  const addItem = useCallback((id: string, name: string, category: string, unitPrice: number, extras?: string) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === id)
      if (existing) {
        return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i)
      }
      return [...prev, { id, name, category, quantity: 1, unitPrice, extras }]
    })
  }, [])

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(i => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id: string, quantity: number) => {
    setItems(prev => {
      if (quantity <= 0) {
        return prev.filter(i => i.id !== id)
      }
      return prev.map(i => i.id === id ? { ...i, quantity } : i)
    })
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, cartOpen, setCartOpen }}>
      {children}
    </CartContext.Provider>
  )
}

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
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`heart-${i}`}
          className="absolute"
          style={{ left: `${10 + i * 12}%`, top: `${15 + (i % 3) * 30}%` }}
          animate={{ y: [0, -30, 0], opacity: [0.06, 0.12, 0.06], rotate: [0, 10, -10, 0] }}
          transition={{ duration: 5 + i * 0.8, repeat: Infinity, delay: i * 0.7 }}
        >
          <Heart size={12 + i * 3} color="#8B2252" />
        </motion.div>
      ))}
      <Rose className="absolute top-20 left-8 opacity-[0.08]" size={100} color="#3A1F33" />
      <Rose className="absolute top-40 right-12 opacity-[0.06]" size={80} color="#3A1F33" />
      <Rose className="absolute bottom-40 left-16 opacity-[0.07]" size={90} color="#3A1F33" />
      <Rose className="absolute bottom-20 right-8 opacity-[0.05]" size={110} color="#3A1F33" />
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute"
          style={{ left: `${20 + i * 15}%`, top: `${10 + (i % 4) * 25}%` }}
          animate={{ scale: [0.5, 1.2, 0.5], opacity: [0, 0.15, 0] }}
          transition={{ duration: 3, repeat: Infinity, delay: i * 1.2 }}
        >
          <Sparkle size={10 + i * 2} />
        </motion.div>
      ))}
    </div>
  )
}

/* ═══════════════════════════════════════
   CART SLIDE-OUT PANEL (no layout anim)
   ═══════════════════════════════════════ */

function CartPanel() {
  const { items, updateQuantity, removeItem, clearCart, totalItems, cartOpen, setCartOpen } = useCart()
  const estimatedTotal = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0)

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            onClick={() => setCartOpen(false)}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-gradient-to-b from-crypt to-abyss border-l border-bone/[0.06] z-[70] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-bone/[0.06]">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-blush" />
                <h2 className="font-display text-2xl text-blush">Your Cart</h2>
                {totalItems > 0 && (
                  <span className="bg-blush text-midnight text-xs font-body font-bold px-2 py-0.5 rounded-full">{totalItems}</span>
                )}
              </div>
              <button onClick={() => setCartOpen(false)} className="text-bone/40 hover:text-blush transition-colors">
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="text-center py-16">
                  <MiniSkull size={60} className="mx-auto mb-4 opacity-20" />
                  <p className="font-script text-xl text-bone/30">Your cart is empty</p>
                  <p className="font-body text-bone/20 text-sm mt-2">Add some sweets from the menu!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="bg-tomb/50 border border-bone/[0.04] rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1 mr-3">
                          <p className="font-body font-semibold text-bone text-sm">{item.name}</p>
                          <p className="font-body text-bone/40 text-xs">{item.category}</p>
                          {item.extras && <p className="font-body text-blush/60 text-xs mt-1">{item.extras}</p>}
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-bone/20 hover:text-red-400 transition-colors p-1">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center rounded bg-midnight/60 border border-bone/[0.08] text-bone/60 hover:text-blush hover:border-blush/30 transition-all"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-10 text-center font-body font-bold text-bone text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center rounded bg-midnight/60 border border-bone/[0.08] text-bone/60 hover:text-blush hover:border-blush/30 transition-all"
                          >
                            <Plus size={14} />
                          </button>
                        </div>
                        <p className="font-body font-semibold text-blush text-sm">${(item.quantity * item.unitPrice).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-bone/[0.06] p-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-body text-bone/60 text-sm uppercase tracking-wider">Estimated Total</span>
                  <span className="font-display text-2xl text-blush">${estimatedTotal.toFixed(2)}</span>
                </div>
                <p className="font-body text-bone/30 text-xs">* Final pricing may vary for dozen/box/loaf deals.</p>
                <a
                  href="#order"
                  onClick={() => setCartOpen(false)}
                  className="block w-full bg-blush/10 border-2 border-blush text-blush hover:bg-blush hover:text-midnight py-3 font-body font-bold uppercase tracking-[0.15em] text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,160,192,0.3)] rounded text-center"
                >
                  Proceed to Order
                </a>
                <button onClick={clearCart} className="w-full text-bone/30 hover:text-red-400 font-body text-xs uppercase tracking-wider transition-colors py-2">
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

/* ═══════════════════════════════════════
   QUANTITY SELECTOR (base - used for brownies)
   ═══════════════════════════════════════ */

function QuantitySelector({ itemId, itemName, category, unitPrice, color, extras }: {
  itemId: string; itemName: string; category: string; unitPrice: number; color: string; extras?: string
}) {
  const { items, addItem, updateQuantity } = useCart()
  const cartItem = items.find(i => i.id === itemId)
  const qty = cartItem?.quantity || 0

  return (
    <div className="flex items-center justify-between gap-2">
      <span className="font-body text-bone/80 text-sm flex-1">{itemName}</span>
      {qty === 0 ? (
        <button
          onClick={() => addItem(itemId, itemName, category, unitPrice, extras)}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-body font-semibold uppercase tracking-wider transition-all duration-300 shrink-0"
          style={{ borderColor: `${color}40`, color }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${color}15` }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
        >
          <Plus size={12} />
          Add
        </button>
      ) : (
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={() => updateQuantity(itemId, qty - 1)}
            className="w-7 h-7 flex items-center justify-center rounded bg-midnight/60 border border-bone/[0.08] text-bone/60 hover:text-blush hover:border-blush/30 transition-all"
          >
            <Minus size={12} />
          </button>
          <span className="w-8 text-center font-body font-bold text-sm" style={{ color }}>{qty}</span>
          <button
            onClick={() => updateQuantity(itemId, qty + 1)}
            className="w-7 h-7 flex items-center justify-center rounded bg-midnight/60 border border-bone/[0.08] text-bone/60 hover:text-blush hover:border-blush/30 transition-all"
          >
            <Plus size={12} />
          </button>
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════
   COOKIE ITEM (with mix-in selector)
   ═══════════════════════════════════════ */

function CookieItem({ item, categoryId, color }: {
  item: { name: string; price: number }; categoryId: string; color: string
}) {
  const [showMixins, setShowMixins] = useState(false)
  const [selectedMixins, setSelectedMixins] = useState<string[]>([])
  const { items, addItem, updateQuantity } = useCart()

  const baseId = `${categoryId}-${item.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`
  const mixinSuffix = selectedMixins.length > 0 ? `-mix-${selectedMixins.sort().join('-').toLowerCase().replace(/\s+/g, '')}` : ''
  const itemId = baseId + mixinSuffix
  const mixinCost = selectedMixins.length > 0 ? 3 : 0
  const totalPrice = item.price + mixinCost

  const cartItem = items.find(i => i.id === itemId)
  const qty = cartItem?.quantity || 0
  const extrasLabel = selectedMixins.length > 0 ? `Mix-ins: ${selectedMixins.join(', ')} (+$3)` : undefined

  const toggleMixin = (mixin: string) => {
    setSelectedMixins(prev =>
      prev.includes(mixin) ? prev.filter(m => m !== mixin) : [...prev, mixin]
    )
  }

  return (
    <div className="py-1.5">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 flex-1">
          <span className="font-body text-bone/80 text-sm">{item.name}</span>
          <button
            onClick={() => setShowMixins(!showMixins)}
            className="text-xs font-body px-2 py-0.5 rounded-full border transition-all"
            style={{
              borderColor: showMixins ? `${color}60` : `${color}25`,
              color: showMixins ? color : `${color}80`,
              backgroundColor: showMixins ? `${color}15` : 'transparent',
            }}
          >
            + mix-in
          </button>
        </div>

        {qty === 0 ? (
          <button
            onClick={() => addItem(itemId, item.name, 'Cookies', totalPrice, extrasLabel)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-body font-semibold uppercase tracking-wider transition-all duration-300 shrink-0"
            style={{ borderColor: `${color}40`, color }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${color}15` }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            <Plus size={12} />
            {totalPrice > item.price ? `$${totalPrice.toFixed(0)}` : 'Add'}
          </button>
        ) : (
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => updateQuantity(itemId, qty - 1)} className="w-7 h-7 flex items-center justify-center rounded bg-midnight/60 border border-bone/[0.08] text-bone/60 hover:text-blush hover:border-blush/30 transition-all">
              <Minus size={12} />
            </button>
            <span className="w-8 text-center font-body font-bold text-sm" style={{ color }}>{qty}</span>
            <button onClick={() => updateQuantity(itemId, qty + 1)} className="w-7 h-7 flex items-center justify-center rounded bg-midnight/60 border border-bone/[0.08] text-bone/60 hover:text-blush hover:border-blush/30 transition-all">
              <Plus size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Mix-in options */}
      <AnimatePresence>
        {showMixins && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="mt-2 ml-2 pl-3 border-l-2 border-bone/[0.06]">
              <p className="font-body text-bone/40 text-xs mb-2">Select mix-ins (+$3 per cookie):</p>
              <div className="flex flex-wrap gap-1.5">
                {COOKIE_MIXINS.map(mixin => (
                  <button
                    key={mixin}
                    onClick={() => toggleMixin(mixin)}
                    className="text-xs font-body px-2.5 py-1 rounded-full border transition-all"
                    style={{
                      borderColor: selectedMixins.includes(mixin) ? color : 'rgba(245,230,211,0.08)',
                      color: selectedMixins.includes(mixin) ? color : 'rgba(245,230,211,0.5)',
                      backgroundColor: selectedMixins.includes(mixin) ? `${color}15` : 'transparent',
                    }}
                  >
                    {mixin}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ═══════════════════════════════════════
   CUPCAKE ITEM (with frosting selector)
   ═══════════════════════════════════════ */

function CupcakeItem({ item, categoryId, color }: {
  item: { name: string; price: number }; categoryId: string; color: string
}) {
  const [selectedFrosting, setSelectedFrosting] = useState<string>('')
  const { items, addItem, updateQuantity } = useCart()

  const baseId = `${categoryId}-${item.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`
  const frostingSuffix = selectedFrosting ? `-frost-${selectedFrosting.toLowerCase()}` : ''
  const itemId = baseId + frostingSuffix
  const extrasLabel = selectedFrosting ? `Frosting: ${selectedFrosting}` : undefined

  const cartItem = items.find(i => i.id === itemId)
  const qty = cartItem?.quantity || 0

  return (
    <div className="py-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="font-body text-bone/80 text-sm flex-1">{item.name}</span>
        {qty === 0 ? (
          <button
            onClick={() => addItem(itemId, item.name, 'Cupcakes & Cakes', item.price, extrasLabel)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-body font-semibold uppercase tracking-wider transition-all duration-300 shrink-0"
            style={{ borderColor: `${color}40`, color }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${color}15` }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            <Plus size={12} />
            Add
          </button>
        ) : (
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => updateQuantity(itemId, qty - 1)} className="w-7 h-7 flex items-center justify-center rounded bg-midnight/60 border border-bone/[0.08] text-bone/60 hover:text-blush hover:border-blush/30 transition-all">
              <Minus size={12} />
            </button>
            <span className="w-8 text-center font-body font-bold text-sm" style={{ color }}>{qty}</span>
            <button onClick={() => updateQuantity(itemId, qty + 1)} className="w-7 h-7 flex items-center justify-center rounded bg-midnight/60 border border-bone/[0.08] text-bone/60 hover:text-blush hover:border-blush/30 transition-all">
              <Plus size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Frosting selector */}
      <div className="mt-2 ml-2 flex items-center gap-1.5 flex-wrap">
        <span className="font-body text-bone/30 text-xs">Frosting:</span>
        {FROSTING_OPTIONS.map(frost => (
          <button
            key={frost}
            onClick={() => setSelectedFrosting(selectedFrosting === frost ? '' : frost)}
            className="text-xs font-body px-2 py-0.5 rounded-full border transition-all"
            style={{
              borderColor: selectedFrosting === frost ? color : 'rgba(245,230,211,0.08)',
              color: selectedFrosting === frost ? color : 'rgba(245,230,211,0.4)',
              backgroundColor: selectedFrosting === frost ? `${color}15` : 'transparent',
            }}
          >
            {frost}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   LOAF ITEM (slice or whole loaf toggle)
   ═══════════════════════════════════════ */

function LoafItem({ item, categoryId, color }: {
  item: { name: string; price: number; loafPrice?: number }; categoryId: string; color: string
}) {
  const [buyLoaf, setBuyLoaf] = useState(false)
  const { items, addItem, updateQuantity } = useCart()

  const currentPrice = buyLoaf ? (item.loafPrice || 20) : item.price
  const itemId = `${categoryId}-${item.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}${buyLoaf ? '-loaf' : '-slice'}`
  const extrasLabel = buyLoaf ? 'Whole Loaf' : 'Per Slice'

  const cartItem = items.find(i => i.id === itemId)
  const qty = cartItem?.quantity || 0

  return (
    <div className="py-1.5">
      <div className="flex items-center justify-between gap-2">
        <span className="font-body text-bone/80 text-sm flex-1">{item.name}</span>
        {qty === 0 ? (
          <button
            onClick={() => addItem(itemId, item.name, 'Loaves', currentPrice, extrasLabel)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border text-xs font-body font-semibold uppercase tracking-wider transition-all duration-300 shrink-0"
            style={{ borderColor: `${color}40`, color }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${color}15` }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
          >
            <Plus size={12} />
            ${currentPrice.toFixed(2)}
          </button>
        ) : (
          <div className="flex items-center gap-1 shrink-0">
            <button onClick={() => updateQuantity(itemId, qty - 1)} className="w-7 h-7 flex items-center justify-center rounded bg-midnight/60 border border-bone/[0.08] text-bone/60 hover:text-blush hover:border-blush/30 transition-all">
              <Minus size={12} />
            </button>
            <span className="w-8 text-center font-body font-bold text-sm" style={{ color }}>{qty}</span>
            <button onClick={() => updateQuantity(itemId, qty + 1)} className="w-7 h-7 flex items-center justify-center rounded bg-midnight/60 border border-bone/[0.08] text-bone/60 hover:text-blush hover:border-blush/30 transition-all">
              <Plus size={12} />
            </button>
          </div>
        )}
      </div>

      {/* Slice / Loaf toggle */}
      <div className="mt-2 ml-2 flex items-center gap-2">
        <button
          onClick={() => setBuyLoaf(false)}
          className="text-xs font-body px-3 py-1 rounded-full border transition-all"
          style={{
            borderColor: !buyLoaf ? color : 'rgba(245,230,211,0.08)',
            color: !buyLoaf ? color : 'rgba(245,230,211,0.4)',
            backgroundColor: !buyLoaf ? `${color}15` : 'transparent',
          }}
        >
          Slice $2.50
        </button>
        <button
          onClick={() => setBuyLoaf(true)}
          className="text-xs font-body px-3 py-1 rounded-full border transition-all"
          style={{
            borderColor: buyLoaf ? color : 'rgba(245,230,211,0.08)',
            color: buyLoaf ? color : 'rgba(245,230,211,0.4)',
            backgroundColor: buyLoaf ? `${color}15` : 'transparent',
          }}
        >
          Whole Loaf $20
        </button>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════ */

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems, setCartOpen } = useCart()

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
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-midnight/95 backdrop-blur-xl shadow-2xl shadow-black/40 border-b border-blush/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <a href="#" className="flex items-center gap-3 group">
          <MiniSkull size={36} className="transition-transform group-hover:scale-110 group-hover:rotate-6" />
          <span className="font-display text-2xl text-blush tracking-wide">Death By Sweets</span>
        </a>

        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <a key={link.label} href={link.href} className="text-sm uppercase tracking-[0.2em] font-body font-semibold text-bone/70 hover:text-blush transition-colors relative group">
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-blush transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 text-sm uppercase tracking-[0.2em] font-body font-semibold text-bone/70 hover:text-blush transition-colors">
            <ShoppingBag size={18} />
            Cart
            {totalItems > 0 && (
              <motion.span key={totalItems} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-4 bg-blush text-midnight text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </motion.span>
            )}
          </button>
        </div>

        <div className="flex md:hidden items-center gap-4">
          <button onClick={() => setCartOpen(true)} className="relative text-bone/70 hover:text-blush transition-colors">
            <ShoppingBag size={22} />
            {totalItems > 0 && (
              <motion.span key={totalItems} initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-blush text-midnight text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                {totalItems}
              </motion.span>
            )}
          </button>
          <button className="text-bone/70 hover:text-blush transition-colors" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={28} /> : <MenuIcon size={28} />}
          </button>
        </div>
      </div>

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
                <a key={link.label} href={link.href} onClick={() => setMobileOpen(false)} className="text-lg font-body font-semibold text-bone/80 hover:text-blush transition-colors py-2">
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
      <div className="absolute inset-0 bg-gradient-to-b from-abyss via-midnight to-crypt" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(245,160,192,0.08)_0%,_transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_rgba(139,34,82,0.12)_0%,_transparent_50%)]" />

      <motion.div className="absolute top-[15%] right-[8%] opacity-[0.06]" animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }}>
        <Skull size={200} />
      </motion.div>
      <motion.div className="absolute bottom-[20%] left-[5%] opacity-[0.05]" animate={{ y: [0, -20, 0], rotate: [0, -5, 0] }} transition={{ duration: 8, repeat: Infinity, delay: 1 }}>
        <Skull size={160} />
      </motion.div>

      <div className="relative z-10 text-center px-6 mt-20">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}>
          <Skull size={180} className="mx-auto mb-8 drop-shadow-2xl" />
        </motion.div>

        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }} className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl text-blush text-shadow-glow tracking-wider mb-6">
          Death By Sweets
        </motion.h1>

        <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.6 }} className="font-script text-2xl md:text-3xl text-bone/70 mb-4 max-w-2xl mx-auto">
          Sinfully rich. Deathly delicious.
        </motion.p>

        <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }} className="font-body text-bone/40 text-sm uppercase tracking-[0.3em] mb-12">
          Handcrafted cookies · brownies · cupcakes · cakes · loaves
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 1 }} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#menu" className="group bg-blush/10 border-2 border-blush text-blush hover:bg-blush hover:text-midnight px-10 py-4 font-body font-bold uppercase tracking-[0.2em] text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,160,192,0.3)]">
            View Menu
          </a>
          <a href="#order" className="group bg-transparent border-2 border-bone/20 text-bone/70 hover:border-blush hover:text-blush px-10 py-4 font-body font-bold uppercase tracking-[0.2em] text-sm transition-all duration-300">
            Place an Order
          </a>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 1 }} className="absolute bottom-12 left-1/2 -translate-x-1/2">
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
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
      <div className="absolute inset-0 bg-gradient-to-b from-crypt via-abyss to-crypt" />
      <div className="absolute inset-0 bg-noise" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-20">
            <h2 className="font-display text-5xl md:text-7xl text-blush text-shadow-glow mb-4">Menu</h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-blush/40" />
              <MiniSkull size={28} />
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-blush/40" />
            </div>
            <p className="font-script text-xl text-bone/50">Every bite is to die for — tap + to add to your cart</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {MENU_CATEGORIES.map((cat, idx) => (
            <AnimatedSection key={cat.id} delay={idx * 0.15}>
              <MenuCard category={cat} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  )
}

function MenuCard({ category }: { category: typeof MENU_CATEGORIES[0] }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="relative group">
      <div
        className="absolute -inset-[1px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"
        style={{ background: `linear-gradient(135deg, ${category.color}20, transparent, ${category.color}10)` }}
      />
      <div className="relative bg-gradient-to-br from-crypt to-tomb border border-bone/[0.06] rounded-lg overflow-hidden p-8 md:p-10 hover:border-bone/[0.12] transition-all duration-500">
        <div className="flex items-center gap-3 mb-6">
          <span className="text-3xl">{category.emoji}</span>
          <h3 className="font-display text-3xl md:text-4xl tracking-wide" style={{ color: category.color }}>{category.title}</h3>
        </div>

        {/* Items — different components per category type */}
        <div className="space-y-1 mb-6">
          {category.items.map((item) => {
            if (category.type === 'cookies') {
              return <CookieItem key={item.name} item={item} categoryId={category.id} color={category.color} />
            }
            if (category.type === 'cupcakes') {
              return <CupcakeItem key={item.name} item={item} categoryId={category.id} color={category.color} />
            }
            if (category.type === 'loaves') {
              return (
                <LoafItem
                  key={item.name}
                  item={item as { name: string; price: number; loafPrice?: number }}
                  categoryId={category.id}
                  color={category.color}
                />
              )
            }
            // Brownies — basic selector
            const itemId = `${category.id}-${item.name.toLowerCase().replace(/\s+/g, '-').replace(/[()]/g, '')}`
            return (
              <div key={item.name} className="py-1.5">
                <QuantitySelector itemId={itemId} itemName={item.name} category={category.title} unitPrice={item.price} color={category.color} />
              </div>
            )
          })}
        </div>

        {/* Pricing footer */}
        <div className="border-t border-bone/[0.06] pt-5">
          <p className="font-script text-xl font-bold" style={{ color: category.color }}>{category.pricing}</p>
          {category.note && <p className="font-body text-bone/40 text-sm mt-2 whitespace-pre-line">{category.note}</p>}
        </div>

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
  const { items, clearCart, totalItems } = useCart()
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })

  const estimatedTotal = items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormData({ name: '', email: '', phone: '', message: '' })
    clearCart()
  }

  return (
    <section id="order" className="relative py-28 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-crypt via-tomb to-abyss" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(245,160,192,0.04)_0%,_transparent_60%)]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <AnimatedSection>
          <div className="text-center mb-16">
            <h2 className="font-display text-5xl md:text-7xl text-blush text-shadow-glow mb-4">Order</h2>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-blush/40" />
              <MiniSkull size={28} />
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-blush/40" />
            </div>
            <p className="font-body text-bone/50 max-w-md mx-auto">Review your selections and fill out your details. We'll reach out to confirm your order.</p>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Summary sidebar */}
          <AnimatedSection delay={0.1} className="lg:col-span-2">
            <div className="bg-gradient-to-br from-crypt to-tomb border border-bone/[0.06] rounded-lg p-6 sticky top-24">
              <h3 className="font-display text-xl text-blush mb-4 flex items-center gap-2">
                <ShoppingBag size={18} /> Your Selection
              </h3>

              {items.length === 0 ? (
                <div className="text-center py-8">
                  <MiniSkull size={40} className="mx-auto mb-3 opacity-20" />
                  <p className="font-body text-bone/30 text-sm italic">Nothing here yet — add items from the menu above!</p>
                </div>
              ) : (
                <>
                  <div className="space-y-3 max-h-80 overflow-y-auto mb-4 pr-1">
                    {items.map((item) => (
                      <div key={item.id} className="flex items-center justify-between py-2 border-b border-bone/[0.04] last:border-0">
                        <div className="flex-1 mr-2">
                          <p className="font-body text-bone/80 text-sm">{item.name}</p>
                          <p className="font-body text-bone/30 text-xs">{item.category}</p>
                          {item.extras && <p className="font-body text-blush/50 text-xs">{item.extras}</p>}
                        </div>
                        <div className="text-right">
                          <p className="font-body font-semibold text-blush text-sm">×{item.quantity}</p>
                          <p className="font-body text-bone/40 text-xs">${(item.quantity * item.unitPrice).toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-bone/[0.08] pt-4">
                    <div className="flex justify-between items-center">
                      <span className="font-body text-bone/50 text-sm">Estimated Total</span>
                      <span className="font-display text-xl text-blush">${estimatedTotal.toFixed(2)}</span>
                    </div>
                    <p className="font-body text-bone/25 text-xs mt-1">* Dozen/box/loaf pricing applied at confirmation</p>
                  </div>
                </>
              )}
            </div>
          </AnimatedSection>

          {/* Form */}
          <AnimatedSection delay={0.25} className="lg:col-span-3">
            <div className="relative">
              <div className="absolute -inset-[1px] rounded-lg bg-gradient-to-br from-blush/10 via-transparent to-darkrose/10 blur-sm" />
              <form onSubmit={handleSubmit} className="relative bg-gradient-to-br from-crypt to-tomb border border-bone/[0.06] rounded-lg p-8 md:p-10 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-body text-bone/40 text-xs uppercase tracking-[0.2em] mb-2">Your Name</label>
                    <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full bg-midnight/60 border border-bone/[0.08] rounded px-4 py-3 font-body text-bone placeholder:text-bone/20 focus:outline-none focus:border-blush/40 transition-colors" placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label className="block font-body text-bone/40 text-xs uppercase tracking-[0.2em] mb-2">Phone Number</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-midnight/60 border border-bone/[0.08] rounded px-4 py-3 font-body text-bone placeholder:text-bone/20 focus:outline-none focus:border-blush/40 transition-colors" placeholder="(555) 123-4567" />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-bone/40 text-xs uppercase tracking-[0.2em] mb-2">Email</label>
                  <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full bg-midnight/60 border border-bone/[0.08] rounded px-4 py-3 font-body text-bone placeholder:text-bone/20 focus:outline-none focus:border-blush/40 transition-colors" placeholder="jane@example.com" />
                </div>

                <div>
                  <label className="block font-body text-bone/40 text-xs uppercase tracking-[0.2em] mb-2">Special Requests / Pickup Date</label>
                  <textarea rows={3} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="w-full bg-midnight/60 border border-bone/[0.08] rounded px-4 py-3 font-body text-bone placeholder:text-bone/20 focus:outline-none focus:border-blush/40 transition-colors resize-none" placeholder="Any allergies, frosting preferences, or preferred pickup date?" />
                </div>

                <button
                  type="submit"
                  disabled={totalItems === 0}
                  className="w-full bg-blush/10 border-2 border-blush text-blush hover:bg-blush hover:text-midnight py-4 font-body font-bold uppercase tracking-[0.2em] text-sm transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,160,192,0.3)] rounded flex items-center justify-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-blush/10 disabled:hover:text-blush disabled:hover:shadow-none"
                >
                  <Send size={16} />
                  {totalItems > 0 ? `Submit Order (${totalItems} items)` : 'Add items to order'}
                </button>

                <AnimatePresence>
                  {submitted && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="text-center py-4">
                      <p className="font-script text-2xl text-blush">Thank you! 💀🖤</p>
                      <p className="font-body text-bone/50 text-sm mt-1">We'll reach out soon to confirm your order.</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </AnimatedSection>
        </div>
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
            <h2 className="font-display text-5xl md:text-7xl text-blush text-shadow-glow mb-4">Find Us</h2>
            <div className="flex items-center justify-center gap-4">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-blush/40" />
              <MiniSkull size={28} />
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-blush/40" />
            </div>
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Phone size={24} />, label: 'Call or Text', value: 'Message us on social media', detail: 'for quickest response' },
            { icon: <Mail size={24} />, label: 'Email Us', value: 'deathbysweets@email.com', detail: 'We reply within 24 hours' },
            { icon: <MapPin size={24} />, label: 'Location', value: 'Houston, TX Area', detail: 'Pickup & local delivery' },
          ].map((item, idx) => (
            <AnimatedSection key={item.label} delay={idx * 0.15}>
              <div className="text-center p-8 bg-gradient-to-br from-crypt to-tomb border border-bone/[0.06] rounded-lg hover:border-blush/20 transition-all duration-500 group">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-blush/10 text-blush mb-4 group-hover:bg-blush/20 transition-colors">{item.icon}</div>
                <h3 className="font-body font-bold text-bone/60 text-xs uppercase tracking-[0.2em] mb-2">{item.label}</h3>
                <p className="font-script text-xl text-bone mb-1">{item.value}</p>
                <p className="font-body text-bone/30 text-sm">{item.detail}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5}>
          <div className="mt-16 text-center">
            <p className="font-body text-bone/40 text-xs uppercase tracking-[0.2em] mb-6">Follow the sweetness</p>
            <div className="flex justify-center gap-4">
              {[
                { icon: <Instagram size={22} />, label: 'Instagram', href: '#' },
                { icon: <Facebook size={22} />, label: 'Facebook', href: '#' },
              ].map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label} className="w-12 h-12 flex items-center justify-center border border-bone/[0.08] rounded-full text-bone/40 hover:text-blush hover:border-blush/40 hover:bg-blush/5 transition-all duration-300">
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
        <p className="font-body text-bone/20 text-xs uppercase tracking-[0.3em]">© {new Date().getFullYear()} All rights reserved</p>
        <div className="mt-4 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (<Heart key={i} size={8} color="#F5A0C0" />))}
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
    <CartProvider>
      <div className="min-h-screen bg-midnight text-bone relative">
        <FloatingDecorations />
        <Navigation />
        <CartPanel />
        <Hero />
        <MenuSection />
        <OrderSection />
        <ContactSection />
        <Footer />
      </div>
    </CartProvider>
  )
}

