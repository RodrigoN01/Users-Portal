import UserListClient from "@/components/UserListClient";
import { User, UserSchema } from "@/lib/schemas";

async function getUsers(page: number = 1) {
  const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
    headers: {
      "x-api-key": process.env.NEXT_PUBLIC_REQRES_KEY || "",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();

  // Validate users with Zod
  const users: User[] = data.data.map((user: unknown) =>
    UserSchema.parse(user)
  );

  return {
    users,
    page: data.page,
    totalPages: data.total_pages,
  };
}

export default async function Home() {
  const { users, page, totalPages } = await getUsers(1);

  return (
    <UserListClient
      initialUsers={users}
      initialPage={page}
      totalPages={totalPages}
    />
  );
}
