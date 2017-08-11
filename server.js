const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
var bodyParser = require("body-parser");
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const fs = require('fs')

if (isDeveloping) {
    const compiler = webpack(config);
    const middleware = webpackMiddleware(compiler, {
        publicPath: config.output.publicPath,
        contentBase: 'src',
        stats: {
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false
        }
    });

    app.use(middleware);
    app.use(webpackHotMiddleware(compiler));
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(express.static(__dirname + '/public'))

    app.get('/api/books', function response(req, res) {
        res.sendFile(path.join(__dirname, './data/books.json'));
    });

    app.get('/api/book/:id', function response(req, res) {
        let books = require('./data/books.json');
        books.map(function (book, index) {
            if (book.id === req.params.id) {
                res.send(book);
            }
        })
    });

    app.put('/api/book/:id', function response(req, res) {
        let books = require('./data/books.json');
        fs.readFile('./data/books.json', 'utf8', function (err, data) {
            if (err) {
                console.log(err);
                res.sendStatus(404);
            }
            else {
                var jsonObject = JSON.parse(data);
                var arr = [];
                    var filteredArray = jsonObject.map(function (book) {
                        if (book.id === req.params.id) {
                            book.title = req.body.title;
                            book.description = req.body.description;
                            book.author = req.body.author;
                        }
                        arr.push(book);
                    });
                var json = JSON.stringify(arr); //convert it back to json
                fs.writeFile('./data/books.json', json, 'utf8', function (err) {
                  if (err)
                    throw err
                  res.send(req.body);
                });
            }
        });
    });

    app.get('*', function response(req, res) {
        res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
        res.end();
    });

} else {

    app.use(express.static(__dirname + '/dist'));
    app.get('*', function response(req, res) {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    });
    app.get('/books', function response(req, res) {
        res.send('hello world');
    });

}

app.listen(port, '0.0.0.0', function onStart(err) {
    if (err) {
        console.log(err);
    }
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
