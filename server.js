const express = require('express');
const apiMiddleware = require('./config/middleware');
const constants = require('./config/api.env');
const apiRoutes = require('./modules/index');
require('./config/database')

const app = express();

apiMiddleware(app);
apiRoutes(app);

app.listen(constants.PORT, (err) => {
    console.log(`API Running on port ${constants.PORT}`);
});