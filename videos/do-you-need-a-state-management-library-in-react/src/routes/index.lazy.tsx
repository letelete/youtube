import { createLazyFileRoute } from '@tanstack/react-router';

import { Typography } from '@/components/ui/typography';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className='p-2'>
      <Typography variant='heading'>
        🔴 Do you need a state management library in React?
      </Typography>
    </div>
  );
}
