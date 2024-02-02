import MyCarousel from "@/components/MyCarousel";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import Link from "next/link";
import Info from "@/public/info.jpg";
import Location from '@/public/lacation.png'
import { FaHandPointRight } from "react-icons/fa";
import { Form } from "@/components/Form";
import Ramuji from "@/public/romuji.png" 
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
      <section className="md:flex md:px-32  mb-10 px-4  bg-orange-100">
        <div className="mt-2 md:w-1/2">

          <p className="mt-20 md:text-4xl font-semibold mb-7">Why You Should Invest Right Now In January 2024 @ Iconic County?</p>
          <div className="flex mt-5">
            <FaHandPointRight className="mt-3 text-orange-700 " size={30} />
            <p className="mb-3 ">Located near RRR(Regional Ring Road) and ORR(Outer Ring Road), connecting all parts of the city</p>
          </div>
          <div className="flex">
            <FaHandPointRight className="mt-3 text-orange-700 " size={30} />
            <p className="mb-3">Prices are guaranteed to shoot up by more than 30%, due to upcoming developments in the Amangal Area</p>
          </div>
          <div className="flex">
            <FaHandPointRight className="mt-1 text-orange-700 " size={20} />
            <p className="mb-3"> Do not miss your chance </p>
          </div>
          <center className="md:mt-10 text-white">
            <button className="md:p-3 p-3 rounded-lg  bg-orange-500"> Schedule Site Visit</button>
          </center>
        </div>
        <div className="md:w-1/2 ">
          <Image
            src={Info}
            alt="about page"
            className="mt-2 h-[490px] rounded-md"
          />
        </div>
      </section>
      <div className='md:flex md:px-32 px-4 mb-5'>
        <div className='md:w-1/2  md:flex-col '>
          <div className='location mb-10'>
            <h5 className="text-lg">Location highlight</h5>
            <h2 className="text-2xl">Iconic RRR County Of Connectivity</h2>
          </div>
          <p className="mb-4">
            Beside proposed 300' Regional Ring Road. Project at choutuppal to valigonda 100 feet road. Closer to proposed dry Port. 20 Min Drive from ORR. Near Yadadri Temple. Warangal and Vijayawada Connecting Roads.
          </p>
          <p className="mb-4">
            Near to Many Schools & Engineering Colleges. Closer To Dandumalkapur Green Industrial Park. Closer To Pharmaceuticals and Laboratories Like SRINI. DIVIS, NOSCH.
          </p>
          <p className="mb-4">
            Closer To Proposed Dry Port. Future plan of High Speed Train. Proposed L B Nagar to Choutuppal Metro Rail.
          </p>
          <Image src={Location} alt='lacaton information'/>
        </div>

        <div className='location-information  mt-5 md:mt-10  flex-1 '>
          <div className="flex justify-evenly ">
            <div className=' text-center'>
              <Image src={Ramuji} alt="ramuji" className='bg-orange-500 rounded-full' />
              <h2>25 min</h2>
              <h5>Ramoji Film City</h5>
            </div>
            <div className=' text-center'>
            <Image src={Ramuji} alt="ramuji" className='bg-orange-500 rounded-full' />
              <h2>20 min</h2>
              <h5>Outer Ring Road (ORR)</h5>
            </div>
          </div>
          <div className="flex justify-evenly md:mt-10">
            <div className='text-center'>
            <Image src={Ramuji} alt="ramuji" className='bg-orange-500 rounded-full' />
              <h2>5 min</h2>
              <h5>Many Schools & <br />Engineering College</h5>
            </div>
            <div className=' text-center'>
            <Image src={Ramuji} alt="ramuji" className='bg-orange-500 rounded-full' />
              <h2>35 min</h2>
              <h5>RGIA</h5>
            </div>
          </div>
          <center className="mt-5 md:mt-20">
            <Link href='#contact' className='scroll-smooth bg-orange-500 text-white  p-3 rounded  text-center'>Get Price</Link>
          </center>
        </div>
      </div>
    
    <div className="flex flex-col md:flex-row items-center justify-center md:space-x-10  md:py-[100px] py-10 gap-10  md:px-32 px-4  bg-orange-100">
      <div className=" hover:bg-slate-50 bg-white rounded-full grid place-items-center h-64 w-64 ">
        <center>
        <p className="text-6xl font-bold text-gray-800">850</p>
        <p className="text-lg text-gray-600">HAPPY CLIENTS</p>
        </center>
      </div>
      <div className="  hover:bg-slate-50 bg-white rounded-full grid place-items-center h-64 w-64  ">
        <center>
        <p className="text-6xl font-bold text-gray-800">12</p>
        <p className="text-lg text-gray-600">YEARS OF EXPERIENCE</p>
        </center>
      </div>
      <div className=" hover:bg-slate-50 bg-white rounded-full grid place-items-center h-64 w-64 ">
        <center>
        <p className="text-6xl font-bold text-gray-800">20</p>
        <p className="text-lg text-gray-600">PROJECTS COMPLETED</p>
        </center>
      </div>
    </div>
    
    <div className="">
        <div>
          <center className="text-4xl font-bold">
          Bank Loan Available
          </center>
        </div>
    </div>

      <div id="contact" className="bg-hero-pattern">
        <Form />
      </div>
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
    <>
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
    </>
  );
};
