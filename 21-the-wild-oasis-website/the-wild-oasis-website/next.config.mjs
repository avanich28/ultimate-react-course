/** @type {import('next').NextConfig} */
const nextConfig = {
  // Topic: Fetching and Displaying Cabin List
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wyvaelfsxsywibczrymk.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
    ],
  },
  // Topic: Static Site Generation (SSG)
  // NOTE After we specify the output, our site will get completely exported as static assets that we can deploy anywhere.
  // 1. Setting output as 'export'
  // 2. npm run build
  // 3. Get file named 'out' -> no server side code. It's all static assets. Try to open in browser
  // 4. If we don't use Vercel, there are 2 ways for exporting images a) <img/> b) Cloudinary
  // https://nextjs.org/docs/pages/building-your-application/deploying/static-exports
  // output: "export",
};

export default nextConfig;
