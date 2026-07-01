"use client";

import React, { useState } from "react";
import { X, Loader2, ShieldCheck } from "lucide-react";
import { Product } from "@/data/products";

interface CartItem {
  product: Product;
  color: string;
  quantity: number;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onOrderSuccess: (orderId: string, address: string, finalPrice: string) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cart,
  onOrderSuccess,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [memo, setMemo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 50000 || subtotal === 0 ? 0 : 3000;
  const total = subtotal + shippingFee;
  const totalStr = `${total.toLocaleString()}원`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !address) {
      alert("모든 필수 입력 항목을 채워주세요.");
      return;
    }

    setIsSubmitting(true);

    // Simulate safe payment loading
    setTimeout(() => {
      setIsSubmitting(false);

      // Generate order ID
      const today = new Date();
      const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
      const randomNum = Math.floor(1000 + Math.random() * 9000);
      const generatedOrderId = `HK${dateStr}-${randomNum}`;

      onOrderSuccess(generatedOrderId, address, totalStr);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#3d3227]/55 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl z-10 border border-brand-light-gray animate-fade-in-up p-6 md:p-8 scrollbar-thin">
        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isSubmitting}
          className="absolute top-4 right-4 md:top-6 md:right-6 w-10 h-10 rounded-full bg-brand-light hover:bg-brand-accent hover:text-white text-brand-dark shadow-sm flex items-center justify-center transition-all disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mt-4">
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-brand-dark mb-2 flex items-center gap-2">
            주문서 작성
          </h3>
          <p className="text-xs text-brand-dark-muted font-light mb-6 border-b border-brand-light-gray pb-4">
            안전하고 감성 가득한 뜨개질을 위한 가상 주문 단계입니다.
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Customer Details */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-brand-dark block mb-1.5">
                  주문자명 <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 김코바늘"
                  disabled={isSubmitting}
                  className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-brand-dark block mb-1.5">
                    연락처 <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="예: 010-1234-5678"
                    disabled={isSubmitting}
                    className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-brand-dark block mb-1.5">
                    이메일 주소 <span className="text-brand-accent">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="예: hanko@example.com"
                    disabled={isSubmitting}
                    className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-brand-dark block mb-1.5">
                  배송지 주소 <span className="text-brand-accent">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="도로명 주소 및 상세 주소를 입력하세요"
                  disabled={isSubmitting}
                  className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-brand-dark block mb-1.5">
                  배송 요청사항 (선택)
                </label>
                <textarea
                  rows={2}
                  value={memo}
                  onChange={(e) => setMemo(e.target.value)}
                  placeholder="부재 시 문 앞에 놓아주세요."
                  disabled={isSubmitting}
                  className="w-full bg-brand-light border border-brand-light-gray rounded-xl px-4 py-2.5 text-sm text-brand-dark focus:ring-1 focus:ring-brand-primary focus:outline-none focus:bg-white resize-none"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-brand-light p-5 rounded-2xl border border-brand-light-gray/60 space-y-3">
              <h4 className="text-xs font-bold text-brand-dark uppercase tracking-wider mb-2">
                결제 요약
              </h4>
              <div className="flex justify-between text-xs text-brand-dark-muted font-light">
                <span>총 상품수량</span>
                <span className="font-semibold text-brand-dark">{totalQty}개</span>
              </div>
              <div className="flex justify-between text-xs text-brand-dark-muted font-light">
                <span>배송비</span>
                <span className="font-semibold text-brand-dark">
                  {shippingFee === 0 ? "무료" : `${shippingFee.toLocaleString()}원`}
                </span>
              </div>
              <div className="border-t border-brand-light-gray/80 pt-3 flex justify-between items-baseline">
                <span className="text-sm font-bold text-brand-dark">최종 결제금액</span>
                <span className="text-lg font-extrabold text-brand-accent">{totalStr}</span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-brand-dark text-white font-bold py-3.5 rounded-full flex items-center justify-center gap-2 hover:bg-brand-primary hover:text-brand-dark transition-all shadow-md disabled:bg-brand-dark-muted/65 focus:outline-none"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" /> 가상 안전결제 모듈 구동 중...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-brand-primary" /> {totalStr} 안전 결제하기
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
