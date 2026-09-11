import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

// Hardcoded beautiful sample posts matching your styling to keep layout populated
const SAMPLE_POSTS = [
  {
    id: "1",
    title: "Welcome to My Beautiful New Blog Space",
    subtitle: "Moving away from platforms and owning my design, content, and reader connection.",
    slug: "welcome-to-my-new-blog",
    category: "wellness",
    cover_image: "https://unsplash.com",
    featured: true,
  },
  {
    id: "2",
    title: "The Perfect Pilates Routine for Morning Energy",
    subtitle: "A simple guide to aligning your breath and movement before the day starts.",
    slug: "perfect-pilates-routine",
    category: "pilates",
    cover_image: "https://unsplash.com",
    featured: false,
  },
  {
    id: "3",
    title: "Chasing the Best Café Layouts and Espresso Shots",
    subtitle: "A curation of quiet workspaces and artisanal roasts worth traveling for.",
    slug: "best-cafe-layouts",
    category: "cafes",
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

  // Filter posts based on clicked category tabs completely on the client side
  const filteredPosts = activeCategory 
    ? SAMPLE_POSTS.filter(p => p.category === activeCategory)
    : SAMPLE_POSTS;

  const featured = !activeCategory ? filteredPosts.find((p) => p.featured) || filteredPosts[0] : null;
  const gridPosts = featured ? filteredPosts.filter((p) => p.id !== featured.id) : filteredPosts;

  return (
    <div className="bg-[#FFF0F6]">
      {/* Featured Post Header Banner */}
      {featured && (
        <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
          <img
            src={featured.cover_image}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#2A0A1F]/70 via-[#2A0A1F]/10 to-[#2A0A1F]/20" />
          <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-20 md:pb-32 max-w-5xl">
            <span className="inline-flex w-fit items-center gap-2 text-[11px] tracking-[0.32em] uppercase text-white bg-[#D65A8A] rounded-full px-4 py-1.5 mb-6 font-bold">
              {CATEGORY_LABEL[featured.category]} · Featured
            </span>
            <Link to={`/post/${featured.slug}`}>
              <h1 className="text-white font-extrabold leading-[0.95] tracking-[-0.03em] text-4xl sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl hover:opacity-90 transition-opacity">
                {featured.title}
              </h1>
            </Link>
            {featured.subtitle && (
              <p className="mt-6 text-base md:text-lg text-white/90 max-w-xl leading-relaxed font-medium">
                {featured.subtitle}
              </p>
            )}
            <Link
              to={`/post/${featured.slug}`}
              className="mt-8 inline-flex items-center gap-2 text-[11px] tracking-[0.32em] uppercase bg-white text-[#D65A8A] hover:bg-[#C98A6B] hover:text-white rounded-full px-6 py-3 transition-colors w-fit font-bold"
            >
              Read the piece! <span className="text-lg leading-none">→</span>
            </Link>
          </div>
        </section>
      )}

      {/* Category Tab Selector Menu bar */}
      <section className="px-6 md:px-12 py-10 bg-[#F2E0D4] border-b border-[#C98A6B]/15">
        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/"
            className={`text-[11px] tracking-[0.28em] uppercase rounded-full px-4 py-2 transition-colors font-bold ${!activeCategory ? "bg-[#D65A8A] text-white" : "bg-white text-[#C98A6B] hover:bg-[#D65A8A] hover:text-white"}`}
          >
            All
          </Link>
          {Object.entries(CATEGORY_LABEL).map(([value, label]) => (
            <Link
              key={value}
              to={`/?category=${value}`}
              className={`text-[11px] tracking-[0.28em] uppercase rounded-full px-4 py-2 transition-colors font-bold ${activeCategory === value ? "bg-[#D65A8A] text-white" : "bg-white text-[#C98A6B] hover:bg-[#D65A8A] hover:text-white"}`}
            >
              {label}
            </Link>
          ))}
        </div>
      </section>

      {/* Main Grid Content Area */}
      <section className="px-6 md:px-12 py-20 md:py-28">
        <div className="flex items-end justify-between mb-16">
          <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.01em] text-[#2A0A1F]">
            {activeCategory ? CATEGORY_LABEL[activeCategory] : "The Anthology"}
          </h2>
          <span className="text-[11px] tracking-[0.32em] uppercase text-[#8A4A6E] font-bold">
            {gridPosts.length} {gridPosts.length === 1 ? "piece" : "pieces"} to explore!
          </span>
        </div>

        {gridPosts.length === 0 ? (
          <div className="py-32 text-center">
            <p className="text-[#8A4A6E] text-sm tracking-wide font-medium">Fresh pieces are being crafted — check back soon!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-16 md:gap-y-24">
            {gridPosts.map((post) => (
              <div key={post.id} className="group flex flex-col gap-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-gray-100">
                  <img 
                    src={post.cover_image} 
                    alt={post.title} 
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[10px] tracking-[0.25em] uppercase text-[#D65A8A] font-bold">
                    {CATEGORY_LABEL[post.category]}
                  </span>
                  <Link to={`/post/${post.slug}`}>
                    <h3 className="text-xl font-bold text-[#2A0A1F] hover:text-[#D65A8A] transition-colors leading-snug">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-[#8A4A6E]/80 line-clamp-2 leading-relaxed">
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
