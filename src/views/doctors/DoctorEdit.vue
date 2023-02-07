<template>
  <div>
    <h1>Edit doctor</h1>
    <form @submit.prevent="submitForm" class="form">
      <div class="firstName">
        <label for="firstName">First Name</label>
        <input type="text" id="firstName" v-model.trim="firstName" />
        <p v-if="errors.firstName" class="error">{{ errors.firstName }}</p>
      </div>
      <div class="lastName">
        <label for="lastName">Last Name</label>
        <input type="text" id="lastName" v-model.trim="lastName" />
        <p v-if="errors.lastName" class="error">{{ errors.lastName }}</p>
      </div>
      <div class="email">
        <label for="email">Email</label>
        <input type="text" id="email" v-model.trim="email" />
        <p v-if="errors.email" class="error">{{ errors.email }}</p>
      </div>
      <div class="description">
        <label for="description">Description</label>
        <textarea type="text" id="description" v-model.trim="description" />
        <p v-if="errors.description" class="error">{{ errors.description }}</p>
      </div>
      <div class="costPerHour">
        <label for="costPerHour">Cost per Hour</label>
        <input type="number" id="costPerHour" v-model.trim="costPerHour" />
        <p v-if="errors.costPerHour" class="error">{{ errors.costPerHour }}</p>
      </div>
      <div>
        <button type="submit">Save</button>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DoctorEdit",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      description: "",
      costPerHour: "",
      errors: {
        firstName: "",
        lastName: "",
        email: "",
        description: "",
        costPerHour: "",
      },
    };
  },
  created() {
    this.getDoctor();
  },
  methods: {
    async getDoctor() {
      const doctor = await axios.get(
        `${process.env.VUE_APP_API_URL}/doctors/${this.id}`
      );
      const { description, email, firstName, lastName, costPerHour } =
        doctor.data || {};
      this.description = description;
      this.email = email;
      this.firstName = firstName;
      this.lastName = lastName;
      this.costPerHour = costPerHour;
    },
    async submitForm() {
      this.resetErrors();
      const valid = this.validateForm();
      if (!valid) {
        return;
      }
      const doctor = {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        description: this.description,
        costPerHour: this.costPerHour,
      };
      await axios.put(
        `${process.env.VUE_APP_API_URL}/admin/doctors/${this.id}`,
        doctor,
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
        firstName: "",
        lastName: "",
        email: "",
        description: "",
        costPerHour: "",
      };
    },
    validateForm() {
      let valid = true;
      if (this.firstName.trim().length === 0) {
        this.errors.firstName = "firstName is required";
        valid = false;
      }
      if (this.lastName.trim().length === 0) {
        this.errors.lastName = "lastName is required";
        valid = false;
      }
      if (this.email.trim().length === 0) {
        this.errors.email = "email is required";
        valid = false;
      }
      if (this.description.trim().length === 0) {
        this.errors.description = "description is required";
        valid = false;
      }
      if (this.costPerHour === 0) {
        this.errors.costPerHour = "costPerHour is required";
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
  width: 415%;
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
