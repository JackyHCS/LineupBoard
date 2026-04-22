'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
import LineupHeader from '../components/LineupHeader'
import { useAuth } from '../contexts/AuthContext'
import type { UserLineup, UserLineupFormValues } from '../types/userLineup'

const mapOptions = ['MIRAGE', 'INFERNO', 'DUST2', 'NUKE', 'ANCIENT', 'TRAIN', 'VERTIGO', 'OVERPASS']
const typeOptions = ['Smoke', 'Molotov', 'Flashbang', 'Grenade']
const sideOptions = ['T-Side', 'CT-Side']
const difficultyOptions = ['Easy', 'Medium', 'Hard']

const defaultFormValues: UserLineupFormValues = {
  title: '',
  map: mapOptions[0],
  type: typeOptions[0],
  side: sideOptions[0],
  video_url: '',
  difficulty: difficultyOptions[0],
  description: '',
}

export default function MyLineupsPage() {
  const { user, loading, signInWithGoogle } = useAuth()
  const [lineups, setLineups] = useState<UserLineup[]>([])
  const [formValues, setFormValues] = useState<UserLineupFormValues>(defaultFormValues)
  const [editingLineupId, setEditingLineupId] = useState<number | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingLineups, setIsLoadingLineups] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const submitLabel = useMemo(
    () => (editingLineupId ? 'Save Changes' : 'Create Lineup'),
    [editingLineupId]
  )

  const loadLineups = async () => {
    setIsLoadingLineups(true)
    setError(null)

    try {
      const response = await fetch('/api/userlineups')
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Failed to load your lineups.')
        return
      }

      setLineups(data.lineups || [])
    } catch {
      setError('Failed to load your lineups.')
    } finally {
      setIsLoadingLineups(false)
    }
  }

  useEffect(() => {
    if (user) {
      loadLineups()
    }
  }, [user])

  const resetForm = () => {
    setFormValues(defaultFormValues)
    setEditingLineupId(null)
  }

  const startEdit = (lineup: UserLineup) => {
    setFormValues({
      title: lineup.title,
      map: lineup.map.toUpperCase(),
      type: lineup.type,
      side: lineup.side,
      video_url: lineup.video_url,
      difficulty: lineup.difficulty,
      description: lineup.description || '',
    })
    setEditingLineupId(lineup.id)
    setMessage(null)
    setError(null)
  }

  const submitForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    setMessage(null)
    setError(null)

    const payload = {
      ...formValues,
      map: formValues.map.charAt(0) + formValues.map.slice(1).toLowerCase(),
      description: formValues.description.trim(),
    }

    const url = editingLineupId ? `/api/userlineups/${editingLineupId}` : '/api/userlineups'
    const method = editingLineupId ? 'PUT' : 'POST'

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Unable to save lineup.')
        return
      }

      setMessage(editingLineupId ? 'Lineup updated successfully.' : 'Lineup created successfully.')
      resetForm()
      await loadLineups()
    } catch {
      setError('Unable to save lineup.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const deleteLineup = async (lineupId: number) => {
    setError(null)
    setMessage(null)

    try {
      const response = await fetch(`/api/userlineups/${lineupId}`, {
        method: 'DELETE',
      })
      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Unable to delete lineup.')
        return
      }

      setLineups((current) => current.filter((lineup) => lineup.id !== lineupId))
      if (editingLineupId === lineupId) {
        resetForm()
      }
      setMessage('Lineup deleted successfully.')
    } catch {
      setError('Unable to delete lineup.')
    }
  }

  return (
    <div className="min-h-screen bg-[#0f1419] text-white">
      <LineupHeader />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="mb-8">
          <h1 className="text-4xl font-bold mb-2">My Lineups</h1>
          <p className="text-gray-400">
            Create and manage your own lineups here. Your personal lineups do not appear in the global lineup explorer.
          </p>
        </section>

        {loading ? (
          <p className="text-gray-400">Loading account...</p>
        ) : !user ? (
          <section className="bg-[#1a2332] border border-gray-800 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-2">Sign in required</h2>
            <p className="text-gray-400 mb-4">Sign in to create, edit, and delete your own lineups.</p>
            <button
              onClick={signInWithGoogle}
              className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium"
            >
              Sign in with Google
            </button>
          </section>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <section className="xl:col-span-1 bg-[#1a2332] border border-gray-800 rounded-xl p-6 h-fit">
              <h2 className="text-2xl font-semibold mb-4">
                {editingLineupId ? 'Edit Lineup' : 'Add Lineup'}
              </h2>
              <form onSubmit={submitForm} className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-300 mb-1">Title</label>
                  <input
                    required
                    value={formValues.title}
                    onChange={(event) =>
                      setFormValues((current) => ({ ...current, title: event.target.value }))
                    }
                    className="w-full bg-[#0f1419] border border-gray-700 rounded-lg px-3 py-2 text-white"
                    placeholder="Example: A-Site Smoke from T Spawn"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Map</label>
                    <select
                      value={formValues.map}
                      onChange={(event) =>
                        setFormValues((current) => ({ ...current, map: event.target.value }))
                      }
                      className="w-full bg-[#0f1419] border border-gray-700 rounded-lg px-3 py-2 text-white"
                    >
                      {mapOptions.map((map) => (
                        <option key={map} value={map}>
                          {map}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Type</label>
                    <select
                      value={formValues.type}
                      onChange={(event) =>
                        setFormValues((current) => ({ ...current, type: event.target.value }))
                      }
                      className="w-full bg-[#0f1419] border border-gray-700 rounded-lg px-3 py-2 text-white"
                    >
                      {typeOptions.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Side</label>
                    <select
                      value={formValues.side}
                      onChange={(event) =>
                        setFormValues((current) => ({ ...current, side: event.target.value }))
                      }
                      className="w-full bg-[#0f1419] border border-gray-700 rounded-lg px-3 py-2 text-white"
                    >
                      {sideOptions.map((side) => (
                        <option key={side} value={side}>
                          {side}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-300 mb-1">Difficulty</label>
                    <select
                      value={formValues.difficulty}
                      onChange={(event) =>
                        setFormValues((current) => ({ ...current, difficulty: event.target.value }))
                      }
                      className="w-full bg-[#0f1419] border border-gray-700 rounded-lg px-3 py-2 text-white"
                    >
                      {difficultyOptions.map((difficulty) => (
                        <option key={difficulty} value={difficulty}>
                          {difficulty}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">YouTube Embed URL</label>
                  <input
                    required
                    value={formValues.video_url}
                    onChange={(event) =>
                      setFormValues((current) => ({ ...current, video_url: event.target.value }))
                    }
                    className="w-full bg-[#0f1419] border border-gray-700 rounded-lg px-3 py-2 text-white"
                    placeholder="https://www.youtube.com/embed/..."
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-300 mb-1">Description (optional)</label>
                  <textarea
                    value={formValues.description}
                    onChange={(event) =>
                      setFormValues((current) => ({ ...current, description: event.target.value }))
                    }
                    className="w-full bg-[#0f1419] border border-gray-700 rounded-lg px-3 py-2 text-white min-h-24"
                    placeholder="Any setup notes or tips"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="cursor-pointer px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 rounded-lg font-medium"
                  >
                    {isSubmitting ? 'Saving...' : submitLabel}
                  </button>
                  {editingLineupId && (
                    <button
                      type="button"
                      onClick={resetForm}
                      className="cursor-pointer px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium"
                    >
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>

              {message && <p className="mt-4 text-green-400 text-sm">{message}</p>}
              {error && <p className="mt-4 text-red-400 text-sm">{error}</p>}
            </section>

            <section className="xl:col-span-2">
              <h2 className="text-2xl font-semibold mb-4">Your Saved Lineups</h2>
              {isLoadingLineups ? (
                <p className="text-gray-400">Loading your lineups...</p>
              ) : lineups.length === 0 ? (
                <p className="text-gray-400">No lineups yet. Add your first lineup from the form.</p>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {lineups.map((lineup) => (
                    <article
                      key={lineup.id}
                      className="bg-[#1a2332] border border-gray-800 rounded-xl overflow-hidden"
                    >
                      <div className="aspect-video">
                        <iframe
                          src={lineup.video_url}
                          title={lineup.title}
                          className="w-full h-full"
                          allow="clipboard-write; encrypted-media; picture-in-picture"
                          allowFullScreen
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold mb-2">{lineup.title}</h3>
                        <div className="flex flex-wrap gap-2 text-xs mb-3">
                          <span className="px-2 py-1 bg-blue-500 text-white rounded">{lineup.type}</span>
                          <span className="px-2 py-1 bg-yellow-500 text-black rounded">{lineup.difficulty}</span>
                          <span className="px-2 py-1 bg-gray-700 text-gray-200 rounded">{lineup.map}</span>
                          <span className="px-2 py-1 bg-gray-700 text-gray-200 rounded">{lineup.side}</span>
                        </div>
                        {lineup.description && (
                          <p className="text-sm text-gray-300 mb-4 line-clamp-3">{lineup.description}</p>
                        )}
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => startEdit(lineup)}
                            className="cursor-pointer px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-sm font-medium"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteLineup(lineup.id)}
                            className="cursor-pointer px-3 py-1.5 bg-red-600 hover:bg-red-700 rounded-lg text-sm font-medium"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>
    </div>
  )
}