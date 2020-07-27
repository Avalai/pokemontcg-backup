import { PokeModel, getDbConnection } from './schema'

export default async (req, res) => {
  const db = getDbConnection()

  db.on('error', () => {
    console.error.bind(console, 'connection error:')
    res.statusCode = 500
    res.end()
  })

  db.once('open', async () => {
    const { name, hp, rarity } = req.query
    const search = []

    if (name) {
      search.push({ $text: { $search: name } })
    }
    if (hp) {
      search.push({ hp })
    }
    if (rarity) {
      search.push({ rarity })
    }

    try {
      const results = await PokeModel.find(
        search.length ? { $and: search } : undefined
      ).exec()
      res.json(results)
    } catch (err) {
      res.statusCode = 500
      res.send(err.toString())
    }
  })
}
