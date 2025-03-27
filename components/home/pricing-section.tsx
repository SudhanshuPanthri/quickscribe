import Link from 'next/link';   
import {cn} from '@/lib/utils';
import {CheckIcon,ArrowRight} from 'lucide-react';

type PriceType={
  name:string;
  price:number;
  description:string;
  items:string[];
  id:string;
  paymentLink:string;
  priceId:string;
}

const plans=[
  {
    id:'free',
    name:'Free',
    price:0,
    description:'For Basic Usage',
    items:[
      '3 PDF Summaries every month',
      'Basic Processing',
      'Model 1.x'
    ],
    paymentLink:'',
    priceId:''
  },
  {
    id:'basic',
    name:'Basic',
    price:8.99,
    description:'Best for School, Office work',
    items:[
      '20 PDF Summaries every month',
      'Model 2.x for faster processing',
      'Email Support'
    ],
    paymentLink:'',
    priceId:''
  },
  {
    id:'pro',
    name:'Pro',
    price:18.99,
    description:'For professionals and teams',
    items:[
      'Unlimited PDF summaries',
      'Priority Processing',
      'Model 2.x pro-v.1 for the best output',
      '24/7 priortiy support',
      'Markdown export'
    ],
    paymentLink:'',
    priceId:''
  }
]

//adding free or not that needs to be decided as of now it's fine.

const PricingCard=({name,price,description,items,id,paymentLink}:PriceType)=>{
  return(
  <div className="relative w-full max-w-lg hover:scale-105 hover:transition-all duration-300">
      <div className={cn("relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-2xl border-[1px] border-gray-500/20",id==='basic' && 'border-rose-500 gap-5 border',id==='pro' && 'border-rose-500 gap-5 border-2')}>
      <div className="flex justify-between items-center gap-4">
        <div>
          <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
          <p className="text-base-content/80 mt-2">{description}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <p className="text-5xl tracking-tight font-extrabold">${price}</p>
          <div className="flex flex-col justify-end mb-[4px]">
            <p className="text-xs uppercase font-semibold">USD</p>
            <p className="text-xs">/month</p>
          </div>
      </div>
      <div className="space-y-2.5 leading-relaxed text-base flex-1">
        {items.map((item,index)=>(
        <li key={index} className="flex items-center gap-2">
          <CheckIcon size={18}/>
          <span>{item}</span>
        </li>
        ))}
      </div>
      <div className="space-y-2 flex justify-center w-full">
        <Link href={paymentLink} className={cn("w-full rounded-full flex items-center justify-center gap-2 bg-linear-to-r from-rose-800 to-rose-500 hover:from-rose-500 hover:to-rose-800 text-white border-2 py-2",id==='pro' ? 'border-rose-900' : 'border-rose-100 from-rose-400 to-rose-500')}>
            Buy
            <ArrowRight size={18} />
        </Link>
      </div>
      </div>
    </div>
  )
}

const PricingSection=()=>{ 
  return( 
    <section className="relative overflow-hidden" id="pricing"> 
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div className="flex items-center justify-center w-full pb-12">
          <h2 className="uppercase font-bold text-xl mb-8 text-rose-500i">Pricing</h2>
        </div>
        <div className="realtive flex justify-center flex-col lg:flex-row items-center lg:items-stretch gap-8">
          {plans.map((plan)=>(
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>
      </div> 
    </section>
  ) 
}

export default PricingSection;
