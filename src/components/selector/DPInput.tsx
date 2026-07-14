interface DPInputProps {
  value: number;
  max: number;
  onChange: (value: number) => void;
}

function formatRupiah(value: number) {
  return new Intl.NumberFormat("id-ID").format(value);
}

export default function DPInput({
  value,
  max,
  onChange,
}: DPInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const number = Number(e.target.value.replace(/\D/g, ""));

    if (number > max) {
      onChange(max);
      return;
    }

    onChange(number);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-semibold text-slate-700">
        Down Payment (DP)
      </label>

      <input
        type="text"
        value={value === 0 ? "" : formatRupiah(value)}
        onChange={handleChange}
        placeholder="Masukkan DP"
        className="
          w-full
          rounded-xl
          border
          border-slate-300
          px-4
          py-3
          text-sm
          focus:border-emerald-500
          focus:ring-2
          focus:ring-emerald-200
          outline-none
        "
      />

      <p className="text-xs text-slate-500">
        Maksimum DP : Rp {formatRupiah(max)}
      </p>
    </div>
  );
}