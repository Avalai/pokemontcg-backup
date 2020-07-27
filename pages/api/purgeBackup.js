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
      // deleteMany is used for easier access of deletedCount
      const purge = await PokeModel.deleteMany({ setCode: customSetCode })

      if (purge.deletedCount > 0) {
        res.statusCode = 200 // All base4 cards were removed
      } else {
        res.statusCode = 404 // No cards were found to delete
      }
      res.end()
    } catch (err) {
      res.statusCode = 500
      res.send(err.toString())
    }
  })
}
