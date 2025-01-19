import { auth } from "../_lib/auth";

export const metadata = {
  title: "Guest area",
};

// Topic: Adding Nested Routes and Pages
async function Page() {
  // Topic: Building a Custom Sign In Page
  const session = await auth();
  // Topic: Creating a New Guest on First Sign In
  // console.log(session);

  const firstName = session.user.name.split(" ").at(0);

  return (
    <h2 className="font-semibold text-2xl text-accent-400 mb-7">
      Welcome, {firstName}
    </h2>
  );
}

export default Page;
