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
      <label className="block text-[10px] font-extrabold uppercase text-slate-500">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-emerald-500"
      />

      <div className="max-h-56 overflow-y-auto rounded-xl border border-slate-200">
        {filtered.map((item) => (
          <button
            key={item.value}
            type="button"
            onClick={() => onChange(item.value)}
            className={`w-full px-3 py-2 text-left text-xs hover:bg-emerald-50 transition ${
              value === item.value
                ? "bg-emerald-600 text-white"
                : ""
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}