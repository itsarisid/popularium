import { SidebarData } from '@/models/types'
  import { Gauge, SnailIcon } from 'lucide-react'
  
  export const sidebarData: SidebarData = {
    user: {
      name: 'Sajid Khan',
      email: 'sajid@example.com',
      avatar: '/avatars/shadcn.jpg',
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
        ],
      },
    ],
  }