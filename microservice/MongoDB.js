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
async function mongoInitialize() {
  await mongoClient.connect(function (err, client) {
    if (err) {
      console.log('Failed to connect to MongoDB: ' + err);
    } else {
      console.log('Connected to MongoDB successfully');
      const db = client.db('pokeapi');
      const poke = db.collection('pokemons')

      // Set up the routes
      app.get('/pokemon/:id', async (req, res) => {
        const id = parseInt(req.params.id);
        const pokemon = await poke.findOne({_id: id});
        if (!pokemon) {
          res.status(404).send('Pokemon not found');
        } else {
          res.send(pokemon);
        }
      });
      app.get('/pokemon/:id/fav', async (req, res) => {
        const id = parseInt(req.params.id);
        const pokemon = await poke.findOne({_id: id});
        if (!pokemon) {
          res.status(404).send('Pokemon not found');
        } else {
          res.send(pokemon.favorite);
        }
      });
      app.put('/pokemon/:id/fav', async (req, res) => {
        const id = parseInt(req.params.id);
        const pokemon = await poke.findOne({_id: id});
        if (!pokemon) {
          res.status(404).send('Pokemon not found');
        } else {
          const newFavoriteValue = !pokemon.favorite;
          const result = await poke.updateOne({_id: id}, {$set: {favorite: newFavoriteValue}});
          res.send(`Updated ${result.modifiedCount} Pokemon with _id ${id}`);
        }
      });
      app.listen(port, () => {
        console.log(`Express app listening at http://localhost:${port}`);
      });
    }
  });
}

mongoInitialize();
