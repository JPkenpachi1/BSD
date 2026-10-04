interface Props {
  label: string;
  className?: string;
  gradient?: string;
}

/* Colored stand-in for photos. Replace with next/image when real
   photos are ready — keep the same className so layout won't shift. */
export default function Placeholder({
  label,
  className = "",
  gradient = "from-rose-300 via-amber-200 to-rose-400",
}: Props) {
  return (
    <div className={"flex items-center justify-center bg-gradient-to-br " + gradient + " " + className}>
      <span className="px-3 text-center text-[10px] uppercase tracking-[0.3em] text-amber-900/50">
        {label}
      </span>
    </div>
  );
}
