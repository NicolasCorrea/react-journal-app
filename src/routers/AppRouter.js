import { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { onAuthStateChanged } from 'firebase/auth'
import { login, setNotes } from '../actions'

import { AuthRouter } from './AuthRouter'
import { PublicRoute } from './PublicRoute'
import { PrivateRoute } from './PrivateRoute'

import { JournalScreen } from '../components/journal/JournalScreen'
import { loadNotes } from '../helpers'
import { auth } from '../firebase'

export const AppRouter = () => {
  const send = useDispatch()
  const [loading, setLoading] = useState(true)
  const [isLogIn, setIsLogIn] = useState(false)
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        send(login(user))
        const notes = await loadNotes({ id: user.uid })
        send(setNotes(notes))
        setIsLogIn(true)
      } else {
        setIsLogIn(false)
      }
      setLoading(false)
    })
  }, [send, setLoading, setIsLogIn])

  if (loading) {
    return <div>Loading...</div>
  }
  return (
    <Router>
      <div>
        <Switch>
          <PublicRoute path="/auth" component={AuthRouter} isAuth={isLogIn} />
          <PrivateRoute exact path="/" component={JournalScreen} isAuth={isLogIn} />
          <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  )
}
