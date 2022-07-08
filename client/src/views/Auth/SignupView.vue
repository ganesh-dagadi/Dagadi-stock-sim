<template>
  <div class="signup">
    <div class="signup-wrapper">
      <h1>Signup</h1>
      <p class="extra-txt">Create a new free account</p>
      <form @submit="submitForm">
        <div class="inp-ele">
          <input type="email" placeholder="Email" v-model="email" required />
        </div>

        <div class="inp-ele">
          <input
            type="text"
            placeholder="Username"
            v-model="username"
            required
          />
        </div>

        <div class="inp-ele">
          <input
            type="password"
            placeholder="Password"
            v-model="password"
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <div class="extra-txt">
        Already have an account? <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import router from "../../router/index";
import store from "../../store/index";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "",
      username: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["setError"]),
    async submitForm(event) {
      event.preventDefault();
      const userData = {
        username: this.username,
        password: this.password,
        email: this.email,
      };
      try {
        const response = await axios.post("/auth/signup", userData);

        if (response.status == 200) {
          store.dispatch("setError", "");
          store.dispatch("setMsg", response.data.msg);
          router.push({ name: "login" });
        }
      } catch (err) {
        this.setError(err.response.data.error);
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
