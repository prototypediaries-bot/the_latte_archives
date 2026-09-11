const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const subscribe = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setStatus("error"); return; }
    setStatus("submitting");
    try {
      await db.entities.NewsletterSubscriber.create({ email, source_post: "footer" });
      setStatus("done");
      setEmail("");
    } catch { setStatus("error"); }
  };

  return (
    <footer className="relative bg-[#FFF0F6] border-t border-[#D65A8A]/15 overflow-hidden">
      <div className="px-6 md:px-12 pt-20 pb-10">
        <div className="grid md:grid-cols-3 gap-12 max-w-6xl">
          <div>
            <span className="inline-block text-[10px] tracking-[0.32em] uppercase text-white bg-[#D65A8A] rounded-full px-3 py-1 mb-4 font-bold">
              The Archives
            </span>
            <p className="text-sm text-[#8A4A6E] leading-relaxed max-w-xs font-medium">
              A lively anthology of modern living — coffee, movement, wellness, and the slow art of travel, served fresh!
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.32em] uppercase text-[#D65A8A] mb-4 font-bold">Explore the archives</p>
            <ul className="space-y-2 text-sm text-[#2A0A1F] font-medium">
              <li><Link to="/?category=coffee" className="hover:text-[#D65A8A] transition-colors">Coffee</Link></li>
              <li><Link to="/?category=cafes" className="hover:text-[#D65A8A] transition-colors">Cafés</Link></li>
              <li><Link to="/?category=pilates" className="hover:text-[#D65A8A] transition-colors">Pilates</Link></li>
              <li><Link to="/?category=wellness" className="hover:text-[#D65A8A] transition-colors">Wellness</Link></li>
              <li><Link to="/?category=travel" className="hover:text-[#D65A8A] transition-colors">Travel</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.32em] uppercase text-[#D65A8A] mb-4 font-bold">Stay in touch!</p>
            <p className="text-sm text-[#8A4A6E] leading-relaxed mb-4 font-medium max-w-xs">
              Bubbly notes delivered straight to your inbox — and follow along on Pinterest for the visual archive!
            </p>
            {status === "done" ? (
              <p className="text-sm font-bold text-[#D65A8A] mb-3">You're in, lovely! 🎀</p>
            ) : (
              <form onSubmit={subscribe} className="flex gap-2 mb-4 max-w-xs">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
                  placeholder="you@email.com"
                  className="flex-1 min-w-0 rounded-full bg-white border-2 border-[#D65A8A]/15 px-4 py-2 text-sm text-[#2A0A1F] placeholder:text-[#C99BB7] focus:outline-none focus:border-[#D65A8A] font-medium"
                  disabled={status === "submitting"}
                />
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="rounded-full bg-[#D65A8A] hover:bg-[#00A3FF] text-white text-[11px] tracking-[0.2em] uppercase font-bold px-4 py-2 transition-colors disabled:opacity-60 whitespace-nowrap"
                >
                  {status === "submitting" ? "…" : "Join"}
                </button>
              </form>
            )}
            {status === "error" && (
              <p className="text-xs text-[#D65A8A] font-semibold mb-3">Hmm, that email looks off — try again?</p>
            )}
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#2A0A1F] hover:text-[#D65A8A] transition-colors font-semibold"
            >
              Follow along on Pinterest →
            </a>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 pb-12">
        <h2 className="font-extrabold tracking-[-0.04em] leading-[0.9] text-[#D65A8A]/25" style={{ fontSize: "5vw" }}>
          the latte archives!
        </h2>
      </div>

      <div className="border-t border-[#D65A8A]/15 px-6 md:px-12 py-6 flex flex-col sm:flex-row justify-between gap-2">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A4A6E] font-medium">
          © {new Date().getFullYear()} The Latte Archives
        </p>
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#8A4A6E] font-medium">
          Crafted with intention
        </p>
      </div>
    </footer>
  );
}