import { CoreMenu } from '@core/types';

//? DOC: http://localhost:7777/demo/vuexy-angular-admin-dashboard-template/documentation/guide/development/navigation-menus.html#interface

export const menu: CoreMenu[] = [
  //mindhub
  {
    id: 'mindhub',
    title: 'Mindhub',
    type: 'collapsible',
    icon: 'feather',
    badge: {
      title: '1',
      classes: 'badge-light-info badge-pill'
    },
    children: [
      {
        id: 'tempogramme',
        title: 'Tempogramme',
        type: 'item',
        icon: 'circle',
        url: 'mindhub/tempogramme'
      },
      {
        id: 'procupo',
        title: 'Procupo',
        type: 'item',
        icon: 'circle',
        url: 'mindhub/procupo'
      }
    ]
  },
];
