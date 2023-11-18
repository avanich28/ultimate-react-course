// Topic: Displaying a Loading Indicator (2)
function Loader() {
  return (
    // Topic: Absolute Positioning, z-index, and More (1)
    // (2) in index.css
    <div className="absolute inset-0 flex items-center justify-center bg-slate-200/20 backdrop-blur-sm">
      <div className="loader"></div>
    </div>
  );
}

export default Loader;
