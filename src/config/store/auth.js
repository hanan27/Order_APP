import {AsyncStorage} from 'react-native';
import {observable, action} from 'mobx';
import {AuthActions} from '../actions';

class AuthStore {
    @observable isLogin = false;
    @observable user = {};
    @observable token = null;

    @action setIsLogin(val) {
        this.isLogin = val;
    }
    @action setUser(data) {
        this.user = data;
    }
    @action setToken(val) {
        this.token = val;
    }
    @action register(data) {
        AuthActions.register(data);
    }
    @action loginSuccess(data) {
        AuthActions.loginSuccess(data);
    }
}

export default new AuthStore();