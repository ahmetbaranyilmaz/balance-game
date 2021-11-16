import './App.css'
import Stage from './components/Stage'
import { GameContextProvider } from './contexts/GameContext'

function App() {
  return (
    <GameContextProvider>
      <Stage />
    </GameContextProvider>
  )
}

export default App
