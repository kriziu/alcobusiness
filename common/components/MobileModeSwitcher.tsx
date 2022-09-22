import { useMobileMode } from '../recoil/mobileMode';

const MobileModeSwitcher = () => {
  const { setMobileMode, mobileMode } = useMobileMode();

  return (
    <div className="absolute bottom-2 right-2 flex gap-3">
      {!mobileMode.auto && (
        <label
          htmlFor="mobile-toggle"
          className="relative inline-flex cursor-pointer items-center"
        >
          <input
            type="checkbox"
            value=""
            id="mobile-toggle"
            className="peer sr-only"
            disabled={mobileMode.auto}
            checked={mobileMode.turned}
            onChange={() =>
              setMobileMode((prev) => ({ ...prev, turned: !mobileMode.turned }))
            }
          />
          <div className="peer h-6 w-11 rounded-full bg-gray-800 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-rose-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300"></div>
          <span className="ml-1 text-sm font-medium text-gray-300">
            Mobile mode
          </span>
        </label>
      )}

      <label
        htmlFor="auto-toggle"
        className="relative inline-flex cursor-pointer items-center"
      >
        <input
          type="checkbox"
          value=""
          id="auto-toggle"
          className="peer sr-only"
          checked={mobileMode.auto}
          onChange={() =>
            setMobileMode((prev) => ({ ...prev, auto: !mobileMode.auto }))
          }
        />
        <div className="peer h-6 w-11 rounded-full bg-gray-800 after:absolute after:top-[2px] after:left-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-rose-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-rose-300"></div>
        <span className="ml-1 text-sm font-medium text-gray-300">
          Auto mobile mode
        </span>
      </label>
    </div>
  );
};

export default MobileModeSwitcher;
