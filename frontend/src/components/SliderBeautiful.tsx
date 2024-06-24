import Slider from 'react-slick';
import { useRef, useState } from 'react';
import Image from 'next/image';

import { ImageData } from '../api/getPerformance';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

type Props = {
  images: ImageData[];
};

const SliderBeautiful = ({ images }: Props) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef<Slider | null>(null);

  const next = () => {
    sliderRef.current?.slickNext();
  };
  const previous = () => {
    sliderRef.current?.slickPrev();
  };

  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    variableHeight: true,
    adaptivHeight: false,
    centerMode: true,
    centerPadding: '0px',
    beforeChange: (_oldIndex: number, newIndex: number) => setCurrentIndex(newIndex),
  };

  return (
    <div className="box-border h-screen max-w-[1920px] w-full m-auto flex">
      <div className="bg-white flex flex-col max-h-[978px] h-full w-full self-center relative">
        <div className="grid">
          <div className="grid grid-flow-col items-center justify-self-center my-2 sm:mt-9 sm:mb-9 lg:mt-[117px] max-w-[1830px] w-full min-h-[60px] max-h-min px-5 gap-3">
            <h1 className="text-2xl lg:text-6xl sm:text-4xl lg:text-left font-bold tracking-tight max-w-[820px] text-center">Есть всё, что бы наполнить жизнь счастьем</h1>
            <nav className="lg:flex gap-x-3 max-w-28 w-full justify-end hidden">
              <button type="button" onClick={previous} className="buttonItem group hover:bg-blue rounded-[50%] border border-solid flex items-center justify-center max-w-[50px] max-h-[50px] w-screen h-screen">
                <svg className="rotate-180" width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="stroke-black group-hover:stroke-white" d="M1.46704 2.1171L6.53294 7.12331L1.46704 11.8829" strokeWidth="2" strokeLinecap="square" />
                </svg>
              </button>
              <button type="button" onClick={next} className="buttonItem group hover:bg-blue rounded-[50%] border border-solid flex items-center justify-center max-w-[50px] max-h-[50px] w-screen h-screen">
                <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path className="stroke-black-200 group-hover:stroke-white" d="M1.46704 2.1171L6.53294 7.12331L1.46704 11.8829" strokeWidth="2" strokeLinecap="square" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
        <div className="max-h-[676px]">
          <Slider
            ref={(slider) => {
              sliderRef.current = slider;
            }}
            {...settings}
            className="sliderBeautiful"
          >
            {images
              .map((imageData, index) => {
                let className = '';
                const isActive = index === currentIndex;
                if (isActive) {
                  className = 'active';
                } else if (index === (currentIndex + 1) % images.length) {
                  className = 'right';
                } else if (index === (currentIndex - 1 + images.length) % images.length) {
                  className = 'left';
                }
                return (
                  <div key={imageData.id} className={`rounded-[20px] m-0 lg:mx-[17.5px] lg:max-w-[600px] xl:max-w-[702px] min-[1150px]:max-w-[878px] opacity-0 lg:opacity-30 ${className} slide ${!isActive && 'h-[80vw] lg:h-[471px]'}`}>
                    <div className={`w-full h-[80vw] lg:h-[499px] ${className === 'left' && 'h-full mt-7 skew-y-[-1.5deg]'} ${className === 'right' && 'h-full mt-7 skew-y-[1.5deg]'}`}>
                      <Image
                        className="object-cover h-full w-full rounded-[20px]"
                        width={878}
                        height={499}
                        priority
                        src={imageData.src}
                        alt={imageData.title}
                      />
                    </div>
                    <div className={`w-full text-center lg:text-left p-6 lg:pr-[99px] lg:pb-[42px] ${!isActive && 'opacity-0'}`}>
                      <h2 className="text-2xl leading-9 font-bold mb-3">{imageData.title}</h2>
                      <p className="text-base leading-[21px] font-medium">{imageData.text}</p>
                    </div>
                  </div>
                );
              })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default SliderBeautiful;
