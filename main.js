function generate() {
    var url = document.getElementById("url").value;
    document.getElementById("url").value = "";

    var hasPassword = false;
    var pwd = "";

    if (url.search("pwd=") != -1) {
        hasPassword = true;
        pwd = url.substring(url.search("pwd=") + 4);
    }

    var id = hasPassword ? url.substring(url.search("/j/") + 3, url.indexOf("?")) : url.substring(url.search("/j/") + 3);

    var output = hasPassword ? `zoommtg://zoom.us/join?confno=${id}&pwd=${pwd}` : `zoommtg://zoom.us/join?confno=${id}`;

    alert(output)
}

function generate2() {
    var id = document.getElementById("meetingId").value.replace(/ /g, '');
    var pwd = document.getElementById("password").value;

    var output = pwd ? `zoommtg://zoom.us/join?confno=${id}&pwd=${pwd}` : `zoommtg://zoom.us/join?confno=${id}`;

    alert(output);
}