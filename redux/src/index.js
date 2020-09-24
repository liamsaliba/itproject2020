import configureStore from "./store/configureStore";
import { login, logout } from "./store/auth";

const store = configureStore();

// UI LayerW
const authSlice = () => store.getState().auth;
console.log(authSlice());
store.dispatch(logout());

store.dispatch(login("test", "password123"));
console.log(authSlice());
