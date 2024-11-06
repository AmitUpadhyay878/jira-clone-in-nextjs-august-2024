'use client'
import React from 'react'
import Link from 'next/link'
import {FcGoogle} from 'react-icons/fc'
import {FaGithub} from 'react-icons/fa'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage
} from '@/components/ui/form'
import { DottedSepatator } from '@/components/dotted-separator'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const formSchema = z.object({
  name:z.string().trim().min(1, "Please enter your name"),
  email: z.string().email(),
  password: z.string().min(8, "Minimum 8 charecters required")
})


export const SignUpCard = () => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name:"",
      email: "",
      password: ""
    }
  })
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data,"fff" )
  }

  return (
    <Card className='w-full h-full md:w-[487px] border-none shadow-none'>
     <CardHeader className='flex items-center justify-center text-center p-7'>
      <CardTitle className='text-2xl'>Sign Up</CardTitle>
      <CardDescription>
        By Signing up, you agree to our {" "}
        <Link href="/privacy"><span className='text-blue-700'>Privacy-policy</span></Link>{" "} and {" "}
        <Link href="/terms"><span className='text-blue-700'>Terms of Service</span></Link>
      </CardDescription>
     </CardHeader>

     <DottedSepatator />
     <CardContent className='p-7'>
     <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
                name='name'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                      className='gap-4'
                        type='text'
                        placeholder='Enter your name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
                }
              />
              <FormField
                name='email'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type='email'
                        placeholder='Enter email address'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
                }
              />
              <FormField
                name='password'
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type='password'
                        placeholder='Enter password'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )
                }
              />

              <Button disabled={false} size="lg" className="w-full">
                Submit
              </Button>
            </form>
          </Form>
     <div className='p-7'>
     <DottedSepatator />
     </div>
     </CardContent>
     <CardContent className='p-7 flex flex-col gap-y-4'>
    <Button className='w-full' variant="secondary" disabled={false}><FcGoogle className='mr-2 size-5'/>login with Google</Button>
    <Button className='w-full' variant="secondary" disabled={false}><FaGithub className='mr-2 size-5'/>login with Github</Button>
     </CardContent>
     <div className='px-7'>
          <DottedSepatator />
        </div>
          <CardContent className='p-7 flex items-center justify-center'>
                  <p>
                    Already have an account ?
                    <Link href="/sign-in">
                    <span className='text-blue-700'>&nbsp;Login</span>
                    </Link>
                  </p>
          </CardContent>
    </Card>
  )
}


