import { useMemo, useState } from 'react';

import useCountdown from '../hooks/useCountdown';
import useOpeningSequence from '../hooks/useOpeningSequence';

import {
  getOpeningTimestamp,
  getSettings,
} from '../utils/animationSettings';

import '../styles/opening-animation.css';


/* =========================================
   COUNTDOWN
========================================= */

const formatNumber = (value) =>
  String(value).padStart(2, '0');

const Countdown = ({ time }) => {
  const units = [
    time.days,
    time.hours,
    time.minutes,
    time.seconds,
  ];

  return (
    <div
      className="countdown"
      aria-label="Opening countdown"
    >
      {units.map((value, index) => (
        <div
          className="countdown__group"
          key={index}
        >
          <div className="countdown__unit">
            <span className="countdown__value">
              {formatNumber(value)}
            </span>
          </div>

          {index < units.length - 1 && (
            <span className="countdown__separator">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
};


/* =========================================
   RIBBON
========================================= */

const Ribbon = ({ isOpening }) => {
  return (
    <div
      className={`ribbon ${
        isOpening ? 'ribbon--opening' : ''
      }`}
    >
      <div className="ribbon__left" />

      <div className="ribbon__right" />

      <div className="ribbon-bow">
        <div className="ribbon-bow__loop ribbon-bow__loop--left" />

        <div className="ribbon-bow__loop ribbon-bow__loop--right" />

        <div className="ribbon-bow__knot" />

        <div className="ribbon-bow__tail ribbon-bow__tail--left" />

        <div className="ribbon-bow__tail ribbon-bow__tail--right" />
      </div>
    </div>
  );
};


/* =========================================
   BALLOONS
========================================= */

const Balloons = ({ isVisible }) => {
  return (
    <div
      className={`balloons ${
        isVisible ? 'balloons--visible' : ''
      }`}
      aria-hidden="true"
    >
      <div className="balloon balloon--left-one">
        <span />
      </div>

      <div className="balloon balloon--left-two">
        <span />
      </div>

      <div className="balloon balloon--right-one">
        <span />
      </div>

      <div className="balloon balloon--right-two">
        <span />
      </div>
    </div>
  );
};


/* =========================================
   CONFETTI
========================================= */

const CONFETTI_COUNT = 100;

const Confetti = ({ isVisible }) => {
  const pieces = Array.from(
    { length: CONFETTI_COUNT },
    (_, index) => {
      const drift =
        -180 + ((index * 71.9) % 361);

      return {
        id: index,

        left: `${
          (index * 37.17) % 104 - 2
        }%`,

        delay: `${
          ((index * 17.31) % 35) / 100
        }s`,

        duration: `${
          4.2 +
          ((index * 13.7) % 18) / 10
        }s`,

        rotation: `${
          (index * 47.3) % 360
        }deg`,

        drift: `${drift}px`,

        driftStart: `${
          Math.round(drift * 0.22)
        }px`,

        driftMiddle: `${
          Math.round(drift * 0.58)
        }px`,

        driftLate: `${
          Math.round(drift * 0.82)
        }px`,

        size: `${
          6 + ((index * 19) % 7)
        }px`,
      };
    },
  );

  return (
    <div
      className={`confetti ${
        isVisible ? 'confetti--visible' : ''
      }`}
      aria-hidden="true"
    >
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti__piece"
          style={{
            left: piece.left,
            animationDelay: piece.delay,
            animationDuration: piece.duration,

            '--rotation': piece.rotation,

            '--drift-start':
              piece.driftStart,

            '--drift-middle':
              piece.driftMiddle,

            '--drift-late':
              piece.driftLate,

            '--drift': piece.drift,

            '--size': piece.size,
          }}
        />
      ))}
    </div>
  );
};


/* =========================================
   OPENING ANIMATION
========================================= */

const OpeningAnimation = () => {
  /*
   * Read the saved configuration once
   * when the animation page loads.
   */
  const [settings] = useState(() =>
    getSettings(),
  );

  /*
   * Convert the configured 12-hour time
   * into the next opening timestamp.
   */
  const openingTime = useMemo(
    () => getOpeningTimestamp(settings),
    [settings],
  );

  /*
   * Countdown toward the configured
   * opening time.
   */
  const countdown = useCountdown(
    openingTime,
  );

  /*
   * Control the animation sequence:
   *
   * countdown
   *     ↓
   * ribbon cutting
   *     ↓
   * celebration
   *     ↓
   * complete
   */
  const {
    isCutting,
    isCelebrating,
    isComplete,
  } = useOpeningSequence(
    countdown.expired,
    settings.enabled,
  );

  /*
   * Animation disabled.
   */
  if (!settings.enabled) {
    return (
      <main className="opening-page">
        <div className="opening-background" />
      </main>
    );
  }

  return (
    <main className="opening-page">
      <div className="opening-background" />

      {/* Ribbon */}
      <Ribbon
        isOpening={
          isCutting ||
          isCelebrating ||
          isComplete
        }
      />

      {/* Countdown */}
      {!isCelebrating &&
        !isComplete && (
          <section
            className={`opening-center ${
              isCutting
                ? 'opening-center--cutting'
                : ''
            }`}
          >
            <Countdown
              time={countdown}
            />
          </section>
        )}

      {/* Confetti */}
      <Confetti
        isVisible={
          isCelebrating ||
          isComplete
        }
      />

      {/* Balloons */}
      <Balloons
        isVisible={
          isCelebrating ||
          isComplete
        }
      />
    </main>
  );
};

export default OpeningAnimation;