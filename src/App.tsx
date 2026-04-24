import { useState, useEffect } from 'react'
import { fetchGithubContributions } from './utils/githubFetcher'
import type { ContributionDay } from './utils/githubFetcher'
import { SnakeGame } from './components/SnakeGame'
import './App.css'

function App() {
  const [username, setUsername] = useState<string>('')
  const [days, setDays] = useState<ContributionDay[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const userParam = params.get('user') || 'nunobcastro'
    setUsername(userParam)
    
    const loadContributions = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchGithubContributions(userParam)
        if (data.length === 0) {
          setError('Could not fetch contributions. Check the username or CORS proxy.')
        } else {
          setDays(data)
        }
      } catch (err) {
        setError('An error occurred while fetching data.')
      } finally {
        setLoading(false)
      }
    }

    loadContributions()
  }, [])

  if (loading) {
    return <div className="loading">Loading contributions for {username}...</div>
  }

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    )
  }

  return (
    <div className="App">
      <SnakeGame days={days} username={username} />
      <div className="footer">
        <p>Tip: Add <code>?user=YOUR_USERNAME</code> to the URL to play with your graph!</p>
      </div>
    </div>
  )
}

export default App
