<template>
  <div>
    <div v-show="this.getError.length > 0" class="error-msg">
      {{ this.getError }}
    </div>

    <div v-show="this.getMsg.length > 0" class="success-msg">
      {{ this.getMsg }}
    </div>

    <router-view></router-view>

    <nav class="navbar">
      <div class="navbar-link active">
        <router-link to="/" id="home">Home</router-link>
      </div>
      <div class="navbar-link active">
        <router-link to="/" id="home">Pic</router-link>
      </div>
      <div class="navbar-link active">
        <router-link v-show="!this.isLoggedIn" to="/signup" id="home"
          >Signup</router-link
        >
        <div v-show="this.isLoggedIn" @click="logoutUser" id="home">Logout</div>
      </div>
    </nav>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";
import router from "./router";
export default {
  computed: mapGetters(["getError", "getMsg", "isLoggedIn"]),
  methods: {
    ...mapActions([
      "syncAuthLocalStorage",
      "setError",
      "setMsg",
      "clearAuthState",
    ]),

    async logoutUser() {
      try {
        const res = await axios.get("/auth/logout");
        this.setMsg(res.data.msg);
        this.clearAuthState();
        router.push({ name: "home" });
      } catch (err) {
        this.setError(err.response.data.error);
      }
    },
  },
  beforeCreate() {
    this.$store.dispatch("syncAuthLocalStorage");
  },
};
</script>

<style>
.navbar {
  width: 50%;
  margin: auto;
  padding-top: 1vh;
  padding-bottom: 1vh;
  padding-left: 25px;
  padding-right: 25px;
  height: auto;
  border: 0.5px solid #00000079;
  border-radius: 15px;
  margin-top: 7vh;
  background: white;
  /* position: fixed; */
}

.navbar-link {
  width: fit-content;
}

.navbar img {
  width: 24px;
}

.error-msg {
  width: fit-content;
  margin: auto;
  margin-top: 2vh;
  background: #f7b2b2;
  border: none;
  border-radius: 10px;
  padding: 2vh 2vw;
}

.success-msg {
  width: fit-content;
  margin: auto;
  margin-top: 2vh;
  background: #b2f7b2;
  border: none;
  border-radius: 10px;
  padding: 2vh 2vw;
}
</style>
