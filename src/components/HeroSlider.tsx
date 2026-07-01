"use client";

import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

interface HeroSliderProps {
  onCategorySelect: (category: string) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ onCategorySelect }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const slides = [
    {
      image: "/assets/hero_banner.png",
      tag: "SLOW LIFE & KNITTING",
      title: "세상의 모든 따뜻함을 엮는 곳",
      desc: "정성을 담아 한 코씩 떠내려가는 편안하고 느린 삶의 미학,\n한코한코가 엄선한 고품질 뜨개실과 함께 시작해 보세요.",
      btnText: "쇼핑하러 가기",
      action: () => {
        const shopSection = document.getElementById("shop-section");
        if (shopSection) shopSection.scrollIntoView({ behavior: "smooth" });
      },
    },
    {
      image: "/assets/cone_yarn.png",
      tag: "GOODSIL PREMIUM LINE",
      title: "굿실(Goodsil) 시그니처 콘사 컬렉션",
      desc: "1984년부터 이어져 온 신뢰의 품질. 램스울부터 메리노 울까지,\n다채로운 굵기와 색상의 프리미엄 콘사를 독점 혜택으로 만나보세요.",
      btnText: "콘사 기획전 보기",
      action: () => {
        onCategorySelect("cone");
        const shopSection = document.getElementById("shop-section");
        if (shopSection) shopSection.scrollIntoView({ behavior: "smooth" });
      },
    },
  ];

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetTimer();
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    resetTimer();
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
    resetTimer();
  };

  return (
    <section className="relative w-full h-[400px] md:h-[550px] overflow-hidden bg-brand-dark">
      {/* Slides Container */}
      <div className="relative w-full h-full">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-1000 ease-in-out ${
              idx === currentSlide
                ? "opacity-100 scale-100 pointer-events-auto"
                : "opacity-0 scale-105 pointer-events-none"
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.45)), url(${slide.image})`,
            }}
          >
            {/* Slide Content */}
            <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-2xl text-white space-y-4 md:space-y-6 transform translate-y-0 transition-transform duration-700">
                <span className="inline-block bg-brand-secondary/25 border border-brand-secondary/40 text-brand-secondary text-xs font-semibold px-3 py-1 rounded-full tracking-wider">
                  {slide.tag}
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold leading-tight drop-shadow-md">
                  {slide.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg text-brand-light/90 leading-relaxed font-light whitespace-pre-line drop-shadow-sm">
                  {slide.desc}
                </p>
                <div>
                  <button
                    onClick={slide.action}
                    className="inline-flex items-center gap-2 bg-brand-primary text-brand-dark font-semibold px-6 py-3 rounded-full hover:bg-brand-secondary hover:text-brand-dark transition-all duration-300 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                  >
                    {slide.btnText} <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Slider Controls */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full backdrop-blur-sm transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-full backdrop-blur-sm transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slider Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-y-1/2 -translate-x-1/2 flex gap-3 z-10">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleDotClick(idx)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === currentSlide ? "bg-brand-primary w-8" : "bg-white/55 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
};
