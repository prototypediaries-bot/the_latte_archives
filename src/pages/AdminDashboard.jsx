const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Pencil, Trash2, ArrowLeft, Mail, Download } from "lucide-react";

import { Image } from "@/components/ui/image";

const CATEGORY_LABEL = {
  coffee: "Coffee",
  cafes: "Cafés",
  pilates: "Pilates",
  wellness: "Wellness",
  travel: "Travel",
};

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    Promise.all([
      db.entities.Post.list("-updated_date", 100).catch(() => []),
      db.entities.NewsletterSubscriber.list("-created_date", 500).catch(() => []),
    ])
      .then(([p, s]) => { setPosts(p); setSubscribers(s); })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const exportSubscribers = () => {
    const csv = "email,source_post,subscribed_at\n" + subscribers
      .map((s) => `"${s.email}","${s.source_post || ""}","${new Date(s.created_date).toISOString()}"`)
      .join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "subscribers.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"? This cannot be undone.`)) return;
    await db.entities.Post.delete(id);
    load();
  };

  return (
    <div className="min-h-screen bg-[#FFF0F6]">
      <header className="border-b border-[#D65A8A]/15 bg-[#FFF0F6]/80 backdrop-blur sticky top-0 z-30">
        <div className="px-6 md:px-12 py-5 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link to="/" className="text-[11px] tracking-[0.32em] uppercase text-[#8A4A6E] hover:text-[#D65A8A] flex items-center gap-2 font-bold">
              <ArrowLeft size={14} /> Archives
            </Link>
            <span className="text-[11px] tracking-[0.32em] uppercase text-[#D65A8A] font-extrabold">The Atelier</span>
          </div>
          <Link
            to="/admin/new"
            className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-white bg-[#D65A8A] hover:bg-[#C98A6B] rounded-full px-4 py-2 transition-colors font-bold"
          >
            <Plus size={14} /> New piece
          </Link>
        </div>
      </header>

      <div className="px-6 md:px-12 py-12 max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-4 mb-12 flex-wrap">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-[-0.02em] text-[#2A0A1F] mb-2">Your pieces</h1>
            <p className="text-sm text-[#8A4A6E] font-medium">Craft, refine, and publish the evergreen archive.</p>
          </div>
          <div className="flex items-center gap-3 bg-white rounded-full border-2 border-[#D65A8A]/15 px-4 py-2">
            <Mail size={16} className="text-[#D65A8A]" />
            <span className="text-sm font-bold text-[#2A0A1F]">{subscribers.length}</span>
            <span className="text-xs text-[#8A4A6E] font-medium">subscribers</span>
            <button
              onClick={exportSubscribers}
              disabled={subscribers.length === 0}
              className="inline-flex items-center gap-1.5 text-[10px] tracking-[0.2em] uppercase text-white bg-[#D65A8A] hover:bg-[#C98A6B] rounded-full px-3 py-1.5 font-bold transition-colors disabled:opacity-40"
            >
              <Download size={12} /> Export
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-24">
            <div className="w-8 h-8 border-4 border-[#F3D5DE] border-t-[#D65A8A] rounded-full animate-spin" />
          </div>
        ) : posts.length === 0 ? (
          <div className="py-24 text-center border-2 border-dashed border-[#D65A8A]/25 rounded-[2rem] bg-white">
            <p className="text-[#8A4A6E] mb-6 font-medium">No pieces yet.</p>
            <Link to="/admin/new" className="text-[11px] tracking-[0.32em] uppercase text-white bg-[#D65A8A] rounded-full px-4 py-2 hover:bg-[#C98A6B] font-bold transition-colors">
              Craft your first →
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-[#D65A8A]/15 border-y border-[#D65A8A]/15">
            {posts.map((p) => (
              <div key={p.id} className="flex items-center gap-5 py-5">
                <div className="w-16 h-20 shrink-0 overflow-hidden bg-[#F3D5DE] rounded-2xl">
                  {p.cover_image && (
                    <Image src={p.cover_image} alt={p.title} className="w-full h-full object-cover" fittingType="fill" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1 flex-wrap">
                    <span className="text-[10px] tracking-[0.32em] uppercase text-white bg-[#D65A8A] rounded-full px-2.5 py-0.5 font-bold">
                      {CATEGORY_LABEL[p.category] || p.category}
                    </span>
                    <span
                      className={`text-[10px] tracking-[0.2em] uppercase rounded-full px-2.5 py-0.5 font-bold ${
                        p.status === "published"
                          ? "bg-[#2A0A1F] text-white"
                          : "bg-[#F2E0D4] text-[#C98A6B]"
                      }`}
                    >
                      {p.status}
                    </span>
                    {p.featured && (
                      <span className="text-[10px] tracking-[0.2em] uppercase text-[#D65A8A] font-bold">★ Featured</span>
                    )}
                  </div>
                  <h3 className="text-lg font-bold text-[#2A0A1F] truncate">{p.title}</h3>
                  <p className="text-xs text-[#8A4A6E] truncate font-medium">/post/{p.slug}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Link
                    to={`/admin/edit/${p.id}`}
                    className="p-2 text-[#8A4A6E] hover:text-white hover:bg-[#D65A8A] rounded-full transition-colors"
                    aria-label="Edit"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(p.id, p.title)}
                    className="p-2 text-[#8A4A6E] hover:text-white hover:bg-[#C98A6B] rounded-full transition-colors"
                    aria-label="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {!loading && subscribers.length > 0 && (
        <div className="px-6 md:px-12 pb-16 max-w-6xl mx-auto">
          <h2 className="text-xl font-extrabold tracking-[-0.01em] text-[#2A0A1F] mb-4 flex items-center gap-2">
            <Mail size={18} className="text-[#D65A8A]" /> Newsletter subscribers
          </h2>
          <div className="bg-white rounded-[2rem] border-2 border-[#D65A8A]/15 divide-y divide-[#D65A8A]/10 overflow-hidden">
            {subscribers.map((s) => (
              <div key={s.id} className="flex items-center justify-between gap-4 px-6 py-3.5">
                <span className="text-sm font-semibold text-[#2A0A1F] truncate">{s.email}</span>
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#8A4A6E] font-medium shrink-0">
                  {new Date(s.created_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}