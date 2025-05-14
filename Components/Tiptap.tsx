"use client"
import React, { useState } from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import MenuBar from './Menubar'
import { colors } from '@/constant/data'
import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'
import { fetchedtoken } from '@/utils/generatetoken'
import { getRandomElement } from '@/utils/generaterandomcolor'
import { useEffect } from 'react'
import { TiptapCollabProvider } from '@hocuspocus/provider'
import { ParamValue } from 'next/dist/server/request/params'

const doc = new Y.Doc() // Initialize Y.Doc for shared editing
const getRandomColor = () => getRandomElement(colors)

type props = {
  username : ParamValue
}

export default function Tiptap({username}:props) {
  const [status, setStatus] = useState('connecting')

  const getInitialUser = () => {
    return {
      name: username,
      color: getRandomColor(),
    }
  }

  const [currentUser] = useState(getInitialUser)
  

  const editor = useEditor({
    extensions: [
      StarterKit,
      Document,
      Paragraph,
      Text,
      TextAlign.configure({
        types : ['heading','paragraph'],
      }),
      Highlight,
      Collaboration.configure({
        document: doc, // Configure Y.Doc for collaboration
      }),
    ],
  })

  useEffect(() => {
    if (!editor) return;

    const setupProvider = async () => {
      const token = await fetchedtoken(username);

      if (!token) {
        console.error("Token fetch failed");
        return;
      }

      const provider = new TiptapCollabProvider({
        name: 'post-abc123', 
        appId: `${process.env.NEXT_PUBLIC_APP_ID}`, 
        token: token,
        document: doc,

        onSynced() {
          if (!doc.getMap('config').get('initialContentLoaded') && editor) {
            doc.getMap('config').set('initialContentLoaded', true)
            editor.commands.setContent(`
                <h3>
                  Devs Just Want to Have Fun by Cyndi Lauper
                </h3>
                <p >
                  I come home in the morning light<br>
                  My mother says, <mark>“When you gonna live your life right?”</mark><br>
                  Oh mother dear we’re not the fortunate ones<br>
                  And devs, they wanna have fun<br>
                  Oh devs just want to have fun</p>
                <p >
                  The phone rings in the middle of the night<br>
                  My father yells, "What you gonna do with your life?"<br>
                  Oh daddy dear, you know you’re still number one<br>
                  But <s>girls</s>devs, they wanna have fun<br>
                  Oh devs just want to have
                </p>
                <p >
                  That’s all they really want<br>
                  Some fun<br>
                  When the working day is done<br>
                  Oh devs, they wanna have fun<br>
                  Oh devs just wanna have fun<br>
                  (devs, they wanna, wanna have fun, devs wanna have)
                </p>
            `)
        }
        }
      })

      provider.setAwarenessField('user', {
        name: username,
        color: getRandomColor(),
      })

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const statusHandler = (event:any) => {
        setStatus(event.status)
      }

      provider.on('status', statusHandler)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      provider.on('awarenessChange', ({ states } : {states :any}) => {
        console.log(states)
      })
      
    }
    setupProvider()
  }, [editor,username])

  return (
    <div>
      <MenuBar editor={editor} />
       <div
        className="collab-status-group"
        data-state={status === 'connected' ? 'online' : 'offline'}
      >
      <p className='text-center py-2'>{currentUser.name} is online </p>
      </div>
      <div className='pt-5 flex flex-col focus:outline-none border-none'>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
