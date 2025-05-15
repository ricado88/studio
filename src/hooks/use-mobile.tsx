
import * as React from "react"

const MOBILE_BREAKPOINT = 768

/**
 * Custom hook to determine if the current viewport is mobile.
 * Returns `undefined` on initial server render and first client render pass,
 * then resolves to `true` if mobile, `false` otherwise.
 */
export function useIsMobile(): boolean | undefined {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const updateMobileState = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    
    // Initial check once window is available
    updateMobileState();

    // Listen for resize events
    window.addEventListener("resize", updateMobileState)
    
    // Cleanup listener on component unmount
    return () => window.removeEventListener("resize", updateMobileState)
  }, []) // Empty dependency array ensures this runs once on mount and cleans up on unmount

  return isMobile
}

