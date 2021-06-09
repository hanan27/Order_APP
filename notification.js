import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions'
import AuthStore from './src/config/store/auth';

const PUSH_REGISTRATION_ENDPOINT = 'https://floating-brook-73075.herokuapp.com/token';

async function registerForPushNotificationsAsync() {
const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
if (status !== 'granted') {
    return;
}
let token = await Notifications.getExpoPushTokenAsync();
console.log('token: ' , token)
AuthStore.setToken(token);
return fetch(PUSH_REGISTRATION_ENDPOINT, {
    method: 'POST',
    headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    token: {
        value: token,
    },
    }),
});

}

export default registerForPushNotificationsAsync;
