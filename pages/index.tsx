import { NextPage } from 'next';
import { useState } from 'react';

import SliderBeautiful from '../src/components/SliderBeautiful';
import { ImageData, getPerformance } from '../src/api/getPerformance';

type Props = {
  performanceData: ImageData[];
};

const HomePage: NextPage<Props> = () => {
  const [images, setImages] = useState<ImageData[]>([]);

  const getFetchData = async () => {
    try {
      const data = await getPerformance();
      setImages(data);
    } catch (e: any) {
      // console.error(`Error: ${e.message}`);
    }
  };

  if (!images.length) {
    getFetchData();
  }

  return (
    <SliderBeautiful
      images={images}
    />
  );
};

export default HomePage;
