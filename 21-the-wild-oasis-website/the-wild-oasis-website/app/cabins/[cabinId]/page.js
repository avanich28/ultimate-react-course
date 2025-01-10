import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";
import Cabin from "@/app/_components/Cabin";
import { getCabin, getCabins } from "@/app/_lib/data-service";
import { Suspense } from "react";

// PLACEHOLDER DATA
const cabin = {
  id: 89,
  name: "001",
  maxCapacity: 2,
  regularPrice: 250,
  discount: 0,
  description:
    "Discover the ultimate luxury getaway for couples in the cozy wooden cabin 001. Nestled in a picturesque forest, this stunning cabin offers a secluded and intimate retreat. Inside, enjoy modern high-quality wood interiors, a comfortable seating area, a fireplace and a fully-equipped kitchen. The plush king-size bed, dressed in fine linens guarantees a peaceful nights sleep. Relax in the spa-like shower and unwind on the private deck with hot tub.",
  image:
    "https://dclaevazetcjjkrzczpc.supabase.co/storage/v1/object/public/cabin-images/cabin-001.jpg",
};

// Topic: Generating Dynamic Metadata
// IMPT The function name is convention.
export async function generateMetadata({ params }) {
  const { name } = await getCabin(params.cabinId);
  return { title: `Cabin ${name}` };
}

// Topic: Analyzing Rendering in Our App
// npm run build
// NOTE After building, Next.js defines the page of /cabins/[cabinId] as an dynamic route because the cabin is unknown, so it cannot pre-rendered.

// Topic: Making Dynamic Pages Static With generateStaticParams
// NOTE Let Next.js know the all possible values of a dynamic URL segment and then export those pages as static pages.
export async function generateStaticParams() {
  const cabins = await getCabins();

  const ids = cabins.map((cabin) => ({
    cabinId: String(cabin.id), // Not number bcs it is a param in url
  }));

  return ids;
}

// Topic: Dynamic Route Segments: Building the Cabin Page
// 1. In each CabinCard, href needs to fill the route id ex. /cabins/${id}
// 2. Create sub folder ex. [cabinId] -> params.cabinId
export default async function Page({ params }) {
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      {/* Topic: Data Fetching Strategies for the Reservation Section */}
      <Cabin cabin={cabin} />

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>

        {/* NOTE Shift + alt + o -> cancel unused import */}
        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
