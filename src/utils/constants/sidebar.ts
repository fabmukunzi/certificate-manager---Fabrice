import { SIDEBAR_PROPS } from '../types/sidebar';
import { HomeIcon, MenuIcon } from '../../assests/icons';

export const SIDEBAR_ITEMS: SIDEBAR_PROPS[] = [
  {
    id: 1,
    name: 'Start',
    icon: HomeIcon,
    url: '/',
  },
  {
    id: 2,
    name: 'Machine Learning',
    icon: MenuIcon,
    subItems: [
      {
        id: 3,
        name: 'Example 1',
        url: '/example',
      },
      {
        id: 4,
        name: 'Example 2',
        url: '/example1',
      },
      {
        id: 5,
        name: 'Example 3',
        url: '/example2',
      },
    ],
  },
];
