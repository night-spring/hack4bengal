'use client';
import { useUser, UserButton } from '@civic/auth/react';


export default function LoginPage() {
  const { user, isLoading, error, signOut } = useUser();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Civic Login</h1>
      <UserButton />
      {user ? (
        <div className="mt-4">
          <p>Welcome, {user.name || user.email || user.id}</p>
          <button
            onClick={() => signOut()}
            className="mt-2 text-red-500 underline"
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  );
}
