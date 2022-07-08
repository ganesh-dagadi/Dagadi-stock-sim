<template>
  <div class="signup">
    <div class="signup-wrapper">
      <h1>Login</h1>
      <p class="extra-txt">Enter your credentials</p>
      <form @submit="submitForm">
        <div class="inp-ele">
          <input type="email" placeholder="Email" v-model="email" required />
        </div>

        <div class="inp-ele">
          <input
            type="password"
            v-model="password"
            placeholder="Password"
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <div class="extra-txt">
        Don't have an account? <router-link to="/signup">Signup</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import store from "../../store/index";
import router from "../../router/index";
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async submitForm(event) {
      event.preventDefault();
      const userData = {
        email: this.email,
        password: this.password,
      };

      try {
        const res = await axios.post("/auth/login", userData);
        store.dispatch("setLoggedInUser", res.data.user);
        router.push({ name: "dashboard", params: { _id: res.data.user._id } });
      } catch (err) {
        store.dispatch("setError", err.response.data.error);
      }
    },
  },
};
</script>

<style scoped>
.signup-wrapper {
  margin: 5vh 10vw;
  text-align: center;
}

.inp-ele {
  margin: 6vh 1vw;
}

input {
  border: none;
  background: #f0eeee;
  padding: 2vh 1vw;
  width: 30vw;
  border-radius: 10px;
}

button {
  border: none;
  border-radius: 10px;
  padding: 2vh 2vw;
  background: #181818;
  color: white;
  margin-bottom: 2vh;
}

button:hover {
  background: #303030;
}

.extra-txt {
  margin: 2vh 1vw;
}

a {
  text-decoration: none;
}
</style>
