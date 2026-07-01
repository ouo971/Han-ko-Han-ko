"use client";

import React from "react";

interface CategoryQuickLinksProps {
  onCategorySelect: (category: string) => void;
}

export const CategoryQuickLinks: React.FC<CategoryQuickLinksProps> = ({
  onCategorySelect,
}) => {
  const categories = [
    { id: "cone", name: "콘사(Cone)", image: "/assets/cone_yarn.png" },
    { id: "ball", name: "볼실(Skein)", image: "/assets/ball_yarn.png" },
    { id: "kit", name: "DIY 키트", image: "/assets/diy_kit.png" },
    { id: "tools", name: "바늘/부자재", image: "/assets/tools.png" },
    { id: "patterns", name: "뜨개도안", image: "/assets/pattern_image.png" },
  ];

  const handleClick = (categoryId: string) => {
    onCategorySelect(categoryId);
    const shopSection = document.getElementById("shop-section");
    if (shopSection) {
      shopSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-white border-b border-brand-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 space-y-2">
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-brand-dark">
            무엇을 뜨고 싶으신가요?
          </h3>
          <p className="text-sm md:text-base text-brand-dark-muted font-light">
            원하는 카테고리로 빠르게 이동하여 필요한 재료를 찾아보세요.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:justify-center gap-6 md:gap-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleClick(cat.id)}
              className="flex flex-col items-center group focus:outline-none w-full md:w-36"
            >
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border border-brand-light-gray bg-brand-light shadow-sm group-hover:shadow-md transition-shadow flex items-center justify-center p-2 mb-3 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-108 transition-transform duration-300"
                />
              </div>
              <span className="text-sm sm:text-base font-semibold text-brand-dark group-hover:text-brand-primary transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
