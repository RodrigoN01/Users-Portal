"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { UpdateUserSchema, UpdateUserInput } from "@/lib/schemas";
import { ArrowLeft, Save, Trash2 } from "lucide-react";
import Button from "@/components/Button";

interface UserDetailClientProps {
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
  };
}

export default function UserDetailClient({ user }: UserDetailClientProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<UpdateUserInput>({
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      // Validate with Zod
      const validatedData = UpdateUserSchema.parse(formData);

      // Submit to API
      const response = await fetch(`https://reqres.in/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_REQRES_KEY || "",
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        throw new Error("Failed to update user");
      }

      setSuccessMessage("User updated successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this user?")) {
      return;
    }

    setIsDeleting(true);
    setErrors({});

    try {
      const response = await fetch(`https://reqres.in/api/users/${user.id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_REQRES_KEY || "",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete user");
      }

      // Redirect to home page after successful deletion
      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      }
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => router.push("/")}
        className='flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 cursor-pointer'
      >
        <ArrowLeft className='w-5 h-5' />
        Back to Users
      </button>

      <div className='max-w-2xl'>
        <div className='border border-gray-200 rounded-lg p-6'>
          <div className='flex items-center gap-6 mb-8'>
            <Image
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              width={96}
              height={96}
              className='rounded-full'
              priority
            />
            <div>
              <h1 className='text-3xl font-semibold'>
                {user.first_name} {user.last_name}
              </h1>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-4'>
            {errors.general && (
              <div className='bg-red-50 text-red-600 p-3 rounded-lg text-sm'>
                {errors.general}
              </div>
            )}

            {successMessage && (
              <div className='bg-green-50 text-green-600 p-3 rounded-lg text-sm'>
                {successMessage}
              </div>
            )}

            <div>
              <label
                htmlFor='first_name'
                className='block text-sm font-medium mb-2'
              >
                First Name
              </label>
              <input
                id='first_name'
                type='text'
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                className='w-full px-3 py-2 rounded-lg focus:outline-none bg-gray-50'
              />
              {errors.first_name && (
                <p className='text-red-600 text-sm mt-1'>{errors.first_name}</p>
              )}
            </div>

            <div>
              <label
                htmlFor='last_name'
                className='block text-sm font-medium mb-2'
              >
                Last Name
              </label>
              <input
                id='last_name'
                type='text'
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                className='w-full px-3 py-2 rounded-lg focus:outline-none bg-gray-50'
              />
              {errors.last_name && (
                <p className='text-red-600 text-sm mt-1'>{errors.last_name}</p>
              )}
            </div>

            <div>
              <label htmlFor='email' className='block text-sm font-medium mb-2'>
                Email
              </label>
              <input
                id='email'
                type='email'
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className='w-full px-3 py-2 rounded-lg focus:outline-none bg-gray-50'
              />
              {errors.email && (
                <p className='text-red-600 text-sm mt-1'>{errors.email}</p>
              )}
            </div>

            <div className='flex gap-3 pt-4'>
              <Button
                type='submit'
                variant='primary'
                disabled={isSubmitting}
                icon={Save}
              >
                {isSubmitting ? "Saving..." : "Save Changes"}
              </Button>

              <Button
                type='button'
                variant='danger'
                disabled={isDeleting}
                icon={Trash2}
                onClick={handleDelete}
              >
                {isDeleting ? "Deleting..." : "Delete User"}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
