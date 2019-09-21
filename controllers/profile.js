const handleProfile = (req, res, db) => {
  const { id } = req.params;
  db('users')
    .where({id})
    .then(user => {
      if (user[0]) res.json(user[0]);
      else res.status(400).json("Not found")
    })
    .catch(() => res.status(400).json("error getting user"));
};

module.exports = {
  handleProfile
}