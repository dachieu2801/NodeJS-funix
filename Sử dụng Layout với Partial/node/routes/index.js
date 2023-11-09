
function route(app) {
  const data = []

  app.post('/add-user', async (req, res, next) => {
    try {
      data.push(req.body)
      res.redirect('http://localhost:3000/users')
    } catch (err) {
      next(err)
    }
  });
  app.get('/', (req, res, next) => {
    res.json(data)
  });

}

module.exports = route;