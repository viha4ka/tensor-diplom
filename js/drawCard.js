export function drawCardsAlbum (name, data) {
    const selector = ['div', ]
    for (let i = 0; i < data.data.topalbums.album.length; i++) {
        const element = data.data.topalbums.album[i];
        let div = document.createElement('div');
        let img = document.createElement('img');
        let spanByFront = document.createElement('span');
        let divPlaylist = document.createElement('div');
        let divPlaylistFront = document.createElement('div');
        let divPlaylistBack = document.createElement('div');
        let container_player = document.querySelector('.playlists')
        div.appendChild(divPlaylist)
        divPlaylist.appendChild(divPlaylistFront)
        divPlaylist.appendChild(divPlaylistBack)
        divPlaylistFront.appendChild(img)
        divPlaylistFront.appendChild(spanByFront)
        img.src =element.image[2]['#text']
        spanByFront.innerText = `Aльбом: ${element.name}`
        div.setAttribute('class', 'playlist-wrap')
        spanByFront.setAttribute('class', 'playlist__title')
        img.setAttribute('class', 'playlist__img')
        divPlaylist.setAttribute('class', 'playlist')
        divPlaylistFront.setAttribute('class', 'playlist-front')
        divPlaylistBack.setAttribute('class', 'playlist-back')
        div.setAttribute(`data-artist`, element.artist.name)
        div.setAttribute(`data-count`, element.playcount)
        container_player.appendChild(div)
    }
    
}
