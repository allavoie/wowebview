const express = require('express');
const app = express();
app.use(express.static('public'));
app.get('/v1/page', (req, res) => {
  console.log('Responded to /v1/page');
  return res.json(samplePage)
});
app.listen(3003, () => console.log('Example app listening on port 3003!'));
