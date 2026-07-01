"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { HeroSlider } from "@/components/HeroSlider";
import { CategoryQuickLinks } from "@/components/CategoryQuickLinks";
import { ProductCatalog } from "@/components/ProductCatalog";
import { ProductDetailModal } from "@/components/ProductDetailModal";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { SuccessOverlay } from "@/components/SuccessOverlay";
import { KnittingLounge } from "@/components/KnittingLounge";
import { Footer } from "@/components/Footer";
import { Product, PRODUCTS } from "@/data/products";

interface CartItem {
  product: Product;
  color: string;
  quantity: number;
}

export default function Home() {
  // --- State Definitions ---
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // --- Modal & Drawer Open States ---
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

  // --- Checkout Success State ---
  const [checkoutSuccess, setCheckoutSuccess] = useState<{
    orderId: string;
    address: string;
    finalPrice: string;
  } | null>(null);

  // --- Hydration/Client Initialization ---
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("hanko_cart");
      const storedWishlist = localStorage.getItem("hanko_wishlist");
      if (storedCart) setCart(JSON.parse(storedCart));
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    } catch (e) {
      console.error("Failed to load state from localStorage:", e);
    }
  }, []);

  // --- Save states on change ---
  const saveCartToStorage = (updatedCart: CartItem[]) => {
    setCart(updatedCart);
    localStorage.setItem("hanko_cart", JSON.stringify(updatedCart));
  };

  const saveWishlistToStorage = (updatedWishlist: number[]) => {
    setWishlist(updatedWishlist);
    localStorage.setItem("hanko_wishlist", JSON.stringify(updatedWishlist));
  };

  // --- Toast Handler ---
  const showNotification = (message: string) => {
    setToastMessage(message);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => {
        setToastMessage(null);
      }, 2200);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // --- Cart Actions ---
  const handleAddToCart = (id: number, color: string, quantity: number = 1) => {
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;

    const existingIndex = cart.findIndex(
      (item) => item.product.id === id && item.color === color
    );

    let updatedCart = [...cart];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({ product, color, quantity });
    }

    saveCartToStorage(updatedCart);
    setIsCartOpen(true); // Auto-open cart drawer
    showNotification("장바구니에 정상적으로 추가되었습니다.");
  };

  const handleAdjustQty = (index: number, delta: number) => {
    let updatedCart = [...cart];
    updatedCart[index].quantity = Math.max(1, updatedCart[index].quantity + delta);
    saveCartToStorage(updatedCart);
  };

  const handleSetQty = (index: number, quantity: number) => {
    let updatedCart = [...cart];
    updatedCart[index].quantity = isNaN(quantity) || quantity < 1 ? 1 : quantity;
    saveCartToStorage(updatedCart);
  };

  const handleRemoveCartItem = (index: number) => {
    let updatedCart = [...cart];
    updatedCart.splice(index, 1);
    saveCartToStorage(updatedCart);
    showNotification("장바구니에서 상품이 삭제되었습니다.");
  };

  // --- Wishlist Actions ---
  const handleWishlistToggle = (id: number) => {
    let updatedWishlist = [...wishlist];
    const index = updatedWishlist.indexOf(id);

    if (index > -1) {
      updatedWishlist.splice(index, 1);
      showNotification("위시리스트에서 해제되었습니다.");
    } else {
      updatedWishlist.push(id);
      showNotification("위시리스트에 저장되었습니다. ♥");
    }

    saveWishlistToStorage(updatedWishlist);
  };

  // --- Detail Modal Actions ---
  const handleProductClick = (id: number) => {
    setSelectedProductId(id);
    setIsDetailOpen(true);
  };

  const handleBuyNow = (id: number, color: string, quantity: number) => {
    // Add to cart first
    const product = PRODUCTS.find((p) => p.id === id);
    if (!product) return;

    const existingIndex = cart.findIndex(
      (item) => item.product.id === id && item.color === color
    );

    let updatedCart = [...cart];
    if (existingIndex > -1) {
      updatedCart[existingIndex].quantity += quantity;
    } else {
      updatedCart.push({ product, color, quantity });
    }

    saveCartToStorage(updatedCart);
    setIsDetailOpen(false);

    // Open checkout modal after brief delay
    setTimeout(() => {
      setIsCheckoutOpen(true);
    }, 300);
  };

  // --- Checkout flow ---
  const handleOrderSuccess = (orderId: string, address: string, finalPrice: string) => {
    // Save order info to display in success ticket
    setCheckoutSuccess({ orderId, address, finalPrice });

    // Clear cart
    saveCartToStorage([]);
  };

  const activeProduct = PRODUCTS.find((p) => p.id === selectedProductId) || null;
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <Header
        cartCount={cartCount}
        wishlistCount={wishlist.length}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        onSearch={setSearchQuery}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Main Page Layout */}
      <main className="flex-grow">
        {/* Hero Slider */}
        <HeroSlider onCategorySelect={setActiveCategory} />

        {/* Category Quick Links */}
        <CategoryQuickLinks onCategorySelect={setActiveCategory} />

        {/* Catalog */}
        <ProductCatalog
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          searchQuery={searchQuery}
          onClearSearch={() => setSearchQuery("")}
          wishlist={wishlist}
          onWishlistToggle={handleWishlistToggle}
          onQuickAdd={handleAddToCart}
          onProductClick={handleProductClick}
        />

        {/* Community & About info */}
        <KnittingLounge />
      </main>

      {/* Footer */}
      <Footer />

      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-brand-dark text-white px-7 py-3 rounded-full text-sm font-semibold shadow-2xl z-55 animate-fade-in-up">
          {toastMessage}
        </div>
      )}

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={activeProduct}
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        isWishlisted={selectedProductId ? wishlist.includes(selectedProductId) : false}
        onWishlistToggle={handleWishlistToggle}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
      />

      {/* Cart Slide-out Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onAdjustQty={handleAdjustQty}
        onSetQty={handleSetQty}
        onRemoveItem={handleRemoveCartItem}
        onCheckout={() => {
          if (cart.length === 0) {
            showNotification("장바구니가 비어 있습니다. 주문하실 상품을 먼저 담아주세요!");
            return;
          }
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Shipping Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Success Order Confirmation Overlay */}
      <SuccessOverlay
        isOpen={!!checkoutSuccess}
        orderId={checkoutSuccess?.orderId || ""}
        finalPrice={checkoutSuccess?.finalPrice || ""}
        address={checkoutSuccess?.address || ""}
        onConfirm={() => setCheckoutSuccess(null)}
      />
    </div>
  );
}
