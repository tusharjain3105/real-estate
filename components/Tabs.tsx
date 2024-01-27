import { cn } from "@/lib/utils";
import Tab from "./Tab";

const Tabs = ({
  axis = null,
  className = "",
  tabClassName = "",
  items = [
    {
      title: "Home",
      href: "/",
      className: "",
    },
    {
      title: "Blogs",
      href: "/blogs",
      className: "",
    },
    {
      title: "Projects",
      href: "/#projects",
      className: "",
      subtabs: [
        {
          title: "Iconic's RRR County",
          href: "/projects/rrr-county",
          className: "",
        },
        {
          title: "Iconic's Metro County",
          href: "/projects/metro-county",
          className: "",
        },
        {
          title: "Iconic's Treasure County",
          href: "/projects/treasure-county",
          className: "",
        },
        {
          title: "Iconic's Vintage County",
          href: "/projects/vintage-county",
          className: "",
        },
      ],
    },
    {
      title: "About Us",
      href: "/about-us",
      className: "",
    },
    {
      title: "Contact Us",
      href: "/contact-us",
      className: "",
    },
    {
      title: "Gallery",
      href: "/gallery",
      className: "",
    },
  ],
}) => {
  return (
    <ul
      className={cn(
        "flex flex-col md:flex-row gap-5 md:items-center uppercase font-semibold text-lg",
        axis === "x" && "flex-row md:flex-row",
        axis === "y" && "flex-col md:flex-col items-start md:items-start",
        className
      )}
    >
      {items.map((item) => (
        <li key={item.title} className="relative group">
          <Tab href={item.href} className={cn(tabClassName, item.className)}>
            {item.title}
          </Tab>
          {!!item.subtabs?.length && (
            <div className="absolute hidden group-hover:block top-[120%] bg-orange-500 p-2 rounded-md w-60 shadow z-20">
              <Tabs
                axis="y"
                className="text-sm gap-2"
                tabClassName="p-0 capitalize"
                items={item.subtabs}
              />
            </div>
          )}
        </li>
      ))}
    </ul>
  );
};
export default Tabs;
