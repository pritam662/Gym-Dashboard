import ThemeToggle from '@/components/layout/ThemeToggle/theme-toggle';
import { cn } from '@/lib/utils';
import { MobileSidebar } from './mobile-sidebar';
import { UserNav } from './user-nav';
import Link from 'next/link';

export default function Header() {
  return (
    <div className="supports-backdrop-blur:bg-background/60 fixed left-0 right-0 top-0 z-20 border-b bg-background/95 backdrop-blur">
      <nav className="flex h-14 items-center justify-between px-4">
        <div className="flex hidden w-[80px] justify-center lg:block lg:w-auto">
          <Link href={'/'}>
            <div className="flex items-center space-x-2">
              <img
                src="https://w7.pngwing.com/pngs/1018/952/png-transparent-man-holding-barbell-garage-gym-fitness-centre-computer-icons-physical-fitness-bodybuilding-white-logo-monochrome-thumbnail.png"
                alt="logo"
                width={70}
                height={90}
                className="mt-2 object-contain"
              />
              <span className="text-2xl font-bold">GYM Dashbord</span>
            </div>
          </Link>
        </div>

        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          {/* <UserNav /> */}
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
