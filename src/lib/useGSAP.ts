import { useEffect } from "react";
import gsap from "gsap";

export async function registerGSAPPluginsOnce() {
  try {
    const { default: ScrollTrigger } = await import("gsap/ScrollTrigger");
    gsap.registerPlugin(ScrollTrigger);
  } catch (e) {

  }

  try {
    const { default: ScrollSmoother } = await import("gsap/ScrollSmoother");
    gsap.registerPlugin(ScrollSmoother);
  } catch (e) {
 
  }

  try {
    const { default: ScrollToPlugin } = await import("gsap/ScrollToPlugin");
    gsap.registerPlugin(ScrollToPlugin);
  } catch (e) {
   
  }

  try {
    await import("gsap/SplitText");
  } catch (e) {
   
  }
}

export function useRegisterGSAP() {
  useEffect(() => {
    let mounted = true;
    (async () => {
      await registerGSAPPluginsOnce();
      if (!mounted) return;
    })();
    return () => {
      mounted = false;
      try {
        const ScrollTrigger = (gsap as any).ScrollTrigger;
        if (ScrollTrigger && ScrollTrigger.getAll) {
          ScrollTrigger.getAll().forEach((t: any) => t.kill());
        }
      } catch (e) {}
    };
  }, []);
}
