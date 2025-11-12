import Image from "next/image";
import Link from "next/link";
import { User } from "@/lib/schemas";
import { Mail } from "lucide-react";

interface UserCardProps {
  user: User;
}

export default function UserCard({ user }: UserCardProps) {
  return (
    <Link
      href={`/users/${user.id}`}
      className='block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer'
    >
      <div className='flex items-center gap-4'>
        <div className='rounded-full overflow-hidden shrink-0 w-16 h-16'>
          <Image
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            width={64}
            height={64}
            priority
            style={{ width: "100%", height: "100%" }}
          />
        </div>
        <div className='flex-1'>
          <h3 className='font-semibold text-lg'>
            {user.first_name} {user.last_name}
          </h3>
          <div className='flex items-center gap-2 text-sm text-gray-600 mt-1'>
            <Mail className='w-4 h-4' />
            <span>{user.email}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
