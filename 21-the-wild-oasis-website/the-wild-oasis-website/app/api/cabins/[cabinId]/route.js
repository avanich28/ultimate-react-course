import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

// Topic: Creating an API Endpoint WIth Route Handlers
// route localhost:3000/api
// named file: route.js

export async function GET(request, { params }) {
  // console.log(request);
  // console.log(params);
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);

    return Response.json({ cabin, bookedDates });
  } catch {
    return Response.json({ message: "Cabin not found" });
  }

  // return Response.json({ test: "test" });
}

// export async function POST() {}
