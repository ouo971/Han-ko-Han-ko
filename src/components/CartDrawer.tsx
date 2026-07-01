"use client";

import React from "react";
import { X, Trash2, Minus, Plus, ShoppingBag } from "lucide-react";
import { Product } from "@/data/products";

interface CartItem {
  product: Product;
  color: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onAdjustQty: (index: number, delta: number) => void;
  onSetQty: (index: number, quantity: number) => void;
  onRemoveItem: (index: number) => void;
  onCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cart,
  onAdjustQty,
  onSetQty,
  onRemoveItem,
  onCheckout,
}) => {
  const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shippingFee = subtotal >= 50000 || subtotal === 0 ? 0 : 3000;
  const total = subtotal + shippingFee;

  return (
    <div className={`fixed inset-0 z-50 transition-all duration-300 ${isOpen ? "visible" : "invisible"}`}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-[#3d3227]/55 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className={`absolute top-0 right-0 h-full w-full sm:w-[450px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-6 border-b border-brand-light-gray flex items-center justify-between">
          <h3 className="text-lg font-bold text-brand-dark flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-brand-primary" /> 장바구니
            {totalQty > 0 && <span className="text-xs font-semibold text-brand-primary">({totalQty})</span>}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:text-brand-accent text-brand-dark transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <ShoppingBag className="w-16 h-16 text-brand-dark-muted/20" />
              <p className="text-brand-dark text-sm leading-relaxed">
                장바구니가 비어 있습니다.
                <br />
                예쁜 실과 패키지를 가득 담아보세요!
              </p>
              <button
                onClick={onClose}
                className="bg-brand-light hover:bg-brand-secondary border border-brand-primary text-brand-dark px-6 py-2.5 rounded-full text-xs font-semibold transition-colors"
              >
                쇼핑 계속하기
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div
                key={`${item.product.id}-${item.color}-${idx}`}
                className="flex gap-4 border-b border-brand-light-gray/60 pb-6 relative group"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-brand-light border border-brand-light-gray flex-shrink-0">
                  <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <h4 className="text-sm font-semibold text-brand-dark truncate pr-6">
                    {item.product.name}
                  </h4>
                  <span className="text-xs text-brand-dark-muted font-medium bg-brand-light px-2 py-0.5 rounded-md">
                    옵션: {item.color}
                  </span>

                  <div className="flex items-center justify-between pt-2">
                    {/* Qty Adjuster */}
                    <div className="flex items-center border border-brand-light-gray rounded-full px-1.5 py-0.5 bg-white">
                      <button
                        onClick={() => onAdjustQty(idx, -1)}
                        className="p-1 hover:text-brand-accent text-brand-dark transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => onSetQty(idx, parseInt(e.target.value))}
                        className="w-10 text-center text-xs font-semibold border-0 p-0 focus:ring-0 focus:outline-none"
                      />
                      <button
                        onClick={() => onAdjustQty(idx, 1)}
                        className="p-1 hover:text-brand-accent text-brand-dark transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <span className="text-sm font-bold text-brand-dark">
                      {(item.product.price * item.quantity).toLocaleString()}원
                    </span>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  onClick={() => onRemoveItem(idx)}
                  className="absolute top-0 right-0 p-1 text-brand-dark-muted/40 hover:text-brand-accent transition-colors"
                  title="상품 삭제"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="p-6 bg-brand-light border-t border-brand-light-gray space-y-4">
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-brand-dark-muted font-light">
                <span>총 상품금액</span>
                <span>{subtotal.toLocaleString()}원</span>
              </div>
              <div className="flex justify-between text-brand-dark-muted font-light">
                <span>배송비</span>
                <span>{shippingFee === 0 ? "무료배송" : `${shippingFee.toLocaleString()}원`}</span>
              </div>
              {shippingFee > 0 && (
                <p className="text-[10px] text-brand-dark-muted/70 text-right">
                  (50,000원 이상 구매 시 무료배송)
                </p>
              )}
            </div>

            <div className="border-t border-brand-light-gray/80 pt-4 flex justify-between items-baseline">
              <span className="text-sm font-bold text-brand-dark">결제 예정금액</span>
              <span className="text-xl font-extrabold text-brand-accent">
                {total.toLocaleString()}원
              </span>
            </div>

            <button
              onClick={onCheckout}
              className="w-full bg-brand-primary hover:bg-brand-primary-hover text-brand-dark font-bold py-3.5 rounded-full text-center transition-all shadow-md hover:shadow-lg mt-2 focus:outline-none"
            >
              주문하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
