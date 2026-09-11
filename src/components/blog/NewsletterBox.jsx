const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import { useState } from "react";
import { Mail, Sparkles, Check } from "lucide-react";

export default function NewsletterBox({ sourcePost }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle"); // idle | submitting | done | error

  const submit = async (e) => {
    e.preventDefault();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("submitting");
    try {
      await db.entities.NewsletterSubscriber.create({
        email,
        source_post: sourcePost || null,
      });
      setStatus("done");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <div className="max-w-2xl mx-auto my-16 bg-gradient-to-br from-[#D65A8A] to-[#E08AB0] rounded-[2.5rem] px-8 py-12 text-center text-white shadow-soft-lg">
        <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-white/20 flex items-center justify-center">
          <Check size={28} strokeWidth={3} />
        </div>
        <h3 className="text-2xl font-extrabold tracking-[-0.01em] mb-2">You're in, lovely! 🎀</h3>
        <p className="text-white/90 font-medium max-w-md mx-auto">
          Watch your inbox for bubbly updates, fresh rituals, and slow-living notes from the archives.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto my-16 bg-white rounded-[2.5rem] border-2 border-[#D65A8A]/15 px-8 py-12 text-center shadow-soft">
      <div className="w-14 h-14 mx-auto mb-5 rounded-full bg-[#F3D5DE] flex items-center justify-center">
        <Sparkles size={26} className="text-[#D65A8A]" />
      </div>
      <span className="inline-block text-[10px] tracking-[0.32em] uppercase text-white bg-[#D65A8A] rounded-full px-3 py-1 mb-4 font-bold">
        The Newsletter
      </span>
      <h3 className="text-2xl md:text-3xl font-extrabold tracking-[-0.01em] text-[#2A0A1F] mb-3">
        Join the archives
      </h3>
      <p className="text-[#8A4A6E] font-medium mb-7 max-w-md mx-auto">
        Bubbly notes on coffee, movement, wellness &amp; slow travel — delivered straight to your inbox.
      </p>
      <form onSubmit={submit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
        <div className="relative flex-1">
          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#D65A8A]" />
          <input
            type="email"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setStatus("idle"); }}
            placeholder="you@email.com"
            className="w-full rounded-full bg-[#FFF0F6] border-2 border-[#D65A8A]/15 pl-11 pr-5 py-3 text-sm text-[#2A0A1F] placeholder:text-[#C99BB7] focus:outline-none focus:border-[#D65A8A] font-medium"
            disabled={status === "submitting"}
          />
        </div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-full bg-[#D65A8A] hover:bg-[#C98A6B] text-white text-[11px] tracking-[0.28em] uppercase font-bold px-6 py-3 transition-colors disabled:opacity-60 whitespace-nowrap"
        >
          {status === "submitting" ? "Joining…" : "Subscribe"}
        </button>
      </form>
      {status === "error" && (
        <p className="mt-4 text-xs text-[#D65A8A] font-semibold">Hmm, that email looks off — try again?</p>
      )}
      <p className="mt-4 text-[10px] tracking-[0.2em] uppercase text-[#C99BB7] font-medium">
        No spam, just sparkle. Unsubscribe anytime.
      </p>
    </div>
  );
}