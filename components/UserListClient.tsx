"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import UserCard from "@/components/UserCard";
import Pagination from "@/components/Pagination";
import CreateUserModal from "@/components/CreateUserModal";
import { User } from "@/lib/schemas";
import { UserPlus } from "lucide-react";

interface UserListClientProps {
  initialUsers: User[];
  initialPage: number;
  totalPages: number;
}

export default function UserListClient({
  initialUsers,
  initialPage,
  totalPages,
}: UserListClientProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePageChange = (page: number) => {
    router.push(`/?page=${page}`);
  };

  const handleUserCreated = () => {
    // Refresh the current page
    router.refresh();
  };

  return (
    <>
      <div className='flex items-center justify-between mb-8'>
        <h2 className='text-2xl font-semibold'>Users</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className='flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors cursor-pointer'
        >
          <UserPlus className='w-5 h-5' />
          Create User
        </button>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {initialUsers.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>

      <Pagination
        currentPage={initialPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUserCreated}
      />
    </>
  );
}
