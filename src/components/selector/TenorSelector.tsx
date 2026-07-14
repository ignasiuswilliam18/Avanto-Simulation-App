interface TenorSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

const TENORS = [3, 6, 9, 12];

export default function TenorSelector({
  value,
  onChange,
}: TenorSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        Tenor
      </label>

      <div className="grid grid-cols-3 gap-3">
        {TENORS.map((tenor) => (
          <button
            key={tenor}
            type="button"
            onClick={() => onChange(tenor)}
            className={`
              rounded-xl
              border
              py-3
              font-semibold
              transition

              ${
                value === tenor
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-300 bg-white hover:bg-slate-50"
              }
            `}
          >
            {tenor} Bulan
          </button>
        ))}
      </div>
    </div>
  );
}