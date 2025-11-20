import React, { useEffect, useRef } from "react";
import Card from "./Card";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type CarouselProps = {
  title: string;
  previewId: string;
  imgs: string[];
  radius?: number;
  index?: number;
};

export default function Carousel3D({
  title,
  previewId,
  imgs,
  radius = 500,
}: CarouselProps) {
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  const splitText = (element: HTMLElement | null) => {
  if (!element) return [];
  const text = element.textContent || "";
  element.innerHTML = "";
  const chars: HTMLElement[] = [];

  [...text].forEach((char) => {
    const span = document.createElement("span");
    span.className = "char inline-block";
    span.textContent = char === " " ? "\u00A0" : char; // 👈 FIX
    element.appendChild(span);
    chars.push(span);
  });

  return chars;
};

  useEffect(() => {
    const carousel = carouselRef.current!;
    const cells = Array.from(
      carousel.querySelectorAll(".carousel__cell")
    ) as HTMLElement[];

    const count = cells.length;
    const angleStep = 360 / count;

    cells.forEach((cell, i) => {
      const angle = i * angleStep;
      cell.style.transform = `rotateY(${angle}deg) translateZ(${radius}px)`;
      cell.style.width = "350px";
      cell.style.height = "420px";
    });

    // Title char animation
    const chars = splitText(titleRef.current!);
    gsap.fromTo(chars, { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.04 });

    // ScrollTrigger 3D rotation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: carousel.closest(".scene"),
        start: "top center",
        end:"bottom top",
        scrub: true,
      },
    });

    tl.fromTo(carousel, { rotationY: 0 }, { rotationY: -180 })
      .fromTo(
        carousel,
        { rotationZ: 3, rotationX: 3 },
        { rotationZ: -3, rotationX: -3 },
        0
      )
      .fromTo(
        carousel.querySelectorAll(".card"),
        { filter: "brightness(120%)" },
        { filter: "brightness(80%)", ease:'power3' },
      
        0
      );

    return () => {
      tl.kill();
    };
  }, [radius, imgs.length]);


  return (
    <section
      id={previewId}
      className="scene relative h-screen flex items-center justify-center"
    >
      <h2
        className="scene__title z-10 relative"
        ref={titleRef}
        data-speed="0.8"
      >
        <a href={`#${previewId}`}>
          <span>{title}</span>
        </a>
      </h2>

      <div
        ref={carouselRef}
        className="carousel absolute"
        style={{
          width: 400,
          height: 500,
          marginTop: "-250px",
          marginLeft: "-200px",
          transformStyle: "preserve-3d",
          transform: "translateZ(-550px) rotateY(0deg)",
        }}
        aria-hidden
      >
        {imgs.map((img, i) => (
          <div
            className="carousel__cell"
            key={i}
            style={{ position: "absolute", left: 0, top: 0 }}
          >
            <div className="card w-[350px] h-[420px]">
              <Card img={img} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
