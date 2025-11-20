import React from 'react';

type Props = {
  img: string;
  caption: string;
  captionId: string;
};

export default function GridItem({ img, caption, captionId }: Props) {
  return (
    <figure role="img" aria-labelledby={captionId} className="grid__item">
      <div
        className="grid__item-image w-full"
        style={{
          backgroundImage: `url(${img})`,
          aspectRatio: '4/5',
          backgroundPosition: '50% 50%',
          backgroundSize: '100%'
        }}
      />
      <figcaption id={captionId} className="grid__item-caption">
        <h3 className="text-base font-normal">{caption}</h3>
      </figcaption>
    </figure>
  );
}
