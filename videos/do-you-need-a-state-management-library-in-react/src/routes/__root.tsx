import { memo, Suspense } from 'react';

import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { LinkButton } from '@/components/ui/button';
import { SpokeSpinningLoader } from '@/components/ui/loader';

export const Route = createRootRoute({
  component: memo(Root),
});

function Root() {
  return (
    <>
      <div className='flex justify-between gap-1 p-2'>
        <nav className='flex gap-1 overflow-auto'>
          <LinkButton to='/'>Home</LinkButton>

          <LinkButton to='/remember-things'>Remember things</LinkButton>

          <LinkButton to='/add-to-cart-with-usestate'>
            Add to cart with useState
          </LinkButton>
        </nav>

        <div>
          <ThemeToggleButton />
        </div>
      </div>
      <hr />

      <Suspense
        fallback={
          <div className='flex h-full w-full items-center justify-center'>
            <SpokeSpinningLoader />
          </div>
        }
      >
        <Outlet />
      </Suspense>

      <TanStackRouterDevtools />
    </>
  );
}
