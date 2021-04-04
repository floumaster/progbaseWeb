const express = require('express');
const userRouter = require('./routes/users.js');
const websiteRouter = require('./routes/websites.js');
const mediaRouter = require('./routes/media.js');
const bodyParser = require("body-parser");
const busboy = require('busboy-body-parser');
const app = express();
const busboyOptions = {
    limit: '10mb',
    multi: false,
}
app.use(busboy(busboyOptions));
app.use(bodyParser.json());
app.use('/api/users', userRouter);
app.use('/api/websites', websiteRouter);
app.use('/api/media', mediaRouter);
const expressSwaggerGenerator = require('express-swagger-generator');
const expressSwagger = expressSwaggerGenerator(app);

const options = {
    swaggerDefinition: {
        info: {
            description: 'JSON http api documentation',
            title: 'documentation',
            version: '1.0.0',
        },
        host: 'localhost:3000',
        produces: ["application/json"],
    },
    basedir: __dirname,
    files: ['./routes/**/*.js', './models/**/*.js'],
};
expressSwagger(options);


app.listen(3000);