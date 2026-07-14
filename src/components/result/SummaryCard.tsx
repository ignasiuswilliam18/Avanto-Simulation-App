interface SummaryCardProps {
  provider: string;
  product: string;
  tenor: number;
  dp: number;

  hpOnly: number;
  smartBundle: number;
}

function rupiah(value: number) {
  return "Rp " + value.toLocaleString("id-ID");
}

export default function SummaryCard({
  provider,
  product,
  tenor,
  dp,
  hpOnly,
  smartBundle,
}: SummaryCardProps) {
  const difference = smartBundle - hpOnly;

  return (
    <div className="rounded-3xl border border-emerald-200 bg-gradient-to-r from-emerald-600 to-emerald-500 p-6 text-white shadow-xl">

      <h2 className="text-2xl font-black">
        📊 Ringkasan Simulasi
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-4 text-sm">

        <div>
          <p className="text-emerald-100">Provider</p>
          <p className="font-bold">{provider}</p>
        </div>

        <div>
          <p className="text-emerald-100">Produk</p>
          <p className="font-bold">{product}</p>
        </div>

        <div>
          <p className="text-emerald-100">Down Payment</p>
          <p className="font-bold">{rupiah(dp)}</p>
        </div>

        <div>
          <p className="text-emerald-100">Tenor</p>
          <p className="font-bold">{tenor} Bulan</p>
        </div>

      </div>

      <div className="my-6 h-px bg-white/30" />

      <div className="grid grid-cols-2 gap-5">

        <div className="rounded-2xl bg-white/15 p-4 backdrop-blur">
          <p className="text-sm">📱 HP ONLY</p>
          <h3 className="mt-2 text-3xl font-black">
            {rupiah(hpOnly)}
          </h3>
          <p className="text-sm">/ bulan</p>
        </div>

        <div className="rounded-2xl bg-white p-4 text-emerald-700 shadow">
          <p className="text-sm font-semibold">
            🎁 SMART BUNDLE
          </p>

          <h3 className="mt-2 text-3xl font-black">
            {rupiah(smartBundle)}
          </h3>

          <p className="text-sm">
            / bulan
          </p>
        </div>

      </div>

      <div className="mt-6 rounded-2xl bg-yellow-400 p-4 text-center text-slate-900">

        <p className="font-semibold">
          ⭐ Tambah hanya
        </p>

        <h2 className="text-4xl font-black">
          {rupiah(difference)}
        </h2>

        <p>per bulan</p>

      </div>

    </div>
  );
}