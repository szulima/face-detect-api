const Clarifai = require('clarifai');

const imageHandle = (req, res, db) => {
  db('users')
    .where('id', '=', req.body.id)
    .increment('entries',1)
    .returning('entries')
    .then(entry => res.json(entry[0]))
    .catch(err => res.status(400).json('error adding entry'))
};

const app = new Clarifai.App({apiKey: '8cbfec4433bd4eceb73ffe1f6f6e20a1'});

const imageUrlHandle = (req, res) => {
  app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => res.json(data))
    .catch(err => res.json('unable to use Clarifai'))
}

module.exports = {
  imageHandle,
  imageUrlHandle
}