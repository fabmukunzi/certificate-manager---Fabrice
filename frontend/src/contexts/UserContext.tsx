import { UserDto } from '@/utils/types';
import { createContext, useState, useContext, FC, ReactNode } from 'react';

interface UserContextType {
  currentUser: UserDto | null;
  setCurrentUser: (user: UserDto | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserDto | null>({
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    plant: 'Plant A',
    department: 'Engineering',
    email: 'johndoe@example.com',
    userId: 'L2N8Z2',
  });

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
