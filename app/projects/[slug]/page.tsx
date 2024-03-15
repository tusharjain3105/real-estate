import TinyMCEEditor from "@/components/Editor";
import MyCarousel from "@/components/MyCarousel";
import SubmitButton from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { cn, indianPriceFormatter } from "@/lib/utils";
import { db } from "@/prisma/prisma";
import { Project } from "@prisma/client";
import { format } from "date-fns";
import { pick } from "lodash";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Metadata } from "next";
import { PopForm } from "@/components/PopForm";

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
    highlight,
    highlightImage,
    description,
    nearby = [...Array(4)],
    images = [...Array(5)],
  } = project;
  if (!nearby.length) nearby.push(...Array(4))

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
      "content",
      "highlight",
      "highlightImage",
      "description",
    );
    data.images = formData.getAll("images").filter(Boolean);
    const nearbyImages = formData.getAll("nearbyImages")
    const nearbyTimeToReach = formData.getAll("nearbyTimeToReach")
    const nearbyTitle = formData.getAll("nearbyTitle")

    data.nearby = [];
    for (const i in nearbyImages) {
      data.nearby.push({
        image: nearbyImages[i],
        timeToReach: nearbyTimeToReach[i],
        title: nearbyTitle[i]
      })
    }

    if (data.launchDate) {
      data.launchDate = new Date(data.launchDate);
    } else delete data.launchDate;
    data.priceStart = +data.priceStart;
    data.priceEnd = +data.priceEnd;
    data.emiStart = +data.emiStart;
    data.slug = data.title
      ?.toLowerCase()
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
    <div>
    

      <form className="p-3 md:py-8 md:px-32" action={onSave}>
        {/* hearder part of the page */}
        <div className="flex justify-between  my-2">
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
         
            <PopForm property={title}/>
          </div>
        </div>
        {/* end of header part */}

        <MyCarousel items={items} />
        {isEditMode && (
              <Input
                name="description"
                placeholder="Description"
                defaultValue={description}
                className="w-full"
              />
            ) }
        {isEditMode ? (
          <TinyMCEEditor name="content" defaultValue={content} />
        ) : (
          <div className="my-2" dangerouslySetInnerHTML={{ __html: content }}></div>
        )}
        <div className='md:flex  px-4 mb-5 bg-orange-100 rounded-md'>
          <div className='md:w-1/2  md:flex-col '>
            <div className='location mb-10'>
              <h5 className="text-lg mt-5">-----Location highlight</h5>
              <h2 className="text-2xl font-medium md:mt-4 mt-2">{title} Of Connectivity</h2>
            </div>

            {isEditMode ? (
              <TinyMCEEditor name="highlight" defaultValue={highlight} />
            ) : (
              <div className="my-1" dangerouslySetInnerHTML={{ __html: highlight }}></div>
            )}

            {isEditMode ? (
              <Input
                name="highlightImage"
                placeholder="Highlight Image"
                defaultValue={highlightImage}
                className="my-1"
              />
            ) :
              highlightImage && <Image src={highlightImage} height={300} width={500} alt='lacaton information' />
            }
          </div>
          {/* here the location highlight starts */}
          {isEditMode ? <div className="space-y-2">
            {nearby.map((p, i) => <div key={i}>
              <Input
                name="nearbyImages"
                placeholder={"Highlight Image " + (i + 1)}
                defaultValue={p?.image}
                className="my-1"
              />
              <Input
                name="nearbyTimeToReach"
                placeholder="Time to Reach"
                defaultValue={p?.timeToReach}
                className="my-1"
              />
              <Input
                name="nearbyTitle"
                placeholder="Near by palce Name"
                defaultValue={p?.title}
                className="my-1"
              />
            </div>)}
          </div> :
            <div className='location-information  mt-5 md:mt-28  flex-1 '>
              <div className={cn("flex ", isEditMode && "flex-col")}>
                <div className='grid flex-1 place-items-center'>
                  <Image src={nearby[0]?.image} height={100} width={100} alt="ramuji" className='bg-orange-500 rounded-full' />
                  <h2 className="text-2xl">{nearby[0]?.timeToReach}</h2>
                  <h5 className="text-lg">{nearby[0]?.title}</h5>
                </div>
                <div className='grid flex-1 place-items-center'>
                  <Image src={nearby[1]?.image} height={100} width={100} alt="ramuji" className='bg-orange-500 rounded-full' />
                  <h2 className="text-2xl">{nearby[1]?.timeToReach}</h2>
                  <h5 className="text-lg">{nearby[1]?.title}</h5>
                </div>
              </div>
              <div className={cn("flex md:mt-10", isEditMode && "flex-col")}>
                <div className='grid flex-1 place-items-center'>
                  <Image src={nearby[2]?.image} height={100} width={100} alt="ramuji" className='bg-orange-500 rounded-full' />
                  <h2 className="text-2xl">{nearby[2]?.timeToReach}</h2>
                  <h5 className="text-lg">{nearby[2]?.title}</h5>
                </div>
                <div className='grid flex-1 place-items-center'>
                  <Image src={nearby[3]?.image} height={100} width={100} alt="ramuji" className='bg-orange-500 rounded-full' />
                  <h2 className="text-2xl">{nearby[3]?.timeToReach}</h2>
                  <h5 className="text-lg">{nearby[3]?.title}</h5>
                </div>
              </div>
              <center className="mt-5 md:mt-20">
                <Link href='#contact' className='scroll-smooth bg-orange-500 text-white  p-3 rounded  text-center'>Get Price</Link>
              </center>
            </div>
          }
        </div>
        {/* End fo location highlight */}

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
    </div>
  );
};
export default ProjectPage;
export async function generateMetadata({params:{slug}}: {params: {slug: string};}):Promise<Metadata> {
  const project =
  (await db.project.findUnique({
    where: {
      slug,
    },
  })) || {};
  

  return {
    title: project.title,
    description:"",
  }
}