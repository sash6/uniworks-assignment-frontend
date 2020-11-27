import api from '../api.service'

const publicVapidKey =
    "BGFgFRZIvdo1NniepT_poZOIaPFwMf07fCxGbhSOlTTNoRFnk4dpF_QkdBtXAP4YZscGq35KoEDdmRsbTkccnH4";

function urlBase64ToUint8Array(base64String) {
    const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, "+")
        .replace(/_/g, "/");

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export async function send(title = "Push Sent", message = "Hello push") {
    const register = await navigator.serviceWorker.register("/sw.js", {
        scope: "/",
    });

    if ("serviceWorker" in navigator) {
        navigator.serviceWorker.ready
            .then(function (registration) {
                if (!registration.pushManager) {
                    return;
                }

                registration.pushManager
                    .getSubscription()
                    .then(function (existedSubscription) {
                        if (existedSubscription === null) {
                            registration.pushManager
                                .subscribe({
                                    applicationServerKey: urlBase64ToUint8Array(publicVapidKey),
                                    userVisibleOnly: true,
                                })
                                .then(function (newSubscription) {
                                    sendSubscription(newSubscription, title, message);
                                })
                                .catch(function (e) {
                                    if (Notification.permission !== "granted") {
                                    } else {
                                        console.error(e);
                                    }
                                });
                        } else {
                            sendSubscription(existedSubscription, title, message);
                        }
                    });
            })
            .catch(function (e) {
                console.error(e);
            });
    }
}

function sendSubscription(subscription, title, message) {
    return fetch(api.webPushNotification, {
        method: "POST",
        body: JSON.stringify({ subscription, title, message }),
        headers: {
            "content-type": "application/json",
        },
    });
}