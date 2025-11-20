# 3D Fashion Carousel — React + Tailwind + GSAP

This project is a **Projector** task focused on converting an existing **HTML + CSS** animated carousel into a modern and efficient tech stack using **React**, **Tailwind CSS**, and **GSAP** for scroll-based animations.

The main goal was to recreate a premium fashion-style 3D carousel — originally built with static markup — into a modular, component-based React application with clean structure and reusable logic.

---

## Project Overview

This project transforms:

- A static HTML/CSS 3D carousel
- With manually defined animations
- Without component reusability

into a:

- **React Component-Driven UI**
- **Tailwind CSS Styled Layout**
- **GSAP ScrollTrigger Animated Carousel**
- **Modular & Extensible Code Architecture**

The final output includes:

- A dynamic 3D rotating carousel
- Smooth scroll-based animation using GSAP
- Title reveal animation using GSAP
- Preview grid modal for each scene
- Full support for multiple scenes
- Optimized image loading

---

## Tech Stack

### Frontend Framework

- **React + TypeScript**

### Styling

- **Tailwind CSS** → replaces all old CSS classes

### Animation

- **GSAP (GreenSock Animation Platform)**
- **ScrollTrigger plugin** for scroll-based 3D movement

> Only **GSAP animation logic** was generated using **ChatGPT**, as part of the allowed task scope.

### **Other Utilities**

- Custom Image Preloader
- Custom Hooks (`useRegisterGSAP`)
- Modals and Grid Components for previews

---

## Task Requirements

### Convert original HTML/CSS into React

All markup was split into components such as:

- `Carousel3D`
- `PreviewModal`
- `GridItem`
- `Frame`

### Replace static CSS with Tailwind CSS

All layout, spacing, and visual styling now uses Tailwind utility classes.

### Add GSAP scroll animation

The project uses:

- `ScrollTrigger` for scroll-driven rotation
- `gsap.timeline()` for chained animations
- Character-by-character title reveal animation

### Only GSAP code was assisted using ChatGPT

Everything else — conversion, structure, styling — was hand-coded.

---

## Project Structure

```
src/
├── components/
│   ├── Carousel3D.tsx
│   ├── PreviewModal.tsx
│   ├── GridItem.tsx
│   └── Frame.tsx
│
├── utils/
│   ├── preloadImages.ts
│
├── lib/
│   ├── useGSAP.ts
│
├── assets/
│   ├── img1.webp
│   ├── img2.webp
│   └── ...
│
├── App.tsx
└── index.css
```

---

## Features

### 🔹 3D Rotating Carousel

- True 3D transforms with `rotateY` and `translateZ`
- Dynamically positioned cards
- Smooth animation on scroll

### 🔹 Preview Modal System

- Expands collection on click
- Grid-based preview items

### 🔹 Scene-Based Rendering

Each scene has:

- A title
- Set of 4 images
- Preview grid with 12 items

### 🔹 Text Animation

- Character splitting animation
- Fade-in on load

---

## How GSAP was Used

GSAP was used only for the animation tasks:

### ✔ Scroll-triggered rotation

```ts
timeline.fromTo(carousel, { rotationY: 0 }, { rotationY: -180 });
```

### ✔ Title character reveal

```ts
gsap.fromTo(chars, { autoAlpha: 0 }, { autoAlpha: 1, stagger: 0.04 });
```

### ✔ Modal transition animations

All transitions when opening/closing preview scenes.

---

## Setup Instructions

### 1. Install dependencies

```
npm install
```

### 2. Start development server

```
npm run dev
```

### 3. Build production

```
npm run build
```

---

## Credits

- **Original HTML/CSS design:** Provided by Projector Task
- **React + Tailwind conversion:** Done manually
- **GSAP animation assistance:** Generated using ChatGPT only

---

## License

This is an educational conversion project for **Projector Task** — not intended for commercial use.

---

