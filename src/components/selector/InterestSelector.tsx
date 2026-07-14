interface InterestOption {
  label: string;
  value: number;
}


interface InterestSelectorProps {

  value: number;

  options: InterestOption[];

  onChange: (value:number)=>void;

}



export default function InterestSelector({

  value,

  options,

  onChange,

}:InterestSelectorProps){


return (

<div className="space-y-2">


<label
className="
block
text-sm
font-semibold
text-slate-700
"
>

Program Bunga

</label>



<div
className="
grid
grid-cols-2
gap-3
"
>


{options.map((item)=>(


<button

key={item.value}

type="button"

onClick={() =>
  onChange(item.value)
}

className={`
rounded-xl
border
px-4
py-3
text-sm
font-bold
transition

${
value === item.value

?

"border-emerald-500 bg-emerald-50 text-emerald-700"

:

"border-slate-200 bg-white text-slate-700 hover:border-emerald-300"

}

`}

>

{item.label}

</button>


))}


</div>


</div>

);

}