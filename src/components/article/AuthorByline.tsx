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
    <div className="flex items-start space-x-4 p-6 rounded-lg bg-premium-gray border border-premium-border">
      <Link href={`/author/${author.slug}`} className="flex-shrink-0">
        {author.avatarUrl ? (
          <Image 
            src={author.avatarUrl} 
            alt={author.name} 
            width={64} 
            height={64} 
            className="rounded-full grayscale hover:grayscale-0 transition-all duration-300" 
          />
        ) : (
          <div className="w-16 h-16 rounded-full bg-premium-border flex items-center justify-center text-xl font-serif font-bold text-premium-muted">
            {author.name.charAt(0)}
          </div>
        )}
      </Link>
      <div className="flex flex-col space-y-2">
        <span className="text-[10px] uppercase tracking-[0.2em] text-brand font-bold">Written By</span>
        <Link href={`/author/${author.slug}`}>
          <h4 className="text-xl font-serif font-bold text-white hover:text-brand transition-colors">
            {author.name}
          </h4>
        </Link>
        {author.bio && (
          <p className="text-premium-muted text-sm leading-relaxed max-w-lg">
            {author.bio}
          </p>
        )}
      </div>
    </div>
  );
}
