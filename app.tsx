import React, { useState, useMemo } from 'react';

// Data Referensi Bunga per Tenor (Sesuaikan dengan data Excel Anda)
const BUNGA_LIST: Record<number, number> = {
  3: 0.0299, // Contoh rate, silakan update jika ada angka spesifik di Excel
  6: 0.0299,
  9: 0.0299,
  12: 0.0299
};

const App: React.FC = () => {
  // State Input
  const [hargaHP, setHargaHP] = useState(9299000);
  const [hargaIOT, setHargaIOT] = useState(0);
  const [hargaCare, setHargaCare] = useState(0);
  const [tenor, setTenor] = useState(6);

  // Logika Kalkulasi Presisi sesuai Formula Excel
  const result = useMemo(() => {
    const G = hargaHP + hargaIOT + hargaCare; // Total Pokok
    const rateBunga = BUNGA_LIST[tenor] || 0.0299;
    
    // Formula: ((G + G*2%) + (G + G*2%) * Bunga * Tenor) / Tenor
    const pokokPlusAdmin = G + (G * 0.02);
    const totalPengembalian = pokokPlusAdmin + (pokokPlusAdmin * rateBunga * tenor);
    const cicilanPerBulan = totalPengembalian / tenor;

    return {
      cicilan: Math.round(cicilanPerBulan),
      totalBayar: Math.round(totalPengembalian)
    };
  }, [hargaHP, hargaIOT, hargaCare, tenor]);

  return (
    <div className="max-w-xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
      <h1 className="text-2xl font-bold text-green-700 mb-4">Simulator Cicilan Avanto</h1>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Harga Barang (HP + IOT + Care)</label>
          <input 
            type="number" 
            value={hargaHP + hargaIOT + hargaCare} 
            readOnly 
            className="w-full p-2 border rounded bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Pilih Tenor</label>
          <div className="flex gap-2">
            {[3, 6, 9, 12].map((t) => (
              <button 
                key={t}
                onClick={() => setTenor(t)}
                className={`flex-1 py-2 rounded ${tenor === t ? 'bg-green-600 text-white' : 'bg-gray-200'}`}
              >
                {t} Bln
              </button>
            ))}
          </div>
        </div>

        <div className="mt-6 p-4 bg-green-50 rounded-lg border-2 border-green-200">
          <p className="text-sm text-green-800">Cicilan per bulan ({tenor} bulan):</p>
          <p className="text-3xl font-bold text-green-900">Rp {result.cicilan.toLocaleString()}</p>
          <p className="text-xs text-gray-500 mt-2">Total Pengembalian: Rp {result.totalBayar.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

export default App;
