# Pokémon TCG Backup Project

Create a local backup of your Pokémon Trading Card set! This project uses the [Pokémon TCG API](https://pokemontcg.io/) to load all of the cards in the `base4` set and back them up to a local MongoDB database. It is built using [Next.js](https://nextjs.org/) (React) and [Mongoose](https://mongoosejs.com/) (MongoDB).

## Installation

1. Clone this repository locally.
2. Run `npm install` inside the project.
3. Head to the [MongoDB website](https://www.mongodb.com/try/download/community) and download MongoDB Community Server for your operating system. Accept all of the default installation suggestions. You can choose not to download their GUI.
4. Inside the project, run `npm run dev`,
5. View the site in your browser at `http://localhost:3000/` once the terminal confirms that the project has compiled successfully.

## Functionality

The site includes the ability to:

- Create a backup of the `base4` card set from the Pokémon TCG API to a local dabatase
  - Note: If the data already exists, the site will check the incoming data and update it to the latest version.
- Purge that backup from the local database
- Search the local database for a card, based on the name, HP and rarity
  - Note: This is an `AND` field, not an `OR` field. This was an intentional decision in order to be able to filter cards - for example, all "Rare" cards with 90 HP.
