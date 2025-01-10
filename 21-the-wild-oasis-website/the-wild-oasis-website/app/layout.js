import Logo from "@/app/_components/Logo";
import Navigation from "@/app/_components/Navigation";
import "@/app/_styles/globals.css";

// Topic: Loading nd Optimizing Fonts
import { Josefin_Sans } from "next/font/google";
import Header from "./_components/Header";
import { ReservationProvider } from "./_components/ReservationContext";

const josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });
// console.log(josefin); // show in terminal

// Topic: Creating a Layout

// NOTE Page metadata means page title.
export const metadata = {
  // Topic: Adding Page Metadata and Favicon
  // icon.png -> Next.js convention
  title: {
    template: "%s / The Wild Oasis",
    default: "Welcome / The Wild Oasis",
    description:
      "Luxurious cabin hotel, located in the heart of the heart of the Italian Dolomites, surrounded by beautiful mountains and dark forests",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* Topic: Styling With Tailwind CSS */}
      {/* Set up tailwind.config */}
      {/* npm i @heroicons/react */}
      <body
        className={`${josefin.className} bg-primary-950 text-primary-100 min-h-screen flex flex-col antialiased relative`}
      >
        {/* Topic: Improving the Navigation and Root Layout */}
        <Header />

        <div className="flex-1 px-8 py-12 grid">
          {/* NOTE: children prop replaces with the corresponding page (page.js) */}
          <main className="max-w-7xl mx-auto w-full">
            {/* Topic: Using the Context API for State Management */}
            {/* IMPT This children as server component has already been generated on the server, so we can pass into this client component. */}
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}
