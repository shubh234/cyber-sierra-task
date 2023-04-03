import { useEffect } from "react";

export default function useDisableScroll() {
  useEffect(() => {
    // Save the current scroll position
    const scrollTop = window.pageYOffset || document.body.scrollTop;
    // Disable scrolling on the background
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollTop}px`;

    // Re-enable scrolling on unmount
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      window.scrollTo({
        top: scrollTop,
        left: 0,
        behavior: "auto",
      });
    };
  }, []);
}
