import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-[70vh] grid place-items-center">
      <Loader2 className="animate-spin text-orange-500 text-lg" />
    </div>
  );
};

export default Loading;
