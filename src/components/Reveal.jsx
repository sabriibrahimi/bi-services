import { useEffect, useRef, useState } from 'react'
import './Reveal.css'

/**
 * A quiet reveal on scroll: the element rises a few pixels into place once.
 * Elements are visible by default in the prerendered HTML and for anyone with
 * prefers-reduced-motion or without IntersectionObserver — motion is an
 * enhancement, never a condition for seeing the content.
 */
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const ref = useRef(null)
  const [armed, setArmed] = useState(false)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const prefersReduced =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced || typeof IntersectionObserver === 'undefined') return

    const node = ref.current
    if (!node) return

    setArmed(true)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    )

    observer.observe(node)

    // Failsafe: whatever happens to the observer, content that is on screen (or
    // already scrolled past) is never left invisible. Content further down keeps
    // waiting for the scroll, so its entrance is still seen. Content first,
    // motion second.
    const failsafe = window.setTimeout(() => {
      if (node.getBoundingClientRect().top < window.innerHeight) {
        setShown(true)
        observer.disconnect()
      }
    }, 2500)

    return () => {
      window.clearTimeout(failsafe)
      observer.disconnect()
    }
  }, [])

  const state = !armed ? 'is-static' : shown ? 'is-shown' : 'is-hidden'

  return (
    <Tag
      ref={ref}
      className={`reveal ${state} ${className}`.trim()}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...rest}
    >
      {children}
    </Tag>
  )
}
