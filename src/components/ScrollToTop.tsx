import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component that scrolls to top on every route change.
 * Must be placed inside the BrowserRouter context.
 */
export function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        // Disable browser scroll restoration
        if ("scrollRestoration" in window.history) {
            window.history.scrollRestoration = "manual";
        }

        // Scroll to top on route change
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
