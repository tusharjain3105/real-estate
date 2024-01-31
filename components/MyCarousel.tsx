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
import { ReactNode } from "react";

const MyCarousel = ({
  items,
  className = "",
}: {
  className?: string;
  items: { src; href?: string; subitem?: ReactNode }[];
}) => {
  return (
    <Carousel autoPlayDelay={3000}>
      <CarouselContent>
        {items.map(({ src, href = "#", subitem }, idx) => (
          <CarouselItem
            key={idx}
            className={cn(
              "relative min-h-[2lh]",
              src && "aspect-[3]",
              className
            )}
          >
            {src && (
              <Link href={href}>
                <Image src={src} alt={href} fill />
              </Link>
            )}
            {subitem}
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-5" />
      <CarouselNext className="right-5" />
    </Carousel>
  );
};
export default MyCarousel;
