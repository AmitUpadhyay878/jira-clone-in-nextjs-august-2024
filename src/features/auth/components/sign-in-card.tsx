import React from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import { DottedSepatator } from '@/components/dotted-separator'

export const SigninCard = () => {
  return (
    <Card className='w-full h-full md:w-[487px] border-none shadow-none'>
     <CardHeader className='flex items-center justify-center text-center p-7'>
      <CardTitle className='text-2xl'>Well come Back!</CardTitle>
     </CardHeader>
     <div className='px-7'>
     <DottedSepatator />
     <CardContent className='p-7'>
      
     </CardContent>
     </div>
    </Card>
  )
}


