"use client"
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Arrow from '@/public/arrow.png'

export default function Home() {
  const [name,setName] = useState('')
  const router = useRouter()

  async function handleformsubmit(event:any) {
    event?.preventDefault()
    console.log(name)
    router.push('/edit')
  }

  return (
    <div className="bg-stone-100 flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleformsubmit} className="bg-white relative flex flex-col gap-4 items-center rounded-xl px-8 py-8 shadow-xs shadow-gray-300">
        <p className="font-semibold text-lg flex flex-col gap-1 items-center">
          <span>Submit this form to join the Collaborative</span>
          <span>text editor.</span>
        </p>
          <Image src={Arrow} alt="arrow" className="size-8 absolute top-20 left-64"/>
        <div className="flex flex-col gap-1 items-start">
          <label htmlFor="name" className="text-base font-semibold">Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="border text-sm py-2 border-black rounded-md px-2 w-80" placeholder="Enter your name"/>
        </div>
        <button type="submit" className="bg-black rounded-md w-80 py-1">
          <p className="text-white py-1 font-semibold text-sm">Get started !</p>
        </button>
      </form>
    </div>
  );
}
