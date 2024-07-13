self.addEventListener('activate', async (e) => {
    const subscription = await self.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array("BJOR8g3cXGI1gRGL2JU_yBMQJHcVEe2ujdkpsg4F33uADVsrivewgLTxw2MVaraGcgnXkWX9raI0tGWbeINWzSo")

    });
    const response = await saveSubscription(subscription);
    console.log(response);
})


self.addEventListener('push', e => {
    self.registration.showNotification("Woooh!", {body: e.data.text()});
});

// Public Key:
// BJOR8g3cXGI1gRGL2JU_yBMQJHcVEe2ujdkpsg4F33uADVsrivewgLTxw2MVaraGcgnXkWX9raI0tGWbeINWzSo

// Private Key:
// Ek-WgXI5NsRHSFlxM46yXgkpMVS2gdbRY1aS94TxRLQ

async function saveSubscription(subscription) {
    const response = await fetch("http://localhost:3000/save-subscription", {
        method: 'post',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify(subscription)
    });
    return response;
}








function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  
    const rawData = atob(base64);
    const outputArray = new Uint8Array(rawData.length);
  
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }