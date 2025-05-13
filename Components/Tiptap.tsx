"use client"
import React from 'react'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Highlight from '@tiptap/extension-highlight'
import TextAlign from '@tiptap/extension-text-align'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import MenuBar from './Menubar'

import Collaboration from '@tiptap/extension-collaboration'
import * as Y from 'yjs'

import { useEffect } from 'react'
import { TiptapCollabProvider } from '@hocuspocus/provider'

const doc = new Y.Doc() // Initialize Y.Doc for shared editing

async function fetchedtoken(){
  try {
    const res = await fetch('/api/generatejwttoken',{
      method : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      }
    })

    if(!res){
      console.log('response not generated')
      return ;
    }

    const data = await res.json()

    console.log('data',data)

    return data?.token
    
  } catch (error) {
    console.error(`Issue: ${error}`)
    return;
  }
}

export default function Tiptap() {

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
      const token = await fetchedtoken();

      if (!token) {
        console.error("Token fetch failed");
        return;
      }

      console.log('token in frontend useeffect',token)

      const provider = new TiptapCollabProvider({
        name: 'post-abc123', // Unique document identifier for syncing. This is your document name.
        appId: `${process.env.NEXT_PUBLIC_APP_ID}`, // Your Cloud Dashboard AppID or `baseURL` for on-premises
        token: token, // Your JWT token
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
    }
    setupProvider()
  }, [editor])

  return (
    <div>
      <MenuBar editor={editor} />
      <div className='pt-5 flex flex-col focus:outline-none border-none'>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
