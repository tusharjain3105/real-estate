import { Menu } from "lucide-react";
import Logo from "./Logo";
import Tabs from "./Tabs";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";

const Header = () => {
  return (
    <header className="p-2 md:px-20 md:py-3 bg-orange-400 text-white shadow sticky top-0 z-10">
      <nav className="flex justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>
        <div>
          <Tabs className="hidden md:flex" />
        </div>
        <div className="block md:hidden">
          <Sheet>
            <SheetTrigger>
              <Menu />
            </SheetTrigger>
            <SheetContent className="bg-orange-400 text-white">
              <Tabs />
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};
export default Header;
