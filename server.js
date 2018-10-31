const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios')
const path = require('path');
const app = express();
app.use(express.static(path.join(__dirname, 'build')));

const clientID = process.env.GITHUB_CLIENT
const clientSecret = process.env.GITHUB_SECRET

app.get('/oauth/redirect', function (req, res) {
    const requestToken = req.query.code
    const url = `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`
    console.log('hello im here', url)
    axios({
        method: 'post',
        url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
        headers: {
            accept: 'application/json'
        }
    }).then((response) => {
        const accessToken = response.data.access_token
        res.redirect(`/home?access_token=${accessToken}`)
    })
})

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);
