import { card } from 'pokemontcgsdk'
import { PokeModel, getDbConnection } from './schema'

export default async (req, res) => {
  const db = getDbConnection()

  db.on('error', () => {
    console.error.bind(console, 'connection error:')
    res.statusCode = 500
    res.end()
  })

  db.once('open', async () => {
    const customSetCode = 'base4'

    try {
      const cards = await card.where({ setCode: customSetCode, pageSize: 1000 })

      await PokeModel.bulkWrite(
        cards.map(c => ({
          updateOne: {
            filter: { id: c.id },
            update: c,
            upsert: true,
          },
        }))
      )
      res.statusCode = 200
      res.end()
    } catch (err) {
      res.statusCode = 500
      res.send(err.toString())
    }
  })
}
