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
    }
}
