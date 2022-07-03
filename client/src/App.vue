<template>
  <div>
    <router-view></router-view>

    <nav class="navbar">
      <div class="navbar-link active">
        <router-link to="/" id="home">Home</router-link>
      </div>
      <div class="navbar-link active">
        <router-link to="/" id="home">Pic</router-link>
      </div>
      <div class="navbar-link active">
        <router-link to="/" id="home">Signup</router-link>
      </div>
    </nav>
  </div>
</template>

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
}

.navbar-link {
  width: fit-content;
}

.navbar img {
  width: 24px;
}
</style>
