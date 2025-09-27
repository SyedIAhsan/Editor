import { useEffect, useRef } from 'react'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { Schema, DOMParser } from 'prosemirror-model'
import { schema } from 'prosemirror-schema-basic'
import { addListNodes } from 'prosemirror-schema-list'
import { exampleSetup } from 'prosemirror-example-setup'
import 'prosemirror-example-setup/style/style.css'
import 'prosemirror-menu/style/menu.css'
import 'prosemirror-view/style/prosemirror.css'
import './Editor.css'

// Create a schema with list support
const mySchema = new Schema({
  nodes: addListNodes(schema.spec.nodes, 'paragraph block*', 'block'),
  marks: schema.spec.marks
})

function Editor() {
  const editorRef = useRef<HTMLDivElement>(null)
  const viewRef = useRef<EditorView | null>(null)

  useEffect(() => {
    if (!editorRef.current) return

    // Create initial document content with some starter text
    const doc = mySchema.nodeFromJSON({
      type: 'doc',
      content: [
        {
          type: 'paragraph',
          content: [
            {
              type: 'text',
              text: 'Start typing here...'
            }
          ]
        }
      ]
    })

    // Create editor state
    const state = EditorState.create({
      doc,
      plugins: exampleSetup({ schema: mySchema })
    })

    // Create editor view
    const view = new EditorView(editorRef.current, {
      state,
      dispatchTransaction(transaction) {
        const newState = view.state.apply(transaction)
        view.updateState(newState)
      }
    })

    viewRef.current = view

    return () => {
      view.destroy()
    }
  }, [])

  return (
    <div className="max-w-4xl mx-auto editor-container">
      <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden editor-wrapper">
        <div
          ref={editorRef}
          className="p-6 min-h-96 text-white"
          style={{
            fontSize: '16px',
            lineHeight: '1.6',
            minHeight: '400px',
            padding: '1.5rem',
            backgroundColor: '#1f2937',
            color: 'white'
          }}
        />
      </div>
    </div>
  )
}

export default Editor