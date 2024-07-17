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

export type SIDEBAR_PROPS = SidebarItem;
