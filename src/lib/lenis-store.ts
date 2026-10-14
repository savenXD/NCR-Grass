import type Lenis from "lenis"

/**
 * Holds the Lenis instance once it has loaded (desktop only, see smooth-scroll.tsx).
 * Lets other components use it without importing the library, so phones never download it.
 */
let instance: Lenis | null = null
export const setLenis = (l: Lenis | null) => {
  instance = l
}
export const getLenis = () => instance
