import { redirect } from 'next/navigation';
import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import Dashboard from './Dashboard';

export default async function HomePage() {
  const session = await getServerAuthSession();

  if (!session?.user?.email) {
    redirect('/login');
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: {
      name: true,
      email: true,
      image: true,
      favoriteMovie: true,
    },
  });

  if (!user) {
    redirect('/login');
  }

  return (
    <Dashboard
      user={{
        name: user.name || '',
        email: user.email,
        image: user.image || '',
        favoriteMovie: user.favoriteMovie,
      }}
    />
  );
}