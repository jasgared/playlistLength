const apiKey = "AIzaSyAYE4V54MwddPdzGfcxtYBuI6N1aMHUphk";
const playlistId = "PLB03EA9545DD188C3";
const durations = [];

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
                // console.log(video.videoId);
                let video_url = "https://www.googleapis.com/youtube/v3/videos?" +
                "part=contentDetails" +
                "&key=" + apiKey +
                "&id=" + video.videoId;
                fetch(video_url).then(function (response) {
                    return response.json();
                }).then(function(data) {
                    // console.log(data.items[0].contentDetails.duration);
                    durations.push(data.items[0].contentDetails.duration);
                }).catch(function(error) {
                    console.log("error video: " + error);
                })
            })
        }).catch(function(error) {
            console.log("Error playlist: " + error);
        })
}

function toSeconds(total, time) {
    let i= 0
    let num = ""
    let numberLetter = /^[0-9]$/;
    time = time.slice(1).split('T');
    let t = {
        "H" : 0,
        "M" : 0,
        "S" : 0
    }
    while(i < time[1].length) {
        if(time[1].charAt(i).match(numberLetter)) {
            num += time[1].charAt(i)
        }
        else{
            t[time[1].charAt(i)] = parseInt(num);
            num = "";
        }
        i++;
    }
    console.log("video time: " + (t["H"] * 60 * 60 + t["M"] * 60 + t["S"]));
    return total + (t["H"] * 60 * 60 + t["M"] * 60 + t["S"]);
}

function main() {
    let totalTime = 0;
    console.log("bfore");
    getLength();
    console.log("after");
    totalTime = durations.reduce(toSeconds);
    return totalTime;
    
}


// wp5sORsPopw