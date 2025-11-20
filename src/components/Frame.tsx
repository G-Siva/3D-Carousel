import React from "react";

export default function Frame() {
  return (
    <header
      className="fixed inset-0 h-screen pointer-events-none z-50 grid grid-rows-[auto_1fr_auto] gap-4 px-page-padding"
      aria-hidden
    >
      <div className="justify-self-start pt-4 pointer-events-auto">
        <h1 className="text-left font-monoForma">ON-SCROLL 3D CAROUSEL</h1>
      </div>

      <div className="pointer-events-auto justify-self-end self-start flex gap-4 -mt-10">
        <a className="line" href="https://tympanus.net/codrops/?p=93330">
          ARTICLE
        </a>
        <a className="line" href="https://github.com/codrops/3DCarousel/">
          CODE
        </a>
        <a className="line" href="https://tympanus.net/codrops/demos/">
          ALL DEMOS
        </a>
      </div>

      <div className="pointer-events-auto mb-2">
        <nav className="flex gap-4">
          <a className="line" href="https://tympanus.net/codrops/demos/?tag=3d">
            #3D
          </a>
          <a
            className="line"
            href="https://tympanus.net/codrops/demos/?tag=carousel"
          >
            #CAROUSEL
          </a>
          <a
            className="line"
            href="https://tympanus.net/codrops/demos/?tag=page-transition"
          >
            #PAGE-TRANSITION
          </a>
        </nav>
      </div>

      <div className="absolute right-4 bottom-4 text-right">
        <p className="text-md leading-snug">
          <span className="block">FOCUS ON YOUR CLIENTS</span>
          <span className="block">LEAVE HOSTING CONFIG TO</span>
          <span className="block font-semibold">
            CLOUDWAYS. GET 50% OFF FOR
          </span>
          <span className="block">3 MONTHS + 50 FREE</span>
          <span className="block font-semibold">MIGRATIONS.</span>
        </p>
      </div>
    </header>
  );
}
