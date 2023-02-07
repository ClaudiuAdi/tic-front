import axios from "axios";
import { createStore } from "vuex";

let timer;

export default createStore({
  state: {
    email: null,
    token: null,
    userId: null,
    doctors: [],
  },
  getters: {
    email(state) {
      return state.email;
    },
    token(state) {
      return state.token;
    },
    userId(state) {
      return state.userId;
    },
    isAuthenticated(state) {
      return state.token !== null || localStorage.getItem("token") !== null;
    },
    getDoctors(state) {
      return state.doctors;
    },
    isAdmin(state) {
      return (
        state.email === "claudiu@email.com" ||
        localStorage.getItem("email") === "claudiu@email.com"
      );
    },
  },
  mutations: {
    setUser(state, payload) {
      state.email = payload.email;
      state.token = payload.token;
      state.userId = payload.userId;
    },
    setDoctors(state, payload) {
      state.doctors = payload;
    },
  },
  actions: {
    login: ({ commit, dispatch }, responseData) => {
      const expiresIn = +responseData.expiresIn * 1000;

      localStorage.setItem("email", responseData.email);
      localStorage.setItem("token", responseData.idToken);
      localStorage.setItem("userId", responseData.localId);
      localStorage.setItem("username", responseData.username);

      timer = setTimeout(function () {
        dispatch("logout");
      }, expiresIn);

      commit("setUser", {
        email: responseData.email,
        token: responseData.idToken,
        userId: responseData.localId,
      });
    },
    logout({ commit }) {
      localStorage.removeItem("email");
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("username");

      clearTimeout(timer);

      commit("setUser", {
        email: null,
        token: null,
        userId: null,
      });
    },
    async loadDoctors({ commit }) {
      const doctors = await axios.get(
        `https://tic-proiect.herokuapp.com/doctors`
      );
      commit("setDoctors", doctors?.data || []);
    },
    async loadDoctor(_, id) {
      const doctor = await axios.get(
        `https://tic-proiect.herokuapp.com/doctors/${id}`
      );
      return doctor?.data || [];
    },
    async deleteDoctor({ commit }, id) {
      await axios.delete(
        `https://tic-proiect.herokuapp.com/admin/doctors/${id}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const doctors = await axios.get(
        `https://tic-proiect.herokuapp.com/doctors`
      );
      commit("setDoctors", doctors?.data || []);
    },
    async deletePatient(
      { commit },
      { doctorId: idDoctor, patientId: idPatient }
    ) {
      await axios.delete(
        `https://tic-proiect.herokuapp.com/admin/doctors/${idDoctor}/patients/${idPatient}`,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const doctors = await axios.get(
        `https://tic-proiect.herokuapp.com/doctors/${idDoctor}`
      );
      commit("setDoctors", doctors?.data || []);
    },
  },
  modules: {},
});
