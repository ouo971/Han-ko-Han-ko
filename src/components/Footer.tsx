"use client";

import React from "react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#352B21] text-[#E2DDD6] py-16 border-t-3 border-brand-primary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 text-sm">
        {/* Company Info */}
        <div className="space-y-4">
          <h4 className="font-serif text-base font-bold text-white tracking-wide">
            한코한코 (Han-ko Han-ko)
          </h4>
          <div className="space-y-1.5 text-xs text-[#E2DDD6]/80 font-light">
            <p>주식회사 니팅테일 (Knitting Tale) | 대표자: 박유진 | 서울특별시 성동구 아차산로 7길 3F (세비하우스 옆)</p>
            <p>사업자등록번호: 123-45-67890 | 통신판매업신고: 제 2026-서울성동-0000호</p>
          </div>
          <p className="text-[10px] text-[#E2DDD6]/40 mt-6 font-light">
            Copyright &copy; 2026 Han-ko Han-ko. All rights reserved.
          </p>
        </div>

        {/* CS Center */}
        <div className="space-y-4">
          <h4 className="font-serif text-base font-bold text-white tracking-wide">
            고객센터 (Customer Center)
          </h4>
          <p className="text-xl font-bold text-brand-secondary tracking-wide uppercase">
            1:1 채팅 상담 전용
          </p>
          <div className="space-y-1.5 text-xs text-[#E2DDD6]/80 font-light">
            <p>CS 고객상담은 우측 하단의 실시간 챗봇을 통한</p>
            <p>1:1 채팅 상담으로만 운영됩니다. (평일 10:00 - 17:00)</p>
            <p>이메일 문의: cs@knittingtale.co.kr</p>
          </div>
        </div>

        {/* Social & Tagline */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className="font-serif text-base font-bold text-white tracking-wide">
              우리와 연결되세요
            </h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 transform hover:-translate-y-1"
                title="인스타그램"
              >
                {/* Instagram inline SVG */}
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051C.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 transform hover:-translate-y-1"
                title="유튜브"
              >
                {/* YouTube inline SVG */}
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.108C19.53 3.5 12 3.5 12 3.5s-7.53 0-9.388.555A3.003 3.003 0 00.502 6.163C0 8.07 0 12 0 12s0 3.93.502 5.837a3.003 3.003 0 002.11 2.108C4.47 20.5 12 20.5 12 20.5s7.53 0 9.388-.555a3.003 3.003 0 002.11-2.108C24 15.93 24 12 24 12s0-3.93-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-brand-primary hover:text-brand-dark transition-all duration-300 transform hover:-translate-y-1"
                title="핀터레스트"
              >
                {/* Pinterest custom SVG */}
                <svg
                  className="w-5 h-5 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.966 1.406-5.966s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.62 0 11.988-5.367 11.988-11.987C24.005 5.367 18.636 0 12.017 0z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="border-l-2 border-brand-primary pl-4 py-1 italic font-serif text-[#E2DDD6]/90 text-xs sm:text-sm">
            <p>&ldquo;정성 어린 한 코 한 코가 모여 당신만의 따뜻한 세상이 됩니다.&rdquo;</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
