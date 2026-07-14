interface IotSelectorProps {
  value: string;
  onChange: (value: string) => void;
  options: string[];
}

export default function IotSelector({
  value,
  onChange,
  options,
}: IotSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        IoT Product
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
        {options.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}