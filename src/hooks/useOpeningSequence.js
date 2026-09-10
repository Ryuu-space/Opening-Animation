import { useEffect, useState } from 'react';

const SEQUENCE_STATES = {
  COUNTDOWN: 'countdown',
  CUTTING: 'cutting',
  CELEBRATION: 'celebration',
  COMPLETE: 'complete',
};

const CUTTING_DURATION = 1100;
const CELEBRATION_DURATION = 5500;

const useOpeningSequence = (isCountdownComplete, enabled) => {
  const [sequenceState, setSequenceState] = useState(
    SEQUENCE_STATES.COUNTDOWN,
  );

  useEffect(() => {
    if (!enabled) {
      setSequenceState(SEQUENCE_STATES.COUNTDOWN);
      return undefined;
    }

    if (!isCountdownComplete) {
      setSequenceState(SEQUENCE_STATES.COUNTDOWN);
      return undefined;
    }

    setSequenceState(SEQUENCE_STATES.CUTTING);

    const celebrationTimer = window.setTimeout(() => {
      setSequenceState(SEQUENCE_STATES.CELEBRATION);
    }, CUTTING_DURATION);

    const completeTimer = window.setTimeout(() => {
      setSequenceState(SEQUENCE_STATES.COMPLETE);
    }, CUTTING_DURATION + CELEBRATION_DURATION);

    return () => {
      window.clearTimeout(celebrationTimer);
      window.clearTimeout(completeTimer);
    };
  }, [isCountdownComplete, enabled]);

  return {
    sequenceState,
    isCutting: sequenceState === SEQUENCE_STATES.CUTTING,
    isCelebrating: sequenceState === SEQUENCE_STATES.CELEBRATION,
    isComplete: sequenceState === SEQUENCE_STATES.COMPLETE,
  };
};

export { SEQUENCE_STATES };

export default useOpeningSequence;
