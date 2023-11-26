const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // CORS sorunlarını çözmek için cors modülünü içeri aktarın
const app = express();
const port = 3000;
const router = require('./router');

app.use(cors()); // CORS sorunlarını çözmek için cors middleware'ini kullanın
app.use(bodyParser.json());

app.use('/api/v1', router);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
