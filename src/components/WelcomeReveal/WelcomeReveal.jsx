import { useEffect, useMemo, useState } from 'react';

import logo from '../../assets/logo-DGTPLIE_.webp';

const TITLE = 'Welcome to Svasti Styles';

const MESSAGE =
  'A beautiful new chapter is about to unfold. Step into a world of elegance, beauty, and confidence.';

const TYPING_SPEED = 45;

const WelcomeReveal = ({ isVisible }) => {
  const [typedCharacters, setTypedCharacters] =
    useState(0);

  const fullText = useMemo(
    () => `${TITLE}\n${MESSAGE}`,
    [],
  );


  /* =========================================
     TYPEWRITER

     Starts immediately when the same
     celebration state becomes visible.
  ========================================= */

  useEffect(() => {
    if (!isVisible) {
      return undefined;
    }

    if (
      typedCharacters >=
      fullText.length
    ) {
      return undefined;
    }

    const typingTimer =
      window.setTimeout(() => {
        setTypedCharacters(
          (current) =>
            current + 1,
        );
      }, TYPING_SPEED);

    return () => {
      window.clearTimeout(
        typingTimer,
      );
    };
  }, [
    isVisible,
    typedCharacters,
    fullText.length,
  ]);


  /* =========================================
     TITLE
  ========================================= */

  const titleLength = TITLE.length;

  const typedTitle =
    fullText.slice(
      0,
      Math.min(
        typedCharacters,
        titleLength,
      ),
    );


  /* =========================================
     MESSAGE
  ========================================= */

  const messageStart =
    titleLength + 1;

  const typedMessage =
    typedCharacters >
    messageStart
      ? fullText.slice(
          messageStart,
          typedCharacters,
        )
      : '';


  /* =========================================
     PROGRESS

     Directly connected to the number
     of characters typed.
  ========================================= */

  const progress =
    fullText.length === 0
      ? 0
      : (
          typedCharacters /
          fullText.length
        ) * 100;


  /* =========================================
     RENDER
  ========================================= */

  return (
    <section
      className={`welcome-reveal ${
        isVisible
          ? 'welcome-reveal--visible'
          : ''
      } ${
        isVisible
          ? 'welcome-reveal--started'
          : ''
      }`}
      aria-hidden={!isVisible}
    >

      {/* =====================================
          LOGO + TEXT
      ===================================== */}

      <div className="welcome-reveal__content">

        <div className="welcome-reveal__logo">
          <img
            src={logo}
            alt=""
          />
        </div>

        <div className="welcome-reveal__text">

          <h1>
            {typedTitle}

            {isVisible &&
              typedCharacters <=
                titleLength && (
                <span className="typewriter-caret">
                  |
                </span>
              )}
          </h1>

          <p>
            {typedMessage}

            {isVisible &&
              typedCharacters >
                titleLength &&
              typedCharacters <
                fullText.length && (
                <span className="typewriter-caret">
                  |
                </span>
              )}
          </p>

        </div>
      </div>


      {/* =====================================
          LOADING BAR

          Starts at exactly the same time
          as the typewriter.
      ===================================== */}

      <div className="welcome-reveal__loader">

        <div className="welcome-reveal__loader-track">

          <div
            className="welcome-reveal__loader-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

        <span className="welcome-reveal__loader-label">
          {progress < 100
            ? 'Preparing your experience...'
            : 'Welcome to Svasti Styles'}
        </span>

      </div>

    </section>
  );
};

export default WelcomeReveal;