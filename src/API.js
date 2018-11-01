export default {
    postLink: function(user, link) {
        console.log('adding ' + link + ' to ' + user)
        fetch('/addlink', {
            method: 'POST',
            body: JSON.stringify({ user, link }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
    },

    getLinks: function(user) {
        console.log('getting links for user ' + user)
        return fetch(`/links/${user}`)
        .then(res => res.json())
        .then(response => {
            console.log('Success:', JSON.stringify(response))
            return response
        })
    },

    deleteLink: function(user, link) {
        console.log('deleting ' + link + ' from ' + user)
        fetch('/deletelink', {
            method: 'POST',
            body: JSON.stringify({ user, link }),
            headers:{
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(response => console.log('Success:', JSON.stringify(response)))
    },

    getShortLink: function(link) {
        console.log('getting short link for link ' + link)
        return fetch(`/shorten/${encodeURIComponent(link)}`)
        .then(res => res.json())
        .then(response => {
            console.log('Success:', JSON.stringify(response))
            return response
        })
    }
}
