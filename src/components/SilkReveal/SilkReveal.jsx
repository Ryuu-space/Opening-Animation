import {
  useEffect,
  useState,
} from 'react';

import silkCurtain from '../../assets/bg-saree.webp';

import '../../styles/SilkReveal.css';


/* =========================================
   SILK REVEAL
========================================= */

const SilkReveal = ({
  isOpening,
}) => {

  /*
    The silk starts in the closed position.

    We only change this state after a small
    timeout, which gives the browser time
    to render the fully closed silk first.
  */

  const [hasOpened, setHasOpened] =
    useState(false);


  /* =========================================
     START SILK OPENING
  ========================================= */

  useEffect(() => {

    if (!isOpening) {
      return undefined;
    }

    /*
      Keep the silk closed for 120ms,
      then begin the opening animation.
    */

    const openingTimer =
      window.setTimeout(() => {
        setHasOpened(true);
      }, 120);

    return () => {
      window.clearTimeout(
        openingTimer,
      );
    };

  }, [isOpening]);


  /* =========================================
     RENDER
  ========================================= */

  return (
    <div
      className={`silk-reveal ${
        isOpening
          ? 'silk-reveal--visible'
          : ''
      } ${
        isOpening && hasOpened
          ? 'silk-reveal--opening'
          : ''
      }`}
      aria-hidden="true"
    >

      {/* =====================================
          LEFT SILK PANEL
      ===================================== */}

      <div
        className="
          silk-reveal__panel
          silk-reveal__panel--left
        "
      >
        <img
          src={silkCurtain}
          alt=""
          draggable="false"
        />
      </div>


      {/* =====================================
          RIGHT SILK PANEL
      ===================================== */}

      <div
        className="
          silk-reveal__panel
          silk-reveal__panel--right
        "
      >
        <img
          src={silkCurtain}
          alt=""
          draggable="false"
        />
      </div>

    </div>
  );
};


export default SilkReveal;