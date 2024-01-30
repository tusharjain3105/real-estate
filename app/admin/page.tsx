import { Button } from "@/components/ui/button";
import { saveCookie } from "@/server-actions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const AdminPage = async ({ searchParams: { token } }) => {
  token ||= cookies().get("AUTH_TOKEN");
  if (token !== process.env.AUTH_TOKEN) redirect("/");
  saveCookie("AUTH_TOKEN", token, {
    expires: 1000 * 60 * 60 * 3,
  });

  const projects = await prisma.project.findMany({
    select: {
      title: true,
      _count: {
        select: {
          contacts: true,
        },
      },
    },
  });

  return (
    <div className="p-2 space-y-2">
      {projects.map((p) => (
        <div
          key={p.title}
          className="p-2 bg-orange-100 flex justify-between items-center rounded-md"
        >
          <div className="font-semibold text-lg text-orange-600">{p.title}</div>
          <div>
            Leads:
            <Button className="font-semibold text-lg bg-orange-600 ml-2">
              {Intl.NumberFormat("en-in").format(p._count.contacts)}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default AdminPage;
