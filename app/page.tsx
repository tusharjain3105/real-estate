import MyCarousel from "@/components/MyCarousel";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";

const HomePage = () => {
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

      {/* <div className="p-3 md:px-32 md:my-16">
        <div className="title text-lg md:text-xl uppercase my-3">Projects</div>
      </div> */}
      <div id="projects"></div>
      <Project />
      <Project />
      <Project />
      <Project />
    </div>
  );
};
export default HomePage;

const Project = ({
  title = "Iconic's RRR County",
  description = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Et voluptas delectus explicabo veniam totam, nobis blanditiis voluptatum cumque aspernatur quasi iste, inventore dolore nihil eos obcaecati iusto qui nam temporibus?",
  images = ["/rrr1.jpeg", "/rrr2.jpeg", "/rrr3.jpeg", "/rrr4.jpeg"],
  href = "/",
}) => {
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
