"use client";

import { useState } from "react";
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
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async (page: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_REQRES_KEY || "",
        },
      });
      const data = await response.json();
      setUsers(data.data);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (page: number) => {
    fetchUsers(page);
  };

  const handleUserCreated = () => {
    // Refresh the user list
    fetchUsers(currentPage);
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

      {isLoading ? (
        <div className='text-center py-12 text-gray-600'>Loading...</div>
      ) : (
        <>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </>
      )}

      <CreateUserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUserCreated}
      />
    </>
  );
}
