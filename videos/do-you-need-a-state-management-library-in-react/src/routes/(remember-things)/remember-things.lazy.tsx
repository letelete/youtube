import { useState } from 'react';

import { createLazyFileRoute } from '@tanstack/react-router';

import { Counter } from '@/components/counter';

export const Route = createLazyFileRoute('/(remember-things)/remember-things')({
  component: RememberThingsPage,
});

function RememberThingsPage() {
  const [counter, setCounter] = useState(0);

  return (
    <div className='container flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-2'>
      <Counter
        minValue={1}
        maxValue={10}
        onChange={(incrementBy) => setCounter((value) => value + incrementBy)}
        value={counter}
        incrementBy={1}
      />
    </div>
  );
}
