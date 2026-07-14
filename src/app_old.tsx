import { useMemo, useState } from "react";

import Header from "./components/layout/Header";

import SelectorPanel from "./components/selector/SelectorPanel";

import ResultCard from "./components/result/ResultCard";
import SummaryCard from "./components/result/SummaryCard";


import oppoLogo from "./assets/logos/oppo.png";
import kredivoLogo from "./assets/logos/kredivo.png";
import yesssLogo from "./assets/logos/yessscredit.png";
import avantoLogo from "./assets/logos/avanto.png";


import {
  HP_PRODUCTS,
  OPPO_CARE_PRODUCTS,
  IOT_PRODUCTS,
  FINANCING_PROVIDERS,
} from "./data";


import {
  calculateSimulation,
} from "./engine/calculateSimulation";



export default function App() {


  // ==========================
  // STATE
  // ==========================


  const [provider,setProvider] =
    useState(
      FINANCING_PROVIDERS[0].name
    );


  const [product,setProduct] =
    useState(
      HP_PRODUCTS[1].model
    );


  const [oppoCare,setOppoCare] =
    useState(
      OPPO_CARE_PRODUCTS[0].model
    );


  const [iot,setIot] =
    useState(
      IOT_PRODUCTS[0].model
    );


  const [dp,setDP] =
    useState(0);


  const [tenor,setTenor] =
    useState(3);


  const [promoterName,setPromoterName] =
    useState("");


  const [whatsapp,setWhatsapp] =
    useState("");





  // ==========================
  // LOOKUP
  // ==========================


  const currentProvider =
    useMemo(
      () =>
        FINANCING_PROVIDERS.find(
          item =>
          item.name === provider
        )!,
      [provider]
    );




  const currentProduct =
    useMemo(
      () =>
        HP_PRODUCTS.find(
          item =>
          item.model === product
        )!,
      [product]
    );




  const currentOppoCare =
    useMemo(
      () =>
        OPPO_CARE_PRODUCTS.find(
          item =>
          item.model === oppoCare
        ),
      [oppoCare]
    );




  const currentIot =
    useMemo(
      () =>
        IOT_PRODUCTS.find(
          item =>
          item.model === iot
        ),
      [iot]
    );






  // ==========================
  // SIMULATION
  // ==========================


  const simulation =
    useMemo(

      () =>

        calculateSimulation({

          price:
            currentProduct.price,


          downPayment:
            dp,


          tenor,


          provider:
            currentProvider,


          oppoCarePrice:
            currentOppoCare?.price ?? 0,


          iotPrice:
            currentIot?.price ?? 0,

        }),


      [
        currentProduct,
        currentProvider,
        currentOppoCare,
        currentIot,
        dp,
        tenor,
      ]

    );





  // ==========================
  // COPY RESULT
  // ==========================


  function copyResult(
    title:string,
    result:any
  ){


    const text =

`
AVANTO FINANCING SIMULATION

${title}


Provider:
${provider}


Product:
${product}


OPPO Care:
${oppoCare}


IoT:
${iot}


Tenor:
${tenor} Bulan


Harga:
Rp ${result.totalPrice.toLocaleString("id-ID")}


DP:
Rp ${result.downPayment.toLocaleString("id-ID")}


Cicilan:
Rp ${result.monthlyInstallment.toLocaleString("id-ID")}
/ bulan


Promotor:
${promoterName}


WhatsApp:
${whatsapp}
`;



    navigator.clipboard.writeText(text);


    alert(
      "Simulation copied"
    );


  }  // ==========================
  // SELECTOR STATE
  // ==========================


  const selectorState = {


    provider,


    providers:
      FINANCING_PROVIDERS.map(
        item => item.name
      ),



    product,


    productOptions:
      HP_PRODUCTS.map(
        item => ({
          label:item.model,
          value:item.model,
        })
      ),



    productPrice:
      currentProduct.price,



    oppoCare,


    oppoCareOptions:
      OPPO_CARE_PRODUCTS.map(
        item => item.model
      ),



    iot,


    iotOptions:
      IOT_PRODUCTS.map(
        item => item.model
      ),



    dp,


    tenor,


    promoterName,


    whatsapp,


  };




  const selectorActions = {


    setProvider,


    setProduct,


    setOppoCare,


    setIot,


    setDP,


    setTenor,


    setPromoterName,


    setWhatsapp,


  };function shareWhatsapp(){

  const message = 
`
AVANTO FINANCING SIMULATION

Produk:
${product}

Provider:
${provider}

Tenor:
${tenor} Bulan

Cicilan:
Rp ${simulation.smartBundle.monthlyInstallment.toLocaleString("id-ID")}
/ bulan

Terima kasih.
`;

  const url =
  "https://wa.me/?text=" +
  encodeURIComponent(message);


  window.open(url,"_blank");

}







  // ==========================
  // RETURN
  // ==========================


  return (

<div
className="
min-h-screen
bg-slate-100
"
>


<div
className="
mx-auto
max-w-[1600px]
p-6
"
>



<Header

title="AVANTO"

subtitle="OPPO Official Financing Simulator"

/>






{/* ==========================
      THREE COLUMN LAYOUT
========================== */}


<div

className="
mt-8

grid

grid-cols-1

gap-6


xl:grid-cols-[320px_minmax(420px,1fr)_380px]

"

>







{/* ==========================
        LEFT
        SELECTOR
========================== */}


<div>


<SelectorPanel

state={selectorState}

actions={selectorActions}

/>


</div>










{/* ==========================
        CENTER
        COMPARISON
========================== */}



<div
className="
space-y-6
"
>



<SummaryCard

provider={provider}

product={product}

tenor={tenor}

dp={dp}


hpOnly={
simulation.hpOnly.monthlyInstallment
}


smartBundle={
simulation.smartBundle.monthlyInstallment
}


/>








<ResultCard

title="HP ONLY"

icon="📱"


providerName={provider}


productName={product}


tenor={tenor}



monthlyInstallment={
simulation.hpOnly.monthlyInstallment
}



productPrice={
simulation.hpOnly.totalPrice
}



downPayment={
simulation.hpOnly.downPayment
}



financedAmount={
simulation.hpOnly.principal
}



admin={
simulation.hpOnly.adminFee
}



interest={
simulation.hpOnly.interest
}




onCopy={() =>
copyResult(
"HP ONLY",
simulation.hpOnly
)
}



/>











<ResultCard

title="SMART BUNDLE"

icon="🎁"


highlight



providerName={provider}



productName={

`${product}
+ ${oppoCare}
+ ${iot}`

}



tenor={tenor}



monthlyInstallment={
simulation.smartBundle.monthlyInstallment
}



productPrice={
simulation.smartBundle.totalPrice
}



downPayment={
simulation.smartBundle.downPayment
}



financedAmount={
simulation.smartBundle.principal
}



admin={
simulation.smartBundle.adminFee
}



interest={
simulation.smartBundle.interest
}




onCopy={() =>
copyResult(
"SMART BUNDLE",
simulation.smartBundle
)
}



/>




</div>









{/* ==========================
        RIGHT
        QUOTATION
========================== */}


<div>



<div

className="
sticky
top-6

overflow-hidden

rounded-3xl

border
border-slate-200

bg-white

shadow-sm

"

>



<div

className="
bg-slate-900

p-6

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

AVANTO

</p>



<h2

className="
mt-2
text-xl
font-black
"

>

Customer Financing Plan

</h2>



<p

className="
mt-1
text-sm
text-slate-300
"

>

OPPO Official Financing

</p>


</div>






<div

className="
space-y-6
p-6
"

>





<div>

<p
className="
text-xs
uppercase
tracking-wide
text-slate-400
"
>
Product
</p>


<h3
className="
mt-1
font-bold
text-slate-900
"
>
{product}
</h3>


</div>





<div
className="
grid
grid-cols-2
gap-4
"
>


<div>

<p
className="
text-xs
text-slate-400
"
>
Financing
</p>


<p
className="
mt-1
font-bold
text-slate-800
"
>
{provider}
</p>


</div>





<div>

<p
className="
text-xs
text-slate-400
"
>
Tenor
</p>


<p
className="
mt-1
font-bold
text-slate-800
"
>
{tenor} Bulan
</p>


</div>


</div>{/* PAYMENT */}

<div

className="
rounded-2xl
bg-emerald-600
p-5
text-white
"

>


<p
className="
text-xs
uppercase
tracking-widest
text-emerald-100
"
>

Monthly Payment

</p>



<h1

className="
mt-2
text-3xl
font-black
"

>

Rp {
simulation.smartBundle.monthlyInstallment
.toLocaleString("id-ID")
}

</h1>


<p
className="
text-sm
text-emerald-100
"
>
per bulan
</p>


</div>






{/* DETAIL */}

<div

className="
space-y-3
border-t
pt-5
"

>


<ReceiptRow

label="Harga Produk"

value={
"Rp "+
simulation.smartBundle.totalPrice
.toLocaleString("id-ID")
}

/>



<ReceiptRow

label="Down Payment"

value={
"Rp "+
simulation.smartBundle.downPayment
.toLocaleString("id-ID")
}

/>



<ReceiptRow

label="Biaya Admin"

value={
"Rp "+
simulation.smartBundle.adminFee
.toLocaleString("id-ID")
}

/>



<ReceiptRow

label="Total Bunga"

value={
"Rp "+
simulation.smartBundle.interest
.toLocaleString("id-ID")
}

/>



</div>







<button

className="
mt-6
w-full

rounded-2xl

bg-slate-900

py-3

font-bold

text-white

hover:bg-slate-800

"

>

📸 Generate PNG Result

</button>




<button


onClick={shareWhatsapp}

className="
mt-3
w-full
rounded-2xl
border
border-slate-200
py-3
font-bold
text-slate-700
hover:bg-slate-50
"

>

📲 Share WhatsApp



</button>




</div>


</div>


</div>







</div>







<footer

className="
mt-12

rounded-3xl

border

border-slate-100

bg-white

p-8

shadow-sm

"

>


<div

className="
flex

flex-col

items-center

gap-6

"

>


<div

className="
flex

h-16

w-48

items-center

justify-center

"

>

<img

src={avantoLogo}

alt="Avanto"

className="
max-h-14
max-w-full
object-contain
"

/>

</div>





<p
className="
text-sm
text-slate-500
"
>

OPPO Official Financing Platform

</p>







<div

className="
flex
flex-wrap
items-center
justify-center
gap-6

"

>



<div
className="
flex
h-12
w-32
items-center
justify-center
"
>

<img

src={oppoLogo}

alt="OPPO"

className="
h-10
w-auto
object-contain
"

/>

</div>




<div
className="
flex
h-12
w-32
items-center
justify-center
"
>

<img

src={yesssLogo}

alt="Yessscredit"

className="
max-h-8
max-w-full
object-contain
"

/>

</div>




<div
className="
flex
h-12
w-32
items-center
justify-center
"
>

<img

src={kredivoLogo}

alt="Kredivo"

className="
max-h-8
max-w-full
object-contain
"

/>

</div>



</div>



</div>


</footer>





</div>

</div>

);

}





function ReceiptRow({

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
justify-between

border-b

border-slate-100

pb-2

"

>


<span

className="
text-sm
text-slate-500
"

>

{label}

</span>



<span

className="
text-sm
font-bold
text-slate-800
"

>

{value}

</span>


</div>

);


}