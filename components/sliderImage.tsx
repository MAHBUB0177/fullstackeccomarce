import React from 'react';
import SliderImage from 'react-zoom-slider';

interface SliderImagesProps {
  image: string[];
}

const SliderImages: React.FC<SliderImagesProps> = ({ image }) => {
  if (!image || image.length === 0) {
    return <p>No images available</p>;
  }

  const sliderData = image.map((imgUrl) => ({
    image: imgUrl,
  }));

  return (
    <div>
      <SliderImage
        data={sliderData}
        width="300px"
        direction="right"
        showDescription={true}
      />
    </div>
  );
};

export default SliderImages;
