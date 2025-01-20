import CabinList from "@/components/CabinList";
import { getCabins } from "@/lib/data-service";

// Topic: Fetching Data With getStaticProps (SSG)
// NOTE This is one of the Next.js API
// All codes inside getStaticProps will always be rendered in server.
// React component cannot be an async function and cannot run data fetching right at the top level. Even if we could, that data would be fetched on the client and not on the server where we want it.
// We want to fetch data on the server so that this page can be server site rendered and send HTML to the browser.
// So, being pre-rendered instead of being client side rendered in the browser like we do in traditional React

// NOTE In the pages Router, the rendering strategy is determined by the way in which we fetch data.
// Next.js will decide to render a page statically or dynamically depends whether we use getStaticProps or getSeverSideProps
// Manually control by developers, not automatically decide by Next.js

// Statically generated (SSG)
// Fetch at build time and all request get the same data
export async function getStaticProps() {
  const cabins = await getCabins();
  return { props: { cabins }, revalidate: 3600 }; // NOTE Change from SSG to ISR
}

function Cabins({ cabins }) {
  // console.log(cabins);

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature&apos;s beauty in your own little
        home away from home. The perfect spot for a peaceful, calm vacation.
        Welcome to paradise.
      </p>

      <CabinList cabins={cabins} />
    </div>
  );
}

export default Cabins;
