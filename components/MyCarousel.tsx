import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const MyCarousel = ({
  items,
  className = "",
}: {
  className?: string;
  items: { src; href?: string }[];
}) => {
  return (
    <Carousel autoPlayDelay={3000}>
      <CarouselContent>
        {items.map(({ src, href = "#" }, idx) => (
          <CarouselItem
            key={idx}
            className={cn("relative aspect-[3]", className)}
          >
            <Link href={href}>
              <Image src={src} alt={href} fill />
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-5" />
      <CarouselNext className="right-5" />
    </Carousel>
  );
};
export default MyCarousel;
