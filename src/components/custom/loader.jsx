import { LoaderCircle } from "lucide-react";

function Loader() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="animate-spin">
        <LoaderCircle size={30} />
      </div>
    </div>
  );
}

export default Loader;
