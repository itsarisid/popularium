import { SidebarData } from '@/models/types'
  import { ActivitySquare, Gauge, LayoutDashboard, Lock, ShieldCheck, SnailIcon, SquareUserRound } from 'lucide-react'
  
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
          {
            title: 'Users',
            url: '/users',
            icon: SquareUserRound,
          },
          {
            title: 'Roles',
            url: '/roles',
            icon: ShieldCheck,
          },
          {
            title: 'Permissions',
            url: '/permissions',
            icon: Lock,
          },
          {
            title: 'Activity Logs',
            url: '/activity',
            icon: ActivitySquare,
          },
          {
            title: 'Dashboard',
            url: '/user-dashboard',
            icon: LayoutDashboard,
          },
        ],
      },
    ],
  }