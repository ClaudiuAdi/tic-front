<template>
  <div>
    <h1>Add patient</h1>
    <form @submit.prevent="submitForm" class="form">
      <div class="email">
        <label>Email</label>
        <input type="text" id="email" v-model.trim="email" />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>
      <div class="message">
        <label>Message</label>
        <textarea type="text" id="message" v-model.trim="message" />
        <p v-if="errors.message" class="error">{{ errors.message }}</p>
      </div>
      <div class="age">
        <label>Age</label>
        <input type="number" id="age" v-model.trim="age" />
        <p v-if="errors.age" class="error">{{ errors.age }}</p>
      </div>
      <div class="problem">
        <label>Problem</label>
        <textarea type="text" id="problem" v-model.trim="problem" />
        <p v-if="errors.problem" class="error">{{ errors.problem }}</p>
      </div>
      <div>
        <button type="submit">Post patient</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "CommentAdd",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      email: "",
      message: "",
      age: "",
      problem: "",
      errors: {
        email: "",
        message: "",
        age: "",
        problem: "",
      },
    };
  },
  methods: {
    async submitForm() {
      this.resetErrors();
      const valid = this.validateForm();
      if (!valid) {
        return;
      }
      const patient = {
        email: this.email,
        message: this.message,
        age: this.age,
        problem: this.problem,
      };
      await axios.post(
        `${process.env.VUE_APP_API_URL}/admin/doctors/${this.id}/patients`,
        patient,
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      this.$router.push(`/doctors/${this.id}`);
    },
    resetErrors() {
      this.errors = {
        email: "",
        message: "",
        age: "",
        problem: "",
      };
    },
    validateForm() {
      let valid = true;
      if (this.email.trim().length === 0) {
        this.errors.email = "Email is required";
        valid = false;
      }
      if (this.message.trim().length === 0) {
        this.errors.message = "Message is required";
        valid = false;
      }
      if (this.age === 0) {
        this.errors.age = "Age is required";
        valid = false;
      }
      if (this.problem.trim().length === 0) {
        this.errors.problem = "Problem is required";
        valid = false;
      }
      return valid;
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
  background-color: #73c0c68f;
  width: 70%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.6rem;
  padding: 1rem;
  border-radius: 1rem;
}

.main {
  padding: 3rem;
  width: auto;
}

button {
  cursor: pointer;
  background: #a79ab2;
  width: 230%;
  border: 0;
  padding: 10px 15px;
  color: #fff;
  font-size: 20px;
  -webkit-transition: 0.3s linear;
  transition: 0.3s linear;
  border-radius: 1rem;
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

label {
  font-size: 1rem;
  padding-left: 10px;
}

input {
  width: 200px;
  margin-left: 10px;
}
</style>
