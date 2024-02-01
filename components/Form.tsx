import { db } from "@/prisma/prisma";
import SubmitButton from "./SubmitButton";

export const Form = async () => {
  const projects = await db.project.findMany({
    where: {
      active: true,
    },
    select: {
      title: true,
    },
  });

  const saveContact = async (data: FormData) => {
    "use server";
    const name = data.get("name") as string;
    const project = data.get("project") as string;
    const email = data.get("email") as string;
    const phoneNumber = data.get("phone") as string;
    const whatsappNumber = data.get("whatsapp") as string;

    try {
      await prisma.project.update({
        where: {
          title: project,
        },
        data: {
          contacts: {
            create: {
              name,
              phoneNumber,
              whatsappNumber,
              email,
            },
          },
        },
      });
    } catch (e) {}
  };

  return (
    <div className="flex justify-center items-center pt-10 pb-10">
      <div className="bg-white w-auto h-aotu p-8 rounded-lg">
        <h2 className="text-2xl font-bold text-center text-orange-600 mb-2">
          Reach out to us
        </h2>
        <h6 className="text-3xl font-bold mb-2">Book Free Consultation</h6>
        <form action={saveContact} className="space-y-1 group">
          <label htmlFor="project" className="block font-medium">
            Property
          </label>
          <select
            name="project"
            id="project"
            className="w-full p-1 border rounded-lg"
          >
            {projects.map(({ title }) => (
              <option key={title} value={title}>
                {title}
              </option>
            ))}
          </select>

          <label htmlFor="name" className="block font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="w-full p-1 border rounded-lg"
            required
          />

          <label htmlFor="email" className="block font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Email"
            className="w-full p-1 border rounded-lg"
          />

          <label htmlFor="phone" className="block font-medium">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            placeholder="Phone"
            className="w-full p-1 border rounded-lg"
            required
          />

          <label htmlFor="whatsapp" className="block font-medium">
            WhatsApp Number
          </label>
          <input
            type="tel"
            id="whatsapp"
            name="whatsapp"
            placeholder="WhatsApp Number"
            className="w-full p-1 border rounded-lg"
          />

          <div className="my-5">
            <input type="checkbox" id="privacy" />
            <label htmlFor="privacy"> Terms & Conditions</label>
          </div>

          <div>
            <SubmitButton className="w-full p-2 bg-orange-500 hover:bg-orange-600  text-white rounded-lg cursor-pointer hover-orange-800 group-has-[#privacy:not(:checked)]:opacity-30 group-has-[#privacy:not(:checked)]:pointer-events-none">
              Submit
            </SubmitButton>
          </div>
        </form>
      </div>
    </div>
  );
};
