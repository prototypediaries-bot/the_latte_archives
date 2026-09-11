const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { Link } from "react-router-dom";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

import { Image } from "@/components/ui/image";

const CATEGORIES = [
  { label: "Coffee", value: "coffee" },
  { label: "Cafés", value: "cafes" },
  { label: "Pilates", value: "pilates" },
  { label: "Wellness", value: "wellness" },
  { label: "Travel", value: "travel" },
];

export default function SlidingMenu({ open, onClose }) {
  const [featured, setFeatured] = useState(null);

  useEffect(() => {
    if (open) {
      db.entities.Post
        .filter({ featured: true, status: "published" }, "-published_date", 1)
        .then((res) => setFeatured(res[0] || null))
        .catch(() => setFeatured(null));
    }
  }, [open]);

  return (
    <>
      <div
        className={`fixed inset-0 z-[60] bg-black/30 transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-full sm:w-[40%] max-w-[560px] bg-[#FFF0F6] shadow-2xl transition-transform duration-500 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center px-8 py-6 border-b border-[#FF2D95]/15">
            <span className="text-[11px] tracking-[0.32em] uppercase text-[#8A4A6E]">Index</span>
            <button onClick={onClose} aria-label="Close menu" className="text-[#2A0A1F] hover:text-[#FF2D95] transition-colors">
              <X size={20} />
            </button>
          </div>

          <nav className="flex flex-col px-8 pt-10 gap-5">
            <Link to="/" className="text-2xl font-semibold text-[#2A0A1F] hover:text-[#FF2D95] transition-colors">Home</Link>
            {CATEGORIES.map((c) => (
              <Link
                key={c.value}
                to={`/?category=${c.value}`}
                className="text-2xl font-semibold text-[#2A0A1F] hover:text-[#FF2D95] transition-colors"
              >
                {c.label}
              </Link>
            ))}
            <Link to="/admin" className="text-2xl font-semibold text-[#C98A6B] hover:text-[#FF2D95] transition-colors pt-4 border-t border-[#FF2D95]/15">
              The Atelier
            </Link>
          </nav>

          <div className="mt-auto px-8 pb-10">
            <span className="inline-block text-[10px] tracking-[0.32em] uppercase text-white bg-[#C98A6B] rounded-full px-3 py-1 mb-4 font-semibold">
              Featured this month
            </span>
            {featured ? (
              <Link to={`/post/${featured.slug}`} className="block group">
                <div className="aspect-[4/5] overflow-hidden mb-4 bg-[#FFD9E8] rounded-3xl shadow-soft">
                  <Image
                    src={featured.cover_image}
                    alt={featured.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    fittingType="fill"
                  />
                </div>
                <p className="text-sm font-semibold text-[#2A0A1F] leading-snug">{featured.title}</p>
              </Link>
            ) : (
              <div className="aspect-[4/5] bg-[#FFD9E8] rounded-3xl" />
            )}
          </div>
        </div>
      </aside>
    </>
  );
}