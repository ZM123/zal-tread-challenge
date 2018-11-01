const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios')
const jwt = require('jwt-simple')
var TAFFY = require('taffy');
const path = require('path');
const hash = require('string-hash')
const app = express();
app.use(express.static(path.join(__dirname, 'build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const clientID = process.env.GITHUB_CLIENT
const clientSecret = process.env.GITHUB_SECRET
const jwtSecret = process.env.JWT_SECRET

var db = TAFFY([{ id: 'shorts', shortToLong: {} }, { id: 'longs', longToShort: {} }]);

app.get('/oauth/redirect', function (req, res) {
    const requestToken = req.query.code
    res.redirect(`/authenticate?request_token=${requestToken}`)
})

app.get('/userdetails/:code', function (req, res) {
    const requestToken = req.params.code
    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        const accessToken = response.data.access_token
        if (accessToken) {
            axios({
                method: 'get',
                url: 'http://api.github.com/user',
                headers: {
                    Authorization: 'token ' + accessToken
                }
            })
            .then(userResponse => {
                if (userResponse.data && userResponse.data.login) {
                    const payload = { login: userResponse.data.login }
                    res.status(200).json({ jwt: jwt.encode(payload, jwtSecret), login: userResponse.data.login })
                }
                else res.status(401).json({})
            })
        } else {
            res.status(401).json({})
        }
    })
})

app.get('/verify/:jwt', function (req, res) {
    const decodedJwt = decodeURI(req.params.jwt)
    const decoded = jwt.decode(decodedJwt, jwtSecret)
    if (decoded.login) res.status(200).json({ authenticated: true, login: decoded.login })
    else res.status(401).json({})
})

app.post('/addlink', function (req, res) {
    const { user, link } = req.body
    const userRecord = db({ user }).first()
    if (userRecord && userRecord.links) {
        if (!userRecord.links.includes(link)) {
            db({ user }).update({ links: [...userRecord.links, link] })
            const linkHash = hash(link)
            db({ id: 'shorts' }).update(function () {
                this.shortToLong[linkHash] = link;
                return this;
            })
            db({ id: 'longs' }).update(function () {
                this.longToShort[link] = linkHash;
                return this;
            })
            console.log('updated user ' + user + ' with link ' + link)
            res.status(200)
        } else {
            res.status(400)
        }
    } else {
        db.insert({
            user,
            links: [link]
        })
        const linkHash = hash(link)
        db({ id: 'shorts' }).update(function () {
            this.shortToLong[linkHash] = link;
            return this;
        })
        db({ id: 'longs' }).update(function () {
            this.longToShort[link] = linkHash;
            return this;
        })
        console.log('inserted user ' + user + ' and link ' + link)
        res.status(200)
    }
})

app.post('/deletelink', function (req, res) {
    // delete a link
})

app.get('/links/:user', function (req, res) {
    const user = req.params.user
    if (user) {
        const userRecord = db({ user })
        if (userRecord && userRecord.links) res.status(200).json(userRecord.links)
        else res.status(400).json([])
    } else {
        res.status(400).json([])
    }
})

app.get('/shorten/:link', function (req, res) {
    // return shortened link
})

app.get('/lengthen/:link', function (req, res) {
    // return lengthened link
})

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
