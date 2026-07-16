import React, { useState, useMemo } from 'react';
import { HP_PRODUCTS } from "./data/hp";
import { IOT_PRODUCTS } from "./data/iot";
import { OPPO_CARE_PRODUCTS } from "./data/oppoCare";
import ProviderSelector from "./components/selector/ProviderSelector";
import ProductSelector from "./components/selector/ProductSelector";
import OppoCareSelector from "./components/selector/OppoCareSelector";
import IotSelector from "./components/selector/IotSelector";
import DPInput from "./components/selector/DPInput";
import InterestSelector from "./components/selector/InterestSelector";
import TenorSelector from "./components/selector/TenorSelector";

const App: React.FC = () => {
  const [provider, setProvider] = useState("Avanto by Kredivo");
  const [hp, setHp] = useState(HP_PRODUCTS[0]);
  const [iot, setIot] = useState(IOT_PRODUCTS[0]);
  const [care, setCare] = useState(OPPO_CARE_PRODUCTS[0]);
  const [tenor, setTenor] = useState(12);
  const [dp, setDp] = useState(0);
  const [bungaRate, setBungaRate] = useState(0.0375);

  const interestOptions = [
    { label: "0%", value: 0 }, { label: "2,7%", value: 0.027 },
    { label: "2,99%", value: 0.0299 }, { label: "3,75%", value: 0.0375 },
    { label: "3,99%", value: 0.0399 },
  ];

  const calculate = (totalBarang: number) => {
    const admin = provider === "Avanto by Yesscredit" ? 60000 : totalBarang * 0.02;
    const finalDp = Math.min(dp, totalBarang);
    const pokokPinjaman = totalBarang - finalDp;
    const totalBunga = pokokPinjaman * bungaRate * tenor;
    const totalHutang = pokokPinjaman + admin + totalBunga;
    return { 
        cicilan: Math.round(totalHutang / tenor), 
        admin: Math.round(admin), 
        totalBunga: Math.round(totalBunga),
        totalHarga: totalBarang,
        totalPinjaman: Math.round(totalHutang)
    };
  };

  const hitungPerHari = (cicilan: number) => Math.round(cicilan / 30);

  const ops1 = useMemo(() => calculate(hp.price), [hp, tenor, dp, provider, bungaRate]);
  const ops2 = useMemo(() => calculate(hp.price + iot.price + care.price), [hp, iot, care, tenor, dp, provider, bungaRate]);

  return (
    <div className="min-h-screen bg-slate-50 pb-10 text-slate-800 font-sans">
      <header className="bg-white border-b-4 border-green-500 px-4 py-6 text-center shadow-sm">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">AVANTO</h1>
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Oppo Official Financing Platform</p>
      </header>

      <main className="p-4 space-y-6 max-w-lg mx-auto">
        <section className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-5">
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider ml-1">Financing Provider</label>
            <ProviderSelector value={provider} onChange={setProvider} providers={["Avanto by Kredivo", "Avanto by Yesscredit"]} />
          </div>
          
          <div className="space-y-4 border-t border-slate-100 pt-4">
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Produk HP (Rp {hp.price.toLocaleString()})</label>
                <ProductSelector value={hp.model} onChange={(v: string) => { const s = HP_PRODUCTS.find(p => p.model === v); if(s) setHp(s); }} options={HP_PRODUCTS.map(p => ({ label: `${p.model} - Rp ${p.price.toLocaleString()}`, value: p.model }))} />
            </div>
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Oppo Care (Rp {care.price.toLocaleString()})</label>
                <OppoCareSelector value={care.model} onChange={(v: string) => { const s = OPPO_CARE_PRODUCTS.find(p => p.model === v); if(s) setCare(s); }} options={OPPO_CARE_PRODUCTS.map(p => p.model)} />
            </div>
            <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">IoT Product (Rp {iot.price.toLocaleString()})</label>
                <IotSelector value={iot.model} onChange={(v: string) => { const s = IOT_PRODUCTS.find(p => p.model === v); if(s) setIot(s); }} options={IOT_PRODUCTS.map(p => p.model)} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-4 pt-2">
            <TenorSelector value={tenor} onChange={setTenor} />
            <InterestSelector value={bungaRate} options={interestOptions} onChange={setBungaRate} />
          </div>
          <DPInput value={dp} onChange={setDp} max={hp.price} />
        </section>

        <section className="grid grid-cols-1 gap-4">
          <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-2xl shadow-sm">
            <p className="text-[9px] font-bold text-slate-400 uppercase text-center">HP Saja</p>
            <p className="text-xl font-black text-slate-700 text-center mt-1">Rp {ops1.cicilan.toLocaleString()}</p>
            <div className="flex flex-col text-[9px] text-slate-500 mt-3 border-t pt-2 gap-1">
                <span className="font-bold text-slate-700">Total Pinjaman: Rp {ops1.totalPinjaman.toLocaleString()}</span>
                <div className="flex justify-between">
                    <span>Adm: Rp {ops1.admin.toLocaleString()}</span>
                    <span>Bunga: Rp {ops1.totalBunga.toLocaleString()}</span>
                </div>
            </div>
            <p className="text-[10px] text-center text-slate-400 mt-1">~ Rp {hitungPerHari(ops1.cicilan).toLocaleString()}/hari</p>
          </div>
          
          <div className="p-4 bg-green-500 border-2 border-green-600 rounded-2xl shadow-md text-white">
            <p className="text-[9px] font-bold text-green-100 uppercase text-center">Paket Lengkap</p>
            <p className="text-xl font-black text-white text-center mt-1">Rp {ops2.cicilan.toLocaleString()}</p>
            <div className="flex flex-col text-[9px] text-green-50 mt-3 border-t border-green-400 pt-2 gap-1">
                <span className="font-bold text-white">Total Pinjaman: Rp {ops2.totalPinjaman.toLocaleString()}</span>
                <div className="flex justify-between">
                    <span>Adm: Rp {ops2.admin.toLocaleString()}</span>
                    <span>Bunga: Rp {ops2.totalBunga.toLocaleString()}</span>
                </div>
            </div>
            <p className="text-[10px] text-center text-green-100 mt-1">~ Rp {hitungPerHari(ops2.cicilan).toLocaleString()}/hari</p>
          </div>
        </section>

        <section className="bg-gradient-to-r from-orange-400 to-orange-500 p-6 rounded-2xl text-white text-center shadow-lg">
            <p className="text-[10px] font-bold uppercase tracking-widest mb-1 opacity-90">Selisih Angsuran</p>
            <div className="text-4xl font-black mb-3">+ Rp {(ops2.cicilan - ops1.cicilan).toLocaleString()} <span className="text-sm font-normal text-orange-50">/bln</span></div>
            <p className="text-[11px] leading-relaxed bg-black/10 p-3 rounded-xl">
                Hanya dengan menambah <b className="font-bold">Rp {(ops2.cicilan - ops1.cicilan).toLocaleString()}</b> anda bisa membawa pulang HP, proteksi OPPO Care dan produk IOT!
            </p>
        </section>

        <footer className="text-center space-y-1 pt-4 text-slate-400">
            <h2 className="font-black text-slate-600">Avanto</h2>
            <p className="text-[9px] uppercase tracking-widest">Oppo Official Financing Platform</p>
            <p className="text-[9px] font-bold mt-2 text-blue-500">Supported by yesscredit & Kredivo</p>
        </footer>
      </main>
    </div>
  );
};

export default App;