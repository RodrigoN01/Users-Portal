# Users Portal

A minimalist user management application built with Next.js 15+ App Router and ReqRes API.

## Features

- **User List**: Browse paginated users with server-side rendering
- **User Details**: View and edit individual user information
- **Create Users**: Register new users (requires existing ReqRes email)
- **Delete Users**: Remove users with confirmation
- **Form Validation**: Client-side validation using Zod schemas
- **Responsive Design**: Clean, minimalist UI with Tailwind CSS v4

## Tech Stack

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- Zod (validation)
- Lucide React (icons)
- ReqRes API

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file:

```bash
NEXT_PUBLIC_REQRES_KEY=reqres-free-v1
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Usage

- **Browse**: Navigate through paginated user lists
- **View/Edit**: Click any user card to view details and edit their information
- **Create**: Click "Create User" and use an existing ReqRes email (e.g., eve.holt@reqres.in) for username and email fields
- **Delete**: Click the delete button on the user detail page (requires confirmation)

## Project Structure

```
app/
  ├── page.tsx              # Home page (user list)
  └── users/[id]/page.tsx   # User detail page
components/
  ├── Button.tsx            # Reusable button component
  ├── CreateUserModal.tsx   # User registration modal
  ├── Pagination.tsx        # Pagination controls
  ├── UserCard.tsx          # User card display
  ├── UserDetailClient.tsx  # User edit/delete form
  └── UserListClient.tsx    # User list state management
lib/
  └── schemas.ts            # Zod validation schemas
```

## API Integration

- `GET /api/users?page={page}` - Fetch paginated users
- `GET /api/users/{id}` - Fetch single user
- `POST /api/register` - Create new user
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user

## License

MIT
