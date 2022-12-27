const express = require('express')
var bodyParser = require('body-parser')
const { PrismaClient } = require('@prisma/client')

const app = express()
const port = 3000
const prisma = new PrismaClient()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.send('Hello...!');
})

app.post('/store', async (req, res) => {
  const { store } = req.body;
  const result = await prisma.store.create({
    data: {
      store
    }
  })
  res.json(result)
})

app.post('/post', async (req, res) => {
  const { title, content, store } = req.body
  const result = await prisma.post.create({
    data: {
      title, 
      content,
      store: { connect: { store: store } },
    },
  })
  res.json(result)
}) 

app.get('/post', async (req, res) => { 
  const posts = await prisma.post.findMany();
  res.json(posts)
})

const server = app.listen(port, () =>
  console.log(`
🚀 Server ready at: http://localhost:${ port }
⭐️ See sample requests: api`),
)