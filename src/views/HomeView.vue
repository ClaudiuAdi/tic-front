<template>
  <main>
    <p v-if="error !== nul">{{ error }}</p>
    <h1>Doctors</h1>
    <div class="adddoctor">
      <router-link to="/add-doctor">
        <div v-if="isAdmin">
          <button class="btnAddDoctor">Add doctor</button>
        </div>
      </router-link>
    </div>
    <div class="wrapper">
      <ol role="list">
        <li v-for="doctor in doctors" :key="doctor.id">
          <div class="doctor">
            <router-link class="text" :to="'/doctors/' + doctor.id">
              <h3>Dr. {{ doctor.lastName }}</h3>
              <p>{{ doctor.description }}</p>
            </router-link>
          </div>
          <div v-if="isAdmin">
            <button @click="handleDelete(doctor.id)">Delete</button>
          </div>
        </li>
      </ol>
    </div>
  </main>
</template>

<script>
export default {
  name: "DoctorsView",
  created() {
    this.error = null;
    this.loadDoctors();
  },
  data() {
    return {
      error: null,
    };
  },
  computed: {
    doctors() {
      console.log(this.$store.getters.getDoctors);
      return this.$store.getters.getDoctors;
    },

    isAdmin() {
      return this.$store.getters.isAdmin;
    },
  },
  methods: {
    async loadDoctors() {
      await this.$store.dispatch("loadDoctors");
    },
    async handleDelete(doctorId) {
      this.error = null;
      try {
        await this.$store.dispatch("deleteDoctor", doctorId);
      } catch (error) {
        this.error = error.message;
      }
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Montserrat:400,700");

h1 {
  font-size: large;
}

a:link,
a:visited {
  text-decoration: none;
}

a:hover,
a:active {
  text-decoration: none;
}

.doctor {
  font-size: 3rem;
  display: flex;
  margin-bottom: 1rem;
}

p {
  line-height: 1.6;
  font-size: 1rem;
  /* background-color: blue; */
  display: block;
}

ol {
  list-style: none;
  counter-reset: list;
  padding: 0 1rem;
}

li {
  --stop: calc(100% / var(--length) * var(--i));
  --l: 62%;
  --l2: 88%;
  --h: calc((var(--i) - 1) * (180 / var(--length)));
  --c1: hsl(var(--h), 71%, var(--l));
  --c2: hsl(var(--h), 71%, var(--l2));

  position: relative;
  counter-increment: list;
  max-width: 45rem;
  margin: 2rem auto;
  padding: 2rem 1rem 1rem;
  box-shadow: 0.1rem 0.1rem 1.5rem rgba(0, 0, 0, 0.3);
  border-radius: 0.25rem;
  overflow: hidden;
  background-color: white;
  border-radius: 1rem;
}

h3 {
  display: flex;
  align-items: baseline;
  margin: 0 0 1rem;
  color: rgb(70 70 70);
  background-color: #96c3ce;
  border-radius: 1rem;
  width: 100%;
}

h3::before {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  margin-right: 1rem;
  width: 3rem;
  height: 3rem;
  content: counter(list);
  padding: 1rem;
  border-radius: 50%;
  background-color: var(--c1);
  color: white;
}

@media (min-width: 40em) {
  li {
    margin: 3rem auto;
    padding: 3rem 2rem 2rem;
  }

  h3 {
    font-size: 2.25rem;
    margin: 0 0 2rem;
  }

  h3::before {
    margin-right: 1.5rem;
  }
}

button {
  cursor: pointer;
  background: #a79ab2;
  width: 20%;
  border: 0;
  padding: 10px 15px;
  color: #fff;
  font-size: 10px;
  -webkit-transition: 0.3s linear;
  transition: 0.3s linear;
  border-radius: 1rem;
}
</style>
