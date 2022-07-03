<template>
  <div class="signup">
    <div class="signup-wrapper">
      <h1>Signup</h1>
      <p class="extra-txt">Create a new free account</p>
      <form>
        <div class="inp-ele">
          <input type="email" placeholder="Email" required />
        </div>

        <div class="inp-ele">
          <input type="text" placeholder="Username" required />
        </div>

        <div class="inp-ele">
          <input type="password" placeholder="Password" required />
        </div>

        <button type="submit">Submit</button>
      </form>

      <div class="extra-txt">
        Already have an account? <router-link to="/login">Login</router-link>
      </div>
    </div>
  </div>
</template>

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
