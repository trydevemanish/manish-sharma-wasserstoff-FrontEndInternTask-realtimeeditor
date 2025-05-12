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

export default function Tiptap() {

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextAlign.configure({
        types : ['heading','paragraph'],
      }),
      Highlight,
    ],
    content: `<h3>
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
      </p>`,
  })

  return (
    <div>
      <MenuBar editor={editor} />
      <div className='pt-5 flex flex-col focus:outline-none border-none'>
        <EditorContent editor={editor} />
      </div>
    </div>
  )
}
