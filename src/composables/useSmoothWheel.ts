import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

export function useSmoothWheel() {
  const router = useRouter()
  let frame = 0
  let target = 0
  let position = 0
  let lastScroll = 0
  let lastTime = 0
  let cleanup: (() => void) | undefined

  function stop() {
    cancelAnimationFrame(frame)
    frame = 0
  }

  function limit(value: number) {
    const root = document.scrollingElement
    const maximum = root ? root.scrollHeight - root.clientHeight : 0
    return Math.max(0, Math.min(value, maximum))
  }

  function tick(time: number) {
    if (Math.abs(window.scrollY - lastScroll) > 2) {
      stop()
      return
    }

    target = limit(target)
    const elapsed = Math.min(34, time - lastTime)
    lastTime = time
    position += (target - position) * (1 - Math.exp(-elapsed / 75))
    const finished = Math.abs(target - position) < 0.75
    window.scrollTo({ top: finished ? target : position, behavior: 'instant' })
    lastScroll = window.scrollY
    frame = finished ? 0 : requestAnimationFrame(tick)
  }

  onMounted(() => {
    const smooth = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)')

    function wheel(event: WheelEvent) {
      if (!smooth.matches || !event.cancelable || event.defaultPrevented || event.ctrlKey || event.metaKey
        || event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return

      const nested = event.composedPath().some((element) => element instanceof HTMLElement
        && element !== document.scrollingElement && element !== document.body
        && (element.matches('input, textarea, select, [contenteditable]')
          || (element.scrollHeight > element.clientHeight && /^(auto|scroll|overlay)$/.test(getComputedStyle(element).overflowY))))
      if (nested) {
        stop()
        return
      }

      const unit = event.deltaMode === WheelEvent.DOM_DELTA_LINE ? 16
        : event.deltaMode === WheelEvent.DOM_DELTA_PAGE ? window.innerHeight : 1

      if (!frame || Math.abs(window.scrollY - lastScroll) > 2) {
        stop()
        target = position = lastScroll = window.scrollY
        lastTime = performance.now()
      }

      const next = limit(target + event.deltaY * unit)
      if (next === lastScroll && !frame) return

      event.preventDefault()
      target = next
      if (!frame) frame = requestAnimationFrame(tick)
    }

    window.addEventListener('wheel', wheel, { passive: false })
    window.addEventListener('keydown', stop)
    window.addEventListener('pointerdown', stop, { passive: true })
    smooth.addEventListener('change', stop)
    const removeNavigationHook = router.afterEach(stop)

    cleanup = () => {
      stop()
      removeNavigationHook()
      smooth.removeEventListener('change', stop)
      window.removeEventListener('wheel', wheel)
      window.removeEventListener('keydown', stop)
      window.removeEventListener('pointerdown', stop)
    }
  })

  onUnmounted(() => cleanup?.())
}
