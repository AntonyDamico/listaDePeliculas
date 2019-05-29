console.log('this is from the like button')
document.querySelectorAll('.fa-heart').forEach(media => media.addEventListener('click', e => {
    const mediaElement = e.target.parentElement;
    const mediaId = mediaElement.id;
    const media = mediaElement.classList.contains('movie') ? 'movie' : 'show';
    let baseUrl = 'api/' + media + '/favorites/';
    const add = e.target.classList.contains('far');
    let action;
    if (add) {
        action = 'add';
    } else {
        action = 'delete'
    }
    doPost(media, mediaId, baseUrl + action, action, e.target)
        .catch(e => console.log('error'))
}));

async function doPost(media, mediaId, url, action, heart) {
    const res = await post(media, mediaId, url, action);
    if (res) {
        heart.classList.toggle('far');
        heart.classList.toggle('fas')
    }
}

async function post(media, media_id, url, action) {
    console.log(url);
    const method = action === 'add' ? 'POST' : 'DELETE';
    const data = await fetch(url, {
            method,
            body: JSON.stringify({media_id}),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    )
    console.log(data);
    const dataJson = await data.json();
    return dataJson.message === 'Request Successful'
}
