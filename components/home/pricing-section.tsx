import Link from 'next/link';   
import {cn} from '@/lib/utils';

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
  <div className="relative w-full max-w-lg">
      <div className={cn("relative flex flex-col h-full gap-4 lg:gap-8 z-10 p-8 rounded-2xl border-[1px] border-gray-500/20",id==='pro' && 'border-rose-500 gap-5 border-2')}>
      <div className="flex justify-between items-center gap-4">
        <div>
          <p className="text-lg lg:text-xl font-bold capitalize">{name}</p>
          <p className="text-base-content/80 mt-2">{description}</p>
        </div>
      </div>
      <div>
        <p>{price}</p>
      </div>
      <div>
        {items.map((item,index)=>(
        <li key={index}>{item}</li>
        ))}
      </div>
      <div>
        <Link href={paymentLink}>Buy</Link>
      </div>
      </div>
    </div>
  )
}

const PricingSection=()=>{ 
  return( 
    <section> 
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 lg:pt-12">
        <div>
          <h2>Pricing</h2>
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
