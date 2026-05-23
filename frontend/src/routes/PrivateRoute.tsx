import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function PrivateRoute({
  children,
}: {
  children: React.JSX.Element
}) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="text-cyan-400 p-10">
        Inicializando sistema...
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}