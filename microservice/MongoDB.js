const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const app = express();
const port = 3000;

// Set up the MongoDB client and database
const mongoUrl = "mongodb+srv://ghastnier:268ab5J0EmXsbPHx@cluster0.glgdodb.mongodb.net/?retryWrites=true&w=majority";
const mongoClient = new MongoClient(mongoUrl, {useUnifiedTopology: true});
app.use(cors())

// Connect to the MongoDB database
async function mongoInitialize(filter, options) {
  await mongoClient.connect(function (err, client) {
    let pokeMain;
    if (err) {
      console.log('Failed to connect to MongoDB: ' + err);
    } else {
      console.log('Connected to MongoDB successfully');
      const db = client.db('pokeapi');
      const pokeFull = db.collection('pokemons')
      const pokemonComp = db.collection('main')

      // Set up the routes
      app.get('/pokemon/:natDex', async (req, res) => {
        const natDex = parseInt(req.params.natDex);
        const pokemon = await pokemonComp.findOne({natDex: natDex});
        if (!pokemon) {
          res.status(404).send('Pokemon not found');
        } else {
          res.send(pokemon);
        }
      });

      app.get('/pokemon', async (req, res) => {
        const page = parseInt(req.query.page) || 1;
        const limit = (page !== 1) ? 5 : 20;
        const skip = (page - 1) * limit;
        try {
          const documents = await pokemonComp.find()
            .skip(skip)
            .limit(limit)
            .toArray();
          res.json(documents);
        } catch (err) {
          console.log(err);
          res.status(500).send('Error retrieving documents from database');
        }
      });

      app.get('/pokemon/:natDex/isFav', async (req, res) => {
        const natDex = parseInt(req.params.natDex);
        const pokemon = await pokemonComp.findOne({natDex: natDex});
        if (!pokemon) {
          res.status(404).send('Pokemon not found');
        } else {
          res.send(pokemon.favorite);
        }
      });

      app.put('/pokemon/:natDex/setFav', async (req, res) => {
        const natDex = parseInt(req.params.natDex);
        const pokemon = await pokemonComp.findOne({natDex: natDex});
        if (!pokemon) {
          res.status(404).send('Pokemon not found');
        } else {
          let newFavoriteValue = !pokemon.favorite;
          console.log(newFavoriteValue)
          await pokemonComp.findOneAndUpdate({natDex: natDex}, {
              '$set': {
                'favorite': newFavoriteValue

              }
            }
          );
          res.json({message: `Updated favorite status of Pok??mon with _id ${natDex}. ---> From ${!newFavoriteValue} to ${newFavoriteValue}`});
        }
      });
      app.listen(port, () => {
        console.log(`Express app listening at http://localhost:${port}`);
      });
    }
  });
}

mongoInitialize({}, {_id: 1, natDex: 1, height: 1, weight: 1, name: 1, favorite: 1}).then(() => {
  console.log('MongoDB and routes are initialized');
});
