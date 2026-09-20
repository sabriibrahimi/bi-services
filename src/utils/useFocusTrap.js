import { useEffect } from 'react'

const FOCUSABLE = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled]):not([type="hidden"])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

/**
 * Keeps keyboard focus inside `containerRef` while `active` is true:
 * focuses the first sensible element on open, cycles with Tab / Shift+Tab,
 * closes on Escape, locks background scrolling and restores focus to the
 * element that was focused before opening.
 *
 * Shared by the mobile navigation drawer and the gallery lightbox.
 */
export function useFocusTrap({ active, containerRef, onClose, lockScroll = true }) {
  useEffect(() => {
    if (!active) return

    const container = containerRef.current
    if (!container) return

    const previouslyFocused = document.activeElement

    const focusables = () =>
      Array.from(container.querySelectorAll(FOCUSABLE)).filter(
        (element) =>
          element.getAttribute('tabindex') !== '-1' &&
          element.getAttribute('aria-hidden') !== 'true' &&
          !element.hasAttribute('hidden')
      )

    const initial = container.querySelector('[data-autofocus]') || focusables()[0] || container
    initial.focus({ preventScroll: true })

    function onKeyDown(event) {
      if (event.key === 'Escape') {
        event.stopPropagation()
        onClose?.()
        return
      }

      if (event.key !== 'Tab') return

      const items = focusables()
      if (items.length === 0) {
        event.preventDefault()
        return
      }

      const first = items[0]
      const last = items[items.length - 1]
      const current = document.activeElement

      if (event.shiftKey && (current === first || !container.contains(current))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && current === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)

    let previousOverflow
    if (lockScroll) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      if (lockScroll) document.body.style.overflow = previousOverflow ?? ''
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus({ preventScroll: true })
      }
    }
  }, [active, containerRef, onClose, lockScroll])
}

export default useFocusTrap
