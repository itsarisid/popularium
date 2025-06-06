import React from 'react';
import { SidebarTrigger } from '../components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import { ModeToggle } from '../theme/theme-toggle';
import { Breadcrumbs } from '../components/elements/breadcrumbs';
import { NavUser } from './nav-user';
import { sidebarData } from '@/data/sidebar-data';

export default function Header() {
  return (
    <header className='flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
      <div className='flex items-center gap-2 px-4'>
        <SidebarTrigger className='-ml-1' />
        <Separator orientation='vertical' className='mr-2 h-4' />
        <Breadcrumbs />
      </div>

      <div className='flex items-center gap-2 px-4'>
        <ModeToggle />
        {/* <ThemeSelector /> */}
        <NavUser user={sidebarData.user} />
      </div>
    </header>
  );
}