import { SidebarData } from '@/models/types'
  import { Gauge, SnailIcon, SquareUserRound } from 'lucide-react'
  
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
        ],
      },
    ],
  }