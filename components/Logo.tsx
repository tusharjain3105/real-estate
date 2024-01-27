import Image from "next/image";
import logo from "@/public/logo.png";

const Logo = () => {
  return (
    <div className="flex md:grid place-items-center gap-2">
      <Image
        src={logo}
        alt="Logo"
        height={50}
        width={50}
        className="bg-white rounded-full"
      />
      <div className="uppercase font-2xl font-semibold">
        <span className="text-orange-700">ICONIC</span>
        <span className="text-blue-500 ml-1">INFRA GROUP</span>
      </div>
    </div>
  );
};
export default Logo;
