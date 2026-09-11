const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { ArrowLeft, Save, Upload, Star } from "lucide-react";

import { Image } from "@/components/ui/image";

const CATEGORIES = [
  { value: "coffee", label: "Coffee" },
  { value: "cafes", label: "Cafés" },
  { value: "pilates", label: "Pilates" },
  { value: "wellness", label: "Wellness" },
  { value: "travel", label: "Travel" },
];

const slugify = (s) =>
  s.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");

const quillModules = {
  toolbar: [
    [{ header: [2, 3, false] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    ["blockquote", "link"],
    ["clean"],
  ],
};

export default function AdminPostEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    title: "",
    subtitle: "",
    slug: "",
    category: "coffee",
    tags: "",
    content: "",
    cover_image: "",
    status: "draft",
    featured: false,
    published_date: "",
  });
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isEdit) return;
    db.entities.Post
      .get(id)
      .then((p) => {
        setForm({
          title: p.title || "",
          subtitle: p.subtitle || "",
          slug: p.slug || "",
          category: p.category || "coffee",
          tags: (p.tags || []).join(", "),
          content: p.content || "",
          cover_image: p.cover_image || "",
          status: p.status || "draft",
          featured: !!p.featured,
          published_date: p.published_date || "",
        });
      })
      .catch(() => setError("Could not load this piece."))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleTitleChange = (val) => {
    set("title", val);
    if (!isEdit || !form.slug) set("slug", slugify(val));
  };

  const handleUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const { file_url } = await db.integrations.Core.UploadPublicFile({ file });
      set("cover_image", file_url);
    } catch {
      setError("Image upload failed.");
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (publish = false) => {
    setError("");
    if (!form.title.trim()) return setError("A title is required.");
    if (!form.slug.trim()) return setError("A slug is required.");
    setSaving(true);
    const payload = {
      title: form.title.trim(),
      subtitle: form.subtitle.trim(),
      slug: form.slug.trim(),
      category: form.category,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
      content: form.content,
      cover_image: form.cover_image,
      status: publish ? "published" : form.status,
      featured: form.featured,
      published_date: form.published_date || (publish ? new Date().toISOString().slice(0, 10) : undefined),
    };
    try {
      if (isEdit) {
        await db.entities.Post.update(id, payload);
      } else {
        await db.entities.Post.create(payload);
      }
      navigate("/admin");
    } catch (e) {
      setError("Could not save. " + (e?.message || ""));
    } finally {
      setSaving(false);
    }
  };

  const previewHtml = useMemo(() => form.content, [form.content]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FFF0F6]">
        <div className="w-8 h-8 border-4 border-[#F3D5DE] border-t-[#D65A8A] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFF0F6]">
      <header className="border-b border-[#D65A8A]/15 bg-[#FFF0F6]/80 backdrop-blur sticky top-0 z-30">
        <div className="px-6 md:px-12 py-4 flex items-center justify-between gap-4">
          <Link to="/admin" className="text-[11px] tracking-[0.32em] uppercase text-[#8A4A6E] hover:text-[#D65A8A] flex items-center gap-2 font-bold">
            <ArrowLeft size={14} /> Atelier
          </Link>
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-[#C98A6B] hover:text-[#D65A8A] disabled:opacity-40 font-bold"
            >
              <Save size={14} /> {saving ? "Saving" : "Save draft"}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-white bg-[#D65A8A] rounded-full px-5 py-2 hover:bg-[#C98A6B] disabled:opacity-40 transition-colors font-bold"
            >
              Publish
            </button>
          </div>
        </div>
      </header>

      {error && (
        <div className="px-6 md:px-12 py-3 bg-[#2A0A1F] text-white text-sm font-medium">{error}</div>
      )}

      <div className="grid lg:grid-cols-2 min-h-[calc(100vh-57px)]">
        <div className="px-6 md:px-10 py-10 border-r border-[#D65A8A]/15 overflow-y-auto">
          <div className="max-w-xl mx-auto space-y-6">
            <div>
              <label className="text-[10px] tracking-[0.32em] uppercase text-[#8A4A6E] font-bold">Title</label>
              <input
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="The bubbly ritual of…"
                className="mt-2 w-full bg-transparent text-2xl font-bold text-[#2A0A1F] border-b border-[#D65A8A]/30 focus:border-[#D65A8A] outline-none py-2 placeholder:text-[#8A4A6E]/40"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-[0.32em] uppercase text-[#8A4A6E] font-bold">Subtitle / Dek</label>
              <input
                value={form.subtitle}
                onChange={(e) => set("subtitle", e.target.value)}
                placeholder="A short, upbeat excerpt"
                className="mt-2 w-full bg-transparent text-sm text-[#2A0A1F] border-b border-[#D65A8A]/30 focus:border-[#D65A8A] outline-none py-2 font-medium"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] tracking-[0.32em] uppercase text-[#8A4A6E] font-bold">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => set("category", e.target.value)}
                  className="mt-2 w-full bg-transparent text-sm text-[#2A0A1F] border-b border-[#D65A8A]/30 focus:border-[#D65A8A] outline-none py-2 font-medium"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] tracking-[0.32em] uppercase text-[#8A4A6E] font-bold">Slug</label>
                <input
                  value={form.slug}
                  onChange={(e) => set("slug", slugify(e.target.value))}
                  placeholder="the-bubbly-ritual"
                  className="mt-2 w-full bg-transparent text-sm text-[#2A0A1F] border-b border-[#D65A8A]/30 focus:border-[#D65A8A] outline-none py-2 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="text-[10px] tracking-[0.32em] uppercase text-[#8A4A6E] font-bold">Tags (comma separated)</label>
              <input
                value={form.tags}
                onChange={(e) => set("tags", e.target.value)}
                placeholder="morning, ritual, fun"
                className="mt-2 w-full bg-transparent text-sm text-[#2A0A1F] border-b border-[#D65A8A]/30 focus:border-[#D65A8A] outline-none py-2 font-medium"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-[0.32em] uppercase text-[#8A4A6E] font-bold">Cover image</label>
              <div className="mt-2 flex items-center gap-4">
                <div className="w-24 h-32 shrink-0 overflow-hidden bg-[#F3D5DE] rounded-2xl">
                  {form.cover_image && (
                    <Image src={form.cover_image} alt="cover" className="w-full h-full object-cover" fittingType="fill" />
                  )}
                </div>
                <label className="inline-flex items-center gap-2 text-[11px] tracking-[0.28em] uppercase text-white bg-[#C98A6B] hover:bg-[#D65A8A] rounded-full px-4 py-2 cursor-pointer transition-colors font-bold">
                  <Upload size={14} /> {uploading ? "Uploading…" : "Upload"}
                  <input type="file" accept="image/*" onChange={handleUpload} className="hidden" />
                </label>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(e) => set("featured", e.target.checked)}
                  className="accent-[#D65A8A] w-4 h-4"
                />
                <span className="text-[11px] tracking-[0.28em] uppercase text-[#2A0A1F] flex items-center gap-1 font-bold">
                  <Star size={12} /> Featured
                </span>
              </label>
            </div>

            <div>
              <label className="text-[10px] tracking-[0.32em] uppercase text-[#8A4A6E] font-bold">Body</label>
              <div className="mt-3 rounded-2xl overflow-hidden border border-[#D65A8A]/15 bg-white">
                <ReactQuill
                  theme="snow"
                  value={form.content}
                  onChange={(v) => set("content", v)}
                  modules={quillModules}
                  placeholder="Begin crafting the piece…"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#FFF0F6] overflow-y-auto hidden lg:block">
          <div className="px-6 py-3 border-b border-[#D65A8A]/15 sticky top-0 bg-[#FFF0F6]/80 backdrop-blur z-10">
            <span className="text-[10px] tracking-[0.32em] uppercase text-[#8A4A6E] font-bold">Live preview</span>
          </div>
          <article className="px-6 md:px-10 py-10">
            <div className="max-w-[700px] mx-auto">
              {form.cover_image && (
                <div className="aspect-[4/5] max-h-[420px] overflow-hidden mb-8 bg-[#F3D5DE] rounded-[2rem] shadow-soft">
                  <Image src={form.cover_image} alt="" className="w-full h-full object-cover" fittingType="fill" />
                </div>
              )}
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.32em] uppercase text-white bg-[#D65A8A] rounded-full px-4 py-1.5 mb-4 font-bold">
                {CATEGORIES.find((c) => c.value === form.category)?.label}
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold text-[#2A0A1F] leading-[1.05] tracking-[-0.02em]">
                {form.title || "Untitled piece"}
              </h1>
              {form.subtitle && (
                <p className="mt-4 text-lg text-[#8A4A6E] font-medium">{form.subtitle}</p>
              )}
              <div
                className="article-content mt-10"
                dangerouslySetInnerHTML={{ __html: previewHtml || "<p><em>Begin writing to see the live preview…</em></p>" }}
              />
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}