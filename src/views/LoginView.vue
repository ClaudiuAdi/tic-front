<template>
  <div class="main">
    <h1>WELCOME!</h1>
    <form @submit.prevent="login">
      <div class="group">
        <!-- <label class="emailLabel" for="email">Email</label> -->
        <span v-if="emailError" class="error">{{ emailError }}</span>
        <input
          type="email"
          id="email"
          class="input"
          v-model.trim="email"
          placeholder="Email"
        />
        <span class="highlight"></span>
        <span class="bar"></span>
      </div>
      <br />
      <div class="group">
        <!-- <label for="password">Password</label> -->
        <span v-if="passwordError" class="error">{{ passwordError }}</span>
        <input
          type="password"
          id="password"
          class="input"
          v-model.trim="password"
          placeholder="Password"
        />

        <span class="highlight"></span>
        <span class="bar"></span>
      </div>

      <div>
        <span v-if="loginError" class="errorLogin">{{ loginError }}</span>
        <button type="submit" class="full-rounded">
          <span>Login</span>
          <div class="border full-rounded"></div>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: {
        email: "",
        password: "",
        login: "",
      },
    };
  },
  computed: {
    emailError() {
      return this.error.email;
    },
    passwordError() {
      return this.error.password;
    },
    loginError() {
      return this.error.login;
    },
  },
  methods: {
    async fetchData(user) {
      const response = await axios.post(
        `https://tic-proiect.herokuapp.com/login`,
        user
      );
      return response?.data || {};
    },
    async login() {
      this.error = {
        email: "",
        password: "",
        login: "",
      };
      if (!this.email) {
        this.error.email = "Email is required!";
        return;
      }
      if (!this.password) {
        this.error.password = "Password is required!";
        return;
      }
      const user = {
        email: this.email,
        password: this.password,
      };
      try {
        const response = await this.fetchData(user);
        const { idToken, email, expiresIn, localId, username } = response;
        if (idToken) {
          this.$store.dispatch("login", {
            email,
            expiresIn,
            idToken,
            localId,
            username,
          });
          this.$router.replace("/");
        } else {
          this.error.login = "Invalid token!";
        }
      } catch (error) {
        this.error.login = "Invalid email or password!";
      }
    },
  },
};
</script>

<style scoped>
h1 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

form {
  font-size: 2rem;
}

.main {
  padding: 3rem;
  width: auto;
}

button {
  cursor: pointer;
  background: #a79ab2;
  width: 100%;
  border: 0;
  padding: 10px 15px;
  color: #fff;
  font-size: 20px;
  -webkit-transition: 0.3s linear;
  transition: 0.3s linear;
}
.group {
  position: relative;
  margin-bottom: 1rem;
}

.group input {
  outline: none;
  display: block;
  width: 100%;
  height: 40px;
  position: relative;
  z-index: 3;
  border: 1px solid #d9d9d9;
  padding: 10px 10px;
  background: #ffffff;
  box-sizing: border-box;
  -webkit-transition: 0.3s ease;
  transition: 0.3s ease;
}

.main {
  width: 320px;
  background: #8c8a9c6c;
  margin: 20px auto;
  min-height: 200px;
  border: 1px solid #f3f3f3;
}
</style>
<!-- <style>
body {
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-color: #f2dfd7;
}
</style> -->
