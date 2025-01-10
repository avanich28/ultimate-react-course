// Topic: Defining Routes and Pages

import Counter from "@/app/_components/Counter";

// Settings > custom label > **/app/**/page.js > Page: ${dirname} */
// NOTE Not allow react hook in this server component
async function Page() {
  // Topic: Fetching Data in a Page
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await res.json();

  // console.log(data); // Render from server -> console in terminal

  return (
    <div>
      <h1>Cabins page</h1>

      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>

      {/* NOTE Show bridge between client and server component via 'prop' */}
      <Counter users={data} />
    </div>
  );
}

export default Page;
