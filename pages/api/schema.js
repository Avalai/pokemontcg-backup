import mongoose, { Schema } from 'mongoose'

const pokeSchema = new Schema({
  id: { type: String, unique: true },
  name: String,
  nationalPokedexNumber: Number,
  imageUrl: String,
  imageUrlHiRes: String,
  types: Array,
  supertype: String,
  subtype: String,
  hp: { type: String, index: true },
  retreatCost: Array,
  convertedRetreatCost: Number,
  number: String,
  artist: String,
  rarity: { type: String, index: true },
  series: String,
  set: String,
  setCode: String,
  attacks: Array,
  resistances: Array,
  weaknesses: Array,
})
pokeSchema.index({ name: 'text' })

// This line is necessary to prevent the 'cannot overwrite schema' error
// that affects local development of mongodb
mongoose.models = {}

const PokeModel = mongoose.model('PokeModel', pokeSchema)

function getDbConnection() {
  mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true })
  return mongoose.connection
}

export { PokeModel, getDbConnection }
