"use client";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import "./carousel.css";
import Image from "next/image";

const images = [
  "/images/img1.jpg",
  "/images/img2.jpg",
  "/images/img3.jpg",
  "/images/img4.jpg",
  "/images/img5.jpg",
  "/images/img6.jpg",
  "/images/img7.jpg",
  "/images/img8.jpg",
  "/images/img9.jpg",
  "/images/img10.jpg",
];

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);
  const gap = 16; // 图片之间的间隙，仅用于大屏幕

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [isMobile, currentIndex]);

  const goToPrev = () => {
    setCurrentIndex((prev) =>
      prev === 0
        ? images.length - (isMobile ? 1 : 3)
        : prev - (isMobile ? 1 : 1)
    );
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev >= images.length - (isMobile ? 1 : 3) ? 0 : prev + (isMobile ? 1 : 1)
    );
  };

  // 计算滑动距离
  const getSlideDistance = () => {
    if (isMobile) {
      // 小屏幕：每次滑动100%宽度，不考虑间隙
      return containerRef.current?.clientWidth * currentIndex || 0;
    } else {
      // 大屏幕：每次滑动(图片宽度 + 间隙)
      return (380 + gap) * currentIndex;
    }
  };

  return (
    <div className="relative w-full overflow-hidden" ref={containerRef}>
      <div className="flex justify-center">
        <div className="relative w-full max-w-[1200px]">
          {/* 导航按钮 */}
          <div className="absolute inset-y-0 left-0 flex items-center z-10">
            <Button variant="ghost" onClick={goToPrev} className="ml-2">
              <ChevronLeft size={24} />
            </Button>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center z-10">
            <Button variant="ghost" onClick={goToNext} className="mr-2">
              <ChevronRight size={24} />
            </Button>
          </div>

          {/* 图片容器 */}
          <div className="flex justify-center overflow-hidden">
            <div
              className={`flex ${
                isMobile ? "w-full" : "w-[calc(380px*3+16px*2)]"
              } ${
                isMobile ? "" : "gap-4"
              } transition-transform duration-500 ease-in-out`}
              style={{
                transform: `translateX(-${getSlideDistance()}px)`,
              }}
            >
              {images.map((img, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 ${
                    isMobile ? "w-full" : "w-[380px]"
                  }`}
                >
                  <Image
                    src={img}
                    alt={`carousel-${index}`}
                    width={380}
                    height={380}
                    className={`${
                      isMobile ? "w-full" : "w-[360px]"
                    } h-[360px] object-cover rounded-2xl`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* 指示器 */}
          <div className="flex justify-center mt-4">
            {Array.from({
              length: isMobile ? images.length : Math.ceil(images.length / 3),
            }).map((_, i) => (
              <button
                key={i}
                className={`w-2 h-2 mx-1 rounded-full ${
                  (
                    isMobile
                      ? i === currentIndex
                      : Math.floor(currentIndex / 3) === i
                  )
                    ? "bg-black"
                    : "bg-gray-300"
                }`}
                onClick={() => setCurrentIndex(isMobile ? i : i * 3)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
