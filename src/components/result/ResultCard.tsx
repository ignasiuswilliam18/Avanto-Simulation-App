interface ResultCardProps {
  title: string;
  icon: string;

  providerName: string;
  productName: string;

  tenor: number;

  monthlyInstallment: number;

  productPrice: number;
  downPayment: number;
  financedAmount: number;

  admin: number;
  interest: number;

  highlight?: boolean;

  onCopy?: () => void;
}


function rupiah(value:number){
  return (
    "Rp " +
    value.toLocaleString("id-ID")
  );
}



export default function ResultCard({

title,
icon,

providerName,
productName,

tenor,

monthlyInstallment,

productPrice,
downPayment,
financedAmount,

admin,
interest,

highlight=false,

onCopy,

}:ResultCardProps){


return (

<div

className={`
relative
overflow-hidden
rounded-3xl
border
p-5
transition-all

${
highlight

?
"border-emerald-400 bg-emerald-50 shadow-lg"

:

"border-slate-200 bg-white shadow-sm"

}

`}

>


{/* HEADER */}

<div
className="
flex
items-start
justify-between
"
>


<div
className="
flex
items-center
gap-3
"
>

<div
className="
flex
h-10
w-10
items-center
justify-center
rounded-xl
bg-slate-100
text-xl
"
>

{icon}

</div>


<div>

<h2
className="
text-lg
font-extrabold
text-slate-900
"
>

{title}

</h2>


<p
className="
text-xs
font-semibold
uppercase
tracking-wide
text-emerald-600
"
>

{providerName}

</p>


</div>


</div>



{
highlight &&

<span

className="
rounded-full
bg-emerald-600
px-3
py-1
text-xs
font-bold
text-white
"

>

⭐ Recommended

</span>

}


</div>





{/* PRODUCT */}

<div
className="
mt-5
"
>


<p
className="
text-sm
font-bold
leading-relaxed
text-slate-800
"
>

{productName}

</p>


<p
className="
mt-1
text-xs
text-slate-500
"
>

Tenor {tenor} bulan

</p>


</div>






{/* INSTALLMENT */}

<div

className="
mt-5
rounded-2xl
bg-slate-900
p-5
text-white
"

>


<p
className="
text-xs
uppercase
tracking-widest
text-slate-300
"
>

Cicilan per bulan

</p>


<h1

className="
mt-2
text-3xl
font-black
"

>

{rupiah(monthlyInstallment)}

</h1>


</div>






{/* DETAIL */}

<div
className="
mt-5
space-y-3
"
>


<Row
label="Harga Produk"
value={rupiah(productPrice)}
/>


<Row
label="Down Payment"
value={rupiah(downPayment)}
/>


<Row
label="Sisa Pembiayaan"
value={rupiah(financedAmount)}
/>


<Row
label="Biaya Admin"
value={rupiah(admin)}
/>


<Row
label="Total Bunga"
value={rupiah(interest)}
/>



</div>






{/* BUTTON */}

<button

onClick={onCopy}

className="
mt-6
w-full
rounded-xl
bg-emerald-600
py-3
text-sm
font-bold
text-white
transition
hover:bg-emerald-700
"

>

📲 Copy ke WhatsApp

</button>



</div>

);

}




function Row({

label,
value,

}:{

label:string;
value:string;

}){


return (

<div

className="
flex
items-center
justify-between
border-b
border-slate-100
pb-2
"

>


<span
className="
text-xs
text-slate-500
"
>

{label}

</span>


<span

className="
text-xs
font-bold
text-slate-800
"

>

{value}

</span>


</div>

)

}