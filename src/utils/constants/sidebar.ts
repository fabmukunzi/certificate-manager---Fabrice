import { SIDEBAR_PROPS } from '../types/sidebar';
import { HomeIcon, MenuIcon } from '../../assests/icons';
import routes from '../routes';

export const SIDEBAR_ITEMS: SIDEBAR_PROPS[] = [
  {
    id: 1,
    name: routes.startPage.label,
    icon: HomeIcon,
    url: routes.startPage.url,
  },
  {
    id: 2,
    name: 'Machine Learning',
    icon: MenuIcon,
    subItems: [
      {
        id: 3,
        name: routes.example1.label,
        url: routes.example1.url,
      },
      {
        id: 4,
        name: routes.example2.label,
        url: routes.example2.url,
      },
      {
        id: 5,
        name: routes.example3.label,
        url: routes.example3.url,
      },
    ],
  },
];
