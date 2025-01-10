import Spinner from "../_components/Spinner";

// Topic: Streaming Route Segment With loading.js File
// loading.js sub route
function Loading() {
  return (
    <div className="grid justify-center items-center">
      <Spinner />
      <p className="text-xl text-primary-200">Loading cabin data...</p>
    </div>
  );
}

export default Loading;
