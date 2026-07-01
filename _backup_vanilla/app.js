/**
 * 한코한코 (Han-ko Han-ko) - 쇼핑몰 애플리케이션 스크립트
 * Core Logic: Product Catalog DB, Filtering/Sorting/Search, Cart & Wishlist System, Interactive Modals, Simulated Checkout & Fireworks
 */

// ==========================================
// 1. Product Database (inspired by Goodsill & Sevy)
// =========const PRODUCTS = [
    {
        id: 1,
        name: "[굿실] 100% 프리미엄 램스울 콘사 - 오트밀 밀크 (1kg)",
        category: "cone",
        material: "Lambswool 100%",
        price: 38000,
        origPrice: 42000,
        discount: 10,
        image: "assets/cone_oatmeal.png",
        rating: 4.8,
        reviews: 142,
        isBest: true,
        isNew: false,
        isSale: true,
        colors: ["오트밀 밀크", "크림 아이보리"],
        info: "1984년부터 이어져 온 신뢰의 굿실 대표 램스울 콘사입니다. 가장 대중적인 6합 굵기로 제작되어 가디건, 풀오버 니트, 겨울 모자 등 의류와 소품 모두에 완벽하게 어울립니다. 콘 단위 포장으로 이음새 없는 깔끔한 작품을 완성할 수 있습니다.",
        weight: "약 1000g (실 안쪽 지관 무게 포함)",
        needles: "대바늘 3.5mm ~ 4.5mm / 코바늘 5/0호 ~ 6/0호",
        wash: "드라이클리닝 권장 / 울샴푸로 30도 이하 미지근한 물에 단독 손세탁"
    },
    {
        id: 2,
        name: "[굿실] 럭키콘사 피치 블렌드 - 피스타치오 (500g)",
        category: "cone",
        material: "Cotton 60% + Acrylic 40%",
        price: 22000,
        origPrice: 22000,
        discount: 0,
        image: "assets/cone_pistachio.png",
        rating: 4.6,
        reviews: 88,
        isBest: false,
        isNew: true,
        isSale: false,
        colors: ["피스타치오", "살구 핑크", "소프트 베이지"],
        info: "피부에 닿았을 때 자극 없이 촉촉하고 부드러운 코튼 블렌딩 콘사입니다. 꼬임이 균일하며 먼지 날림이나 보풀 발생이 최소화되어, 피부가 민감한 아기들이나 여름/간절기 웨어를 뜨기에 적합합니다.",
        weight: "약 500g",
        needles: "대바늘 3.0mm ~ 3.5mm / 코바늘 3/0호 ~ 4/0호",
        wash: "울샴푸 미지근한 물 세탁 / 그늘에 평평하게 뉘어서 건조"
    },
    {
        id: 3,
        name: "[굿실] 오가닉 멜란지 코튼 볼실 - 라벤더 포그 (5볼 세트)",
        category: "ball",
        material: "Organic Cotton 100%",
        price: 18000,
        origPrice: 20000,
        discount: 10,
        image: "assets/ball_lavender.png",
        rating: 4.9,
        reviews: 210,
        isBest: true,
        isNew: false,
        isSale: true,
        colors: ["라벤더 포그", "소프트 핑크"],
        info: "국제 유기농 인증(OCS)을 획득한 오가닉 코튼 100% 볼실 세트입니다. 은은하게 섞인 멜란지 컬러 톤이 내추럴한 멋을 선사합니다. 부드럽고 가벼우며 인형 옷이나 티코스터, 네트백, 아동용 덧신 등 다용도로 쓰기 좋습니다.",
        weight: "50g * 5개입 (총 250g)",
        needles: "대바늘 2.5mm ~ 3.0mm / 코바늘 4/0호 ~ 5/0호",
        wash: "세탁망에 넣어 울코스 단독 세탁 가능 / 건조기 사용 불가"
    },
    {
        id: 4,
        name: "[굿실] 오가닉 멜란지 코튼 볼실 - 민트 그린 (5볼 세트)",
        category: "ball",
        material: "Organic Cotton 100%",
        price: 18000,
        origPrice: 20000,
        discount: 10,
        image: "assets/ball_mint.png",
        rating: 4.7,
        reviews: 95,
        isBest: false,
        isNew: true,
        isSale: true,
        colors: ["민트 그린", "오가닉 크림"],
        info: "피부가 편안하게 숨 쉬는 내추럴 파스텔 민트 코튼 실입니다. 꼬임이 조밀하여 코 가닥이 풀리지 않고 손뜨개 인형이나 아동용 조끼를 뜨기에 아주 매력적인 실 세트입니다.",
        weight: "50g * 5개입 (총 250g)",
        needles: "대바늘 2.5mm ~ 3.0mm / 코바늘 4/0호 ~ 5/0호",
        wash: "중성세제 울코스 세탁망 사용 권장"
    },
    {
        id: 5,
        name: "[한코키트] 자도르 아란 스웨터 DIY 패키지",
        category: "kit",
        material: "Kit (Yarn + Pattern + Guide Video)",
        price: 62000,
        origPrice: 68000,
        discount: 8,
        image: "assets/diy_kit.png",
        rating: 4.9,
        reviews: 312,
        isBest: true,
        isNew: false,
        isSale: true,
        colors: ["크림 아이보리", "오트밀 샌드", "포레스트 올리브"],
        info: "클래식하고 도톰한 꽈배기 무늬가 돋보이는 웰메이드 아란 스웨터 패키지입니다. 굿실의 램스울 합사실 800g과 함께, 왕초보도 따라 할 수 있는 서술형 도안책, 그리고 각 파트별 튜토리얼 QR 영상 링크가 수록되어 성취감 높은 뜨개를 경험할 수 있습니다.",
        weight: "구성: 울사 800g + 종이 도안 + 가이드 영상 QR",
        needles: "대바늘 4.5mm & 5.0mm (바늘 및 꽈배기 바늘은 별도 구매)",
        wash: "편물 완성 후 첫 세탁은 드라이클리닝을 강력히 권장합니다."
    },
    {
        id: 6,
        name: "[한코키트] 그래니 스퀘어 숄더백 코바늘 패키지",
        category: "kit",
        material: "Kit (Yarn + Pattern + Guide Video)",
        price: 29000,
        origPrice: 29000,
        discount: 0,
        image: "assets/diy_kit.png",
        rating: 4.8,
        reviews: 185,
        isBest: false,
        isNew: true,
        isSale: false,
        colors: ["믹스 카라멜 (베이지 톤)", "믹스 포레스트 (그린 톤)", "믹스 베리 (핑크 톤)"],
        info: "코바늘 기초 코스티치로 가볍게 시작하는 감성 네트로 숄더백입니다. 모티브를 여러 장 연결하여 가방 형태를 잡아나가는 구조로 코바늘 기법을 쉽고 재미있게 배우기 적합합니다. 친절한 전체 제작 영상 풀버전이 제공됩니다.",
        weight: "구성: 코튼혼방실 4볼 + 인조 가죽 라벨 + 종이 도안 + 풀동영상 강의",
        needles: "모사용 코바늘 6/0호 (별도 구매)",
        wash: "중성세제로 오염 부위만 부분 조심 손세탁"
    },
    {
        id: 7,
        name: "[바늘] 니트프로 심포니 우드 조립식 대바늘 세트",
        category: "tools",
        material: "Birch Wood",
        price: 92000,
        origPrice: 110000,
        discount: 16,
        image: "assets/tools.png",
        rating: 5.0,
        reviews: 420,
        isBest: true,
        isNew: false,
        isSale: true,
        colors: ["심포니 우드 패키지"],
        info: "세계적인 뜨개 명가 니트프로(KnitPro)의 조립식 목바늘 플래그십 세트입니다. 특유의 다채로운 적층 자작나무 결이 고급스럽고, 실의 미끄러짐이 적당하여 초보자도 코를 빠뜨리지 않고 부드럽게 뜰 수 있습니다. 줄 꼬임 방지 스위블 케이블이 포함되어 있습니다.",
        weight: "구성: 바늘 팁 8쌍 (3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 7.0, 8.0mm), 케이블 4개, 스토퍼 8개, 조임키 4개, 투명 파우치",
        needles: "3.5mm ~ 8.0mm 조립형",
        wash: "수분에 약하므로 젖은 천이나 침수 보관을 피하고 전용 오일로 닦아 관리"
    },
    {
        id: 8,
        name: "[부자재] 골드 클래식 쪽가위 & 수제 스티치 마커 세트",
        category: "tools",
        material: "Brass / Acrylic",
        price: 12000,
        origPrice: 12000,
        discount: 0,
        image: "assets/tools.png",
        rating: 4.5,
        reviews: 92,
        isBest: false,
        isNew: true,
        isSale: false,
        colors: ["골드 클래식"],
        info: "엔틱하고 우아한 골드 황동 가위와 손으로 직접 조립한 아기자기한 컬러 스티치 단수링(스티치 마커) 10종이 감성적인 미니 알루미늄 틴케이스에 들어 있는 세트입니다. 뜨개질하는 자리를 환하게 만들어주는 필수 악세사리입니다.",
        weight: "쪽가위 1개, 단수링 10개, 알루미늄 틴케이스 1개",
        needles: "단수링 내경: 대바늘 6.0mm까지 사용 가능",
        wash: "가위 날 부분 윤활유 관리 권장"
    },
    {
        id: 9,
        name: "[도안] 베를린 리브 스카프 서술형 PDF 도안",
        category: "patterns",
        material: "Digital PDF Pattern",
        price: 6000,
        origPrice: 6000,
        discount: 0,
        image: "assets/pattern_image.png",
        rating: 4.9,
        reviews: 298,
        isBest: true,
        isNew: false,
        isSale: false,
        colors: ["이메일 전송 (PDF)"],
        info: "가을, 겨울 아우터 안에 슬림하고 멋스럽게 연출하는 세련된 스카프 도안입니다. 코줄임과 코늘림의 경사가 매끄럽게 흐르는 완성도 높은 짜임입니다. 입문자도 차분히 완성할 수 있도록 약식 동영상 클립 팁 링크가 포함되어 있습니다.",
        weight: "디지털 다운로드 파일 (PDF 5페이지 분량)",
        needles: "대바늘 3.5mm (줄바늘 또는 장갑바늘)",
        wash: "무형물 콘텐츠 특성상 메일 발송 후에는 환불이 불가합니다."
    },
    {
        id: 10,
        name: "[도안] 오슬로 꼬임 케이블 카디건 PDF 도안",
        category: "patterns",
        material: "Digital PDF Pattern",
        price: 9000,
        origPrice: 10000,
        discount: 10,
        image: "assets/pattern_image.png",
        rating: 4.8,
        reviews: 74,
        isBest: false,
        isNew: true,
        isSale: true,
        colors: ["이메일 전송 (PDF)"],
        info: "탑다운(목 둘레부터 아래로 뜨는 방식) 기법으로 내려뜨는 내추럴 핏 꽈배기 카디건 도안입니다. 몸판 중간과 소매 라인에 굵은 케이블이 들어가 여리여리한 실루엣을 자아냅니다. 서술형 가이드와 상세 제도 도안이 수록되어 있습니다.",
        weight: "디지털 다운로드 파일 (PDF 12페이지 분량)",
        needles: "대바늘 4.5mm (고무단용), 5.0mm (몸판 메인용)",
        wash: "무형물 콘텐츠 특성상 메일 발송 후에는 환불이 불가합니다."
    },
    {
        id: 11,
        name: "[굿실] 프리미엄 울 콘사 - 더스티 로즈 (1kg)",
        category: "cone",
        material: "Lambswool 80% + Nylon 20%",
        price: 34000,
        origPrice: 38000,
        discount: 10,
        image: "assets/cone_dustyrose.png",
        rating: 4.8,
        reviews: 62,
        isBest: false,
        isNew: true,
        isSale: true,
        colors: ["더스티 로즈"],
        info: "우아하고 로맨틱한 인디 핑크 빛의 더스티 로즈 램스울 콘사입니다. 기모감이 부드럽게 올라와 매우 따뜻하며, 겨울용 머플러, 배색 장갑, 오버핏 스웨터 등을 뜨기에 좋습니다. 지관을 감싸는 실 용량이 넉넉하여 대작 스웨터도 거뜬히 완성합니다.",
        weight: "약 1000g (실 안쪽 지관 무게 포함)",
        needles: "대바늘 4.0mm ~ 5.0mm",
        wash: "울샴푸 미지근한 물에 가벼운 단독 세탁"
    },
    {
        id: 12,
        name: "[굿실] 퐁퐁 소프트 키드 모헤어 (25g)",
        category: "ball",
        material: "Kid Mohair 70% + Silk 30%",
        price: 9500,
        origPrice: 9500,
        discount: 0,
        image: "assets/ball_yarn.png",
        rating: 4.7,
        reviews: 54,
        isBest: false,
        isNew: true,
        isSale: false,
        colors: ["클라우드 화이트", "파우더 핑크", "안개 그레이"],
        info: "이탈리아산 천연 키드 모헤어실입니다. 깃털처럼 보드라운 감촉과 풍성한 실크 광택을 지니고 있어 얇은 단독 비침 편물 제작에 최적입니다.",
        weight: "25g",
        needles: "대바늘 3.0mm ~ 5.0mm",
        wash: "드라이클리닝 필수"
    },
    {
        id: 13,
        name: "[굿실] 캐시미어 블렌딩 모헤어 콘사 (500g)",
        category: "cone",
        material: "Cashmere 20% + Kid Mohair 40% + Wool 40%",
        price: 49000,
        origPrice: 49000,
        discount: 0,
        image: "assets/cone_yarn.png",
        rating: 4.9,
        reviews: 104,
        isBest: true,
        isNew: true,
        isSale: false,
        colors: ["안개 그레이", "크림 오트밀"],
        info: "캐시미어와 천연 키드 모헤어가 믹스된 한코한코 단독 프리미엄 콘사 라인업입니다. 하이엔드 방적공법을 거쳐 털 날림을 잡아내고 몽환적인 질감만을 극대화했습니다. 피부 자극이 거의 없어 바로 맨살에 닿는 니트로 뜰 수 있습니다.",
        weight: "약 500g",
        needles: "대바늘 3.0mm ~ 4.0mm",
        wash: "중성세제 미지근한 물 세탁 / 평평하게 뉘어서 건조"
    },
    {
        id: 14,
        name: "[굿실] 에어 메리노 울 콘사 - 바닐라 크림 (700g)",
        category: "cone",
        material: "Extra Fine Merino Wool 100%",
        price: 42000,
        origPrice: 47000,
        discount: 10,
        image: "assets/cone_oatmeal.png",
        rating: 4.9,
        reviews: 39,
        isBest: false,
        isNew: true,
        isSale: true,
        colors: ["바닐라 크림"],
        info: "공기층을 지닌 메리노 울 100% 특수 제작 콘사입니다. 극강의 푹신함과 가벼움을 자랑하며, 탄력성이 뛰어나 편물이 쉽게 늘어지거나 변형되지 않고 오래 유지됩니다.",
        weight: "약 700g",
        needles: "대바늘 4.5mm ~ 5.5mm",
        wash: "울샴푸 단독 손세탁"
    }
];��다. 줄 꼬임 방지 스위블 케이블이 포함되어 있습니다.",
        weight: "구성: 바늘 팁 8쌍 (3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 7.0, 8.0mm), 케이블 4개, 스토퍼 8개, 조임키 4개, 투명 파우치",
        needles: "3.5mm ~ 8.0mm 조립형",
        wash: "수분에 약하므로 젖은 천이나 침수 보관을 피하고 전용 오일로 닦아 관리"
    },
    {
        id: 8,
        name: "[부자재] 골드 클래식 쪽가위 & 수제 스티치 마커 세트",
        category: "tools",
        material: "Brass / Acrylic",
        price: 12000,
        origPrice: 12000,
        discount: 0,
        image: "assets/tools.png",
        rating: 4.5,
        reviews: 92,
        isBest: false,
        isNew: true,
        isSale: false,
        colors: ["골드 클래식"],
        info: "엔틱하고 우아한 골드 황동 가위와 손으로 직접 조립한 아기자기한 컬러 스티치 단수링(스티치 마커) 10종이 감성적인 미니 알루미늄 틴케이스에 들어 있는 세트입니다. 뜨개질하는 자리를 환하게 만들어주는 필수 악세사리입니다.",
        weight: "쪽가위 1개, 단수링 10개, 알루미늄 틴케이스 1개",
        needles: "단수링 내경: 대바늘 6.0mm까지 사용 가능",
        wash: "가위 날 부분 윤활유 관리 권장"
    },
    {
        id: 9,
        name: "[도안] 베를린 리브 스카프 서술형 PDF 도안",
        category: "patterns",
        material: "Digital PDF Pattern",
        price: 6000,
        origPrice: 6000,
        discount: 0,
        image: "assets/pattern_image.png",
        rating: 4.9,
        reviews: 298,
        isBest: true,
        isNew: false,
        isSale: false,
        colors: ["이메일 전송 (PDF)"],
        info: "가을, 겨울 아우터 안에 슬림하고 멋스럽게 연출하는 세련된 스카프 도안입니다. 코줄임과 코늘림의 경사가 매끄럽게 흐르는 완성도 높은 짜임입니다. 입문자도 차분히 완성할 수 있도록 약식 동영상 클립 팁 링크가 포함되어 있습니다.",
        weight: "디지털 다운로드 파일 (PDF 5페이지 분량)",
        needles: "대바늘 3.5mm (줄바늘 또는 장갑바늘)",
        wash: "무형물 콘텐츠 특성상 메일 발송 후에는 환불이 불가합니다."
    },
    {
        id: 10,
        name: "[도안] 오슬로 꼬임 케이블 카디건 PDF 도안",
        category: "patterns",
        material: "Digital PDF Pattern",
        price: 9000,
        origPrice: 10000,
        discount: 10,
        image: "assets/pattern_image.png",
        rating: 4.8,
        reviews: 74,
        isBest: false,
        isNew: true,
        isSale: true,
        colors: ["이메일 전송 (PDF)"],
        info: "탑다운(목 둘레부터 아래로 뜨는 방식) 기법으로 내려뜨는 내추럴 핏 꽈배기 카디건 도안입니다. 몸판 중간과 소매 라인에 굵은 케이블이 들어가 여리여리한 실루엣을 자아냅니다. 서술형 가이드와 상세 제도 도안이 수록되어 있습니다.",
        weight: "디지털 다운로드 파일 (PDF 12페이지 분량)",
        needles: "대바늘 4.5mm (고무단용), 5.0mm (몸판 메인용)",
        wash: "무형물 콘텐츠 특성상 메일 발송 후에는 환불이 불가합니다."
    }
];

