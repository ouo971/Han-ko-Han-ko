"use client";

import React, { useState } from "react";
import { Search, Heart, ShoppingBag, User, Coffee } from "lucide-react";

interface HeaderProps {
  cartCount: number;
  wishlistCount: number;
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  onSearch: (query: string) => void;
  onOpenCart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  wishlistCount,
  activeCategory,
  onCategoryChange,
  onSearch,
  onOpenCart,
}) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchInput);
    scrollToShop();
  };

  const scrollToShop = () => {
    const shopSection = document.getElementById("shop-section");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCategoryClick = (category: string) => {
    onCategoryChange(category);
    scrollToShop();
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-40">
      {/* Top Banner Notification */}
      <div className="bg-brand-accent text-white py-2.5 text-center text-xs sm:text-sm font-medium tracking-wide">
        <p>🎉 한코한코 오픈 이벤트! 첫 구매 고객 모두에게 10% 특별 할인 쿠폰을 드립니다 🎁</p>
      </div>

      {/* Main Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Brand Logo */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onCategoryChange("all");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex flex-col items-center md:items-start group"
        >
          <span className="font-serif text-2xl font-bold text-brand-dark tracking-wide group-hover:text-brand-primary transition-colors">
            한코한코
          </span>
          <span className="text-[10px] uppercase font-semibold text-brand-primary tracking-widest -mt-1 font-sans">
            Han-ko Han-ko
          </span>
        </a>

        {/* Search Bar */}
        <form
          onSubmit={handleSearchSubmit}
          className="flex flex-1 max-w-xl mx-auto md:mx-0 w-full relative"
        >
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="굿실 콘사, 램스울, DIY 패키지를 찾아보세요..."
            className="w-full bg-brand-light text-brand-dark text-sm border-0 rounded-full py-2.5 pl-5 pr-12 focus:ring-2 focus:ring-brand-primary focus:outline-none placeholder-brand-dark-muted/60"
          />
          <button
            type="submit"
            className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-brand-primary text-white p-1.5 rounded-full hover:bg-brand-primary-hover transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>
        </form>

        {/* Header Actions */}
        <div className="flex items-center justify-center md:justify-end gap-5">
          {/* Wishlist Button */}
          <button
            onClick={() => {
              // We could filter the catalog to show wishlist if we want, or just show a nice message
              handleCategoryClick("all");
              // Option: trigger active category 'wishlist' to show wishlist
              onCategoryChange("wishlist");
            }}
            className="relative p-2 text-brand-dark hover:text-brand-primary transition-colors group"
            title="위시리스트"
          >
            <Heart className="w-6 h-6 group-hover:scale-105 transition-transform" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-accent text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white animate-pulse">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 text-brand-dark hover:text-brand-primary transition-colors group"
            title="장바구니"
          >
            <ShoppingBag className="w-6 h-6 group-hover:scale-105 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-primary text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* Profile Button */}
          <button
            className="p-2 text-brand-dark hover:text-brand-primary transition-colors"
            title="마이페이지"
            onClick={() => alert("한코한코 회원 페이지는 준비 중입니다. 🧶")}
          >
            <User className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="w-full bg-brand-secondary/35 border-t border-brand-light-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm py-2 sm:py-0">
          <ul className="flex items-center justify-center sm:justify-start gap-4 sm:gap-8 overflow-x-auto py-2 sm:py-3 hide-scrollbar">
            <li>
              <button
                onClick={() => handleCategoryClick("all")}
                className={`font-semibold tracking-wider transition-colors ${
                  activeCategory === "all"
                    ? "text-brand-primary border-b-2 border-brand-primary pb-0.5"
                    : "text-brand-dark hover:text-brand-primary"
                }`}
              >
                HOME
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick("cone")}
                className={`font-semibold tracking-wider transition-colors ${
                  activeCategory === "cone"
                    ? "text-brand-primary border-b-2 border-brand-primary pb-0.5"
                    : "text-brand-dark hover:text-brand-primary"
                }`}
              >
                콘사(Cone Yarn)
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick("ball")}
                className={`font-semibold tracking-wider transition-colors ${
                  activeCategory === "ball"
                    ? "text-brand-primary border-b-2 border-brand-primary pb-0.5"
                    : "text-brand-dark hover:text-brand-primary"
                }`}
              >
                볼실(Skein)
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick("kit")}
                className={`font-semibold tracking-wider transition-colors ${
                  activeCategory === "kit"
                    ? "text-brand-primary border-b-2 border-brand-primary pb-0.5"
                    : "text-brand-dark hover:text-brand-primary"
                }`}
              >
                DIY 키트
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick("tools")}
                className={`font-semibold tracking-wider transition-colors ${
                  activeCategory === "tools"
                    ? "text-brand-primary border-b-2 border-brand-primary pb-0.5"
                    : "text-brand-dark hover:text-brand-primary"
                }`}
              >
                바늘/부자재
              </button>
            </li>
            <li>
              <button
                onClick={() => handleCategoryClick("patterns")}
                className={`font-semibold tracking-wider transition-colors ${
                  activeCategory === "patterns"
                    ? "text-brand-primary border-b-2 border-brand-primary pb-0.5"
                    : "text-brand-dark hover:text-brand-primary"
                }`}
              >
                도안(PDF)
              </button>
            </li>
          </ul>

          <ul className="flex items-center justify-center gap-6 py-2 sm:py-3 text-xs sm:text-sm text-brand-dark-muted font-medium">
            <li>
              <a
                href="#knitting-lounge"
                className="flex items-center gap-1.5 hover:text-brand-primary transition-colors"
              >
                <Coffee className="w-4 h-4 text-brand-primary" /> 뜨개 라운지
              </a>
            </li>
            <li>
              <a
                href="#about-store"
                className="hover:text-brand-primary transition-colors"
              >
                브랜드 이야기
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};
