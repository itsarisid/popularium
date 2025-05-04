import { SidebarData } from '@/models/types'
import {
    IconBarrierBlock,
    IconBrowserCheck,
    IconError404,
    IconHelp,
    IconLock,
    IconNotification,
    IconPalette,
    IconServerOff,
    IconSettings,
    IconTool,
    IconUserCog,
    IconUserOff,
  } from '@tabler/icons-react'
  import { Gauge, Fingerprint , Egg, Bug, SnailIcon } from 'lucide-react'
  
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
      {
        title: 'Pages',
        items: [
          {
            title: 'Auth',
            icon: Fingerprint ,
            items: [
              {
                title: 'Sign In',
                url: '/sign-in',
              },
              {
                title: 'Sign In (2 Col)',
                url: '/sign-in-2',
              },
              {
                title: 'Sign Up',
                url: '/sign-up',
              },
              {
                title: 'Forgot Password',
                url: '/forgot-password',
              },
              {
                title: 'OTP',
                url: '/otp',
              },
            ],
          },
          {
            title: 'Errors',
            icon: Bug,
            items: [
              {
                title: 'Unauthorized',
                url: '/401',
                icon: IconLock,
              },
              {
                title: 'Forbidden',
                url: '/403',
                icon: IconUserOff,
              },
              {
                title: 'Not Found',
                url: '/404',
                icon: IconError404,
              },
              {
                title: 'Internal Server Error',
                url: '/500',
                icon: IconServerOff,
              },
              {
                title: 'Maintenance Error',
                url: '/503',
                icon: IconBarrierBlock,
              },
            ],
          },
        ],
      },
      {
        title: 'Other',
        items: [
          {
            title: 'Settings',
            icon: IconSettings,
            items: [
              {
                title: 'Profile',
                url: '/settings',
                icon: IconUserCog,
              },
              {
                title: 'Account',
                url: '/settings/account',
                icon: IconTool,
              },
              {
                title: 'Appearance',
                url: '/settings/appearance',
                icon: IconPalette,
              },
              {
                title: 'Notifications',
                url: '/settings/notifications',
                icon: IconNotification,
              },
              {
                title: 'Display',
                url: '/settings/display',
                icon: IconBrowserCheck,
              },
            ],
          },
          {
            title: 'Help Center',
            url: '/help-center',
            icon: IconHelp,
          },
        ],
      },
    ],
  }