import React, { useEffect, useRef } from "react";
import Frame from "./components/Frame";
import Carousel3D from "./components/Carousel3D";
import PreviewModal from "./components/PreviewModal";
import { useRegisterGSAP } from "./lib/useGSAP";
import { preloadImages } from "./utils/preloadImages";
import gsap from "gsap";
import "./index.css";

type Scene = {
  id: string;
  title: string;
  imgs: string[];
  previewItems: { img: string; caption: string; id: string }[];
};

export default function App() {
  useRegisterGSAP();
  const smootherRef = useRef<any>(null);
  const isAnimatingRef = useRef(false);

  const scenes: Scene[] = [
    {
      id: "preview-1",
      title: "HAUTE COUTURE NIGHTS-PARIS",
      imgs: ["/src/assets/img1.webp", "/src/assets/img2.webp", "/src/assets/img3.webp", "/src/assets/img4.webp"],
      previewItems: Array.from({ length: 12 }).map((_, i) => ({
        img: `/assets/img${i + 1}.webp`,
        caption: `Caption ${i + 1}`,
        id: `caption${i + 1}`,
      })),
    },
    {
      id: "preview-2",
      title: "VOGUE EVOLUTION — NEW YORK CITY",
      imgs: ["/src/assets/img13.webp", "/src/assets/img14.webp", "/src/assets/img15.webp", "/src/assets/img16.webp"],
      previewItems: Array.from({ length: 12 }).map((_, i) => {
        const idx = 12 + i + 1; // 13..24
        return { img: `/assets/img${idx}.webp`, caption: `Caption ${idx}`, id: `caption${idx}` };
      }),
    },
    {
      id: "preview-3",
      title: "MIDNIGHT RUNWAY — TOKYO",
      imgs: ["/src/assets/img25.webp", "/src/assets/img26.webp", "/src/assets/img27.webp", "/src/assets/img28.webp"],
      previewItems: Array.from({ length: 12 }).map((_, i) => {
        const idx = 24 + i + 1; // 25..36
        return { img: `/assets/img${idx}.webp`, caption: `Caption ${idx}`, id: `caption${idx}` };
      }),
    },
    {
      id: "preview-4",
      title: "DESERT MIRAGE — DUBAI",
      imgs: ["/src/assets/img37.webp", "/src/assets/img38.webp", "/src/assets/img39.webp", "/src/assets/img40.webp"],
      previewItems: Array.from({ length: 12 }).map((_, i) => {
        const idx = 36 + i + 1; // 37..48
        return { img: `/assets/img${idx}.webp`, caption: `Caption ${idx}`, id: `caption${idx}` };
      }),
    },
    {
      id: "preview-5",
      title: "NORDIC COUTURE — STOCKHOLM",
      imgs: ["/src/assets/img49.webp", "/src/assets/img50.webp", "/src/assets/img51.webp", "/src/assets/img52.webp"],
      previewItems: Array.from({ length: 12 }).map((_, i) => {
        const idx = 48 + i + 1; // 49..60
        return { img: `/assets/img${idx}.webp`, caption: `Caption ${idx}`, id: `caption${idx}` };
      }),
    },
    {
      id: "preview-6",
      title: "URBAN EDGE — LONDON",
      imgs: ["/src/assets/img61.webp", "/src/assets/img62.webp", "/src/assets/img63.webp", "/src/assets/img64.webp"],
      previewItems: Array.from({ length: 12 }).map((_, i) => {
        const idx = 60 + i + 1; // 61..72
        return { img: `/assets/img${idx}.webp`, caption: `Caption ${idx}`, id: `caption${idx}` };
      }),
    },
  ];

  useEffect(() => {
    preloadImages(".grid__item-image").then(() => {
      document.body.classList.remove("loading");

      try {
        const ScrollSmoother = (gsap as any).ScrollSmoother;
        if (ScrollSmoother && typeof ScrollSmoother.create === "function") {
          smootherRef.current = ScrollSmoother.create({
            smooth: 1,
            effects: true,
            normalizeScroll: true,
          });
        }
      } catch (err) {

      }

      try {
        const ScrollTrigger = (gsap as any).ScrollTrigger;
        if (ScrollTrigger && ScrollTrigger.refresh) {
          window.addEventListener("resize", ScrollTrigger.refresh);
        } else {
          window.addEventListener("resize", () => {
            try {
              (gsap as any).ScrollTrigger?.refresh?.();
            } catch {}
          });
        }
      } catch {}
    });

    return () => {
      try {
        smootherRef.current?.kill?.();
      } catch {}
      try {
        (gsap as any).ScrollTrigger?.getAll?.().forEach((t: any) => t.kill());
      } catch {}
    };
  }, []);

  const openPreview = (previewId: string) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const titleLink = document.querySelector(`a[href="#${previewId}"]`) as HTMLElement | null;
    if (!titleLink) {
      isAnimatingRef.current = false;
      return;
    }
    const titleEl = titleLink.closest(".scene__title") as HTMLElement | null;
    const wrapper = titleEl?.closest(".scene") as HTMLElement | null;
    const carousel = wrapper?.querySelector(".carousel") as HTMLElement | null;
    const cards = carousel?.querySelectorAll(".card") as NodeListOf<HTMLElement>;

    const offsetTop = wrapper?.getBoundingClientRect().top ?? 0;
    const targetY = offsetTop - window.innerHeight / 2 + (wrapper?.offsetHeight ?? 0) / 2;

    try {
      const ScrollTrigger = (gsap as any).ScrollTrigger;
      ScrollTrigger?.getAll?.().forEach((t: any) => t.disable(false));
    } catch {}

    const chars = titleEl?.querySelectorAll(".char") ?? [];

    const tl = gsap.timeline({
      defaults: { duration: 1.5, ease: "power2.inOut" },
      onComplete: () => {
        isAnimatingRef.current = false;
        try {
          const ScrollTrigger = (gsap as any).ScrollTrigger;
          ScrollTrigger?.getAll?.().forEach((t: any) => t.enable());
        } catch {}
      },
    });

    const ScrollTo = (gsap as any).ScrollToPlugin;
    if (ScrollTo) {
      tl.to(
        window,
        {
          scrollTo: { y: targetY, autoKill: true },
          onStart() {
            document.documentElement.style.overflow = "hidden";
          },
          onComplete() {
            document.documentElement.style.overflow = "";
            if (smootherRef.current) smootherRef.current.paused = true;
          },
        },
        0
      );
    } else {
      tl.to(
        {},
        {
          duration: 1.2,
          onStart() {
            document.documentElement.style.overflow = "hidden";
          },
          onComplete() {
            window.scrollTo({ top: targetY, behavior: "auto" });
            document.documentElement.style.overflow = "";
            if (smootherRef.current) smootherRef.current.paused = true;
          },
        },
        0
      );
    }

    tl.to(chars, { autoAlpha: 0, duration: 0.02, stagger: { each: 0.04, from: "end" } }, 0)
      .to(carousel, { rotationX: 90, rotationY: -360, z: -2000 }, 0)
      .to(cards, { rotationZ: 0 }, 0)
      .to(
        carousel,
        {
          duration: 2.5,
          ease: "power3.inOut",
          z: 1500,
          rotationZ: 270,
          onComplete: () => {
            const preview = document.getElementById(previewId);
            if (preview) {
              gsap.set(preview, { pointerEvents: "auto", autoAlpha: 1 });
              const items = preview.querySelectorAll(".grid__item");
              gsap.set(items, { clearProps: "all" });
              gsap.fromTo(items, { autoAlpha: 0, scale: 0.5 }, { autoAlpha: 1, scale: 1, stagger: 0.03, duration: 0.4, ease: "sine" });
            }
          },
        },
        0.7
      );
  };

  const closePreview = (previewId: string) => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const preview = document.getElementById(previewId);
    if (!preview) {
      isAnimatingRef.current = false;
      return;
    }

    const titleLink = document.querySelector(`a[href="#${previewId}"]`) as HTMLAnchorElement | null;
    const titleEl = titleLink?.closest(".scene__title") as HTMLElement | null;
    const wrapper = titleEl?.closest(".scene") as HTMLElement | null;
    const carousel = wrapper?.querySelector(".carousel") as HTMLElement | null;
    const cards = carousel?.querySelectorAll(".card") as NodeListOf<HTMLElement>;
    const chars = titleEl?.querySelectorAll(".char") ?? [];

    const items = preview.querySelectorAll(".grid__item");
    gsap.to(items, { autoAlpha: 0, scale: 0.4, stagger: { each: 0.02, from: "center" }, duration: 0.4 });
    gsap.set(preview, { pointerEvents: "none", autoAlpha: 0 });

    const timeline = gsap.timeline({
      delay: 0.7,
      defaults: {
        duration: 1.3,
        ease: "expo",
        onComplete: () => {
          if (smootherRef.current) smootherRef.current.paused = false;
          isAnimatingRef.current = false;
        },
      },
    });

    timeline.fromTo(chars, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.02, stagger: 0.04 }).fromTo(
      carousel,
      { z: -550, rotationX: 0, rotationY: -720, yPercent: 300 },
      { rotationY: 0, yPercent: 0 },
      0
    ).fromTo(cards, { autoAlpha: 0 }, { autoAlpha: 1 }, 0.3);
  };

  return (
    <>
      <Frame />
      <main id="smooth-content" className="pt-28">
        {scenes.map((s, i) => (
          <div className="scene-wrapper" key={s.id}>
            <Carousel3D title={s.title} previewId={`#${s.id}`} imgs={s.imgs} radius={i === 4 ? 650 : 500} />
          </div>
        ))}
      </main>

      {scenes.map((s) => (
        <PreviewModal key={s.id} id={s.id} title={s.title} items={s.previewItems} onClose={() => closePreview(s.id)} />
      ))}

      <div style={{ display: "none" }}>
        {scenes.map((s) => (
          <a key={s.id} href={`#${s.id}`} onClick={(e) => { e.preventDefault(); openPreview(s.id); }} />
        ))}
      </div>
    </>
  );
}
