import { useEffect, useState } from "react";

/**
 * Minimal matchMedia hook for client-side responsive behavior.
 * Returns false during SSR (not relevant for CRA) and until first effect runs.
 */
export default function useMediaQuery(query) {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined" || typeof window.matchMedia !== "function")
            return;

        const mql = window.matchMedia(query);
        const onChange = (e) => setMatches(e.matches);

        setMatches(mql.matches);
        if (typeof mql.addEventListener === "function") {
            mql.addEventListener("change", onChange);
            return () => mql.removeEventListener("change", onChange);
        }

        // Safari < 14
        mql.addListener(onChange);
        return () => mql.removeListener(onChange);
    }, [query]);

    return matches;
}


