import Link from "next/link";
import Image from "next/image";
export default function CoverImage({ title, coverImageUrl, slug }) {
  return (
    <div className="relative aspect-video overflow-hidden rounded-md mb-6">
      <Link href={`/blogs/${slug}`}>
        <Image
          src={coverImageUrl}
          alt={title}
          fill
          className="object-cover object-center hover:scale-110 transition-all duration-300 ease-out"
          quality={90}
        />
      </Link>
    </div>
  );
}
