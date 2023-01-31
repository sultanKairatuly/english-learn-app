import { useStore } from "vuex";

export function useManualPageLoader() {
  const store = useStore();

  function load() {
    store.dispatch("callPageLoaderUpdation", true);
    setTimeout(() => {
      store.dispatch("callPageLoaderUpdation", false);
    }, 250);
  }

  return {
    load
  }
}
