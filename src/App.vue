<template>
  <the-header
    ><nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">Login</router-link>
    </nav></the-header
  >
  <router-view />
</template>

<script>
export default {};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Sofia+Sans:wght@400;500;700&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-size: 62.5%;
}

#app {
  font-family: "Sofia Sans", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  padding: 5px;
  height: fit-content;
}

nav a {
  font-weight: bold;
  text-decoration: none;
  color: #333;
}

nav a.router-link-exact-active {
  color: #333;
}

/* div {
  background-color: #96c3ce;
} */
</style>
