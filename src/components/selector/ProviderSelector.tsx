interface ProviderSelectorProps {
  value: string;
  onChange: (value: string) => void;
  providers: string[];
}

export default function ProviderSelector({
  value,
  onChange,
  providers,
}: ProviderSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        Financing Provider
      </label>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          bg-white
          px-4
          py-3
          text-sm
          focus:border-emerald-500
          focus:outline-none
          focus:ring-2
          focus:ring-emerald-200
        "
      >
        {providers.map((provider) => (
          <option key={provider} value={provider}>
            {provider}
          </option>
        ))}
      </select>
    </div>
  );
}