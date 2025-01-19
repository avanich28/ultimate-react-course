import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  // Topic: Getting the User Session
  // NOTE auth can call in any server component that we want
  // IMPT Calling auth function (in the navigation) makes every single route here is now dynamic rendering because this authentication works with cookies and headers. So, this auth function needs to read these cookies from the incoming request. These cookies can only be known at runtime, so never at build time. (If we just statically build this site, we cannot know all the users that might eventually be logged in.)
  const session = await auth();
  // console.log(session);

  return (
    <nav className="z-10 text-xl">
      <ul className="flex gap-16 items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-4"
            >
              <img
                className="h-8 rounded-full"
                src={session.user.image}
                alt={session.user.name}
                referrerPolicy="no-referrer"
              />
              <span>Guest area</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
