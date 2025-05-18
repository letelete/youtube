import React, { JSX, useMemo } from 'react';
import { z } from 'zod';
import { Block, HighlightedCodeBlock, parseRoot } from 'codehike/blocks';
import {
  AbsoluteFill,
  Composition,
  Sequence,
  interpolateColors,
  useCurrentFrame,
} from 'remotion';
import {
  AnnotationHandler,
  HighlightedCode,
  InnerLine,
  Pre,
} from 'codehike/code';
import { tokenTransitions, useTokenTransitions } from './token-transitions';

import Content from './content.mdx';
const StepSchema = Block.extend({
  code: HighlightedCodeBlock,
});
const Schema = Block.extend({
  steps: z.array(StepSchema),
});
const { steps } = parseRoot(Content, Schema);

interface SequenceConfig {
  fps: number;
  width: number;
  height: number;
  durationInFrames: number;
}

interface SequencerContextState {
  config: SequenceConfig;
}

const SequencerContext = React.createContext<null | SequencerContextState>(
  null
);

const useSequencerContext = () => {
  const context = React.useContext(SequencerContext);

  if (!context) {
    throw new Error(
      `\`SequencerContext\` must be used within \`useSequencerContext\``
    );
  }

  return context;
};
useSequencerContext.displayName = 'useSequencerContext';

const SequencerContextProvider = ({
  children,
  ...props
}: React.PropsWithChildren<SequencerContextState>) => {
  const contextValue = React.useMemo(() => ({ ...props }), [props]);

  return (
    <SequencerContext.Provider value={contextValue}>
      {children}
    </SequencerContext.Provider>
  );
};
SequencerContextProvider.displayName = 'SequencerContextProvider';

function Sequencer({
  id,
  fps = 60,
  width = 1920,
  height = 1080,
}: {
  id: string;
  fps?: number;
  width?: number;
  height?: number;
}) {
  const config = useMemo(
    () => ({ fps, width, height, durationInFrames: fps * steps.length }),
    [fps, width, height, steps.length]
  );

  return (
    <SequencerContextProvider config={config}>
      <Composition
        id={id}
        component={Video}
        defaultProps={{ steps }}
        durationInFrames={config.durationInFrames}
        fps={config.fps}
        width={config.width}
        height={config.height}
      />
    </SequencerContextProvider>
  );
}

function Video({ steps }: { steps: z.infer<typeof StepSchema>[] }) {
  const { config } = useSequencerContext();

  return (
    <AbsoluteFill
      style={{
        background: '#000',
        fontSize: 24,
        padding: 48,
      }}
    >
      {steps.map((step, index) => (
        <Sequence
          layout='none'
          key={index}
          from={config.fps * index}
          durationInFrames={config.fps}
          name={step.title}
        >
          <Code oldCode={steps[index - 1]?.code} newCode={step.code} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
}

function Code({
  oldCode,
  newCode,
}: {
  oldCode: HighlightedCode;
  newCode: HighlightedCode;
}) {
  const { config } = useSequencerContext();
  const { code, ref } = useTokenTransitions(oldCode, newCode, config.fps);

  return <Pre ref={ref} code={code} handlers={[mark, tokenTransitions]} />;
}

const mark: AnnotationHandler = {
  name: 'mark',
  Line: ({ annotation, ...props }) => {
    const color = annotation?.query || 'rgb(254 249 194)';
    return (
      <div
        className='...'
        style={{
          borderLeft: 'solid 2px transparent',
          borderLeftColor: annotation && color,
          backgroundColor: annotation && `rgb(from ${color} r g b / 0.1)`,
        }}
      >
        <InnerLine merge={props} className='...' />
      </div>
    );
  },
  Inline: ({ annotation, children }) => {
    const color = annotation?.query || 'rgb(254 249 194)';
    return (
      <span
        className='...'
        style={{
          outline: `solid 1px rgb(from ${color} r g b / 0.87)`,
          background: `rgb(from ${color} r g b / 0.16)`,
        }}
      >
        {children}
      </span>
    );
  },
};

export { Sequencer };
