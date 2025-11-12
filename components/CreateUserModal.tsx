"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { CreateUserSchema, CreateUserInput } from "@/lib/schemas";

interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateUserModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateUserModalProps) {
  const [formData, setFormData] = useState<CreateUserInput>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSubmitting(true);

    try {
      // Validate with Zod
      const validatedData = CreateUserSchema.parse(formData);

      // Submit to API
      const response = await fetch("https://reqres.in/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": process.env.NEXT_PUBLIC_REQRES_KEY || "",
        },
        body: JSON.stringify(validatedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create user");
      }

      // Reset form and close modal
      setFormData({ username: "", email: "", password: "" });
      onSuccess();
      onClose();
    } catch (error) {
      if (error instanceof Error) {
        setErrors({ general: error.message });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50'>
      <div className='bg-white rounded-lg shadow-lg w-full max-w-md mx-4'>
        <div className='flex items-center justify-between border-b border-gray-200 p-6'>
          <h2 className='text-xl font-semibold'>Create New User</h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 cursor-pointer'
          >
            <X className='w-6 h-6' />
          </button>
        </div>

        <form onSubmit={handleSubmit} className='p-6 space-y-4'>
          {errors.general && (
            <div className='bg-red-50 text-red-600 p-3 rounded-lg text-sm'>
              {errors.general}
            </div>
          )}

          <div className='bg-blue-50 text-blue-600 p-3 rounded-lg text-sm mb-4'>
            <strong>Note:</strong> Only predefined users can register. Use an
            existing email (e.g., eve.holt@reqres.in) for both username and
            email fields.
          </div>

          <div>
            <label
              htmlFor='username'
              className='block text-sm font-medium mb-2'
            >
              Username (use email)
            </label>
            <input
              id='username'
              type='email'
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
              placeholder='eve.holt@reqres.in'
            />
            {errors.username && (
              <p className='text-red-600 text-sm mt-1'>{errors.username}</p>
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
              className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
              placeholder='eve.holt@reqres.in'
            />
            {errors.email && (
              <p className='text-red-600 text-sm mt-1'>{errors.email}</p>
            )}
          </div>

          <div>
            <label
              htmlFor='password'
              className='block text-sm font-medium mb-2'
            >
              Password
            </label>
            <input
              id='password'
              type='password'
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800'
            />
            {errors.password && (
              <p className='text-red-600 text-sm mt-1'>{errors.password}</p>
            )}
          </div>

          <div className='flex gap-3 pt-4'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isSubmitting}
              className='flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors disabled:opacity-50'
            >
              {isSubmitting ? "Creating..." : "Create User"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
