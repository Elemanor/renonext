import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function PostJobTab() {
  const router = useRouter();

  useEffect(() => {
    router.push('/job/post/category');
  }, [router]);

  return null;
}
