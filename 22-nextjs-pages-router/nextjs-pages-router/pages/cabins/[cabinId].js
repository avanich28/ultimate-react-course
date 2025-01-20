// Topic: Dynamic Routes
// NOTE Can freely use hook bcs it is not a server component

import CabinView from "@/components/CabinView";
import { getCabin } from "@/lib/data-service";
import Head from "next/head";
import { useRouter } from "next/router";

// Topic: fetching Data With getServerSideProps (SSR)
// NOTE This API can get access query params

// Dynamically generated (SSR)
// CabinId can't be known at runtime -> Dynamic
export async function getServerSideProps({ params }) {
  const cabin = await getCabin(params.cabinId);
  return { props: cabin };
}

// NOTE The pages Router, you need to understand this way in which data fetching is closely tied to the rendering strategy. So the way in which each route is rendered does not depend on the cache, like in the app Router, but really on which function we decide to use here to fetch the data. And of course there would always be the option of also fetching data on the client just like we did earlier in vanilla React. So you could simply do that by using like a use effect right here, for example, in this component. Or you could use a library like React Query or SWR as well. But the point is that data fetching of course doesn't have to happen exclusively on the server. So we can mix and match server site fetching with client site fetching as we like. But since the whole point of having a framework like Next.js is server site rendering in the first place, it makes sense to fetch as much data as possible on the server in order to improve those initial loading times.

// This is how we could do SSG
// getStaticPaths + getStaticProps

function Cabin({ cabin }) {
  // const router = useRouter();

  return (
    <>
      {/* Topic: Defining Page Title and Favicon */}
      <Head>
        {/* <title>Cabin {router.query.cabinId} // The Wild Oasis</title> */}
        <title>Cabin {cabin.name} // The Wild Oasis</title>
      </Head>

      {/* <div>Cabin #{router.query.cabinId}</div> */}
      <div className="max-w-6xl mx-auto mt-8">
        <CabinView cabin={cabin} />
      </div>
    </>
  );
}

export default Cabin;
