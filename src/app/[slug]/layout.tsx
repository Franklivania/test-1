import { Metadata } from "next";
import * as data from "@/data/posts.json";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { slug } = params;
  const post = Object.values(data).find((item: any) => item.slug === slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "The post you are looking for does not exist.",
    };
  }

  return {
    title: post.title,
    description: post.desc,
  };
}

export default function ItemLayout({ children, params }: { children: React.ReactNode, params: { slug: string } }) {
  const { slug } = params;
  const post = Object.values(data).find((item: any) => item.slug === slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <main role="presentation" className="max-w-5xl mx-auto px-[4%] py-12">
      <nav className="w-full flex items-center justify-between">
        <span>
          <Link href={`/${post.slug}`} className="text-slate-600">
            {post.title}
          </Link>


        </span>
      </nav>
      <div>
        {children}
      </div>
    </main>
  );
}
