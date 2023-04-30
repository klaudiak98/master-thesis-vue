// import { createStore } from "vuex";
// import AuthService from '../services/auth.service';

// const user = JSON.parse(localStorage.getItem('user'));
// // state = auth
// const auth = user
//   ? { status: { loggedIn: true }, user }
//   : { status: { loggedIn: false }, user: null };

// const mutations = {
//   loginSuccess(auth, user) {
//     auth.status.loggedIn = true;
//     auth.user = user;
//   },
//   loginFailure(auth) {
//     auth.status.loggedIn = false;
//     auth.user = null;
//   },
//   logout(auth) {
//     auth.status.loggedIn = false;
//     auth.user = null;
//   },
//   registerSuccess(auth) {
//     auth.status.loggedIn = false;
//   },
//   registerFailure(auth) {
//     auth.status.loggedIn = false;
//   }
// }

// const actions = {
//   login: (({ commit }, user) => {
//     return AuthService.login(user).then(
//       user => {
//         commit('loginSuccess', user);
//         return Promise.resolve(user);
//       },
//       error => {
//         commit('loginFailure');
//         return Promise.reject(error);
//       }
//     );
//   }),
//   logout: (({ commit }) => {
//     AuthService.logout();
//     commit('logout');
//   }),
//   register: (({ commit }, user) => {
//     return AuthService.register(user).then(
//       response => {
//         commit('registerSuccess');
//         return Promise.resolve(response.data);
//       },
//       error => {
//         commit('registerFailure');
//         return Promise.reject(error);
//       }
//     );
//   })
// }

// const getters = {
//   isLogged: state => state.status?.loggedIn
// }

// export default createStore({
//   auth,
//   actions,
//   mutations,
//   getters
// });

// // export default store;