import MyCarousel from "@/components/MyCarousel";
import { Button } from "@/components/ui/button";
import { indianPriceFormatter } from "@/lib/utils";
import { db } from "@/prisma/prisma";
import { redirect } from "next/navigation";

const ProjectPage = async ({ params: { slug } }) => {
  slug = decodeURIComponent(slug);
  const project = await db.project.findUnique({
    where: {
      slug,
    },
  });

  if (!project) redirect("/#projects");

  const {
    title,
    by,
    launchDate,
    priceStart,
    priceEnd,
    emiStart,
    address1,
    address2,
    content,
    images,
  } = project;

  const items = images.map((src) => ({ src }));

  return (
    <div className="p-3 md:px-32 md:py-8">
      <div className="flex justify-between my-2">
        <div className="address">{address1}</div>
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
          <h3 className="text-lg">{address2}</h3>
        </div>
        <div className="right text-right">
          <h1 className="text-2xl font-semibold">
            {indianPriceFormatter.format(priceStart / 100000)}L -{" "}
            {indianPriceFormatter.format(priceEnd / 100000)}L
          </h1>
          <h2>
            EMI starts from {indianPriceFormatter.format(emiStart / 1000)}K
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
export default ProjectPage;
