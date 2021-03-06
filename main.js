document.getElementById("url").addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
        event.preventDefault();
        document.getElementById("submit-url").click();
    }
});

document.querySelectorAll("#meeting-id, #password").forEach(function (elem) {
    elem.addEventListener("keypress", function (event) {
        if (event.key == "Enter") {
            event.preventDefault();
            document.getElementById("submit-id").click();
        }
    });
});

function generateFromUrl() {
    clearErrors();
    clearOutput();

    var url = document.getElementById("url").value;

    if (url.length == 0) {
        showError("url", "url-error", "Please enter a Zoom join link.");
        return;
    }

    if (url.search("zoom.us") == -1) {
        showError("url", "url-error", "This doesn\u2019t look like a Zoom URL.");
        return;
    }

    if (url.search("\/j\/") == -1 && url.search("\/w\/") == -1) {
        showError("url", "url-error", "This doesn\u2019t look like a Zoom join link.");
        return;
    }

    if (!/^https?:\/\//i.test(url)) {
        url = 'http://' + url;
    }

    var urlObj = new URL(url);

    var token = urlObj.searchParams.get("tk");
    var id = urlObj.pathname.replace("/j/", "").replace("/w/", "");
    var pwd = urlObj.searchParams.get("pwd");

    if (id.length == 0) {
        showError("url", "url-error", "This link doesn\u2019t seem to contain a meeting ID.");
        return;
    }

    if ((id.match(/\d/g) || []).length == 0) {
        showError("url", "url-error", "The meeting ID in this link doesn\u2019t contain any digits.");
        return;
    }

    if (id.length < 9 || id.length > 11) {
        showError("url", "url-error", "The meeting ID in this link has an invalid length.");
        return;
    }

    generate(id, pwd);
}

function generateFromId() {
    clearErrors();
    clearOutput();

    var id = document.getElementById("meeting-id").value;
    var pwd = document.getElementById("password").value;

    if (id.length == 0) {
        showError("meeting-id", "meeting-id-error", "Please enter a meeting ID.");
        return;
    }

    id = id.replace(/\D/g, '');

    if ((id.match(/\d/g) || []).length == 0) {
        showError("meeting-id", "meeting-id-error", "This ID doesn\u2019t seem to contain any digits.");
        return;
    }

    if (id.length < 9 || id.length > 11) {
        showError("meeting-id", "meeting-id-error", "This ID seems to have an invalid length.");
        return;
    }

    generate(id, pwd);
}

function generate(id, pwd) {

    var desktop = pwd ? `zoommtg://zoom.us/join?confno=${id}&pwd=${pwd}` : `zoommtg://zoom.us/join?confno=${id}`;
    var mobile = pwd ? `zoomus://zoom.us/join?confno=${id}&pwd=${pwd}` : `zoomus://zoom.us/join?confno=${id}`;

    var uname = document.getElementById("username").value;
    if (uname.length > 0) {
        desktop = desktop.concat(`&uname=${uname}`);
        mobile = mobile.concat(`&uname=${uname}`);
    }

    if (document.getElementById("control-mute").checked) {
        desktop = desktop.concat(`&zc=1`);
        mobile = mobile.concat(`&zc=1`);
    }

    showOutput(desktop, mobile);

    if (document.getElementById("copy-desktop-auto").checked) {
        copy('desktop', 'copy-desktop');
    } else if (document.getElementById("copy-mobile-auto").checked) {
        copy('mobile', 'copy-mobile');
    }
}

function showError(input, errorElement, errorMessage) {
    document.getElementById(errorElement).textContent = errorMessage;
    document.getElementById(input).classList.add("is-invalid");
}

function clearErrors() {
    document.getElementById("url").classList.remove("is-invalid");
    document.getElementById("meeting-id").classList.remove("is-invalid");
}

function showOutput(desktop, mobile) {
    document.getElementById("desktop").value = encodeURI(desktop);
    document.getElementById("mobile").value = encodeURI(mobile);
}

function clearOutput() {
    document.getElementById("desktop").value = "";
    document.getElementById("mobile").value = "";
}

function copy(id, outputId) {
    var copyText = document.getElementById(id);

    copyText.disabled = false;

    copyText.select();
    copyText.setSelectionRange(0, 99999);

    copyText.disabled = true;

    document.execCommand("copy");

    document.getElementById(outputId).textContent = "Copied!"

    setTimeout(function () {
        document.getElementById(outputId).textContent = "Copy";
    }, 2000);
}
