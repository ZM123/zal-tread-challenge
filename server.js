const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios')
const jwt = require('jwt-simple')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

const clientID = process.env.GITHUB_CLIENT
const clientSecret = process.env.GITHUB_SECRET
const jwtSecret = process.env.JWT_SECRET

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
    // add a link to user (linkurl, hash)
})

app.post('/deletelink', function (req, res) {
    // delete a link
})

app.get('/links/:user', function (req, res) {
    // return user's links
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
