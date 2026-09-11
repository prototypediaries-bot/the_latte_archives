const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { Image } from "@/components/ui/image";
import PostCard from "@/components/blog/PostCard";

const CATEGORY_LABEL = {
  coffee: "Coffee",
  cafes: "Cafés",
  pilates: "Pilates",
  wellness: "Wellness",
  travel: "Travel",
};

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [params] = useSearchParams();
  const activeCategory = params.get("category");

  useEffect(() => {
    setLoading(true);
    const query = { status: "published" };
    if (activeCategory) query.category = activeCategory;
    db.entities.Post
      .filter(query, "-published_date", 50)
      .then(setPosts)
      .catch(() => setPosts([]))
      .finally(() => setLoading(false));
  }, [activeCategory]);

  const featured = !activeCategory ? posts.find((p) => p.featured) || posts[0] : null;
  const gridPosts = featured ? posts.filter((p) => p.id !== featured.id) : posts;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF0F6]">
        <div className="w-8 h-8 border-4 border-[#F3D5DE] border-t-[#D65A8A] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-[#FFF0F6]">
      {featured && (
        <section className="relative h-[100svh] min-h-[600px] w-full overflow-hidden">
          <Image
            src={featured.cover_image}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover"
            fittingType="fill"
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
            {gridPosts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}