"use client";

import React, { useState, useEffect } from "react";
import { X, Star, Heart, ShoppingBag, CreditCard, Minus, Plus } from "lucide-react";
import { Product } from "@/data/products";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  initialSelectedColor?: string | null;
  onClose: () => void;
  isWishlisted: boolean;
  onWishlistToggle: (id: number) => void;
  onAddToCart: (id: number, color: string, quantity: number) => void;
  onBuyNow: (id: number, color: string, quantity: number) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  initialSelectedColor,
  onClose,
  isWishlisted,
  onWishlistToggle,
  onAddToCart,
  onBuyNow,
}) => {
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("detail");
  const [mainImage, setMainImage] = useState("");

  useEffect(() => {
    if (product) {
      setSelectedColor(initialSelectedColor || product.colors[0]);
      setQuantity(1);
      setActiveTab("detail");
      setMainImage(product.image);
    }
  }, [product, initialSelectedColor]);

  if (!isOpen || !product) return null;

  const handleQtyChange = (val: number) => {
    if (isNaN(val) || val < 1) {
      setQuantity(1);
    } else {
      setQuantity(val);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#3d3227]/55 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl z-10 border border-brand-light-gray animate-fade-in-up md:p-8 p-6 scrollbar-thin">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-brand-light hover:bg-brand-accent hover:text-white text-brand-dark shadow-sm flex items-center justify-center transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 mt-6">
          {/* Left Column: Gallery */}
          <div className="space-y-4">
            <div className="aspect-square w-full rounded-2xl overflow-hidden bg-brand-light border border-brand-light-gray relative">
              <img src={mainImage} alt={product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setMainImage(product.image)}
                className={`w-20 h-20 rounded-xl overflow-hidden bg-brand-light border-2 transition-colors ${
                  mainImage === product.image ? "border-brand-primary" : "border-brand-light-gray"
                }`}
              >
                <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
              </button>
              <button
                onClick={() => setMainImage("/assets/pattern_image.png")}
                className={`w-20 h-20 rounded-xl overflow-hidden bg-brand-light border-2 transition-colors ${
                  mainImage === "/assets/pattern_image.png" ? "border-brand-primary" : "border-brand-light-gray"
                }`}
              >
                <img src="/assets/pattern_image.png" alt="Thumbnail 2" className="w-full h-full object-cover" />
              </button>
            </div>
          </div>

          {/* Right Column: Info */}
          <div className="flex flex-col justify-between space-y-6">
            <div>
              <span className="text-xs font-semibold tracking-wider text-brand-dark-muted uppercase">
                {product.material}
              </span>
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark mt-1.5 leading-snug">
                {product.name}
              </h3>

              {/* Rating */}
              <div className="flex items-center gap-1.5 mt-3 text-xs sm:text-sm">
                <div className="flex text-[#FFB020]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <strong className="text-brand-dark font-bold ml-1">{product.rating}</strong>
                <span className="text-brand-dark-muted font-light">({product.reviews}개의 후기)</span>
              </div>

              {/* Pricing Box */}
              <div className="mt-5 p-4 bg-brand-light rounded-2xl flex items-baseline gap-2.5">
                {product.discount > 0 && (
                  <>
                    <span className="text-brand-dark-muted/50 line-through text-sm">
                      {product.origPrice.toLocaleString()}원
                    </span>
                    <span className="text-brand-accent text-lg font-bold">{product.discount}% OFF</span>
                  </>
                )}
                <span className="text-brand-dark text-2xl font-extrabold ml-auto">
                  {product.price.toLocaleString()}원
                </span>
              </div>

              {/* Specs List */}
              <div className="mt-6 space-y-2.5 text-sm border-t border-b border-brand-light-gray py-4">
                <div className="flex justify-between">
                  <span className="text-brand-dark-muted font-light">성분/혼용률</span>
                  <span className="text-brand-dark font-medium">{product.material}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-dark-muted font-light">중량/길이</span>
                  <span className="text-brand-dark font-medium">{product.weight}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-dark-muted font-light">추천 바늘</span>
                  <span className="text-brand-dark font-medium">{product.needles}</span>
                </div>
              </div>

              {/* Color Selector */}
              <div className="mt-6 space-y-2">
                <span className="text-xs font-semibold text-brand-dark-muted block">실 색상 선택</span>
                <div className="flex flex-wrap gap-2.5">
                  {product.colors.map((color, idx) => {
                    const hex = product.colorHexes?.[idx] || "#ccc";
                    const isActive = selectedColor === color;
                    return (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 rounded-full text-xs font-medium border flex items-center gap-2.5 transition-colors ${
                          isActive
                            ? "bg-brand-primary border-brand-primary text-brand-dark"
                            : "bg-white border-brand-light-gray text-brand-dark hover:border-brand-primary/55"
                        }`}
                      >
                        {product.colorHexes && product.colorHexes[idx] && (
                          <span
                            className="w-3.5 h-3.5 rounded-full border border-black/10 inline-block shadow-sm"
                            style={{ backgroundColor: hex }}
                          />
                        )}
                        <span>{color}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Qty Selector */}
              <div className="mt-6 flex items-center gap-6">
                <span className="text-xs font-semibold text-brand-dark-muted">수량 선택</span>
                <div className="flex items-center border border-brand-light-gray rounded-full px-2 py-1 bg-white">
                  <button
                    onClick={() => handleQtyChange(quantity - 1)}
                    className="p-1.5 hover:text-brand-accent text-brand-dark transition-colors"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQtyChange(parseInt(e.target.value))}
                    className="w-12 text-center text-sm font-semibold border-0 p-0 focus:ring-0 focus:outline-none"
                  />
                  <button
                    onClick={() => handleQtyChange(quantity + 1)}
                    className="p-1.5 hover:text-brand-accent text-brand-dark transition-colors"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4 pt-6">
              <button
                onClick={() => onAddToCart(product.id, selectedColor, quantity)}
                className="flex-1 bg-brand-light hover:bg-brand-secondary border border-brand-primary text-brand-dark py-3.5 rounded-full flex items-center justify-center gap-2 font-semibold text-sm transition-all"
              >
                <ShoppingBag className="w-4 h-4" /> 장바구니 담기
              </button>
              <button
                onClick={() => onBuyNow(product.id, selectedColor, quantity)}
                className="flex-1 bg-brand-primary hover:bg-brand-primary-hover text-brand-dark py-3.5 rounded-full flex items-center justify-center gap-2 font-semibold text-sm transition-all shadow-md hover:shadow-lg"
              >
                <CreditCard className="w-4 h-4" /> 바로 구매하기
              </button>
              <button
                onClick={() => onWishlistToggle(product.id)}
                className={`w-12 border rounded-full flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? "bg-brand-accent border-brand-accent text-white"
                    : "bg-white border-brand-light-gray text-brand-dark hover:text-brand-accent hover:border-brand-accent"
                }`}
                title="위시리스트 추가"
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Tab section */}
        <div className="mt-12 border-t border-brand-light-gray pt-6">
          <div className="flex border-b border-brand-light-gray text-sm font-medium">
            <button
              onClick={() => setActiveTab("detail")}
              className={`pb-3 px-6 border-b-2 transition-colors ${
                activeTab === "detail"
                  ? "border-brand-primary text-brand-primary font-bold"
                  : "border-transparent text-brand-dark-muted hover:text-brand-dark"
              }`}
            >
              상세 안내
            </button>
            <button
              onClick={() => setActiveTab("review")}
              className={`pb-3 px-6 border-b-2 transition-colors ${
                activeTab === "review"
                  ? "border-brand-primary text-brand-primary font-bold"
                  : "border-transparent text-brand-dark-muted hover:text-brand-dark"
              }`}
            >
              리뷰 ({product.reviews})
            </button>
            <button
              onClick={() => setActiveTab("shipping")}
              className={`pb-3 px-6 border-b-2 transition-colors ${
                activeTab === "shipping"
                  ? "border-brand-primary text-brand-primary font-bold"
                  : "border-transparent text-brand-dark-muted hover:text-brand-dark"
              }`}
            >
              배송/교환
            </button>
          </div>

          <div className="py-6 text-sm text-brand-dark-muted leading-relaxed">
            {activeTab === "detail" && (
              <div className="space-y-4">
                <p>{product.info}</p>
                <div className="p-4 bg-brand-light rounded-xl">
                  <p className="font-semibold text-brand-dark mb-1">세탁 시 유의사항:</p>
                  <p>{product.wash}</p>
                </div>
              </div>
            )}

            {activeTab === "review" && (
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-5 bg-brand-light rounded-2xl">
                  <strong className="text-3xl text-brand-accent font-bold">{product.rating}</strong>
                  <div>
                    <div className="flex text-[#FFB020]">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-current" />
                      ))}
                    </div>
                    <span className="text-xs text-brand-dark-muted/80 block mt-0.5">구매자 만족도 98%</span>
                  </div>
                </div>

                <div className="divide-y divide-brand-light-gray">
                  <div className="py-4">
                    <strong className="text-xs font-semibold text-brand-dark">김민* (★★★★★)</strong>
                    <p className="text-xs text-brand-dark-muted mt-1">
                      색감이 모니터보다 훨씬 예뻐요. 부드러워서 가디건 바로 뜨기 시작했습니다. 다 뜨면 또 한코자랑 커뮤니티에 올릴게요!
                    </p>
                  </div>
                  <div className="py-4">
                    <strong className="text-xs font-semibold text-brand-dark">이정* (★★★★★)</strong>
                    <p className="text-xs text-brand-dark-muted mt-1">
                      배송 엄청 빠르고 콘사 양이 짱짱해요. 굿실 가성비 유명한데 한코한코 도안 패키지 디자인 너무 현대적이라 사버렸어요 만족합니다.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "shipping" && (
              <div className="space-y-4">
                <div>
                  <h5 className="font-semibold text-brand-dark mb-1">배송 안내</h5>
                  <p className="text-xs">
                    한코한코는 한진택배를 이용하며, 기본 배송비는 3,000원입니다. 50,000원 이상 구매 시 무료배송 혜택을 드립니다. 제주도 및 도서산간 지방은 도선료 3,000원이 추가될 수 있습니다.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-brand-dark mb-1">교환/반품 안내</h5>
                  <p className="text-xs">
                    실 콘텐츠 및 PDF 도안 파일은 특성상 발송 이후 반품이 제한됩니다. 지관 상태 훼손이나 사용한 실 등은 환불이 절대 불가하오니 유의하시기 바랍니다. 변심에 의한 일반 용품 교환 시 왕복 배송비는 고객 부담입니다.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
