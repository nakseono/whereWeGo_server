const express = require('express')
const app = express();
const PORT = process.env.NODE_ENV === 'production' ? 3001: 3002 

app.listen(PORT,()=>{
   console.log(`server listen on ${PORT}`)
})

app.get('/', (req, res, next) => {
   res.send('hello world!');
});