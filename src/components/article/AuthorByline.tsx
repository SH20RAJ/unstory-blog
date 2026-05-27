import Link from "next/link";
import Image from "next/image";

interface AuthorBylineProps {
  author: {
    name: string;
    slug: string;
    bio?: string | null;
    avatarUrl?: string | null;
  };
}

export function AuthorByline({ author }: AuthorBylineProps) {
  return (
    <div className="flex items-start gap-4 rounded-[6px] border border-un-border bg-un-paper p-5">
      <Link href={`/author/${author.slug}`} className="flex-shrink-0">
        {author.avatarUrl ? (
          <Image 
            src={author.avatarUrl} 
            alt={author.name} 
            width={64} 
            height={64} 
            className="rounded-full grayscale transition-all duration-300 hover:grayscale-0" 
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-un-surface font-serif text-xl font-bold text-un-muted">
            {author.name.charAt(0)}
          </div>
        )}
      </Link>
      <div className="flex flex-col space-y-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-brand">Written By</span>
        <Link href={`/author/${author.slug}`}>
          <h4 className="font-serif text-xl font-bold text-un-text transition-colors hover:text-brand">
            {author.name}
          </h4>
        </Link>
        {author.bio && (
          <p className="max-w-lg text-sm leading-relaxed text-un-muted">
            {author.bio}
          </p>
        )}
      </div>
    </div>
  );
}
