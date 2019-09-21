const handleSignin = (req, res, db, bcrypt) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json('incorrect form submission');
  }
  db('login').select('email','hash')
    .where('email', '=', email)
    .then(login => {
      if (bcrypt.compareSync(password, login[0].hash)){
        return db('users').select('*').where('email', '=', email)
          .then(user => res.json(user[0]))
          .catch(err => res.status(400).json('unable to get user'))
      }
      else res.status(400).json('wrong credentials')
    })
    .catch(err=>res.json('error logging in'))
}

module.exports = {
  handleSignin
}