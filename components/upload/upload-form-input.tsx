'use client';

import React, { forwardRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

type UploadFormInputProps={
    onSubmit:(e:React.FormEvent<HTMLFormElement>)=>void;
    isLoading:boolean;
}

const UploadFormInput=forwardRef<HTMLFormElement,UploadFormInputProps>(({onSubmit,isLoading},ref)=>{
  return (
    <form ref={ref} className='flex flex-col gap-6' onSubmit={onSubmit}>
        <div className='flex items-center justify-end gap-1.5'>
        <Input type='file' id='file' name='file' accept='application/pdf' required className={cn(isLoading && "opacity-50 cursor-not-allowed")} disabled={isLoading}/>
        <Button disabled={isLoading}>{isLoading ?(
          <>
            <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Processing...
          </>
        ): (
          "Upload Your PDF"
        )}</Button>
        </div>
    </form>
  )
}
)

UploadFormInput.displayName='UploadFormInput';

export default UploadFormInput