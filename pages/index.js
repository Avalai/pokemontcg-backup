import Link from 'next/link'
import queryString from 'query-string'

import { useState } from 'react'
import NextHead from '../components/Head'
import Footer from '../components/Footer'

const state = {
  loading: 'Loading',
  default: 'Default',
  success: 'Success',
  error: 'Error',
}

export default function Home() {
  // const [customSetCode, setCustomSetCode] = useState('base4')
  const [createBackupStatus, setCreateBackupStatus] = useState(state.default)
  const [purgeBackupStatus, setPurgeBackupStatus] = useState(state.default)

  const [name, setName] = useState('')
  const [hp, setHp] = useState('')
  const [rarity, setRarity] = useState('')

  const [searchResults, setSearchResults] = useState([])

  const handleMakeBackup = async e => {
    e.preventDefault()
    setCreateBackupStatus(state.loading)
    setPurgeBackupStatus(state.default)

    const response = await fetch('/api/createBackup', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    if (response.status === 200) {
      setCreateBackupStatus(state.success)
    } else {
      setCreateBackupStatus(state.error)
    }
  }
  const handleRemoveBackup = async e => {
    e.preventDefault()
    setCreateBackupStatus(state.default)
    setPurgeBackupStatus(state.loading)

    const response = await fetch('/api/purgeBackup', {
      method: 'get',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    console.log(response.status)
    if (response.status === 200) {
      setPurgeBackupStatus(state.success)
      setSearchResults([])
    } else {
      setPurgeBackupStatus(state.error)
    }
  }
  const handleSearchBackup = async e => {
    e.preventDefault()
    console.log(name, hp, rarity)
    const response = await fetch(
      `/api/searchBackup?${queryString.stringify({ name, hp, rarity })}`
    )
    setSearchResults(await response.json())
  }

  return (
    <div className="container">
      <NextHead />

      <main>
        <h1 className="title">
          <div role="img" style={{ transform: 'scaleX(-1)' }}>
            🐉
          </div>
          PokéRewind
          <div role="img">🐉</div>
        </h1>
        <p className="description">Back up your set and search through it.</p>

        {/* <div className="grid --column"> */}
        <div className="card">
          <h3>Create a Backup</h3>
          <button
            type="submit"
            disabled={createBackupStatus === state.loading}
            onClick={handleMakeBackup}
          >
            Create Backup
          </button>
          <p>
            {createBackupStatus === state.loading
              ? 'Loading...'
              : createBackupStatus === state.success
              ? 'Backup successful!'
              : createBackupStatus === state.error
              ? 'Backup Failed.'
              : null}
          </p>
        </div>

        <div className="card">
          <h3>Purge a Backup</h3>
          <button
            type="button"
            disabled={purgeBackupStatus === state.loading}
            onClick={handleRemoveBackup}
          >
            Purge Backup
          </button>
          <p>
            {purgeBackupStatus === state.loading
              ? 'Loading...'
              : purgeBackupStatus === state.success
              ? 'Purge successful!'
              : purgeBackupStatus === state.error
              ? 'There were no cards to purge.'
              : null}
          </p>
        </div>
        {/* </div> */}
        <hr />

        <h2>Search Your Backup</h2>

        <form onSubmit={handleSearchBackup}>
          <div className="grid">
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
                  type="number"
                  value={hp}
                  onChange={e => setHp(e.target.value)}
                />
              </label>
            </div>

            <div className="card">
              <label>
                Rarity:
                <select
                  value={rarity}
                  onChange={e => setRarity(e.target.value)}
                >
                  <option value="">Any</option>
                  <option value="Common">Common</option>
                  <option value="Uncommon">Uncommon</option>
                  <option value="Rare">Rare</option>
                </select>
              </label>
            </div>
          </div>
          <button type="submit" className="search-btn">
            Search Backup
          </button>
        </form>

        <div className="grid search-results">
          {searchResults.map(card => (
            <div className="card" key={card._id}>
              <img src={card.imageUrl} alt={`${card.name} Card`} />
              <h3>{card.name}</h3>
              {card.hp && <p>HP: {card.hp}</p>}
              <p>Rarity: {card.rarity}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
