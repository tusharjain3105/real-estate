import { Mail, Phone } from "lucide-react";
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import Logo from "./Logo";
import Tabs from "./Tabs";
import { Separator } from "./ui/separator";
import { getProjectsSubtabs } from "@/server-actions";

const Footer = async () => {
  return (
    <footer className="bg-orange-400 text-white shadow">
      <section className="p-2 md:px-20 md:py-10 grid md:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-5">
        <div>
          <Logo />
          <p className="text-lg">
            Welcome to the pinnacle of enchantment, a realm of heavenly bliss:
          </p>
          <p className="mt-2">
            Embark on a journey of curiosity,fueled by the fervor for what lies
            ahead
          </p>
        </div>
        <div>
          <div className="text-xl uppercase mb-3 font-semibold">
            Quick Links
          </div>
          <Tabs
            axis="y"
            className="text-sm gap-2"
            tabClassName="p-0 capitalize"
            hiddenTabs={["Projects"]}
          />
        </div>
        <div>
          <div className="text-xl uppercase mb-3 font-semibold">Projects</div>
          <Tabs
            axis="y"
            className="text-sm gap-2"
            tabClassName="p-0 capitalize"
            items={await getProjectsSubtabs()}
          />
        </div>
        <div>
          <div className="text-xl uppercase mb-3 font-semibold">
            Reach Us At
          </div>
          <div className="flex gap-1 items-center mb-2 p-2 bg-black/10 rounded-md">
            {/* <LocateFixedIcon /> */}
            <address>
              ICONIC INFRA GROUP 4th Floor,
              <br /> Above D-Mart, Vansthalipuram Hyderabad,
              <br /> Telangana - 500070
            </address>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between">
            <div className="flex gap-1 items-center">
              <Mail size={14} /> help@iconic.com
            </div>
            <div className="flex gap-1 items-center">
              <Phone size={14} /> +91 9876543210
            </div>
          </div>
          <div className="text-xl uppercase mt-6 mb-3 font-semibold">
            Follow Us
          </div>
          <div className="flex gap-5 justify-center items-center mb-10">
            <Link
              href="https://facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook size={38} />
            </Link>
            <Link
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram size={38} />
            </Link>
            <Link
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin size={38} />
            </Link>
            <Link
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaTwitter size={38} />
            </Link>
          </div>
        </div>
      </section>
      <section className="bg-orange-500 p-2 md:px-20 md:py-5 md:flex justify-between text-sm text-center">
        <p>© {new Date().getFullYear()} Real estate LLP- All rights reserved</p>
        <div className="flex gap-2 justify-center items-center">
          <Link href="/privacy">Privacy Policy</Link>
          <Separator orientation="vertical" className="h-3" />
          <Link href="/terms-and-conditions">Terms & Conditions</Link>
          <Separator orientation="vertical" className="h-3 hidden md:block" />
          <Link className="hidden md:block" href="#">
            Designed by : So-Effort solution
          </Link>
        </div>
        <Link className="md:hidden" href="#">
          Designed by : So-Effort solution
        </Link>
      </section>
    </footer>
  );
};
export default Footer;
