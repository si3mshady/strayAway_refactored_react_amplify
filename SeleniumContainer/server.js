const { execSync } = require("child_process");
const express = require('express')
const app = express()
const port = 5001

app.get('/311', (_,res) => {
    const validate = () => { execSync(`node ${__dirname}/runner.js`);  }    
    // console.log(__dirname)
    validate()
  res.send('contacting Animal Services!')
})

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`)
})





