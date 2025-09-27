import Editor from './components/Editor'

function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white dark-container">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Notion-Style Editor</h1>
        <Editor />
      </div>
    </div>
  )
}

export default App
