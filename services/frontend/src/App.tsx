import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [healthCheck, setHealthCheck] = useState("Don't know")

  useEffect(() => {
    const url = `http://localhost:90/api/v1/health/check`;
    fetch(url)
      .then(res => res.json())
      .then(result => {
        setHealthCheck(result.status)
      }
      )
  }, []);

  return (
    <>
      <div className="App">
        <header className="App-header">
          Server HealthCheck status: {healthCheck}
        </header>
      </div>
    </>
  )
}

export default App
