import Link from 'next/link'

import { useState } from 'react'
import NextHead from '../components/Head'
import Footer from '../components/Footer'

export default function Search() {
  const [name, setName] = useState(null)
  const [hp, setHp] = useState(null)
  const [rarity, setRarity] = useState(null)
  const [results, setResults] = useState(null)

  const handleSubmit = e => {
    e.preventDefault()
    alert(`Submitting: ${name}, ${hp}, ${rarity}`)

    const getResults = async ([name, hp, rarity]) => {
      const response = await fetch('/api/search', {
        method: 'get',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      const result = await response.json()
      setResults(result)
    }
  }

  return (
    <div className="container">
      <NextHead />

      <header>
        <Link href="/">&larr; Back</Link>
      </header>

      <main>
        <h1 className="title">Backup Search</h1>

        <form onSubmit={handleSubmit}>
          <div className="card">
            <label>
              Name:
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </label>
          </div>

          <div className="card">
            <label>
              HP:
              <input
                type="text"
                value={hp}
                onChange={e => setHp(e.target.value)}
              />
            </label>
          </div>

          <div className="card">
            <label>
              Rarity:
              <input
                type="text"
                value={rarity}
                onChange={e => setRarity(e.target.value)}
              />
            </label>
          </div>

          <input type="submit" value="Submit" />
        </form>
      </main>

      <Footer />

      <style jsx>{`
        header {
          width: 100%;
          text-align: left;
          padding: 2em;
        }
      `}</style>
    </div>
  )
}
