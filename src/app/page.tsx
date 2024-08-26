import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="bg-white/70 px-[4%] py-4">
      <header className="w-full py-4 px-2 border-b border-b-slate-400 flex items-end justify-between">
        <h1 className="text-5xl leading-8 font-bold">Hello there</h1>

        <nav role="navigation">
          <Link href={'/about'} className="[*active: ] px-4 py-2 rounded-md hover:bg-slate-400">About</Link>
          <Link href={`/posts/`} className="[*active: ] px-4 py-2 rounded-md hover:bg-slate-400">Posts</Link>
          <Link
            href={'/item-1'}
            className="px-4 py-2 rounded-md hover:bg-slate-400"
          >
            Item 1
          </Link>
          <Link
            href={'/item-2'}
            className="px-4 py-2 rounded-md hover:bg-slate-400"
          >
            Item 2
          </Link>
        </nav>
      </header>

      <section className="p-6">
        <p>This is the home page</p>
      </section>
    </main>
  );
}
