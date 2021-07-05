function generate() {
    var url = document.getElementById("url").value;

    var hasPassword = false;
    var pwd = "";

    if (url.search("pwd=") != -1) {
        hasPassword = true;
        pwd = url.substring(url.search("pwd=") + 4);
    }

    var id = hasPassword ? url.substring(url.search("/j/") + 3, url.indexOf("?")) : url.substring(url.search("/j/") + 3);

    var desktop = hasPassword ? `zoommtg://zoom.us/join?confno=${id}&pwd=${pwd}` : `zoommtg://zoom.us/join?confno=${id}`;
    var mobile = hasPassword ? `zoomus://zoom.us/join?confno=${id}&pwd=${pwd}` : `zoomus://zoom.us/join?confno=${id}`;

    document.getElementById("desktop").value = desktop;
    document.getElementById("mobile").value = mobile;
}

function generate2() {
    var id = document.getElementById("meetingId").value.replace(/ /g, '');
    var pwd = document.getElementById("password").value;

    var desktop = pwd ? `zoommtg://zoom.us/join?confno=${id}&pwd=${pwd}` : `zoommtg://zoom.us/join?confno=${id}`;
    var mobile = pwd ? `zoomus://zoom.us/join?confno=${id}&pwd=${pwd}` : `zoomus://zoom.us/join?confno=${id}`;

    document.getElementById("desktop").value = desktop;
    document.getElementById("mobile").value = mobile;
}

function copy(id, outputId) {
    var copyText = document.getElementById(id);
    copyText.select();
    copyText.setSelectionRange(0, 99999);

    document.execCommand("copy");

    document.getElementById(outputId).textContent = "Copied!"
}
