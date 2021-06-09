import {observable, action, toJS} from 'mobx';
import {cacheCart} from "../../utils/helpers";

class Store {
    @observable branches = [];
    @observable currentRoute = '';
    @observable cart = [];
    @observable cartCount = 0;
    @observable products = [];
    @observable modifiers = [];
    @observable counts = {};
    @observable firstLaunch = null;

    @action setCurrentRoute(route) {
        this.currentRoute = route;
    }

    @action addToCart(data) {
        this.cart.push(data);
        this.setCartCount(data.quantity);
        cacheCart(this.cart, this.cartCount);
    }
    @action removeFromCart(index) {
        this.setCartCount(-this.cart[index].quantity);
        this.cart.splice(index, 1);
        cacheCart(this.cart, this.cartCount);
    }
    @action setCart(data) {
        this.cart = data;
    }
    @action setCartCount(count) {
        this.cartCount += count;
    }
    @action updateCardItem(i, val) {
        this.cart[i].quantity += val;
        this.setCartCount(val);
    }
    @action resetCartCount() {
        this.cartCount = 0;
    }
    @action setBranches(data) {
        this.branches = data;
    }
    @action setProducts(data) {
        this.products = data;
    }
    @action setModifiers(data) {
        this.modifiers = data;
    }
    @action setFirstLaunch(data) {
        this.firstLaunch = data;
    }
}

export default new Store();