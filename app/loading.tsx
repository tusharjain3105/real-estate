import { Loader2 } from "lucide-react";

const Loading = () => {
  return (
    <div className="h-[70vh] grid place-items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};

export default Loading;
