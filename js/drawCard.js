export function drawCardsTraks (name, data) {
    for (let i = 0; i < data.data.tracks.track.length; i++) {
        const element = data.data.tracks.track[i];
        let div = document.createElement('div');
        let img = document.createElement('img');
        let spanByFront = document.createElement('span');
        let divPlaylist = document.createElement('div');
        let divPlaylistFront = document.createElement('div');
        let divPlaylistBack = document.createElement('div');
        let container_player = document.querySelector('.playlists')
        let link = document.createElement('a')
        div.appendChild(divPlaylist)
        divPlaylist.appendChild(divPlaylistFront)
        divPlaylist.appendChild(divPlaylistBack)
        divPlaylistFront.appendChild(img)
        divPlaylistFront.appendChild(spanByFront)
        divPlaylistBack.appendChild(link)
        img.src =element.image[2]['#text']
        link.href = element.url
        link.target = "_blank"
        link.innerText= "Перейти к треку"
        spanByFront.innerText = `Трек: ${element.name}`
        div.setAttribute('class', 'playlist-wrap')
        spanByFront.setAttribute('class', 'playlist__title')
        img.setAttribute('class', 'playlist__img')
        link.setAttribute("class", 'playlist-back__link')
        divPlaylist.setAttribute('class', 'playlist')
        divPlaylistFront.setAttribute('class', 'playlist-front')
        divPlaylistBack.setAttribute('class', 'playlist-back')
        div.setAttribute(`data-artist`, element.artist.name)
        div.setAttribute(`data-count`, element.playcount)
        container_player.appendChild(div)
    }
    
}

export function drawCardsMyTracks (name, data) {
    for (let i = 0; i < data.length; i++) {
        const element = data[i];
        let div = document.createElement('div');
        let img = document.createElement('img');
        let img2 = document.createElement('img');
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
        divPlaylistBack.appendChild(img2)
        img.src = element.img
        img2.src = "./images/svg/Play.svg"
        spanByFront.innerText = `Трек: ${element.name}`
        div.setAttribute('class', 'playlist-wrap')
        spanByFront.setAttribute('class', 'playlist__title')
        img.setAttribute('class', 'playlist__img')
        img2.setAttribute('class', 'playlist__play')
        img2.setAttribute('data', element.audio)
        img2.setAttribute('id', element.id)
        divPlaylist.setAttribute('class', 'playlist')
        divPlaylistFront.setAttribute('class', 'playlist-front')
        divPlaylistBack.setAttribute('class', 'playlist-back')
        container_player.appendChild(div)
    }
}

export function drawCardsArtist (name, data) {
    const selector = ['div', ]
    console.log(data)
    for (let i = 0; i < data.data.artists.artist.length; i++) {
        const element = data.data.artists.artist[i];
        let div = document.createElement('div');
        let img = document.createElement('img');
        let spanByFront = document.createElement('span');
        let divPlaylist = document.createElement('div');
        let divPlaylistFront = document.createElement('div');
        let divPlaylistBack = document.createElement('div');
        let container_player = document.querySelector('.playlists')
        let link = document.createElement('a')
        div.appendChild(divPlaylist)
        divPlaylist.appendChild(divPlaylistFront)
        divPlaylist.appendChild(divPlaylistBack)
        divPlaylistFront.appendChild(img)
        divPlaylistFront.appendChild(spanByFront)
        divPlaylistBack.appendChild(link)
        img.src =element.image[2]['#text']
        link.href = element.url
        link.target = "_blank"
        link.innerText= "Перейти к исполнителю"
        spanByFront.innerText = `Испольнитель: ${element.name}`
        div.setAttribute('class', 'playlist-wrap')
        spanByFront.setAttribute('class', 'playlist__title')
        img.setAttribute('class', 'playlist__img')
        link.setAttribute("class", 'playlist-back__link')
        divPlaylist.setAttribute('class', 'playlist')
        divPlaylistFront.setAttribute('class', 'playlist-front')
        divPlaylistBack.setAttribute('class', 'playlist-back')
        div.setAttribute(`data-artist`, element.name)
        div.setAttribute(`data-count`, element.playcount)
        container_player.appendChild(div)
    }
    
}
