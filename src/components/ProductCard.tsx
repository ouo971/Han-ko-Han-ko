"use client";

import React from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onProductClick: (id: number) => void;
  onWishlistToggle: (id: number) => void;
  onQuickAdd: (id: number, color: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onProductClick,
  onWishlistToggle,
  onQuickAdd,
}) => {
  const { id, name, material, price, origPrice, discount, image, rating, reviews, isBest, isNew } = product;

  // Determine badge markup
  let badgeText = "";
  let badgeBg = "";
  if (discount > 0) {
    badgeText = `${discount}% SALE`;
    badgeBg = "bg-brand-accent";
  } else if (isBest) {
    badgeText = "BEST";
    badgeBg = "bg-[#3F5E4D]"; // Moss green
  } else if (isNew) {
    badgeText = "NEW";
    badgeBg = "bg-brand-primary";
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md border border-brand-light-gray transition-all duration-300 flex flex-col group relative animate-fade-in-up">
      {/* Product Badges */}
      {badgeText && (
        <span className={`absolute top-4 left-4 z-10 text-white text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${badgeBg}`}>
          {badgeText}
        </span>
      )}

      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onWishlistToggle(id);
        }}
        className="absolute top-4 right-4 z-10 w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-sm text-brand-dark hover:text-brand-accent transition-colors"
        title="위시리스트 추가"
      >
        <Heart
          className={`w-5 h-5 transition-transform active:scale-95 ${
            isWishlisted ? "text-brand-accent fill-brand-accent" : "text-brand-dark/50 hover:text-brand-accent"
          }`}
        />
      </button>

      {/* Product Image & Quick Add */}
      <div
        onClick={() => onProductClick(id)}
        className="relative aspect-square w-full overflow-hidden bg-brand-light cursor-pointer group"
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Quick Add Button on Hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickAdd(id, product.colors[0]);
          }}
          className="absolute inset-x-4 bottom-4 z-10 bg-brand-dark/90 text-white py-2.5 rounded-full flex items-center justify-center gap-2 text-xs font-semibold shadow-lg opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-primary hover:text-brand-dark"
        >
          <ShoppingCart className="w-3.5 h-3.5" /> 빠른 장바구니 담기
        </button>
      </div>

      {/* Product Info */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className="space-y-1.5 cursor-pointer" onClick={() => onProductClick(id)}>
          <span className="text-[11px] font-semibold tracking-wider text-brand-dark-muted block uppercase">
            {material}
          </span>
          <h4 className="text-sm font-semibold text-brand-dark line-clamp-2 hover:text-brand-primary transition-colors leading-snug">
            {name}
          </h4>
          {/* Color Dots */}
          {product.colorHexes && product.colorHexes.length > 0 && (
            <div className="flex gap-1.5 mt-2.5 flex-wrap">
              {product.colorHexes.map((hex, idx) => (
                <span
                  key={idx}
                  className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block shadow-sm"
                  style={{ backgroundColor: hex }}
                  title={product.colors[idx]}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-4 pt-4 border-t border-brand-light-gray/60 space-y-2">
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 text-[#FFB020] fill-[#FFB020]" />
            <strong className="text-brand-dark font-bold">{rating}</strong>
            <span className="text-brand-dark-muted font-light">({reviews})</span>
          </div>

          {/* Pricing Row */}
          <div className="flex items-baseline gap-1.5 flex-wrap">
            {discount > 0 && (
              <>
                <span className="text-brand-accent text-sm font-bold">{discount}%</span>
                <span className="text-brand-dark-muted/50 line-through text-xs font-light">
                  {origPrice.toLocaleString()}원
                </span>
              </>
            )}
            <span className="text-brand-dark text-sm sm:text-base font-bold ml-auto">
              {price.toLocaleString()}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
