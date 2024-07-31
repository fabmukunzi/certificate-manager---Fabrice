import { initialUsers } from '@/utils/data/supplier';
import { IUser } from '@/utils/types/certificate';
import { createContext, useState, useContext, FC, ReactNode } from 'react';

interface UserContextType {
  currentUser: IUser | null;
  setCurrentUser: (user: IUser | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<IUser | null>(initialUsers[0]);

  return (
    <UserContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
