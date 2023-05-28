import { lazy } from 'react'
import { TransportFormDataProvider } from './utils/providers/TransportFormProvider';

const TransportForm = lazy(() => import('./pages/TransportForm'))

function App() {
  return (
    <>
      <div className="App">
        <TransportFormDataProvider>
          <TransportForm />
        </TransportFormDataProvider>
      </div>
    </>
  )
}

export default App
