import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Your exact content and metadata from the screenshots
const REAL_POSTS = [
  {
    id: "1",
    title: "The Morning Latte: A Ritual Worth Savoring",
    subtitle: "Why your first sip deserves the whole morning — a playful little ritual in steam, foam, and good vibes.",
    slug: "the-morning-latte-ritual",
    category: "coffee",
    cover_image: "https://unsplash.com",
    featured: true,
  },
  {
    id: "2",
    title: "Five Dreamy Cafés Worth the Detour",
    subtitle: "A curated guide to the absolute best aesthetic corners, quiet workspaces, and artisanal roasts.",
    slug: "five-dreamy-cafes",
    category: "cafes",
    cover_image: "https://unsplash.com",
    featured: false,
  },
  {
    id: "3",
    title: "Pilates · Pilates Routine for Daily Alignment",
    subtitle: "A soft, fluid morning flow designed to connect your breath and wake up your core.",
    slug: "pilates-routine-alignment",
    category: "pilates",
    cover_image: "https://unsplash.com",
    featured: false,
  },
  {
    id: "4",
    title: "The Bright Morning: A Gentle Guide to Glowing Skin",
    subtitle: "Simplifying your AM skincare steps with calming rituals that bring out your natural light.",
    slug: "bright-morning-skincare",
    category: "wellness",
    cover_image: "https://unsplash.com",
    featured: false,
  }
];

const CATEGORY_LABEL = {
  coffee: "Coffee",
  cafes: "Cafés",
  pilates: "Pilates",
  wellness: "Wellness",
  travel: "Travel",
};

export default function Home() {
  const [params] = useSearchParams();
  const activeCategory = params.get("category");

  // Client-side category switching logic
  const filteredPosts = activeCategory 
    ? REAL_POSTS.filter(p => p.category === activeCategory)
    : REAL_POSTS;

  const featured = !activeCategory ? filteredPosts.find((p) => p.featured) || filteredPosts[0] : null;
  const gridPosts = featured ? filteredPosts.filter((p) => p.id !== featured.id) : filteredPosts;

  return (
    <div className="bg-[#FFF0F6] min-h-screen antialiased select-none">
      {/* 1. HERO BANNER - Exact layout matching Image 1 */}
      {featured && (
        <section className="relative h-[100svh] min-h-[650px] w-full overflow-hidden">
          <img
            src={featured.cover_image}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
          {/* Subtle editorial dark overlays matching your image grading */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A0A1F]/70 via-[#2A0A1F]/15 to-[#2A0A1F]/20" />
          
          {/* Header Identity Overlay */}
          <div className="absolute top-0 left-0 right-0 p-6 md:p-12 flex justify-between items-center z-10">
            <span className="text-[11px] tracking-[0.35em] uppercase font-bold text-white/80">
              The Latte Archives
            </span>
            <button className="flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full px-4 py-1.5 text-[11px] tracking-[0.25em] uppercase font-bold hover:bg-white/20 transition-all">
              Index <span className="text-xs">☰</span>
            </button>
          </div>

          {/* Centered Main Branding Spacing */}
          <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-24 md:pb-32 max-w-6xl mx-auto w-full">
            <span className="inline-flex w-fit items-center gap-2 text-[10px] tracking-[0.32em] uppercase text-white bg-[#D65A8A] rounded-full px-4 py-1.5 mb-6 font-bold">
              {CATEGORY_LABEL[featured.category]} · Featured
            </span>
            <Link to={`/post/${featured.slug}`}>
              <h1 className="text-white font-extrabold leading-[0.92] tracking-[-0.03em] text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] max-w-5xl hover:opacity-90 transition-opacity">
                {featured.title}
              </h1>
            </Link>
            {featured.subtitle && (
              <p className="mt-6 text-base md:text-lg text-white/90 max-w-2xl leading-relaxed font-medium tracking-wide">
                {featured.subtitle}
              </p>
            )}
            <Link
              to={`/post/${featured.slug}`}
              className="mt-8 inline-flex items-center gap-2 text-[10px] tracking-[0.32em] uppercase bg-white text-[#D65A8A] hover:bg-[#C98A6B] hover:text-white rounded-full px-7 py-3.5 transition-all w-fit font-bold shadow-sm"
            >
              Read the piece! <span className="text-base leading-none">→</span>
            </Link>
          </div>
        </section>
      )}

      {/* 2. NAVIGATION BAR SYSTEM */}
      <section className="px-6 md:px-12 py-8 bg-[#F2E0D4] border-b border-[#C98A6B]/15 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className={`text-[10px] tracking-[0.28em] uppercase rounded-full px-5 py-2 transition-colors font-bold ${!activeCategory ? "bg-[#D65A8A] text-white" : "bg-white text-[#C98A6B] hover:bg-[#D65A8A] hover:text-white shadow-sm"}`}
          >
            All
          </Link>
          {Object.entries(CATEGORY_LABEL).map(([value, label]) => (
            <Link
              key={value}
              to={`/?category=${value}`}
              className={`text-[10px] tracking-[0.28em] uppercase rounded-full px-5 py-2 transition-colors font-bold ${activeCategory === value ? "bg-[#D65A8A] text-white" : "bg-white text-[#C98A6B] hover:bg-[#D65A8A] hover:text-white shadow-sm"}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* 3. GRID SYSTEM - Exact structure matching Image 2 */}
      <section className="px-6 md:px-12 py-20 md:py-24 max-w-6xl mx-auto w-full">
        <div className="flex items-end justify-between mb-12 border-b border-[#8A4A6E]/10 pb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-[#2A0A1F] uppercase font-serif">
            {activeCategory ? CATEGORY_LABEL[activeCategory] : "The Anthology"}
          </h2>
          <span className="text-[10px] tracking-[0.32em] uppercase text-[#8A4A6E] font-bold">
            {gridPosts.length} {gridPosts.length === 1 ? "piece" : "pieces"} to explore!
          </span>
        </div>

        {gridPosts.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-[#8A4A6E] text-sm tracking-wide font-medium">Fresh pieces are being crafted — check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-10 gap-y-16 md:gap-y-20">
            {gridPosts.map((post) => (
              <div key={post.id} className="group flex flex-col gap-5">
                <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-[2rem] shadow-sm bg-gray-100">
                  <img 
                    src={post.cover_image} 
                    alt={post.title} 
                    className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-102"
                  />
                </div>
                <div className="flex flex-col gap-2.5 px-1">
                  <span className="inline-flex w-fit items-center text-[9px] tracking-[0.25em] uppercase text-white bg-[#D65A8A] rounded-full px-3 py-1 font-bold">
                    {CATEGORY_LABEL[post.category]}
                  </span>
                  <Link to={`/post/${post.slug}`}>
                    <h3 className="text-2xl font-bold text-[#2A0A1F] hover:text-[#D65A8A] transition-colors leading-[1.1] tracking-[-0.01em]">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-[#8A4A6E]/75 line-clamp-2 leading-relaxed font-medium">
                    {post.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
