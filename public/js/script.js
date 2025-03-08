function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        if (screen.id === screenId) {
            screen.classList.add('active');
        } else {
            screen.classList.remove('active');
        }
    });
    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function setActiveNav(navId) {
    const navLinks = document.querySelectorAll('.menu-options a');
    navLinks.forEach(link => {
        link.classList.remove('active-nav');
    });
    document.getElementById(navId).classList.add('active-nav');
}

const configurations = [
    { scale: 1.1, rotation: -5 },
    { scale: 1.2, rotation: 10 },
    { scale: 1.05, rotation: -3 },
    { scale: 1.15, rotation: 8 },
    { scale: 0.95, rotation: -8 },
];

// Get all the buttons
const buttons = document.querySelectorAll('.game-button');

// Add an event listener to each button
buttons.forEach((button) => {
    button.addEventListener('mouseover', () => {
        // Randomly choose a configuration
        const config = configurations[Math.floor(Math.random() * configurations.length)];

        // Set the scale and rotation
        button.style.transform = `scale(${config.scale}) rotate(${config.rotation}deg)`;
    });

    button.addEventListener('mouseout', () => {
        // Reset the scale and rotation
        button.style.transform = 'scale(1) rotate(0deg)';
    });
});


function openIframe() {
    document.getElementById("iframe-container").style.display = "flex";
}

function goBackToHome() {
    document.getElementById("iframe-container").style.display = "none";
    document.getElementById("iframeWindow").src = ""; // Clear iframe
}

function goBackToHomeGame() {
    document.getElementById("iframe-container-Game").style.display = "none";
    document.getElementById("iframeWindowGame").src = ""; // Clear iframe
}

function goBack() {
    const iframe = document.getElementById("iframeWindow").contentWindow;
    if (iframe.history.length > 1) {
        iframe.history.back();
    }
}

function goForward() {
    const iframe = document.getElementById("iframeWindow").contentWindow;
    iframe.history.forward();
}

function reloadIframe() {
    document.getElementById("iframeWindow").contentWindow.location.reload();
}

document.getElementById("searchButton").addEventListener("click", function() {
    openIframe();
});





const connection = new BareMux.BareMuxConnection("/baremux/worker.js")
const wispUrl = (location.protocol === "https:" ? "wss" : "ws") + "://" + location.host + "/wisp/";
const bareUrl = (location.protocol === "https:" ? "https" : "http") + "://" + location.host + "/bare/"
document // makes it so you can press enter to submit as opposed to just being able to press a button
    .getElementById("urlInput")
    .addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.getElementById("searchButton").click();
        }
    });

document.getElementById("searchButton").onclick = async function (event) {
    event.preventDefault();

    let url = document.getElementById("urlInput").value; // if no periods are detected in the input, search google instead
    let searchUrl = "https://www.bing.com/search?q=";

    if (!url.includes(".")) {
        url = searchUrl + encodeURIComponent(url);
    } else {
        if (!url.startsWith("http://") && !url.startsWith("https://")) { // if no http or https is detected, add https automatically
            url = "https://" + url;
        }
    }
	if (!await connection.getTransport()) {
		await connection.setTransport("/libcurl/index.mjs", [{ wisp: wispUrl }]);
	}
    iframeWindow.src = __uv$config.prefix + __uv$config.encodeUrl(url);
};

document.getElementById("switcher").onselect = async function (event) {
    switch (event.target.value) {
        case "epoxy":
            await connection.setTransport("/epoxy/index.mjs", [{ wisp: wispUrl }]);
            break;
        case "bare":
            await connection.setTransport("/baremod/index.mjs", [bareUrl]);
            break;
        case "libcurl":
            await connection.setTransport("/libcurl/index.mjs", [{ wisp: wispUrl }]);
            break;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const appLinks = document.querySelectorAll(".game-button a"); 

    if (appLinks.length > 0) {
        appLinks.forEach(app => {
            app.addEventListener("click", function(event) {
                event.preventDefault(); 

                const rawUrl = this.href; 
                const encodedUrl = __uv$config.prefix + __uv$config.encodeUrl(rawUrl); 

               
                document.getElementById("iframeWindowGame").src = encodedUrl;

                
                document.getElementById("iframe-container-Game").style.display = "flex";
            });
        });
    } else {
        console.error("Error: No app links found.");
    }
});
