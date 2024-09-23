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
    name: 'Certificates',
    icon: MenuIcon,
    subItems: [
      {
        id: 3,
        name: routes.certificates.label,
        url: routes.certificates.url,
      },
      {
        id: 4,
        name: routes.newCertificate.label,
        url: routes.newCertificate.url,
      },
    ],
  },
];
