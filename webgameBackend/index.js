const http = require('http')
const config = require('./utils/config')
const app = require('./app')
const server = http.createServer(app)
const logger = require('./utils/logger')

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})