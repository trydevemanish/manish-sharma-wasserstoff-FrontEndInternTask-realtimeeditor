import React from 'react'
import Tiptap from '@/Components/Tiptap'
import { HocuspocusProviderConfiguration } from '@hocuspocus/provider'
import * as Y from 'yjs'

const appId = '7j9y6m10'

const room = `room.${new Date()
  .getFullYear()
  .toString()
  .slice(-2)}${new Date().getMonth() + 1}${new Date().getDate()}-ok`

const ydocA = new Y.Doc()

// const providerA = new HocuspocusProvider({
//   appId,
//   name: room,
//   document: ydocA,
// })


export default function page() {


  return (
    <div>
      <Tiptap />
    </div>
  )
}
