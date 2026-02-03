import { User } from 'lucia';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getAuth } from '../queries/getAuth';

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isFetched, setIsFetched] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const fetchUser = async () => {
      const authData = await getAuth();
      setUser(authData.user);
      setIsFetched(true);
    };
    fetchUser();
  }, [pathname]);

  return { user, isFetched };
};
