export function enterFullscreen(element: HTMLElement) {
  if (element.requestFullscreen) {
    element.requestFullscreen()
  } else if ((element as any).webkitRequestFullscreen) {
    // Fix Safari Sux
    ;(element as any).webkitRequestFullscreen()
  }
}
