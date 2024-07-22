import { ReactNode } from 'react';

export interface SubItem {
  id: number;
  name: string;
  url: string;
}

export interface SidebarItem {
  id: number;
  name: string;
  icon: ReactNode;
  url?: string;
  subItems?: SubItem[];
}

export type SidebarItemProps = {
  item: SIDEBAR_PROPS;
  activeRoute: string;
  isSubMenuCollapsed: boolean;
  setActiveRoute: (open: string) => void;
  setIsSubMenuCollapsed: (open: boolean) => void;
  setIsSideBarOpen: (open: boolean) => void;
};

export type SIDEBAR_PROPS = SidebarItem;
