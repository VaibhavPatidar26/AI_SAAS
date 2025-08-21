export default function SegmentedTabs({ tabs, value, onChange }) {
  return (
    <div className="w-full max-w-md mx-auto px-2">
      <div
        className="relative isolate rounded-full p-1
                   bg-[#20242c] ring-1 ring-white/5
                   shadow-inner shadow-black/20
                   backdrop-blur-sm"
        role="tablist"
      >
        {/* Active pill */}
        <div
          className="absolute inset-y-1 rounded-full transition-all duration-300 ease-out
                     bg-gradient-to-r from-[#f9f9f9] to-[#e9e9e9]
                     shadow-sm shadow-black/20"
          style={{
            width: `calc(${100 / tabs.length}% - 0.5rem)`,
            left: `calc(${tabs.findIndex((t) => t.key === value)} * 100% / ${tabs.length} + 0.25rem)`,
          }}
        />

        {/* Tab buttons */}
        <div className={`grid grid-cols-${tabs.length}`}>
          {tabs.map((t) => {
            const active = value === t.key;
            return (
              <button
                key={t.key}
                onClick={() => onChange(t.key)}
                className={[
                  "relative z-10 h-10 md:h-11 px-4 rounded-full transition-colors duration-200 text-sm md:text-base",
                  active
                    ? "font-medium text-[#171717]"  // dark text on light pill
                    : "text-gray-400 hover:text-gray-200 font-normal",
                ].join(" ")}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
