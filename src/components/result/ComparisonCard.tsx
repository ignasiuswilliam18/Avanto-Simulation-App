interface ComparisonCardProps {
  hpOnly: number;
  smartBundle: number;
}

function rupiah(value: number) {
  return "Rp " + value.toLocaleString("id-ID");
}

export default function ComparisonCard({
  hpOnly,
  smartBundle,
}: ComparisonCardProps) {
  const difference = smartBundle - hpOnly;

  return (
    <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-50 to-white p-6 shadow-md">

      <div className="flex items-center gap-2">
        <span className="text-2xl">📊</span>
        <h2 className="text-xl font-bold text-slate-800">
          Perbandingan Simulasi
        </h2>
      </div>

      <div className="mt-6 space-y-4">

        <div className="flex justify-between">
          <span className="font-medium">
            📱 HP ONLY
          </span>

          <span className="font-bold">
            {rupiah(hpOnly)} /bulan
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-medium">
            🎁 SMART BUNDLE
          </span>

          <span className="font-bold text-emerald-700">
            {rupiah(smartBundle)} /bulan
          </span>
        </div>

      </div>

      <div className="mt-6 rounded-2xl bg-emerald-600 p-5 text-center text-white">

        <p className="text-sm uppercase tracking-wider">
          Tambah hanya
        </p>

        <h1 className="mt-2 text-4xl font-black">
          {rupiah(difference)}
        </h1>

        <p className="mt-2 text-lg">
          per bulan
        </p>

      </div>

      <div className="mt-6 rounded-xl border border-emerald-100 bg-white p-4">

        <p className="font-semibold text-slate-700">
          Dengan tambahan tersebut customer mendapatkan:
        </p>

        <ul className="mt-3 space-y-2 text-sm text-slate-600">
          <li>✅ OPPO Care Protection</li>
          <li>✅ IoT Product</li>
          <li>✅ Smart Bundle Benefit</li>
        </ul>

      </div>

    </div>
  );
}