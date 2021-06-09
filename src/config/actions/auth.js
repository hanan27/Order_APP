import AuthStore from '../store/auth';
import {AsyncStorage, Alert} from 'react-native';

function loginSuccess(data) {
    AuthStore.setUser(data);
    AuthStore.setIsLogin(true);
}

function register(data) {
        Alert.alert('يُرجى ملأ جميع البيانات', undefined, [{ text: 'موافق' }]);
}

export default {
    loginSuccess,
    register
}