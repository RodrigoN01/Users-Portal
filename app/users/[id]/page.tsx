import UserDetailClient from "@/components/UserDetailClient";
import { UserSchema } from "@/lib/schemas";
import { notFound } from "next/navigation";

async function getUser(id: string) {
  const response = await fetch(`https://reqres.in/api/users/${id}`, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_REQRES_KEY || "",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    return null;
  }

  const data = await response.json();

  // Validate user with Zod
  const user = UserSchema.parse(data.data);

  return user;
}

export default async function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUser(id);

  if (!user) {
    notFound();
  }

  return <UserDetailClient user={user} />;
}
