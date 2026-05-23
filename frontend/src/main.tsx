import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'

import { AuthProvider } from './context/AuthContext'
import { NotesProvider } from './context/NotesContext'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <NotesProvider>
      <App />
    </NotesProvider>
  </AuthProvider>
)