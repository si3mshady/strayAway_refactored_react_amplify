const express = require('express')
const { execSync } = require("child_process");
const app = express()
const port = 5001

const validate = () => {
    execSync("node /Users/ellarnol/selenium/app.js");
}

app.get('/', (req, res) => {
    validate()
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})





