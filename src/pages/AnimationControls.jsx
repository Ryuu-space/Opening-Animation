import { useState } from 'react';

import {
  getSettings,
  saveSettings,
} from '../utils/animationSettings';

const AnimationControls = () => {
  const [settings, setSettings] = useState(
    getSettings(),
  );

  const [saved, setSaved] = useState(false);

  const updateSetting = (key, value) => {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSaved(false);
  };

  const handleSave = () => {
    saveSettings(settings);
    setSaved(true);
  };

  return (
    <main className="controls-page">
      <section className="controls-card">
        <div className="controls-header">
          <span className="controls-eyebrow">
            Svasti Styles
          </span>

          <h1>Opening Animation</h1>

          <p>
            Control the opening animation and scheduled
            opening time.
          </p>
        </div>

        <div className="controls-section">
          <div className="control-row">
            <div>
              <h2>Animation</h2>

              <p>
                Enable or disable the opening animation.
              </p>
            </div>

            <button
              type="button"
              className={`toggle ${
                settings.enabled
                  ? 'toggle--active'
                  : ''
              }`}
              onClick={() =>
                updateSetting(
                  'enabled',
                  !settings.enabled,
                )
              }
              aria-pressed={settings.enabled}
              aria-label={`Animation ${
                settings.enabled
                  ? 'enabled'
                  : 'disabled'
              }`}
            >
              <span className="toggle__thumb" />
            </button>
          </div>
        </div>

        <div className="controls-section">
          <div className="control-heading">
            <h2>Opening Time</h2>

            <p>
              Set the time when the ribbon opening begins.
            </p>
          </div>

          <div className="time-picker">
            <div className="time-field">
              <label htmlFor="opening-hour">
                Hour
              </label>

              <select
                id="opening-hour"
                value={settings.hour}
                onChange={(event) =>
                  updateSetting(
                    'hour',
                    event.target.value,
                  )
                }
              >
                {Array.from(
                  { length: 12 },
                  (_, index) => {
                    const value = String(
                      index + 1,
                    ).padStart(2, '0');

                    return (
                      <option
                        key={value}
                        value={value}
                      >
                        {value}
                      </option>
                    );
                  },
                )}
              </select>
            </div>

            <span className="time-separator">
              :
            </span>

            <div className="time-field">
              <label htmlFor="opening-minute">
                Minute
              </label>

              <select
                id="opening-minute"
                value={settings.minute}
                onChange={(event) =>
                  updateSetting(
                    'minute',
                    event.target.value,
                  )
                }
              >
                {Array.from(
                  { length: 60 },
                  (_, index) => {
                    const value = String(
                      index,
                    ).padStart(2, '0');

                    return (
                      <option
                        key={value}
                        value={value}
                      >
                        {value}
                      </option>
                    );
                  },
                )}
              </select>
            </div>

            <div className="time-field">
              <label htmlFor="opening-period">
                Period
              </label>

              <select
                id="opening-period"
                value={settings.period}
                onChange={(event) =>
                  updateSetting(
                    'period',
                    event.target.value,
                  )
                }
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="save-button"
          onClick={handleSave}
        >
          {saved ? 'Saved' : 'Save Changes'}
        </button>
      </section>
    </main>
  );
};

export default AnimationControls;