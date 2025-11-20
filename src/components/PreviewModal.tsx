import React, { useEffect, useRef } from 'react';
import GridItem from './GridItem';
import gsap from 'gsap';

type PreviewProps = {
  id: string;
  title: string;
  items: { img: string; caption: string; id: string }[];
  onClose?: () => void;
};

export default function PreviewModal({ id, title, items, onClose }: PreviewProps) {
  const previewRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    gsap.set(previewRef.current, { autoAlpha: 0, pointerEvents: 'none' });
  }, []);

  return (
    <div className="preview fixed inset-0 p-0 md:px-[15vw] grid place-items-center pointer-events-none" id={id} ref={previewRef}>
      <div className="preview__header w-full flex items-center justify-between">
        <h2 className="preview__title"><span>{title}</span></h2>
        <button className="preview__close pointer-events-auto" aria-label="Close preview" onClick={onClose}>
          Close ×
        </button>
      </div>

      <div className="grid px-4 py-4 w-full" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, minmax(80px,1fr))', gap: '1.5rem' }}>
        {items.map((it) => (
          <GridItem key={it.id} img={it.img} caption={it.caption} captionId={it.id} />
        ))}
      </div>
    </div>
  );
}
