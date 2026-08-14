import { motion } from 'framer-motion'
import { BloomMark } from './ui/Marks'
import { useReducedMotion } from '../lib/hooks'

export function LoadingScreen() {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className="grain fixed inset-0 z-[120] flex flex-col items-center justify-center bg-cream"
      exit={{ opacity: 0 }}
      transition={{ duration: reduced ? 0.15 : 0.7, ease: [0.22, 1, 0.36, 1] }}
      role="status"
      aria-live="polite"
    >
      <motion.div
        initial={reduced ? false : { scale: 0.6, opacity: 0, rotate: -25 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="text-terracotta"
      >
        <BloomMark className="h-14 w-14" spin />
      </motion.div>

      <motion.h1
        initial={reduced ? false : { opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="flora-display mt-8 text-center text-[clamp(2rem,7vw,3.4rem)] leading-none text-forest"
      >
        Flora Coffee
      </motion.h1>

      <motion.p
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="mt-4 text-[0.68rem] tracking-[0.34em] text-forest/50 uppercase"
      >
        Where every cup blooms.
      </motion.p>

      <span className="sr-only">Loading Flora Coffee</span>
    </motion.div>
  )
}
