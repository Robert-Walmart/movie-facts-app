import { NextRequest, NextResponse } from 'next/server';
import { getServerAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getMovieFact } from '@/lib/openai';

export async function GET(request: NextRequest) {
  const session = await getServerAuthSession();
  
  if (!session?.user?.email) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user?.favoriteMovie) {
      return NextResponse.json({ message: 'No favorite movie found' }, { status: 400 });
    }

    const fact = await getMovieFact(user.favoriteMovie);
    return NextResponse.json({ fact });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}