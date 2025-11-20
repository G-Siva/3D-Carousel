import React from 'react';

type Props = {
  img: string;
  alt?: string;
};

export default function Card({ img, alt = '' }: Props) {
  return (
    <div className="w-full h-full relative preserve-3d">
      <div
        className="absolute inset-0 bg-center bg-cover"
        style={{ backgroundImage: `url(${img})`, borderRadius: '4px' }}
        role="img"
        aria-label={alt}
      />
    </div>
  );
}