// ==========================================
// 2. Application State
// ==========================================
let cart = JSON.parse(localStorage.getItem("hanko_cart")) || [];
let wishlist = JSON.parse(localStorage.getItem("hanko_wishlist")) || [];
let activeCategory = "all";
let activeSort = "recommend";
let searchQuery = "";
let currentHeroSlide = 0;
let slideInterval;

// ==========================================
// 3. DOM Elements
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    // Nav & Filters
    const navLinks = document.querySelectorAll(".nav-link");
    const filterTabs = document.querySelectorAll(".filter-tab");
    const quickCards = document.querySelectorAll(".quick-card");
    const sortSelect = document.getElementById("sort-select");
    
    // Search
    const searchInput = document.getElementById("search-input");
    const searchBtn = document.getElementById("search-btn");
    const searchStatusBar = document.getElementById("search-status-bar");
    const searchQueryText = document.getElementById("search-query-text");
    const searchResultsCount = document.getElementById("search-results-count");
    const clearSearchBtn = document.getElementById("clear-search-btn");

    // Grid Container
    const productGrid = document.getElementById("product-grid");

    // Cart Drawer Elements
    const cartTrigger = document.getElementById("cart-trigger");
    const closeCart = document.getElementById("close-cart");
    const cartDrawer = document.getElementById("cart-drawer");
    const modalBackdrop = document.getElementById("modal-backdrop");
    const cartItemsContainer = document.getElementById("cart-items-container");
    const cartCountBadge = document.getElementById("cart-count");
    const cartSubtotal = document.getElementById("cart-subtotal");
    const cartShipping = document.getElementById("cart-shipping");
    const cartTotal = document.getElementById("cart-total");
    
    // Wishlist Element
    const wishlistCountBadge = document.getElementById("wishlist-count");

    // Modal Details Elements
    const productDetailModal = document.getElementById("product-detail-modal");
    const closeDetailModal = document.getElementById("close-detail-modal");
    const modalContentContainer = document.getElementById("modal-content-container");

    // Checkout Elements
    const checkoutModal = document.getElementById("checkout-modal");
    const closeCheckoutModal = document.getElementById("close-checkout-modal");
    const checkoutTrigger = document.getElementById("checkout-trigger");
    const checkoutForm = document.getElementById("checkout-form");
    const checkoutTotalItems = document.getElementById("checkout-total-items");
    const checkoutShippingPrice = document.getElementById("checkout-shipping-price");
    const checkoutFinalPrice = document.getElementById("checkout-final-price");
    const btnFinalPrice = document.getElementById("btn-final-price");

    // Success Overlay Elements
    const successOverlay = document.getElementById("success-overlay");
    const successConfirmBtn = document.getElementById("success-confirm-btn");
    const successOrderId = document.getElementById("success-order-id");
    const successOrderPrice = document.getElementById("success-order-price");
    const successOrderAddress = document.getElementById("success-order-address");

    // Hero Slider Elements
    const slides = document.querySelectorAll(".slide");
    const dots = document.querySelectorAll(".dot");
    const prevSlideBtn = document.querySelector(".prev-slide");
    const nextSlideBtn = document.querySelector(".next-slide");
    const goToConeBtn = document.getElementById("go-to-cone-btn");

    // ==========================================
    // 4. Hero Slider Logic
    // ==========================================
    const showSlide = (index) => {
        slides.forEach(slide => slide.classList.remove("active"));
        dots.forEach(dot => dot.classList.remove("active"));
        
        currentHeroSlide = (index + slides.length) % slides.length;
        slides[currentHeroSlide].classList.add("active");
        dots[currentHeroSlide].classList.add("active");
    };

    const nextSlide = () => showSlide(currentHeroSlide + 1);
    const prevSlide = () => showSlide(currentHeroSlide - 1);

    const startSlideShow = () => {
        clearInterval(slideInterval);
        slideInterval = setInterval(nextSlide, 5000);
    };

    if (prevSlideBtn && nextSlideBtn) {
        prevSlideBtn.addEventListener("click", () => {
            prevSlide();
            startSlideShow();
        });
        nextSlideBtn.addEventListener("click", () => {
            nextSlide();
            startSlideShow();
        });
    }

    dots.forEach(dot => {
        dot.addEventListener("click", (e) => {
            const idx = parseInt(e.target.dataset.index);
            showSlide(idx);
            startSlideShow();
        });
    });

    startSlideShow();

    if (goToConeBtn) {
        goToConeBtn.addEventListener("click", (e) => {
            e.preventDefault();
            activeCategory = "cone";
            syncActiveFilters();
            renderProducts();
            document.getElementById("shop-section").scrollIntoView({ behavior: "smooth" });
        });
    }

    // ==========================================
    // 5. Filtering, Sorting, Search Logic
    // ==========================================
    const syncActiveFilters = () => {
        // Main Nav Links
        navLinks.forEach(link => {
            if (link.dataset.category === activeCategory) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });

        // Filter Tabs in Catalog
        filterTabs.forEach(tab => {
            if (tab.dataset.filter === activeCategory) {
                tab.classList.add("active");
            } else {
                tab.classList.remove("active");
            }
        });
    };

    const handleCategoryClick = (category) => {
        activeCategory = category;
        syncActiveFilters();
        renderProducts();
    };

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const cat = e.target.dataset.category;
            handleCategoryClick(cat);
            document.getElementById("shop-section").scrollIntoView({ behavior: "smooth" });
        });
    });

    filterTabs.forEach(tab => {
        tab.addEventListener("click", (e) => {
            const filter = e.target.dataset.filter;
            handleCategoryClick(filter);
        });
    });

    quickCards.forEach(card => {
        card.addEventListener("click", () => {
            const cat = card.dataset.category;
            handleCategoryClick(cat);
            document.getElementById("shop-section").scrollIntoView({ behavior: "smooth" });
        });
    });

    // Sorting
    sortSelect.addEventListener("change", (e) => {
        activeSort = e.target.value;
        renderProducts();
    });

    // Search Trigger
    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            searchQuery = query;
            searchQueryText.textContent = `"${query}"`;
            searchStatusBar.classList.remove("hide");
            activeCategory = "all";
            syncActiveFilters();
            renderProducts();
            document.getElementById("shop-section").scrollIntoView({ behavior: "smooth" });
        }
    };

    searchBtn.addEventListener("click", performSearch);
    searchInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            performSearch();
        }
    });

    clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        searchStatusBar.classList.add("hide");
        renderProducts();
    });

    // ==========================================
    // 6. Product Render Logic
    // ==========================================
    const renderProducts = () => {
        productGrid.innerHTML = `
            <div class="loading-spinner">
                <i class="fa-solid fa-circle-notch fa-spin"></i> 상품을 정성껏 진열하고 있습니다...
            </div>
        `;

        setTimeout(() => {
            // Filter
            let filteredList = PRODUCTS.filter(prod => {
                const matchesCat = activeCategory === "all" || prod.category === activeCategory;
                const matchesSearch = searchQuery === "" || 
                    prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    prod.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    prod.info.toLowerCase().includes(searchQuery.toLowerCase());
                return matchesCat && matchesSearch;
            });

            // Update search count if searching
            if (searchQuery !== "") {
                searchResultsCount.textContent = filteredList.length;
            }

            // Sort
            if (activeSort === "new") {
                // sort by New (isNew first)
                filteredList.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
            } else if (activeSort === "low-price") {
                filteredList.sort((a, b) => a.price - b.price);
            } else if (activeSort === "high-price") {
                filteredList.sort((a, b) => b.price - a.price);
            } else if (activeSort === "popular") {
                filteredList.sort((a, b) => b.reviews - a.reviews);
            } else {
                // Recommend (isBest first, then rating)
                filteredList.sort((a, b) => {
                    if (a.isBest !== b.isBest) {
                        return (b.isBest ? 1 : 0) - (a.isBest ? 1 : 0);
                    }
                    return b.rating - a.rating;
                });
            }

            if (filteredList.length === 0) {
                productGrid.innerHTML = `
                    <div class="loading-spinner" style="grid-column: 1/-1; color: var(--dark-muted)">
                        <i class="fa-solid fa-face-sad-tear" style="font-size: 3rem; margin-bottom: 10px;"></i>
                        <p style="font-size: 1.1rem; font-weight:600;">찾으시는 상품이 현재 한코한코 매장에 없습니다.</p>
                        <p style="font-size: 0.9rem;">다른 검색어로 검색하시거나 카테고리 필터를 이용해 보세요.</p>
                    </div>
                `;
                return;
            }

            productGrid.innerHTML = "";

            filteredList.forEach((prod, index) => {
                const isWished = wishlist.includes(prod.id);
                const discountMarkup = prod.discount > 0 ? `<span class="discount-rate">${prod.discount}%</span>` : "";
                const originalPriceMarkup = prod.discount > 0 ? `<span class="orig-price">${prod.origPrice.toLocaleString()}원</span>` : "";
                
                // Card Badges
                let badgeMarkup = "";
                if (prod.discount > 0) {
                    badgeMarkup = `<span class="card-badge sale">${prod.discount}% SALE</span>`;
                } else if (prod.isBest) {
                    badgeMarkup = `<span class="card-badge best">BEST</span>`;
                } else if (prod.isNew) {
                    badgeMarkup = `<span class="card-badge new">NEW</span>`;
                }

                // Render Item
                const card = document.createElement("div");
                card.className = "product-card";
                card.style.animation = `fadeInUp 0.5s ease-out forwards ${index * 0.05}s`;
                card.style.opacity = 0; // for stagger entry
                
                card.innerHTML = `
                    ${badgeMarkup}
                    <button class="wish-card-btn ${isWished ? 'active' : ''}" data-id="${prod.id}" title="위시리스트 추가">
                        <i class="${isWished ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                    <div class="product-image-wrap">
                        <img src="${prod.image}" alt="${prod.name}" loading="lazy">
                        <button class="quick-add-btn" data-id="${prod.id}">
                            <i class="fa-solid fa-cart-plus"></i> 빠른 장바구니 담기
                        </button>
                    </div>
                    <div class="product-info">
                        <span class="product-material">${prod.material}</span>
                        <h4 class="product-name" data-id="${prod.id}">${prod.name}</h4>
                        <div class="product-rating">
                            <i class="fa-solid fa-star"></i>
                            <strong>${prod.rating}</strong>
                            <span>(${prod.reviews})</span>
                        </div>
                        <div class="product-price-row">
                            ${discountMarkup}
                            ${originalPriceMarkup}
                            <span class="sell-price">${prod.price.toLocaleString()}원</span>
                        </div>
                    </div>
                `;

                // Add detail modal triggers
                card.querySelector(".product-image-wrap img").addEventListener("click", () => openDetail(prod.id));
                card.querySelector(".product-name").addEventListener("click", () => openDetail(prod.id));

                // Add wishlist event
                card.querySelector(".wish-card-btn").addEventListener("click", (e) => {
                    e.stopPropagation();
                    toggleWishlist(prod.id, e.currentTarget);
                });

                // Quick Add to Cart
                card.querySelector(".quick-add-btn").addEventListener("click", (e) => {
                    e.stopPropagation();
                    addToCart(prod.id, prod.colors[0], 1);
                });

                productGrid.appendChild(card);
            });
        }, 300);
    };

    // ==========================================
    // 7. Wishlist System
    // ==========================================
    const toggleWishlist = (id, buttonEl) => {
        const index = wishlist.indexOf(id);
        if (index > -1) {
            wishlist.splice(index, 1);
            if (buttonEl) {
                buttonEl.classList.remove("active");
                const icon = buttonEl.querySelector("i");
                icon.className = "fa-regular fa-heart";
            }
            showNotification("위시리스트에서 해제되었습니다.");
        } else {
            wishlist.push(id);
            if (buttonEl) {
                buttonEl.classList.add("active");
                const icon = buttonEl.querySelector("i");
                icon.className = "fa-solid fa-heart";
            }
            showNotification("위시리스트에 저장되었습니다. ♥");
        }
        localStorage.setItem("hanko_wishlist", JSON.stringify(wishlist));
        updateWishlistCount();
    };

    const updateWishlistCount = () => {
        wishlistCountBadge.textContent = wishlist.length;
        if (wishlist.length > 0) {
            wishlistCountBadge.style.display = "flex";
        } else {
            wishlistCountBadge.style.display = "none";
        }
    };

    // Simple toast notification helper
    const showNotification = (message) => {
        const toast = document.createElement("div");
        toast.style.cssText = `
            position: fixed;
            bottom: 30px;
            left: 50%;
            transform: translateX(-50%) translateY(20px);
            background-color: var(--dark);
            color: #FFFFFF;
            padding: 12px 28px;
            border-radius: 30px;
            font-size: 0.9rem;
            font-weight: 500;
            z-index: 300;
            box-shadow: var(--shadow-lg);
            opacity: 0;
            transition: all 0.3s ease;
        `;
        toast.textContent = message;
        document.body.appendChild(toast);
        
        // Force reflow
        toast.offsetHeight;
        
        toast.style.transform = "translateX(-50%) translateY(0)";
        toast.style.opacity = "0.95";

        setTimeout(() => {
            toast.style.transform = "translateX(-50%) translateY(20px)";
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 300);
        }, 2200);
    };

    // ==========================================
    // 8. Cart System & Drawer Logic
    // ==========================================
    const openCartDrawer = () => {
        cartDrawer.classList.add("active");
        modalBackdrop.classList.add("active");
    };

    const closeCartDrawer = () => {
        cartDrawer.classList.remove("active");
        modalBackdrop.classList.remove("active");
    };

    cartTrigger.addEventListener("click", openCartDrawer);
    closeCart.addEventListener("click", closeCartDrawer);
    modalBackdrop.addEventListener("click", () => {
        closeCartDrawer();
        closeDetailModalFunc();
        closeCheckoutModalFunc();
    });

    const addToCart = (id, color, quantity) => {
        const product = PRODUCTS.find(p => p.id === id);
        if (!product) return;

        // Check if item with same option already exists
        const existingItem = cart.find(item => item.product.id === id && item.color === color);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({
                product,
                color,
                quantity
            });
        }

        localStorage.setItem("hanko_cart", JSON.stringify(cart));
        updateCartUI();
        openCartDrawer();
        showNotification("장바구니에 정상적으로 추가되었습니다.");
    };

    const updateCartUI = () => {
        // Update badge count
        const totalQty = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountBadge.textContent = totalQty;
        if (totalQty > 0) {
            cartCountBadge.style.display = "flex";
        } else {
            cartCountBadge.style.display = "none";
        }

        // Draw items
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="empty-cart-message">
                    <i class="fa-solid fa-basket-shopping"></i>
                    <p>장바구니가 비어 있습니다.<br>예쁜 실과 패키지를 가득 담아보세요!</p>
                    <button class="btn btn-secondary close-drawer-btn" style="padding:10px 20px; font-size:0.9rem;">쇼핑 계속하기</button>
                </div>
            `;
            // Add handler for click inside empty cart button
            const closeBtn = cartItemsContainer.querySelector(".close-drawer-btn");
            if (closeBtn) closeBtn.addEventListener("click", closeCartDrawer);

            // Hide Footer calculations
            document.getElementById("cart-drawer-footer").style.display = "none";
            return;
        }

        document.getElementById("cart-drawer-footer").style.display = "block";
        cartItemsContainer.innerHTML = "";

        let subtotal = 0;

        cart.forEach((item, index) => {
            const itemCost = item.product.price * item.quantity;
            subtotal += itemCost;

            const cartItemHTML = document.createElement("div");
            cartItemHTML.className = "cart-item";
            cartItemHTML.innerHTML = `
                <div class="cart-item-image">
                    <img src="${item.product.image}" alt="${item.product.name}">
                </div>
                <div class="cart-item-details">
                    <h5 class="cart-item-name">${item.product.name}</h5>
                    <span class="cart-item-option">옵션: ${item.color}</span>
                    <div class="cart-item-actions">
                        <div class="quantity-adjuster">
                            <button type="button" class="btn-qty-minus" data-index="${index}"><i class="fa-solid fa-minus"></i></button>
                            <input type="number" class="qty-input" data-index="${index}" value="${item.quantity}" min="1">
                            <button type="button" class="btn-qty-plus" data-index="${index}"><i class="fa-solid fa-plus"></i></button>
                        </div>
                        <span class="cart-item-price">${itemCost.toLocaleString()}원</span>
                    </div>
                </div>
                <button class="remove-cart-item" data-index="${index}" title="상품 삭제"><i class="fa-solid fa-trash-can"></i></button>
            `;

            // Wire up actions
            cartItemHTML.querySelector(".btn-qty-minus").addEventListener("click", () => adjustQty(index, -1));
            cartItemHTML.querySelector(".btn-qty-plus").addEventListener("click", () => adjustQty(index, 1));
            cartItemHTML.querySelector(".qty-input").addEventListener("change", (e) => setQty(index, parseInt(e.target.value)));
            cartItemHTML.querySelector(".remove-cart-item").addEventListener("click", () => removeCartItem(index));

            cartItemsContainer.appendChild(cartItemHTML);
        });

        // Totals
        const shippingFee = subtotal >= 50000 || subtotal === 0 ? 0 : 3000;
        const totalVal = subtotal + shippingFee;

        cartSubtotal.textContent = `${subtotal.toLocaleString()}원`;
        cartShipping.textContent = shippingFee === 0 ? "무료배송" : `${shippingFee.toLocaleString()}원`;
        cartTotal.textContent = `${totalVal.toLocaleString()}원`;

        // Sync checkout summary text if checkout modal is opened
        checkoutTotalItems.textContent = `${totalQty}개`;
        checkoutShippingPrice.textContent = shippingFee === 0 ? "무료" : `${shippingFee.toLocaleString()}원`;
        checkoutFinalPrice.textContent = `${totalVal.toLocaleString()}원`;
        btnFinalPrice.textContent = `${totalVal.toLocaleString()}원`;
    };

    const adjustQty = (index, delta) => {
        cart[index].quantity = Math.max(1, cart[index].quantity + delta);
        localStorage.setItem("hanko_cart", JSON.stringify(cart));
        updateCartUI();
    };

    const setQty = (index, value) => {
        if (isNaN(value) || value < 1) value = 1;
        cart[index].quantity = value;
        localStorage.setItem("hanko_cart", JSON.stringify(cart));
        updateCartUI();
    };

    const removeCartItem = (index) => {
        cart.splice(index, 1);
        localStorage.setItem("hanko_cart", JSON.stringify(cart));
        updateCartUI();
        showNotification("장바구니에서 상품이 삭제되었습니다.");
    };

    // ==========================================
    // 9. Product Details Modal Logic
    // ==========================================
    const openDetail = (id) => {
        const prod = PRODUCTS.find(p => p.id === id);
        if (!prod) return;

        const isWished = wishlist.includes(prod.id);
        const discountMarkup = prod.discount > 0 ? `<span class="discount-rate" style="font-size: 1.4rem;">${prod.discount}%</span>` : "";
        const originalPriceMarkup = prod.discount > 0 ? `<span class="orig-price" style="font-size: 1rem; margin-right: 8px;">${prod.origPrice.toLocaleString()}원</span>` : "";

        // Build Color Chips
        let colorChipsHTML = "";
        prod.colors.forEach((color, idx) => {
            colorChipsHTML += `
                <button type="button" class="color-chip ${idx === 0 ? 'active' : ''}" data-color="${color}">${color}</button>
            `;
        });

        modalContentContainer.innerHTML = `
            <!-- Left: Gallery -->
            <div class="modal-gallery-wrap">
                <div class="main-preview-img">
                    <img id="modal-main-img" src="${prod.image}" alt="${prod.name}">
                </div>
                <div class="gallery-thumbnails">
                    <div class="thumb active"><img src="${prod.image}" alt="썸네일 1"></div>
                    <div class="thumb"><img src="assets/pattern_image.png" alt="썸네일 2 (가이드)"></div>
                </div>
            </div>

            <!-- Right: Info -->
            <div class="modal-info-wrap">
                <span class="modal-category">${prod.material}</span>
                <div class="modal-title">
                    <h3>${prod.name}</h3>
                </div>
                
                <div class="product-rating" style="margin-bottom:18px;">
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <i class="fa-solid fa-star"></i>
                    <strong style="margin-left: 6px;">${prod.rating}</strong>
                    <span>(${prod.reviews}개의 후기)</span>
                </div>

                <div class="modal-price-box">
                    ${originalPriceMarkup}
                    <span class="sell-price" style="font-size: 1.6rem; color: var(--dark);">${prod.price.toLocaleString()}원</span>
                    ${discountMarkup}
                </div>

                <div class="modal-desc-list">
                    <div class="desc-item">
                        <span class="desc-label">성분/혼용률</span>
                        <span class="desc-val">${prod.material}</span>
                    </div>
                    <div class="desc-item">
                        <span class="desc-label">중량/길이</span>
                        <span class="desc-val">${prod.weight}</span>
                    </div>
                    <div class="desc-item">
                        <span class="desc-label">추천 바늘</span>
                        <span class="desc-val">${prod.needles}</span>
                    </div>
                </div>

                <!-- Color Select Option -->
                <div class="option-selector-group">
                    <span class="option-title">실 색상 선택</span>
                    <div class="color-chips" id="modal-color-chips">
                        ${colorChipsHTML}
                    </div>
                </div>

                <!-- Qty Adjuster inside Modal -->
                <div class="option-selector-group" style="display:flex; align-items:center; gap: 20px; margin-top: 10px;">
                    <span class="option-title" style="margin-bottom:0;">수량 선택</span>
                    <div class="quantity-adjuster">
                        <button type="button" id="modal-qty-minus"><i class="fa-solid fa-minus"></i></button>
                        <input type="number" id="modal-qty-input" value="1" min="1">
                        <button type="button" id="modal-qty-plus"><i class="fa-solid fa-plus"></i></button>
                    </div>
                </div>

                <!-- Actions -->
                <div class="modal-actions">
                    <button class="btn btn-secondary" id="modal-add-cart"><i class="fa-solid fa-basket-shopping"></i> 장바구니 담기</button>
                    <button class="btn btn-primary" id="modal-buy-now">바로 구매하기</button>
                    <button class="btn-wish ${isWished ? 'active' : ''}" id="modal-wish-btn" title="위시리스트 저장">
                        <i class="${isWished ? 'fa-solid' : 'fa-regular'} fa-heart"></i>
                    </button>
                </div>
            </div>

            <!-- Tab details -->
            <div class="modal-tabs">
                <div class="tab-headers">
                    <button class="tab-header-btn active" data-tab="tab-detail">상세 안내</button>
                    <button class="tab-header-btn" data-tab="tab-review">리뷰 (${prod.reviews})</button>
                    <button class="tab-header-btn" data-tab="tab-shipping">배송/교환</button>
                </div>
                <div class="tab-pane active" id="tab-detail">
                    <p style="margin-bottom: 12px;">${prod.info}</p>
                    <p style="font-weight: 600; margin-bottom: 4px;">세탁 시 유의사항:</p>
                    <p>${prod.wash}</p>
                </div>
                <div class="tab-pane" id="tab-review">
                    <div style="display:flex; align-items:center; gap: 10px; margin-bottom: 20px; padding: 16px; background-color: var(--light); border-radius: var(--border-radius-md);">
                        <strong style="font-size: 2.2rem; color: var(--accent);">${prod.rating}</strong>
                        <div>
                            <div style="color: #FFB020; font-size: 0.85rem;"><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i><i class="fa-solid fa-star"></i></div>
                            <span style="font-size:0.8rem; color: var(--dark-muted)">구매자 만족도 98%</span>
                        </div>
                    </div>
                    <div style="border-top:1px solid var(--border-color); padding: 14px 0;">
                        <strong style="font-size: 0.9rem;">김민* (★★★★★)</strong>
                        <p style="font-size: 0.85rem; color:var(--dark-muted); margin-top:4px;">색감이 모니터보다 훨씬 예뻐요. 부드러워서 가디건 바로 뜨기 시작했습니다. 다 뜨면 또 한코자랑 커뮤니티에 올릴게요!</p>
                    </div>
                    <div style="border-top:1px solid var(--border-color); padding: 14px 0;">
                        <strong style="font-size: 0.9rem;">이정* (★★★★★)</strong>
                        <p style="font-size: 0.85rem; color:var(--dark-muted); margin-top:4px;">배송 엄청 빠르고 콘사 양이 짱짱해요. 굿실 가성비 유명한데 한코한코 도안 패키지 디자인 너무 현대적이라 사버렸어요 만족합니다.</p>
                    </div>
                </div>
                <div class="tab-pane" id="tab-shipping">
                    <p><strong>배송 안내</strong></p>
                    <p style="margin-bottom: 12px; font-size:0.85rem;">한코한코는 한진택배를 이용하며, 기본 배송비는 3,000원입니다. 50,000원 이상 구매 시 무료배송 혜택을 드립니다. 제주도 및 도서산간 지방은 도선료 3,000원이 추가될 수 있습니다.</p>
                    <p><strong>교환/반품 안내</strong></p>
                    <p style="font-size:0.85rem;">실 콘텐츠 및 PDF 도안 파일은 특성상 발송 이후 반품이 제한됩니다. 지관 상태 훼손이나 사용한 실 등은 환불이 절대 불가하오니 유의하시기 바랍니다. 변심에 의한 일반 용품 교환 시 왕복 배송비는 고객 부담입니다.</p>
                </div>
            </div>
        `;

        // Interactive Options Event wire-up
        const chips = modalContentContainer.querySelectorAll(".color-chip");
        let selectedColor = prod.colors[0];

        chips.forEach(chip => {
            chip.addEventListener("click", (e) => {
                chips.forEach(c => c.classList.remove("active"));
                e.target.classList.add("active");
                selectedColor = e.target.dataset.color;
            });
        });

        // Quantity controls inside modal
        const qtyInput = modalContentContainer.querySelector("#modal-qty-input");
        const qtyMinus = modalContentContainer.querySelector("#modal-qty-minus");
        const qtyPlus = modalContentContainer.querySelector("#modal-qty-plus");

        qtyMinus.addEventListener("click", () => {
            qtyInput.value = Math.max(1, parseInt(qtyInput.value) - 1);
        });
        qtyPlus.addEventListener("click", () => {
            qtyInput.value = parseInt(qtyInput.value) + 1;
        });
        qtyInput.addEventListener("change", () => {
            if (isNaN(qtyInput.value) || qtyInput.value < 1) qtyInput.value = 1;
        });

        // Thumbnails gallery click
        const mainImg = modalContentContainer.querySelector("#modal-main-img");
        const thumbs = modalContentContainer.querySelectorAll(".thumb");
        thumbs.forEach(t => {
            t.addEventListener("click", (e) => {
                thumbs.forEach(item => item.classList.remove("active"));
                const targetThumb = e.currentTarget;
                targetThumb.classList.add("active");
                mainImg.src = targetThumb.querySelector("img").src;
            });
        });

        // Tabs toggle inside modal
        const tabBtns = modalContentContainer.querySelectorAll(".tab-header-btn");
        const tabPanes = modalContentContainer.querySelectorAll(".tab-pane");
        tabBtns.forEach(btn => {
            btn.addEventListener("click", (e) => {
                tabBtns.forEach(b => b.classList.remove("active"));
                tabPanes.forEach(p => p.classList.remove("active"));

                e.target.classList.add("active");
                const targetTabId = e.target.dataset.tab;
                modalContentContainer.querySelector(`#${targetTabId}`).classList.add("active");
            });
        });

        // Add to Cart
        modalContentContainer.querySelector("#modal-add-cart").addEventListener("click", () => {
            const qty = parseInt(qtyInput.value);
            addToCart(prod.id, selectedColor, qty);
            closeDetailModalFunc();
        });

        // Buy Now (directly opens checkout with this item only or adds and checkouts)
        modalContentContainer.querySelector("#modal-buy-now").addEventListener("click", () => {
            const qty = parseInt(qtyInput.value);
            // Quick merge to cart
            addToCart(prod.id, selectedColor, qty);
            closeDetailModalFunc();
            // Open Checkout directly
            setTimeout(openCheckoutModalFunc, 300);
        });

        // Wish trigger inside modal
        const wishBtn = modalContentContainer.querySelector("#modal-wish-btn");
        wishBtn.addEventListener("click", () => {
            toggleWishlist(prod.id, wishBtn);
            // Re-render catalog grid background hearts
            renderProducts();
        });

        // Display Modal
        productDetailModal.classList.add("active");
        modalBackdrop.classList.add("active");
    };

    const closeDetailModalFunc = () => {
        productDetailModal.classList.remove("active");
        if (!cartDrawer.classList.contains("active") && !checkoutModal.classList.contains("active")) {
            modalBackdrop.classList.remove("active");
        }
    };

    closeDetailModal.addEventListener("click", closeDetailModalFunc);

    // ==========================================
    // 10. Checkout Flow Logic
    // ==========================================
    const openCheckoutModalFunc = () => {
        if (cart.length === 0) {
            showNotification("장바구니가 비어 있습니다. 주문하실 상품을 먼저 담아주세요!");
            return;
        }
        closeCartDrawer();
        checkoutModal.classList.add("active");
        modalBackdrop.classList.add("active");
    };

    const closeCheckoutModalFunc = () => {
        checkoutModal.classList.remove("active");
        if (!cartDrawer.classList.contains("active") && !productDetailModal.classList.contains("active")) {
            modalBackdrop.classList.remove("active");
        }
    };

    checkoutTrigger.addEventListener("click", openCheckoutModalFunc);
    closeCheckoutModal.addEventListener("click", closeCheckoutModalFunc);

    // Form Submit Event
    checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Loading simulation
        const submitBtn = document.getElementById("submit-order");
        const origBtnText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> 가상 안전결제 모듈 구동 중...`;

        setTimeout(() => {
            // Success simulation
            submitBtn.disabled = false;
            submitBtn.innerHTML = origBtnText;

            // Generate order details
            const orderId = `HK${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${Math.floor(1000 + Math.random() * 9000)}`;
            const finalPrice = cartTotal.textContent;
            const address = document.getElementById("shipping-address").value;

            // Fill success overlay
            successOrderId.textContent = orderId;
            successOrderPrice.textContent = finalPrice;
            successOrderAddress.textContent = address;

            // Reset cart
            cart = [];
            localStorage.setItem("hanko_cart", JSON.stringify(cart));
            updateCartUI();

            // Open success overlay and fire fireworks!
            closeCheckoutModalFunc();
            successOverlay.classList.add("active");
            triggerFireworks();
        }, 1500);
    });

    successConfirmBtn.addEventListener("click", () => {
        successOverlay.classList.remove("active");
    });

    // ==========================================
    // 11. CSS Fireworks Visual Simulation
    // ==========================================
    const triggerFireworks = () => {
        const container = document.getElementById("fireworks-container");
        container.innerHTML = "";

        const colors = ["#F4C430", "#E07A5F", "#3F5E4D", "#D4A373", "#FFA07A", "#20B2AA", "#9370DB"];

        for (let f = 0; f < 8; f++) {
            setTimeout(() => {
                const originX = 10 + Math.random() * 80; // random percentage width
                const originY = 20 + Math.random() * 50; // random percentage height

                // Spawn particles
                for (let p = 0; p < 30; p++) {
                    const particle = document.createElement("div");
                    particle.className = "particle";
                    particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                    particle.style.left = `${originX}%`;
                    particle.style.top = `${originY}%`;

                    // Generate random trajectory variables for CSS keyframe explode
                    const angle = Math.random() * Math.PI * 2;
                    const distance = 50 + Math.random() * 150;
                    const tx = Math.cos(angle) * distance;
                    const ty = Math.sin(angle) * distance;

                    particle.style.setProperty("--tx", `${tx}px`);
                    particle.style.setProperty("--ty", `${ty}px`);

                    container.appendChild(particle);

                    // Remove particle after animation ends
                    setTimeout(() => particle.remove(), 1200);
                }
            }, f * 300);
        }
    };

    // ==========================================
    // 12. Init
    // ==========================================
    updateCartUI();
    updateWishlistCount();
    renderProducts();
});
