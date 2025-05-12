import { SidebarData } from '@/models/types'
import { ActivitySquare, Fingerprint, Gauge, LayoutDashboard, Lock, LogInIcon, ShieldCheck, SnailIcon, SquareUserRound, User2Icon } from 'lucide-react'

export const sidebarData: SidebarData = {
  user: {
    name: 'Sajid Khan',
    email: 'sajid@example.com',
    avatar: '#',
  },
  teams: [
    {
      name: 'Sajid Khan',
      logo: SnailIcon,
      plan: '',
    }
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/dashboard',
          icon: Gauge,
        },
        // {
        //   title: 'Users',
        //   url: '/users',
        //   icon: SquareUserRound,
        // },
        // {
        //   title: 'Roles',
        //   url: '/roles',
        //   icon: ShieldCheck,
        // },
        // {
        //   title: 'Permissions',
        //   url: '/permissions',
        //   icon: Lock,
        // },
        // {
        //   title: 'Activity Logs',
        //   url: '/activity',
        //   icon: ActivitySquare,
        // },
        // {
        //   title: 'Dashboard',
        //   url: '/user-dashboard',
        //   icon: LayoutDashboard,
        // },
        // {
        //   title: 'Role Assignment',
        //   url: '/user-roles',
        //   icon: Fingerprint,
        // },
      ],

    },
    {
      title: 'Settings',
      items: [
        {
          title: 'Users',
          icon: User2Icon,
          items: [
            {
              title: 'Dashboard',
              url: '/user-dashboard',
            },
            {
              title: 'Users',
              url: '/users',
            },
            {
              title: 'Roles',
              url: '/roles',
            },
            {
              title: 'Role Assignment',
              url: '/roles',
            },
            {
              title: 'Permissions',
              url: '/user-roles',
            },
            {
              title: 'Activity Logs',
              url: '/activity',
            },
          ],
        }]
    }
  ],
}