import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";
import ReservationReminder from "../_components/ReservationReminder";

// Topic: Experimenting With Catching and ISR
// npm run prod
// If we change some data in Supabase, the data will still be the same because the route defines as a static, and Next.js caches the data
// IMPT Opt out the data cache, which will automatically opt out the full route cache.
// NOTE Force route to be dynamic
// No variable and math ex. const test = 30, 12*3
// export const revalidate = 0 // Data always be revalidated
export const revalidate = 3600; // second value only
// export const revalidate = 15; // test

// Topic: Adding Page Metadata and Favicon
export const metadata = {
  title: "Cabins",
};

// export default async function Page() {
export default function Page({ searchParams }) {
  // CHANGE
  // Topic: Fetching and Displaying Cabin List
  // console.log("Starting...");
  // const cabins = await getCabins();
  // console.log(cabins);

  // Topic: Sharing State Between Client and Server: The URL
  // NOTE Use searchParams -> This page can no longer be statically rendered, it will be dynamically rendered. So, there is no need to revalidate a page
  // console.log(searchParams);
  const filter = searchParams?.capacity ?? "all";

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      {/* <p>{Math.random()}</p> */}
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* Topic: Streaming UI With Suspense: Cabin List */}
      {/* NOTE Suspense replaces loading.js in cabins folder */}
      {/* NOTE Fallback will not be shown again if the Suspense is wrapped in transition */}
      {/* NOTE Reset Suspense with key prop in order to trigger fallback */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
        {/* Topic: Using the Context API for State Management */}
        <ReservationReminder />
      </Suspense>
    </div>
  );
}
