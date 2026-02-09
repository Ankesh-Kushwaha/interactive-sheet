export default function ProgressBar({ value = 0, label = "Progress" }) {
  const getColor = () => {
    if (value < 40) return "from-red-500 to-orange-500";
    if (value < 70) return "from-yellow-400 to-amber-500";
    return "from-emerald-400 to-green-500";
  };

  return (
    <div className="w-48">
      {/* Label + Percentage */}
      <div className="flex justify-between mb-1 text-xs font-medium text-zinc-600 dark:text-zinc-400">
        <span>{label}</span>
        <span className="tabular-nums">{value}%</span>
      </div>

      {/* Track */}
      <div className="relative h-3 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
        {/* Fill */}
        <div
          className={`
            h-full relative rounded-full
            bg-gradient-to-r ${getColor()}
            transition-all duration-700 ease-out
            shadow-md
          `}
          style={{ width: `${value}%` }}
        >
          {/* Shimmer */}
          <div className="absolute inset-0 shimmer" />
        </div>
      </div>

      {/* Animation */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .shimmer {
          background: linear-gradient(
            110deg,
            transparent,
            rgba(255, 255, 255, 0.35),
            transparent
          );
          animation: shimmer 1.5s infinite linear;
        }
      `}</style>
    </div>
  );
}
