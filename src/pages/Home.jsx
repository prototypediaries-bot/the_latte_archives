import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

const PLACEHOLDER_POSTS = [
  {
    id: "1",
    title: "The Morning Latte: A Ritual Worth Savoring",
    subtitle: "Why your first sip deserves the whole morning — a playful little ritual in steam, foam, and good vibes.",
    slug: "the-morning-latte-ritual",
    category: "coffee",
    featured: true,
  },
  {
    id: "2",
    title: "Five Dreamy Cafés Worth the Detour",
    subtitle: "A curated guide to the absolute best aesthetic corners, quiet workspaces, and artisanal roasts.",
    slug: "five-dreamy-cafes",
    category: "cafes",
    featured: false,
  },
  {
    id: "3",
    title: "Pilates Routine for Daily Core Alignment",
    subtitle: "A soft, fluid morning movement flow designed to connect your breath and wake up your perspective.",
    slug: "pilates-routine-alignment",
    category: "pilates",
    featured: false,
  },
  {
    id: "4",
    title: "The Bright Morning: A Gentle Guide to Glowing Skin",
    subtitle: "Simplifying your AM skincare steps with calming rituals that bring out your natural light.",
    slug: "bright-morning-skincare",
    category: "wellness",
    featured: false,
  },
  {
    id: "5",
    title: "The Solitary Traveler: Finding Magic in Unfamiliar Streets",
    subtitle: "How stepping off the train alone teaches you to look closer, listen deeper, and sit comfortably with yourself.",
    slug: "solitary-traveler-magic",
    category: "travel",
    featured: false,
  },
  {
    id: "6",
    title: "Slow Pour Method: The Art of Intentional Coffee",
    subtitle: "A meditation on the exact water temperature, scale weights, and patience needed for the cleanest cup.",
    slug: "slow-pour-intentional-coffee",
    category: "coffee",
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

  const filteredPosts = activeCategory 
    ? PLACEHOLDER_POSTS.filter(p => p.category === activeCategory)
    : PLACEHOLDER_POSTS;

  const featured = !activeCategory ? filteredPosts.find((p) => p.featured) || filteredPosts : null;
  const gridPosts = featured ? filteredPosts.filter((p) => p.id !== featured.id) : filteredPosts;

  return (
    <div className="bg-[#FFF0F6] min-h-screen antialiased select-none">
      {/* 1. HERO BANNER WITH SOLID PASTEL BACKGROUND */}
      {featured && (
        <section className="relative h-[100svh] min-h-[650px] w-full overflow-hidden bg-[#F2E0D4] flex flex-col justify-between">
          {/* Decorative geometric branding background element */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 select-none pointer-events-none">
            <span className="text-[20vw] font-serif font-extrabold text-[#D65A8A] lowercase">la</span>
          </div>
          
          {/* Header Navigation overlay container */}
          <div className="relative p-6 md:p-12 flex justify-between items-center z-10 w-full max-w-6xl mx-auto">
            <span className="text-[11px] tracking-[0.35em] uppercase font-bold text-[#2A0A1F]">
              The Latte Archives
            </span>
            <button className="flex items-center gap-2 bg-[#2A0A1F]/5 text-[#2A0A1F] border border-[#2A0A1F]/10 rounded-full px-4 py-1.5 text-[11px] tracking-[0.25em] uppercase font-bold hover:bg-[#2A0A1F]/10 transition-all">
              Index <span className="text-xs">☰</span>
            </button>
          </div>

          {/* Main Title & CTA Block */}
          <div className="relative flex flex-col justify-end px-6 md:px-12 pb-24 md:pb-32 max-w-6xl mx-auto w-full flex-grow">
            <span className="inline-flex w-fit items-center gap-2 text-[10px] tracking-[0.32em] uppercase text-white bg-[#D65A8A] rounded-full px-4 py-1.5 mb-6 font-bold">
              {CATEGORY_LABEL[featured.category]} · Featured
            </span>
            <Link to={`/post/${featured.slug}`}>
              <h1 className="text-[#2A0A1F] font-extrabold leading-[0.92] tracking-[-0.03em] text-5xl sm:text-7xl md:text-8xl lg:text-[5.5rem] max-w-5xl hover:text-[#D65A8A] transition-colors">
                {featured.title}
              </h1>
            </Link>
            {featured.subtitle && (
              <p className="mt-6 text-base md:text-lg text-[#2A0A1F]/80 max-w-2xl leading-relaxed font-medium tracking-wide">
                {featured.subtitle}
              </p>
            )}
            <Link
              to={`/post/${featured.slug}`}
              className="mt-8 inline-flex items-center gap-2 text-[10px] tracking-[0.32em] uppercase bg-[#D65A8A] text-white hover:bg-[#2A0A1F] rounded-full px-7 py-3.5 transition-all w-fit font-bold shadow-sm"
            >
              Read the piece! <span className="text-base leading-none">→</span>
            </Link>
          </div>
        </section>
      )}

      {/* 2. CATEGORY SELECTION BAR */}
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

      {/* 3. MULTI-COLUMN ANTHOLOGY GRID */}
      <section className="px-6 md:px-12 py-20 md:py-24 max-w-6xl mx-auto w-full">
        <div className="flex items-end justify-between mb-12 border-b border-[#8A4A6E]/10 pb-6">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.02em] text-[#2A0A1F] uppercase font-serif">
            {activeCategory ? CATEGORY_LABEL[activeCategory] : "The Anthology"}
          </h2>
          <span className="text-[10px] tracking-[0.32em] uppercase text-[#8A4A6E] font-bold">
            {gridPosts.length} {gridPosts.length === 1 ? "piece" : "pieces"} to explore!
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-10 gap-y-16 md:gap-y-20">
          {gridPosts.map((post) => (
            <div key={post.id} className="group flex flex-col gap-5">
              {/* Solid Color Graphic Card Placeholder Block */}
              <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-[2rem] shadow-sm bg-[#F2E0D4] flex items-center justify-center border border-[#C98A6B]/10">
                <span className="text-3xl font-serif italic text-[#D65A8A]/30 select-none capitalize">
                  {post.category[0]}
                </span>
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
      </section>
    </div>
  );
}
