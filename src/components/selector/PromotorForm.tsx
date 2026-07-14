interface PromotorFormProps {
  promoterName: string;
  whatsapp: string;
  onNameChange: (value: string) => void;
  onWhatsappChange: (value: string) => void;
}

export default function PromotorForm({
  promoterName,
  whatsapp,
  onNameChange,
  onWhatsappChange,
}: PromotorFormProps) {
  return (
    <div className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Nama Promotor
        </label>

        <input
          type="text"
          value={promoterName}
          onChange={(e) => onNameChange(e.target.value)}
          placeholder="Masukkan nama promotor"
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
      </div>

      <div>
        <label className="mb-2 block text-sm font-semibold text-slate-700">
          Nomor WhatsApp
        </label>

        <input
          type="tel"
          value={whatsapp}
          onChange={(e) => onWhatsappChange(e.target.value)}
          placeholder="08xxxxxxxxxx"
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
      </div>
    </div>
  );
}