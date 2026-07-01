"use client";

import React, { useState, useEffect } from "react";
import { Loader2, AlertCircle } from "lucide-react";
import { Product, PRODUCTS } from "@/data/products";
import { ProductCard } from "./ProductCard";

interface ProductCatalogProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  searchQuery: string;
  onClearSearch: () => void;
  wishlist: number[];
  onWishlistToggle: (id: number) => void;
  onQuickAdd: (id: number, color: string) => void;
  onProductClick: (id: number) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  activeCategory,
  onCategoryChange,
  searchQuery,
  onClearSearch,
  wishlist,
  onWishlistToggle,
  onQuickAdd,
  onProductClick,
}) => {
  const [activeSort, setActiveSort] = useState("recommend");
  const [isLoading, setIsLoading] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  // Filter tabs definition
  const tabs = [
    { id: "all", name: "전체보기" },
    { id: "cone", name: "콘사(Cone)" },
    { id: "ball", name: "볼실(Skein)" },
    { id: "kit", name: "DIY 키트" },
    { id: "tools", name: "바늘/도구" },
    { id: "patterns", name: "도안(PDF)" },
  ];

  // Perform filtering and sorting
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      let result = [...PRODUCTS];

      // 1. Filter by category
      if (activeCategory === "wishlist") {
        // Special category for wishlisted items
        result = result.filter((prod) => wishlist.includes(prod.id));
      } else if (activeCategory !== "all") {
        result = result.filter((prod) => prod.category === activeCategory);
      }

      // 2. Filter by search query
      if (searchQuery.trim() !== "") {
        const query = searchQuery.toLowerCase();
        result = result.filter(
          (prod) =>
            prod.name.toLowerCase().includes(query) ||
            prod.material.toLowerCase().includes(query) ||
            prod.info.toLowerCase().includes(query)
        );
      }

      // 3. Sort
      if (activeSort === "new") {
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      } else if (activeSort === "low-price") {
        result.sort((a, b) => a.price - b.price);
      } else if (activeSort === "high-price") {
        result.sort((a, b) => b.price - a.price);
      } else if (activeSort === "popular") {
        result.sort((a, b) => b.reviews - a.reviews);
      } else {
        // recommend: best first, then by rating desc
        result.sort((a, b) => {
          if (a.isBest !== b.isBest) {
            return (b.isBest ? 1 : 0) - (a.isBest ? 1 : 0);
          }
          return b.rating - a.rating;
        });
      }

      setFilteredProducts(result);
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [activeCategory, activeSort, searchQuery, wishlist]);

  return (
    <section className="py-16 bg-brand-light/45" id="shop-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Catalog Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 border-b border-brand-light-gray pb-6 mb-8">
          <div>
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark">
              {activeCategory === "wishlist" ? "내 위시리스트" : "한코한코의 추천 뜨개용품"}
            </h2>
            <p className="text-sm text-brand-dark-muted font-light mt-1.5">
              {activeCategory === "wishlist"
                ? "관심 상품으로 등록해 두신 한코한코 뜨개 용품입니다."
                : "초보자부터 전문가까지, 뜨개인의 만족을 높여줄 엄선된 상품들"}
            </p>
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-6">
            {/* Filter Tabs (Hidden if viewing Wishlist) */}
            {activeCategory !== "wishlist" && (
              <div className="flex items-center gap-2 overflow-x-auto hide-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => onCategoryChange(tab.id)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-xs font-semibold tracking-wider border transition-all ${
                      activeCategory === tab.id
                        ? "bg-brand-primary border-brand-primary text-brand-dark"
                        : "bg-white border-brand-light-gray text-brand-dark hover:border-brand-primary/55"
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </div>
            )}

            {/* Sorting Select */}
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <label htmlFor="sort-select" className="sr-only">
                정렬 방식
              </label>
              <select
                id="sort-select"
                value={activeSort}
                onChange={(e) => setActiveSort(e.target.value)}
                className="bg-white border border-brand-light-gray text-brand-dark rounded-lg py-2 pl-3 pr-8 text-xs font-medium focus:ring-1 focus:ring-brand-primary focus:outline-none cursor-pointer"
              >
                <option value="recommend">추천순</option>
                <option value="new">신상품순</option>
                <option value="low-price">낮은 가격순</option>
                <option value="high-price">높은 가격순</option>
                <option value="popular">리뷰 많은순</option>
              </select>
            </div>
          </div>
        </div>

        {/* Search Status Bar */}
        {searchQuery !== "" && (
          <div className="bg-brand-secondary/40 text-brand-dark text-sm rounded-xl px-5 py-3 mb-6 flex items-center justify-between border border-brand-secondary">
            <div>
              &ldquo;<span className="font-bold text-brand-accent">{searchQuery}</span>&rdquo; 검색 결과{" "}
              <strong className="font-bold">{filteredProducts.length}</strong>건
            </div>
            <button
              onClick={onClearSearch}
              className="text-xs font-bold text-brand-dark hover:text-brand-accent flex items-center gap-1 focus:outline-none"
            >
              &times; 지우기
            </button>
          </div>
        )}

        {/* Catalog Grid */}
        {isLoading ? (
          <div className="w-full py-24 flex flex-col items-center justify-center text-brand-dark-muted gap-3">
            <Loader2 className="w-8 h-8 animate-spin text-brand-primary" />
            <p className="text-sm font-medium">상품을 정성껏 진열하고 있습니다...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="w-full bg-white rounded-2xl py-24 border border-brand-light-gray flex flex-col items-center justify-center text-center px-4">
            <AlertCircle className="w-12 h-12 text-brand-dark-muted/40 mb-4" />
            <p className="text-base font-semibold text-brand-dark">
              {activeCategory === "wishlist"
                ? "위시리스트가 비어 있습니다."
                : "찾으시는 상품이 현재 한코한코 매장에 없습니다."}
            </p>
            <p className="text-xs text-brand-dark-muted font-light mt-1">
              {activeCategory === "wishlist"
                ? "관심 상품 하트 버튼을 눌러 목록에 담아보세요!"
                : "다른 검색어로 검색하시거나 카테고리 필터를 이용해 보세요."}
            </p>
            {activeCategory === "wishlist" && (
              <button
                onClick={() => onCategoryChange("all")}
                className="mt-6 bg-brand-primary text-brand-dark text-xs font-semibold px-5 py-2.5 rounded-full hover:bg-brand-primary-hover transition-colors"
              >
                추천 상품 보러가기
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                isWishlisted={wishlist.includes(prod.id)}
                onProductClick={onProductClick}
                onWishlistToggle={onWishlistToggle}
                onQuickAdd={onQuickAdd}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
