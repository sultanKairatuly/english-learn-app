import { createStore } from "vuex";

export default createStore({
  state: {
    level: localStorage.getItem("level"),
    game: JSON.parse(localStorage.getItem("game")),
  },
  getters: {
    getGame(state) {
      return state.game;
    },
    getLevel(state) {
      return state.level;
    },
  },
  mutations: {
    updateGame(state, newGame) {
      localStorage.setItem("game", JSON.stringify(newGame));
      state.game = newGame;
    },
    updateLevel(state, newLevel) {
      localStorage.setItem("level", newLevel);
      state.level = newLevel;
    },
  },
  actions: {
    callGameUpdation({ commit }, newGame) {
      commit("updateGame", newGame);
    },
    callLevelUpdation({ commit }, newLevel) {
      commit("updateLevel", newLevel);
    },
  },
  modules: {},
});
