import MyCarousel from "@/components/MyCarousel";
import { Button } from "@/components/ui/button";
import { db } from "@/prisma/prisma";
import { indianPriceFormatter } from "./page";

export const ProjectPage = async ({ params: { slug } }) => {
  slug = decodeURIComponent(slug);

  const project = await db.project.findUnique({
    where: {
      slug,
    },
  });

  // if (!project) redirect("/projects");
  const title = "Iconic's Metro County";
  const items = [
    {
      src: "/rrr1.jpeg",
    },
    {
      src: "/metro6.jpeg",
    },
    {
      src: "/treas1.jpeg",
    },
    {
      src: "/rrr4.jpeg",
    },
  ];
  const by = "Iconic Infra Group";
  const launchDate = new Date();
  const priceStart = 1725000;
  const priceEnds = 4221000;
  const emiStartsFrom = 23140;
  const address = "Srisailam Highway, Kothur, South Hyderabad, Hyderabad";
  const content = `
    Location highlights include the proximity to various essential amenities and landmarks. A mere 5-minute drive takes you to Pharma City Residential Township and the Amazon Data Center. Nearby are the Green Reach Villas, BTR, Srinidhi Villas, and Bharat Electronics Limited, offering convenience within reach.

Just a 10-minute drive away lies the ORR, providing easy access to major transportation routes. Within 15 minutes, you can reach the airport, while Fabcity and Mankhal Industrial SEZ are also within a short 10-minute drive.

Other nearby destinations include Ramky and MAK Villas, Bhashyam Intl. School & Sri Sri Inti School, Wonderla & R.R. Dist. Collectorate, and Adibatla & TCS, FOXCONN Company, all reachable within a 15-minute drive. Further out, Ibrahimpatnam, BDL, Octopus, NSG, and Gurunanak University are accessible within 30 minutes, while 1000 Acres Eliminedu Tata Aerospace SEZ, Hyundai Hub & Defence Park are just 20 minutes away.

As for project highlights, the layout is HMDA approved, featuring ready-to-construct plots with 100% Vaastu compliant designs. The land comes with clear titles, ensuring transparency and peace of mind for buyers. Infrastructure includes overhead water tanks, underground drainage, and a comprehensive underground waterline system.

The layout boasts well-maintained 60 & 30' Feet Black Top Roads, lined with avenue plantation and tree guards. Electric poles with street lights illuminate the pathways, while parks and children's play areas offer recreational spaces for residents. Rainwater harvesting further enhances the eco-friendly features of the project.
  `;

  return (
    <div className="p-3 md:px-32 md:py-8">
      <div className="flex justify-between my-2">
        <div className="address">{address}</div>
        <div>
          Launch Date:{" "}
          {Intl.DateTimeFormat("en-us", {
            dateStyle: "medium",
          }).format(launchDate)}
        </div>
      </div>
      <div className="flex justify-between mb-3">
        <div className="left">
          <h1 className="text-2xl font-semibold">{title}</h1>
          <h2 className="text-lg">By {by}</h2>
          <h3 className="text-lg">{address}</h3>
        </div>
        <div className="right text-right">
          <h1 className="text-2xl font-semibold">
            {indianPriceFormatter.format(priceStart / 100000)}L -{" "}
            {indianPriceFormatter.format(priceEnds / 100000)}L
          </h1>
          <h2>
            EMI starts from {indianPriceFormatter.format(emiStartsFrom / 1000)}K
          </h2>
          <Button variant="orange" className="uppercase mt-2">
            Contact
          </Button>
        </div>
      </div>

      <MyCarousel items={items} />
      <div className="my-2">{content}</div>
    </div>
  );
};
