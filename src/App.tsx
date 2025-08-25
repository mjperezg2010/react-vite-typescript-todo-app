import Home from './pages/Home'

function App() {
  return (<>
    <Home/>
    {/* DaysiUI Toast container */}
    <div id="toast-root-top-right" className="toast toast-top toast-end" />
    <div id="toast-root-top-center" className="toast toast-top toast-center" />
    <div id="toast-root-top-left" className="toast toast-top toast-start" />
  </>)
}

export default App
