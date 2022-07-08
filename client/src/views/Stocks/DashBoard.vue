<template>
  <div>
    {{ this.$store.state.auth.loggedInUser }}
    {{ this.$store.state.auth.isLoggedIn }}
  </div>
</template>

<script>
import axios from "axios";
export default {
  async created() {
    const res = await axios.get("/auth/protected");
    console.log(res);
  },
};
</script>

<style scoped>
</style>