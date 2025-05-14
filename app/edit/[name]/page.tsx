"use client"
import React from 'react'
import Tiptap from '@/Components/Tiptap'
import { useParams } from 'next/navigation'

export default function Page() {
  const { name } = useParams()

  return (
    <div>
      <Tiptap username={name} />
    </div>
  )
}
