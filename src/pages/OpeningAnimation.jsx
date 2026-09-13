import { useMemo, useState } from 'react';

import useCountdown from '../hooks/useCountdown';
import useOpeningSequence from '../hooks/useOpeningSequence';

import Curtains from '../components/Curtains/Curtains';
import Ribbon from '../components/Ribbon/Ribbon';
import WelcomeReveal from '../components/WelcomeReveal/WelcomeReveal';
import SilkReveal from '../components/SilkReveal/SilkReveal';

import logo from '../assets/logo-DGTPLIE_.webp';

import {
  getOpeningTimestamp,
  getSettings,
} from '../utils/animationSettings';

import '../styles/opening-animation.css';
import '../styles/curtains.css';
import '../styles/welcome-reveal.css';



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
   SVASTI LOGO
========================================= */

const OpeningLogo = () => {
  return (
    <div
      className="opening-logo"
      aria-hidden="true"
    >
      <img
        src={logo}
        alt=""
      />
    </div>
  );
};


/* =========================================
   PEACH COUNTDOWN PANEL
========================================= */

const OpeningPanel = ({
  countdown,
  isCutting,
}) => {
  return (
    <section
      className={`opening-panel ${
        isCutting
          ? 'opening-panel--cutting'
          : ''
      }`}
      aria-label="Svasti Styles opening countdown"
    >
      <div className="opening-panel__inner">

        <OpeningLogo />

        <p className="opening-panel__label">
          The Grand Reveal Begins In
        </p>

        <div className="opening-panel__countdown">
          <Countdown
            time={countdown}
          />
        </div>

      </div>
    </section>
  );
};


/* =========================================
   BALLOONS
========================================= */

const Balloons = ({ isVisible }) => {
  return (
    <div
      className={`balloons ${
        isVisible
          ? 'balloons--visible'
          : ''
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
        isVisible
          ? 'confetti--visible'
          : ''
      }`}
      aria-hidden="true"
    >
      {pieces.map((piece) => (
        <span
          key={piece.id}
          className="confetti__piece"
          style={{
            left: piece.left,

            animationDelay:
              piece.delay,

            animationDuration:
              piece.duration,

            '--rotation':
              piece.rotation,

            '--drift-start':
              piece.driftStart,

            '--drift-middle':
              piece.driftMiddle,

            '--drift-late':
              piece.driftLate,

            '--drift':
              piece.drift,

            '--size':
              piece.size,
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

  /* =======================================
     SETTINGS
  ======================================= */

  const [settings] = useState(() =>
    getSettings(),
  );


  /* =======================================
     WEBSITE REVEAL STATE

     false → silk curtain is closed
     true  → silk curtain splits open
  ======================================= */

  const [
  isSilkRevealing,
  setIsSilkRevealing,
  ] = useState(false);


  /* =======================================
     OPENING TIME
  ======================================= */

  const openingTime = useMemo(
    () =>
      getOpeningTimestamp(settings),
    [settings],
  );


  /* =======================================
     COUNTDOWN
  ======================================= */

  const countdown = useCountdown(
    openingTime,
  );


  /* =======================================
     ANIMATION SEQUENCE
  ======================================= */

  const {
    isCutting,
    isCelebrating,
    isComplete,
  } = useOpeningSequence(
    countdown.expired,
    settings.enabled,
  );


  /* =========================================
     ANIMATION DISABLED
  ========================================= */

  if (!settings.enabled) {
    return (
      <main className="opening-page">

        <div className="opening-background" />

      </main>
    );
  }


  /* =========================================
     NORMAL ANIMATION
  ========================================= */

  return (
    <main className="opening-page">

      {/* =====================================
          BACKGROUND
      ===================================== */}

      <div className="opening-background" />

      {/* =====================================
          VELVET CURTAINS

          Opens during celebration.
      ===================================== */}

      <Curtains
        isOpening={
          isCelebrating ||
          isComplete
        }
      />


      {/* =====================================
          PEACH COUNTDOWN PANEL

          Disappears when celebration starts.
      ===================================== */}

      {!isCelebrating &&
        !isComplete && (
          <OpeningPanel
            countdown={countdown}
            isCutting={isCutting}
          />
        )}


      {/* =====================================
          RIBBON

          Disappears during cutting.
      ===================================== */}

      <Ribbon
        isOpening={
          isCutting ||
          isCelebrating ||
          isComplete
        }
      />


      {/* =====================================
          CONFETTI
      ===================================== */}

      <Confetti
        isVisible={
          isCelebrating ||
          isComplete
        }
      />


      {/* =====================================
          BALLOONS
      ===================================== */}

      <Balloons
        isVisible={
          isCelebrating ||
          isComplete
        }
      />


      {/* =====================================
          WELCOME REVEAL

          Typewriter + loader.

          When typing reaches 100%,
          the silk curtain begins opening.
      ===================================== */}
<WelcomeReveal
  isVisible={
    isCelebrating ||
    isComplete
  }

  isFinished={
    isSilkRevealing
  }

  onComplete={() => {
    window.setTimeout(() => {
      setIsSilkRevealing(true);
    }, 250);
  }}
/>



<SilkReveal
  isOpening={
    isSilkRevealing
  }
/>
    </main>
  );
};

export default OpeningAnimation;