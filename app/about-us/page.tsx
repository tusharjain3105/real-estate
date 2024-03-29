import Image from "next/image";
import Aboutus from "@/public/about.png";
import Choutuppal_RRR from "@/public/choutuppal_RRR.png";
import Nm_rao from "@/public/nm_rao.jpg";
import Dv_rama from "@/public/dv_rama.jpg";

const AboutPage = () => {
  return (
    <div>
      <Image src={Aboutus} alt="about page" className="h-96 " />
      <div className="md:px-0 px-4 py-5">
        <div className="md:px-20  md:flex mt-4">
          <section className="md:w-1/2 mr-4 mt-12">
            <h4 className="text-orange-500 text-2xl font-semibold mb-2">
              _________Our Story
            </h4>
            <h1 className="text-xl mb-2">Iconic Infra Group</h1>
            <p>Discovering Exceptional Styles and Architecture</p>
            <p>
              {`In the dynamic realm of design, our studio stands as a beacon of
              creativity and innovation. We don't just create; we craft
              aesthetically stunning solutions that are as unique as you are.
              Our philosophy revolves around the rapid development of projects,
              embracing distinctive styles and architecture to cater to the
              individual needs of our clients.`}
            </p>
          </section>
          <section className="md:w-1/2 mt-4">
            <Image
              src={Choutuppal_RRR}
              alt="about page"
              className="w-full h-96 rounded-tl-[40%] rounded-br-[40%]"
            />
          </section>
        </div>
        <div className="flex mt-4 md:px-20  bg-orange-100 ">
          <section className="w-1/2 ">
            <center>
              <Image
                src={Nm_rao}
                alt="about page"
                className="h-80 w-4/5  rounded-md "
              />
            </center>
          </section>
          <section className="w-1/2 ">
            <h1 className="text-red-500 text-xl mb-2">MR. N M RAO</h1>
            <p className="text-xl mb-2">MANAGING DIRECTOR</p>
            <hr className="line"></hr>
            <p>
              {`MR. N M RAO is worked in the real estate sector for ten years. He
              is in charge of enhancing the overall foundation for the company's
              growth across all verticals and geographies with regard to
              marketing, sales, operations, and finance in his capacity as
              Chairman. He also participates in the conception and execution of
              Subhagruha projects.`}
            </p>
            <p className="pt-4">FORTUNE FAVOURS THE BRAVE</p>
          </section>
        </div>
        <div className="flex  mt-4 md:px-20 ">
          <section className="w-1/2">
            <h1 className="text-red-500  text-xl mb-2">MR. D V RAMA RAJU U</h1>
            <p className="text-xl mb-2">MANAGING DIRECTOR</p>
            <hr className="line"></hr>
            <p>
              Experience the Real Difference of our Real Services with us. A New
              World is Rising..
            </p>
            <p>{`Let's discover it together.`}</p>
          </section>
          <section className="w-1/2 ">
            <center>
              <Image
                src={Dv_rama}
                alt="about page"
                className="h-80  w-4/5 rounded-md"
              />
            </center>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
