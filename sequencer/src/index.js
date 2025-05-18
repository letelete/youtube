import { registerRoot } from 'remotion';

import { Sequencer } from './lib/sequencer';

registerRoot(function RemotionRoot() {
  return (
    <>
      <Sequencer id='v0' />
    </>
  );
});
