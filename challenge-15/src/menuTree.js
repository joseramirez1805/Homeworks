// Estructura N-aria para el menú
export const menuTree = [
  {
    title: 'Profile',
    link: '/profile',
    component: 'ProfileComponent',
    children: [],
  },
  {
    title: 'Messages',
    link: '/messages',
    component: 'MessagesComponent',
    children: [],
  },
  {
    title: 'Settings',
    link: '/settings',
    component: 'SettingsComponent',
    children: [
      {
        title: 'Account',
        link: '/settings/account',
        component: 'AccountComponent',
        children: [
          {
            title: 'Security & Privacy',
            link: '/settings/account/security',
            component: 'SecurityComponent',
            children: [],
          },
        ],
      },
      {
        title: 'Password',
        link: '/settings/password',
        component: 'PasswordComponent',
        children: [],
      },
      {
        title: 'Notification',
        link: '/settings/notification',
        component: 'NotificationComponent',
        children: [],
      },
    ],
  },
  {
    title: 'Help',
    link: '/help',
    component: 'HelpComponent',
    children: [
      {
        title: "FAQ's",
        link: '/help/faqs',
        component: 'FaqComponent',
        children: [],
      },
      {
        title: 'Submit a Ticket',
        link: '/help/ticket',
        component: 'TicketComponent',
        children: [],
      },
      {
        title: 'Network Status',
        link: '/help/network',
        component: 'NetworkComponent',
        children: [],
      },
    ],
  },
];