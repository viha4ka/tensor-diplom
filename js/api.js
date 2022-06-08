import {drawCardsTraks,drawCardsArtist} from'./drawCard.js'

Storage.prototype.setObject = function(key, value){
	this.setItem(key, JSON.stringify(value))
}

Storage.prototype.getObject = function(key){
	var item = this.getItem(key)

	return JSON.parse(item)
}


function defaultRequest (method, name, params = undefined) {
    let xhr = new XMLHttpRequest()
    let url = new URL('http://ws.audioscrobbler.com/2.0')
    url.searchParams.set('method', name)
    url.searchParams.set('api_key', '7d8fe75daf7b3b15a06db9945af0ce5f')
    url.searchParams.set('format', 'json')

    if (typeof params === 'object'){
        for (const item of params) {
            url.searchParams.set(item.key, item.data)
        }
    }
    xhr.open(method, url)
    xhr.responseType = 'json'
    xhr.send()

    xhr.onload = function() {
        console.log(xhr.response)
        if(xhr.status !== 200 || xhr.response.error){
            return localStorage.setObject(name, {succes: false, data: xhr.response})
        }
        localStorage.setObject(name, {succes: true, data: xhr.response})
    }
      
    xhr.onerror = function() {
        localStorage.setObject(name, {succes: false, data: 'Что-то пошло не так'})
    }
}

/*window.onload = function () {
    ChartApi.getTopArtists()
    ChartApi.getTopTracks()
    ArtistApi.getTopAlbums('cher')
    ArtistApi.getTopTracks('cher')
    // drawCardsTraks('track', localStorage.getObject('chart.gettoptracks'))
    drawCardsArtist('artists', localStorage.getObject('chart.gettopartists'))
}*/

export const ChartApi = {
    getTopTracks () {
        return defaultRequest('GET','chart.gettoptracks')
    },
    getTopArtists () {
        return defaultRequest('GET','chart.gettopartists')
    }
}

const ArtistApi = {
    getTopAlbums (name) {
        const params = [
            {
                key: 'artist',
                data: name
            }
        ]
        return defaultRequest('GET','artist.gettopalbums', params)
    },
    getTopTracks (name) {
        const params = [
            {
                key: 'artist',
                data: name
            }
        ]
        return defaultRequest('GET','artist.gettoptracks', params)
    }
    
} 

// const ChartApi = {
//     getTopTracks () {
//         return defaultRequest('GET','chart.gettoptracks')
//     },
//     getTopArtists () {
//         return defaultRequest('GET','chart.gettopartists')
//     }
// } 