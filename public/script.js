function checkPermission() {
    if(!('serviceWorker' in navigator)) {
        throw new Error("No support for service worker!");
    }

    if(!('Notification' in window)) {
        throw new Error("No support for notification");
    }
}

async function registerSW() {
    const registration = await navigator.serviceWorker.register('sw.js');
    return registration;
}

async function requestNotificationPermission() {
    const permission = await Notification.requestPermission();

    if(permission !== 'granted') {
        throw new Error("Permission not granted");
    }
}

async function main() {
    checkPermission();
    requestNotificationPermission();
    await registerSW(); 
}


