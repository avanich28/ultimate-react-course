import Image from "next/image";
import Link from "next/link";
import bg from "@/public/bg.png";

export default function Home() {
  return (
    <main>
      {/* Topic: Navigating Between Pages */}
      {/* <Navigation /> */}

      {/* Topic: Building the Home Page */}
      <Image
        src={bg}
        fill
        placeholder="blur"
        quality={80}
        className="object-cover object-top"
        alt="Mountains and forests with two cabins"
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          The Wild Oasis. Welcome to paradise.
        </h1>
        {/* 1) Hard reload */}
        {/* <a href="/cabins">Explore luxury cabins</a> */}

        {/* 2) Link in Next.js prefetch all routes that are linked on a certain page. */}
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
