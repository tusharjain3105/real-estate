import { cn } from "@/lib/utils";
import { getProjectsSubtabs } from "@/server-actions";
import Tab from "./Tab";

const Tabs = async ({
  axis = null,
  className = "",
  tabClassName = "",
  hiddenTabs = [],
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
      subtabs: getProjectsSubtabs(),
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
        "flex flex-col md:flex-row gap-5 md:items-center uppercase font-normal text-lg",
        axis === "x" && "flex-row md:flex-row",
        axis === "y" && "flex-col md:flex-col items-start md:items-start",
        className
      )}
    >
      {items.map(async (item) => {
        if (hiddenTabs.includes(item.title)) return null;
        const subtabs = await item.subtabs;
        if (item.title)
          return (
            <li key={item.title} className="relative group">
              <Tab
                href={item.href}
                className={cn(tabClassName, item.className)}
              >
                {item.title}
              </Tab>
              {!!subtabs?.length && (
                <div className="absolute hidden group-hover:block top-[120%] bg-orange-500 p-2 rounded-md w-60 shadow z-20">
                  <Tabs
                    axis="y"
                    className="text-sm gap-2"
                    tabClassName="p-0 capitalize"
                    items={subtabs}
                  />
                </div>
              )}
            </li>
          );
      })}
    </ul>
  );
};
export default Tabs;
