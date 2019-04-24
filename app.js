const apiKey = "your_key_here";
const playlistId = "PLB03EA9545DD188C3";

function getLength(e) {
    let url = "https://www.googleapis.com/youtube/v3/playlistItems?" +
                "part=snippet,contentDetails" +
                "&maxResults=50" +
                "&playlistId=" + playlistId +
                "&key=" + apiKey;
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(data) {
        //console.log(data);
        return data.items.map(function (playListItems) {
            return {
                videoId: playListItems.contentDetails.videoId,
                playListItems: playListItems
            }
        })
    }).then(function(arr) {
            arr.forEach(function (video) {
                //console.log(video.videoId);
                let video_url = "https://www.googleapis.com/youtube/v3/videos?" +
                "part=contentDetails" +
                "&key=" + apiKey +
                "&id=" + video.videoId;
                fetch(video_url).then(function (response) {
                    return response.json();
                }).then(function(data) {
                    console.log(data.items[0].contentDetails.duration);
                    time = data.items[0].contentDetails.duration;
                    return time
                }).catch(function(error) {
                    console.log("error video: " + error);
                })
            })
        }).catch(function(error) {
            console.log("Error playlist: " + error);
        })
}


function getTime() {
    let time = getLength();
    let hours = 0;
    let minutes = 0; 
    let seconds = 0;
}


// wp5sORsPopw