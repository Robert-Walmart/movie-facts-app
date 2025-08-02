'use client';

import { signIn } from 'next-auth/react';

export default function LoginForm() {
  return (
    <div>
      <button
        onClick={() => signIn('google', { callbackUrl: '/' })}
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Sign in with Google
      </button>
    </div>
  );
}