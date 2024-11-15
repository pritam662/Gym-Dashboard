'use client';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/dashboard');
  }, []);
  return (
    <div className="m-4 flex items-center justify-center">
      <div className="flex flex-row">
        <Loader2 className="animate-spin" />
        Loading...
      </div>
    </div>
  );
};

export default Home;
