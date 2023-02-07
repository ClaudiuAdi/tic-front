<template>
  <nav>
    <button><router-link to="/">Doctors</router-link></button>
    <button v-if="isAuthenticated">
      <logout-button @logout="logout"></logout-button>
    </button>
    <button v-else>
      <router-link to="/login">Login</router-link>
    </button>
  </nav>
</template>

<script>
import LogoutButton from "./LogoutButton.vue";
export default {
  name: "TheHeader",
  data() {
    return {
      isLoggedIn: false,
    };
  },
  components: {
    LogoutButton,
  },
  computed: {
    isAuthenticated() {
      return this.isLoggedIn || this.$store.getters.token !== null;
    },
  },
  created() {
    this.isLoggedIn = this.$store.getters.isAuthenticated;
  },
  methods: {
    logout() {
      this.isLoggedIn = false;
      this.$store.dispatch("logout");
      this.$router.replace("/login");
    },
  },
};
</script>

<style scoped>
nav {
  background-color: #a79ab2;
  display: flex;
  justify-content: space-between;
}

button {
  border: none;
  padding: 5px 20px;
  cursor: pointer;
  color: #333;
  border-radius: 3px;
}
</style>
