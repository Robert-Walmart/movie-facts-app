import { redirect } from 'next/navigation';
import { getServerAuthSession } from '@/lib/auth';
import LoginForm from './LoginForm';

export default async function LoginPage() {
  const session = await getServerAuthSession();

  if (session) {
    redirect('/');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Welcome to Movie Facts
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Sign in to discover interesting facts about your favorite movies
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}