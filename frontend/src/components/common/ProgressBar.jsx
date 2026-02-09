export default function ProgressBar({ value }) {
  return (
    <div className="w-32 h-2 bg-zinc-300 dark:bg-zinc-800 rounded-full">
      <div
        className="h-full bg-blue-500 transition-all"
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
