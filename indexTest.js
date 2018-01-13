const express = require('express')
const path = require('path')

express()
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.json({a:1}))
  .listen(5000, () => console.log(`Listening on`))
