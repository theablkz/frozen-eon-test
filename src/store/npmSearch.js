import { cancelGetNpmPackage, getNpmPackage } from "@/controller/npmRequests";

const stateComponents = {
  Idle: () => import("@/components/idle"),
  loading: () => import("@/components/loading"),
  error: () => import("@/components/error"),
  notFound: () => import("@/components/notFound"),
  viewResults: () => import("@/components/results")
};
let timeout;
const waitTime = 600;

export default {
  state: () => ({
    searchValue: "",
    results: {
      objects: [],
      time: new Date(),
      total: 0
    },
    stateComponent: stateComponents["Idle"],
    resultSize: 10,
    resultPage: 1
  }),
  mutations: {
    MUT_setSearchValue(state, value) {
      state.searchValue = value;
    },
    MUT_setResults(state, results) {
      state.results = results;
    },
    MUT_setStateComponent(state, value) {
      state.stateComponent = stateComponents[value] || stateComponents["Idle"];
    },
    MUT_setResultPage(state, value) {
      state.resultPage = value;
    }
  },
  actions: {
    async ACT_npmSearch({ commit, dispatch }, searchValue) {
      commit("MUT_setSearchValue", searchValue);
      commit("MUT_setStateComponent", searchValue ? "loading" : "Idle");
      if (timeout) {
        cancelGetNpmPackage();
        clearTimeout(timeout);
      }
      if (!searchValue) {
        return;
      }
      timeout = setTimeout(() => dispatch("ACT_requestExecute"), waitTime);
    },
    ACT_paginateEventPage({ commit, dispatch }, page) {
      commit("MUT_setResultPage", page);
      commit("MUT_setStateComponent", "loading");
      dispatch("ACT_requestExecute");
    },
    async ACT_requestExecute({ state, commit }) {
      timeout = undefined;
      const fromSearch = state.resultSize * (state.resultPage - 1);
      try {
        const npmResults = await getNpmPackage(
          state.searchValue.trim(),
          state.resultSize,
          fromSearch
        );
        commit("MUT_setResults", npmResults.data);
        commit(
          "MUT_setStateComponent",
          npmResults.data.objects.length ? "viewResults" : "notFound"
        );
      } catch (e) {
        if (e.message !== "canceled") {
          commit("MUT_setStateComponent", "error");
        }
      }
    }
  }
};
