const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { Image } from "@/components/ui/image";
import NewsletterBox from "@/components/blog/NewsletterBox";

const CATEGORY_LABEL = {
  coffee: "Coffee",
  cafes: "Cafés",
  pilates: "Pilates",
  wellness: "Wellness",
  travel: "Travel",
};

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    setPost(null);
    db.entities.Post
      .filter({ slug, status: "published" }, "-published_date", 1)
      .then(async (res) => {
        const found = res[0] || null;
        setPost(found);
        if (found) {
          const rel = await db.entities.Post.filter(
            { category: found.category, status: "published" },
            "-published_date",
            6
          );
          setRelated(rel.filter((p) => p.id !== found.id).slice(0, 5));
        }
      })
      .catch(() => setPost(null))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF0F6] pt-24">
        <div className="w-8 h-8 border-4 border-[#F3D5DE] border-t-[#D65A8A] rounded-full animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#FFF0F6] pt-24 px-6 text-center">
        <span className="inline-block text-[11px] tracking-[0.32em] uppercase text-white bg-[#D65A8A] rounded-full px-4 py-1.5 mb-4 font-bold">Not found</span>
        <h1 className="text-3xl font-bold text-[#2A0A1F] mb-6">This piece has wandered off.</h1>
        <Link to="/" className="text-[11px] tracking-[0.32em] uppercase text-white bg-[#C98A6B] hover:bg-[#D65A8A] rounded-full px-5 py-2.5 font-bold transition-colors">
          ← Return to the archives
        </Link>
      </div>
    );
  }

  const published = post.published_date
    ? new Date(post.published_date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    : null;

  return (
    <article className="bg-[#FFF0F6] pt-20">
      <div className="relative h-[70vh] min-h-[440px] w-full overflow-hidden">
        <Image src={post.cover_image} alt={post.title} className="absolute inset-0 w-full h-full object-cover" fittingType="fill" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2A0A1F]/55 via-transparent to-[#2A0A1F]/15" />
      </div>

      <div className="px-6 md:px-12 pt-16 md:pt-24 pb-10 max-w-3xl mx-auto text-center">
        <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.32em] uppercase text-white bg-[#D65A8A] rounded-full px-4 py-1.5 mb-6 font-bold">
          {CATEGORY_LABEL[post.category]}
        </span>
        <h1 className="text-4xl md:text-6xl font-extrabold text-[#2A0A1F] leading-[1.05] tracking-[-0.02em]">
          {post.title}
        </h1>
        {post.subtitle && (
          <p className="mt-6 text-lg md:text-xl text-[#8A4A6E] font-medium leading-relaxed">
            {post.subtitle}
          </p>
        )}
        {published && (
          <p className="mt-8 text-[11px] tracking-[0.32em] uppercase text-[#8A4A6E] font-bold">{published}</p>
        )}
      </div>

      <div className="px-6 md:px-12 pb-28">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[200px_1fr] gap-12">
          <aside className="hidden md:block">
            <div className="sticky top-32 space-y-6">
              <div>
                <p className="text-[10px] tracking-[0.32em] uppercase text-[#8A4A6E] mb-3 font-bold">Tags</p>
                <div className="flex flex-col gap-2 w-fit">
                  {(post.tags || []).map((t) => (
                    <span key={t} className="text-sm text-[#C98A6B] bg-[#F2E0D4] rounded-full px-3 py-1 font-semibold">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                to={`/?category=${post.category}`}
                className="inline-block text-[11px] tracking-[0.32em] uppercase text-white bg-[#C98A6B] hover:bg-[#D65A8A] rounded-full px-4 py-2 transition-colors font-bold"
              >
                More {CATEGORY_LABEL[post.category]} →
              </Link>
            </div>
          </aside>

          <div className="md:ml-auto md:max-w-[700px]">
            {post.content ? (
              <div
                className="article-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            ) : (
              <p className="article-content text-[#8A4A6E] italic">
                This piece is still being crafted. Return soon to read it in full.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12">
        <NewsletterBox sourcePost={post.slug} />
      </div>

      {related.length > 0 && (
        <section className="bg-white border-y border-[#D65A8A]/15 py-20 md:py-28">
          <div className="px-6 md:px-12 mb-10 flex items-end justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-[-0.01em] text-[#2A0A1F]">
                Continue reading
              </h2>
              <p className="mt-2 text-[11px] tracking-[0.32em] uppercase text-[#D65A8A] font-bold">
                More from {CATEGORY_LABEL[post.category]}
              </p>
            </div>
            <Link
              to={`/?category=${post.category}`}
              className="hidden sm:inline-flex items-center text-[11px] tracking-[0.28em] uppercase text-white bg-[#D65A8A] hover:bg-[#C98A6B] rounded-full px-4 py-2 font-bold transition-colors"
            >
              View all →
            </Link>
          </div>
          <div className="flex gap-6 md:gap-8 overflow-x-auto no-scrollbar px-6 md:px-12 pb-6 snap-x">
            {related.map((r) => (
              <Link key={r.id} to={`/post/${r.slug}`} className="group snap-start shrink-0 w-[78vw] sm:w-[340px]">
                <div className="aspect-[4/5] overflow-hidden bg-white rounded-[2rem] shadow-soft mb-4">
                  <Image
                    src={r.cover_image}
                    alt={r.title}
                    className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                    fittingType="fill"
                  />
                </div>
                <h3 className="text-lg font-bold text-[#2A0A1F] leading-tight group-hover:text-[#D65A8A] transition-colors">
                  {r.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}