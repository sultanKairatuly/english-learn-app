import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import PrimaryButton from "./components/UI/PrimaryButton.vue";

const app = createApp(App);

app.component("PrimaryButton", PrimaryButton);

app.use(store).use(router).mount("#app");
