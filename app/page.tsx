import MyCarousel from "@/components/MyCarousel";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

const HomePage = async () => {
  const projects = await prisma.project.findMany({
    where: {
      active: true,
    },
    select: {
      slug: true,
      title: true,
      description: true,
      images: true,
    },
  });
  return (
    <div>
      <MyCarousel
        items={[
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
        ]}
      />

      <div id="projects"></div>
      {projects.map((p) => (
        <Project key={p.title} href={`/projects/${p.slug}`} {...p} />
      ))}
    </div>
  );
};
export default HomePage;

const Project = ({ title, description, images, href }) => {
  const TitleAndDesc = (
    <>
      <div className="text-2xl font-semibold">{title}</div>
      <Separator className="my-2" />
      <div>{description}</div>
      <Button
        size="lg"
        variant="orange"
        className="my-5 px-10 uppercase"
        asChild
      >
        <Link href={href}>Check Now</Link>
      </Button>
    </>
  );

  return (
    <div
      className="p-3 md:px-32 grid gap-10 md:grid-cols-2 py-10 items-center 
    odd:bg-orange-100 group"
    >
      <div className="group-odd:hidden">{TitleAndDesc}</div>
      <div className="relative aspect-[1.5]">
        <Image src={images[0]} alt={title} fill />
      </div>
      <div className="group-even:hidden">{TitleAndDesc}</div>
    </div>
  );
};
