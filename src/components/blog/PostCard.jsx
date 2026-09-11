import { Link } from "react-router-dom";
import { Image } from "@/components/ui/image";

const CATEGORY_LABEL = {
  coffee: "Coffee",
  cafes: "Cafés",
  pilates: "Pilates",
  wellness: "Wellness",
  travel: "Travel",
};

export default function PostCard({ post, index = 0 }) {
  const offsetClass = index % 4 === 0 ? "md:mt-0" : index % 4 === 1 ? "md:mt-16" : index % 4 === 2 ? "md:mt-8" : "md:mt-24";

  return (
    <Link to={`/post/${post.slug}`} className={`group block ${offsetClass}`}>
      <div className="aspect-[4/5] overflow-hidden bg-[#F3D5DE] rounded-[2rem] shadow-soft mb-5 transition-all duration-500 group-hover:shadow-soft-lg group-hover:-translate-y-1">
        <Image
          src={post.cover_image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
          fittingType="fill"
        />
      </div>
      <span className="inline-block text-[10px] tracking-[0.32em] uppercase text-white bg-[#D65A8A] rounded-full px-3 py-1 mb-3 font-bold">
        {CATEGORY_LABEL[post.category] || post.category}
      </span>
      <h3 className="text-xl md:text-2xl font-semibold text-[#2A0A1F] leading-tight tracking-[-0.01em] group-hover:text-[#D65A8A] transition-colors">
        {post.title}
      </h3>
      {post.subtitle && (
        <p className="mt-3 text-sm text-[#8A4A6E] leading-relaxed line-clamp-2">{post.subtitle}</p>
      )}
    </Link>
  );
}