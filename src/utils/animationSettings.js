const STORAGE_KEY = 'svasti-opening-animation-settings';

const DEFAULT_SETTINGS = {
  enabled: true,
  hour: '12',
  minute: '00',
  period: 'PM',
};

const getSettings = () => {
  try {
    const storedSettings = localStorage.getItem(STORAGE_KEY);

    if (!storedSettings) {
      return { ...DEFAULT_SETTINGS };
    }

    const parsedSettings = JSON.parse(storedSettings);

    return {
      ...DEFAULT_SETTINGS,
      ...parsedSettings,
    };
  } catch {
    return { ...DEFAULT_SETTINGS };
  }
};

const saveSettings = (settings) => {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(settings),
  );
};

const getOpeningTimestamp = (settings) => {
  const now = new Date();

  let hour = Number(settings.hour);
  const minute = Number(settings.minute);

  // Convert 12-hour time to 24-hour time.
  if (settings.period === 'AM') {
    if (hour === 12) {
      hour = 0;
    }
  } else if (hour !== 12) {
    hour += 12;
  }

  const target = new Date(now);

  target.setHours(hour, minute, 0, 0);

  // If today's opening time has already passed,
  // use tomorrow's opening time.
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 1);
  }

  return target.getTime();
};

export {
  DEFAULT_SETTINGS,
  getSettings,
  saveSettings,
  getOpeningTimestamp,
};