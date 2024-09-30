import Image from 'next/image';
import React from 'react';
import ReactRating  from 'react-rating';

interface RatingComponentProps {
  count: number;
  activeImage: string;
  inactiveImage: string;
  size: number;
  value: number;
  onChange: (value: number) => void;
}

const Rating: React.FC<RatingComponentProps> = ({
  count,
  activeImage,
  inactiveImage,
  size,
  value,
  onChange,
}) => {
  return (
    <ReactRating
      initialRating={value}
      emptySymbol={
        <Image
          src={inactiveImage}
          alt="inactive"
          width={size}
          height={size}
          quality={100}
          priority
        />
      }
      fullSymbol={
        <Image
          src={activeImage}
          alt="active"
          width={size}
          height={size}
          quality={100}
          priority
        />
      }
      onChange={onChange}
      stop={count}
    />
  );
};

export default Rating;
