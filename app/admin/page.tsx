import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { db } from "@/prisma/prisma";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

const AdminPage = async ({ searchParams }) => {
  let { token, page, take } = searchParams;
  page = +page || 1;
  take = +take || 25;
  const skip = (page - 1) * take;
  token ||= cookies().get("AUTH_TOKEN");
  if (token !== process.env.AUTH_TOKEN) redirect("/");

  const contacts = await db.contact.findMany({
    where: {},
    skip,
    take,
  });

  const totalContacts = await db.contact.count({ where: {} });
  const totalPages = Math.ceil(totalContacts / take);

  const projects = await prisma.project.findMany({
    select: {
      slug: true,
      title: true,
      active: true,
    },
  });

  return (
    <div className="p-2">
      <div className="mb-2 flex gap-2 w-full overflow-auto">
        {projects.map(({ slug, title, active }) => (
          <Link key={title} href={`/projects/${slug}?token=${token}`}>
            <Badge className={cn(!active && "opacity-50")}>{title}</Badge>
          </Link>
        ))}
        <Link href={`/projects/add-new?token=${token}`}>
          <Badge variant="secondary">+ Add New</Badge>
        </Link>
      </div>
      <div className="header">
        <div className="text-lg font-semibold py-3 border-b">
          Leads ({totalContacts})
        </div>
      </div>
      <div className="main">
        <Table>
          <TableHeader>
            <TableHead>Created At</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone No</TableHead>
            <TableHead>Whatsapp No</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Project</TableHead>
          </TableHeader>
          <TableBody>
            {contacts.map((p) => (
              <TableRow key={p.id}>
                <TableCell>
                  {Intl.DateTimeFormat("en-in", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(p.createdAt)}
                </TableCell>
                <TableCell>{p.name}</TableCell>
                <TableCell>{p.phoneNumber}</TableCell>
                <TableCell>{p.whatsappNumber}</TableCell>
                <TableCell>{p.email}</TableCell>
                <TableCell>{p.projectName}</TableCell> 
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Pagination className="mt-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href={`/admin?${new URLSearchParams({
                  ...searchParams,
                  page: page - 1,
                })}`}
                className={cn(page <= 1 && "pointer-events-none opacity-50")}
              />
            </PaginationItem>
            {page} / {totalPages}
            <PaginationItem>
              <PaginationNext
                className={cn(
                  page >= totalPages && "pointer-events-none opacity-50"
                )}
                href={`/admin?${new URLSearchParams({
                  ...searchParams,
                  page: page + 1,
                })}`}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
  // const projects = await prisma.project.findMany({
  //   select: {
  //     title: true,
  //     _count: {
  //       select: {
  //         contacts: true,
  //       },
  //     },
  //   },
  // });

  // return (
  //   <div className="p-2 space-y-2">
  //     {projects.map((p) => (
  //       <div
  //         key={p.title}
  //         className="p-2 bg-orange-100 flex justify-between items-center rounded-md"
  //       >
  //         <div className="font-semibold text-lg text-orange-600">{p.title}</div>
  //         <div>
  //           Leads:
  //           <Button className="font-semibold text-lg bg-orange-600 ml-2">
  //             {Intl.NumberFormat("en-in").format(p._count.contacts)}
  //           </Button>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
};
export default AdminPage;
