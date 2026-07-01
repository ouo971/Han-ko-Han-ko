"use client";

import React from "react";
import { Play, ArrowUpRight, Feather, Sparkles, Heart } from "lucide-react";

export const KnittingLounge: React.FC = () => {
  const galleryItems = [
    {
      id: 1,
      image: "/assets/diy_kit.png",
      author: "@knit_lover_mj",
      desc: "자도르 스웨터 키트로 완성! 실이 너무 촉촉하고 부드러워요 🧶",
    },
    {
      id: 2,
      image: "/assets/cone_yarn.png",
      author: "@hanko_story",
      desc: "굿실 램스울 콘사로 뜬 배색 가디건. 색감이 예술입니다!",
    },
    {
      id: 3,
      image: "/assets/hero_banner.png",
      author: "@slow_knitter",
      desc: "가을 맞이 조끼 드디어 완성! 한코한코 패키지 최고예요 👍",
    },
    {
      id: 4,
      image: "/assets/pattern_image.png",
      author: "@crochet_ddatatteu",
      desc: "베를린 스카프 도안으로 이틀만에 완성했어요. 선물용으로 딱!",
    },
  ];

  return (
    <div className="space-y-20 py-16 bg-white">
      {/* 5. Knitting Lounge */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="knitting-lounge">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: YouTube Tutorial */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-wider text-brand-primary uppercase block">
                GUIDE & TIPS
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark">
                처음이어도 괜찮아요
              </h3>
              <p className="text-sm text-brand-dark-muted font-light">
                한코한코에서 준비한 동영상 가이드와 뜨개 팁으로 손쉽게 배워보세요.
              </p>
            </div>

            {/* Tip Card */}
            <div className="border border-brand-light-gray rounded-3xl overflow-hidden bg-brand-light flex flex-col sm:flex-row group hover:shadow-md transition-shadow">
              {/* Video Mockup */}
              <div className="relative w-full sm:w-48 aspect-video sm:aspect-square overflow-hidden bg-brand-dark cursor-pointer flex-shrink-0">
                <img
                  src="/assets/pattern_image.png"
                  alt="동영상 섬네일"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                />
                <div className="absolute inset-0 bg-black/15 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-accent shadow-md group-hover:scale-108 group-hover:bg-brand-accent group-hover:text-white transition-all">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>
              </div>

              {/* Tip Info */}
              <div className="p-6 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <span className="inline-block bg-brand-secondary/35 text-brand-dark-muted text-[10px] font-bold px-2 py-0.5 rounded-md">
                    초보 가이드
                  </span>
                  <h4 className="text-base font-bold text-brand-dark leading-snug">
                    코잡기부터 겉뜨기, 안뜨기까지 한눈에 보기
                  </h4>
                  <p className="text-xs text-brand-dark-muted font-light leading-relaxed">
                    대바늘 뜨개의 가장 기초가 되는 기본 기법들을 5분 만에 마스터할 수 있도록 친절히 설명해 드립니다.
                  </p>
                </div>
                <div>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-primary hover:text-brand-accent transition-colors"
                  >
                    가이드 영상 보러가기 <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Community Gallery */}
          <div className="space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-semibold tracking-wider text-brand-primary uppercase block">
                OUR COMMUNITY
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark">
                이웃들의 뜨개 이야기
              </h3>
              <p className="text-sm text-brand-dark-muted font-light">
                직접 뜨신 예쁜 완성작들을 공유하고 소통해 보세요.
              </p>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 gap-4">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-4/3 rounded-2xl overflow-hidden shadow-sm border border-brand-light-gray/60 cursor-pointer"
                >
                  <img
                    src={item.image}
                    alt={item.author}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark/95 via-brand-dark/70 to-transparent pt-12 pb-4 px-4 text-white translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 flex flex-col justify-end">
                    <span className="text-[10px] font-semibold text-brand-secondary block mb-0.5">
                      {item.author}
                    </span>
                    <p className="text-[11px] leading-snug font-light text-brand-light/90">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. About Han-ko Han-ko Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="about-store">
        <div className="bg-brand-light border-2 border-brand-light-gray rounded-3xl p-8 sm:p-12 md:p-16 text-center space-y-6 shadow-xs max-w-5xl mx-auto">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-brand-dark">
            한코한코가 약속하는 슬로우 라이프
          </h2>
          <div className="w-16 h-0.5 bg-brand-primary mx-auto" />
          <div className="space-y-4 max-w-3xl mx-auto text-sm sm:text-base text-brand-dark-muted leading-relaxed font-light">
            <p>
              우리는 단순히 뜨개용품을 판매하는 것을 넘어,
              <br />
              복잡하고 빠른 세상 속에서 손끝의 온기와 함께 누리는 느리고 평온한 시간을 지향합니다.
            </p>
            <p>
              <strong className="font-semibold text-brand-dark">세비</strong>의 현대적이고 감성적인 스타일링 가치와{" "}
              <strong className="font-semibold text-brand-dark">굿실</strong>의 40년 전통 프리미엄 소재 신뢰성을 엮어,
              <br />
              초보 뜨개인부터 오랜 장인까지 믿고 쓸 수 있는 완벽한 뜨개 가이드를 제공하겠습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-brand-light-gray/80 mt-10">
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-xs">
                <Feather className="w-5 h-5" />
              </div>
              <h5 className="font-serif text-base font-bold text-brand-dark">고품질 천연 섬유</h5>
              <p className="text-xs text-brand-dark-muted leading-relaxed font-light max-w-[240px]">
                피부에 닿아도 안심할 수 있는 엄선된 울, 면, 캐시미어 혼방실만을 다룹니다.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-xs">
                <Sparkles className="w-5 h-5" />
              </div>
              <h5 className="font-serif text-base font-bold text-brand-dark">맞춤형 DIY 패키지</h5>
              <p className="text-xs text-brand-dark-muted leading-relaxed font-light max-w-[240px]">
                초보자도 도안과 동영상을 보며 완벽하게 코를 채울 수 있는 패키지 구성을 선보입니다.
              </p>
            </div>
            <div className="flex flex-col items-center space-y-2 text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-brand-primary shadow-xs">
                <Heart className="w-5 h-5" />
              </div>
              <h5 className="font-serif text-base font-bold text-brand-dark">손뜨개의 힐링 문화</h5>
              <p className="text-xs text-brand-dark-muted leading-relaxed font-light max-w-[240px]">
                뜨개질을 하는 조용하고 가치 있는 시간 그 자체를 위한 커뮤니티 공간을 만듭니다.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
