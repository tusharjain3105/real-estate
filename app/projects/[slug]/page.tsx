import TinyMCEEditor from "@/components/Editor";
import MyCarousel from "@/components/MyCarousel";
import SubmitButton from "@/components/SubmitButton";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { indianPriceFormatter } from "@/lib/utils";
import { db } from "@/prisma/prisma";
import { Project } from "@prisma/client";
import { format } from "date-fns";
import { pick } from "lodash";
import Link from "next/link";
import { redirect } from "next/navigation";

const ProjectPage = async ({
  params: { slug },
  searchParams: { token, preview = false },
}) => {
  const isAdmin = token === process.env.AUTH_TOKEN;
  const isNew = slug === "add-new";
  const isEditMode = isAdmin && (!preview || isNew);
  slug = decodeURIComponent(slug);
  const project =
    (await db.project.findUnique({
      where: {
        slug,
      },
    })) || {};

  if (!project && !isNew) redirect("/#projects");

  const {
    id,
    title,
    by,
    launchDate = new Date(),
    priceStart,
    priceEnd,
    emiStart,
    address1,
    address2,
    content,
    images = [...Array(5)],
  } = project;

  const items = images.map((src) => ({ src }));

  if (isEditMode) {
    items.forEach((item, idx) => {
      item.subitem = (
        <Input
          name="images"
          placeholder={`Image ${idx + 1}`}
          defaultValue={images[idx]}
          className="max-w-xl absolute left-1/2 -translate-x-1/2 bottom-2"
        />
      );
    });
  }

  const onSave = async (formData: FormData) => {
    "use server";
    const data: Project = pick(
      Object.fromEntries(formData.entries()),
      "title",
      "by",
      "launchDate",
      "priceStart",
      "priceEnd",
      "emiStart",
      "address1",
      "address2",
      "content"
    );
    data.images = formData.getAll("images").filter(Boolean);
    if (data.launchDate) {
      data.launchDate = new Date(data.launchDate);
    } else delete data.launchDate;
    data.priceStart = +data.priceStart;
    data.priceEnd = +data.priceEnd;
    data.emiStart = +data.emiStart;
    data.slug = data.title
      .toLowerCase()
      .replace(/[^a-z,0-9\s]/g, "")
      .replace(/\s/g, "-");
    try {
      if (id) {
        await prisma.project.update({
          where: {
            id,
          },
          data,
        });
      } else {
        await prisma.project.create({
          data,
        });
      }
    } catch (e) {
      console.log(e.message);
    }

    redirect(`/projects/${slug}?token=${token}&preview=true`);
  };

  return (
    <form className="p-3 md:px-32 md:py-8" action={onSave}>
      <div className="flex justify-between my-2">
        {isEditMode ? (
          <Input
            name="address1"
            placeholder="Address 1"
            defaultValue={address1}
            className="max-w-md"
          />
        ) : (
          <div className="address">{address1}</div>
        )}
        <div className="flex gap-1 items-center">
          Launch Date:
          <span className="ml-1">
            {isEditMode ? (
              <Input
                type="date"
                name="launchDate"
                defaultValue={format(launchDate, "yyyy-MM-dd")}
              />
            ) : (
              Intl.DateTimeFormat("en-us", {
                dateStyle: "medium",
              }).format(launchDate)
            )}
          </span>
        </div>
      </div>
      <div className="flex justify-between mb-3">
        <div className="left flex-1">
          {isEditMode ? (
            <Input
              name="title"
              placeholder="Project Name"
              defaultValue={title}
              className="max-w-md"
            />
          ) : (
            <h1 className="text-2xl font-semibold">{title}</h1>
          )}
          <h2 className="text-lg flex gap-1 items-center">
            By{" "}
            {isEditMode ? (
              <Input
                name="by"
                placeholder="By"
                defaultValue={by}
                className="max-w-md my-1"
              />
            ) : (
              by
            )}
          </h2>
          {isEditMode ? (
            <Input
              name="address2"
              placeholder="Address 2"
              defaultValue={address2}
              className="max-w-lg"
            />
          ) : (
            <h3 className="text-lg">{address2}</h3>
          )}
        </div>
        <div className="right text-right">
          {isEditMode ? (
            <div className="flex gap-1">
              <Input
                name="priceStart"
                placeholder="Start Price"
                defaultValue={priceStart}
                className="max-w-28"
              />{" "}
              -{" "}
              <Input
                name="priceEnd"
                placeholder="End Price"
                defaultValue={priceEnd}
                className="max-w-28"
              />
            </div>
          ) : (
            <h1 className="text-2xl font-semibold">
              {indianPriceFormatter.format(priceStart / 100000)}L -{" "}
              {indianPriceFormatter.format(priceEnd / 100000)}L
            </h1>
          )}
          {isEditMode ? (
            <Input
              name="emiStart"
              placeholder="EMI Starts From"
              defaultValue={emiStart}
              className="my-1"
            />
          ) : (
            <h2>
              EMI starts from {indianPriceFormatter.format(emiStart / 1000)}K
            </h2>
          )}
          <Button variant="orange" className="uppercase mt-2">
            Contact
          </Button>
        </div>
      </div>

      <MyCarousel items={items} />
      {isEditMode ? (
        <TinyMCEEditor name="content" defaultValue={content} />
      ) : (
        <div className="my-2">{content}</div>
      )}
      {isAdmin && (
        <div className="flex justify-end gap-2">
          {!isEditMode ? (
            <SubmitButton
              variant="orange"
              className="my-2 flex-1 md:flex-[unset] px-10"
              asChild
            >
              <Link href={`/projects/${slug}?token=${token}`}>Edit</Link>
            </SubmitButton>
          ) : (
            <SubmitButton
              variant="orange"
              className="my-2 flex-1 md:flex-[unset] px-10"
            >
              Save
            </SubmitButton>
          )}
        </div>
      )}
    </form>
  );
};
export default ProjectPage;
