require('dotenv').config()
const express = require('express')
const { transferFrom } = require('./lib/transfer-from')

const PORT = process.env.PORT
const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({
    ok: true,
    msg: 'api'
  })
})

app.post('/transfer', async (req, res) => {
  const params = req.body

  const hash = await transferFrom(params.from, params.to, params.amount)

  res.json({
    ok: Boolean(hash),
    hash: hash
  })
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
