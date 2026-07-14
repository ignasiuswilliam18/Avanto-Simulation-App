import { useMemo, useState } from "react";

export interface SearchOption {
  label: string;
  value: string;
}

interface SearchableSelectProps {
  label: string;
  placeholder?: string;
  options: SearchOption[];
  value: string;
  onChange: (value: string) => void;
}

export default function SearchableSelect({
  label,
  placeholder = "Cari...",
  options,
  value,
  onChange,
}: SearchableSelectProps) {
  const [keyword, setKeyword] = useState("");

  const filtered = useMemo(() => {
    return options.filter((item) =>
      item.label.toLowerCase().includes(keyword.toLowerCase())
    );
  }, [keyword, options]);

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          px-4
          py-3
          text-sm
          focus:border-emerald-500
          focus:outline-none
          focus:ring-2
          focus:ring-emerald-200
        "
      />

      <div className="max-h-60 overflow-y-auto rounded-xl border border-slate-200">
        {filtered.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`w-full px-4 py-3 text-left text-sm transition ${
              value === item.value
                ? "bg-emerald-600 text-white"
                : "hover:bg-emerald-50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}