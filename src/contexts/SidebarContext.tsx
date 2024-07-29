import { createContext, useState, useContext, ReactNode, FC } from 'react';

interface SidebarContextProps {
  isSideBarOpen: boolean;
  setIsSideBarOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

interface SidebarProviderProps {
  children: ReactNode;
}

export const SidebarProvider: FC<SidebarProviderProps> = ({ children }) => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <SidebarContext.Provider value={{ isSideBarOpen, setIsSideBarOpen }}>
      {children}
    </SidebarContext.Provider>
  );
};
