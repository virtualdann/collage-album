export type Album = {
    artists: [{
        name: string
    }]
    name : string,

    album : {
        images: [{
            url: string
        }]
    },
}

    // img={track.album.images[0].url} title={track.name} artist={track.artists[0].name
