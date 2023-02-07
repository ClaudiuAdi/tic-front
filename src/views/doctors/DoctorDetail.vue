<template>
  <div>
    <div class="page">
      <div class="divButton">
        <div>
          <button class="btnEditDoctor" @click="handleEdit">Edit doctor</button>
        </div>
      </div>
      <!-- <p class="doctorDate">Posted on {{ date }}</p> -->
      <!-- <p class="doctorAuthor">{{ assigned }}</p> -->
      <div class="property">
        <h2>First Name:</h2>
        <p class="doctor">{{ firstName }}</p>
      </div>
      <div class="property">
        <h2>Last Name:</h2>
        <p class="doctor">{{ lastName }}</p>
      </div>
      <div class="property">
        <h2>Email:</h2>
        <p class="doctor">{{ email }}</p>
      </div>
      <div class="property">
        <h2>Description:</h2>
        <p class="doctor description">{{ description }}</p>
      </div>
      <div class="property">
        <h2>Cost per Hour:</h2>
        <p class="doctor">{{ costPerHour }}$</p>
      </div>
      <p class="doctorPatients">Patients:</p>
      <span class="addPatient">
        <div class="addPatient">
          <div>
            <button @click="handleAddPatient">Add Patient</button>
          </div>
        </div>
      </span>
      <div class="patientSection">
        <ul>
          <li v-for="patient in patients" :key="patient">
            <div class="divButtonPatient">
              <div v-if="isMe(patient.assigned)" class="patient-button">
                <button
                  v-if="!getIsEditing(patient.id)"
                  @click="handleEditPatient(patient.id)"
                >
                  Edit patient
                </button>
                <button v-else @click="savePatient(patient.id)">
                  Save patient
                </button>
              </div>
              <div class="patient-button">
                <button @click="handleDeletePatient(id, patient.id)">
                  Delete
                </button>
              </div>
            </div>
            <!-- <p class="patientAuthor">Posted  {{ patient.assigned }}</p> -->
            <p class="patientDate">Posted on {{ patient.date }}</p>
            <h2>Email</h2>
            <p v-if="!getIsEditing(patient.id)" class="patient">
              {{ patient.email }}
            </p>
            <textarea
              v-else
              type="text"
              :value="patient.email"
              ref="inputPatient"
            />
            <h2>Age</h2>
            <p v-if="!getIsEditing(patient.id)" class="patient">
              {{ patient.age }}
            </p>
            <textarea
              v-else
              type="text"
              :value="patient.age"
              ref="inputPatient"
            />
            <h2>Problem</h2>
            <p v-if="!getIsEditing(patient.id)" class="patient">
              {{ patient.problem }}
            </p>
            <textarea
              v-else
              type="text"
              :value="patient.problem"
              ref="inputPatient"
            />
            <h2>Message</h2>
            <p v-if="!getIsEditing(patient.id)" class="patient">
              {{ patient.message }}
            </p>
            <textarea
              v-else
              type="text"
              :value="patient.message"
              ref="inputPatient"
            />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "DoctorDetail",
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      doctor: null,
      isEditing: "",
      inputPatient: "",
    };
  },
  created() {
    this.getDoctor();
  },
  computed: {
    firstName() {
      return this?.doctor?.firstName || "";
    },
    lastName() {
      return this?.doctor?.lastName || "";
    },
    date() {
      return this?.doctor?.date || "";
    },
    assigned() {
      return this?.doctor?.assigned || "";
    },
    email() {
      return this?.doctor?.email || "";
    },
    description() {
      return this?.doctor?.description || "";
    },
    costPerHour() {
      return this?.doctor?.costPerHour || "";
    },
    patients() {
      return this?.doctor?.patients || [];
    },
  },
  methods: {
    async getDoctor() {
      const doctor = await axios.get(
        `${process.env.VUE_APP_API_URL}/doctors/${this.id}`
      );
      this.doctor = doctor?.data || {};
    },
    handleEdit() {
      this.$router.push("/doctors/" + this.id + "/edit");
    },
    handleEditPatient(id) {
      this.isEditing = id;
    },
    async savePatient(id) {
      const doctor = await axios.put(
        `${process.env.VUE_APP_API_URL}/admin/doctors/${this.id}/patients/${id}`,
        {
          email: this.$refs.inputPatient[0].value,
          age: this.$refs.inputPatient[1].value,
          message: this.$refs.inputPatient[3].value,
          problem: this.$refs.inputPatient[2].value,
        },
        {
          headers: {
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      this.doctor = doctor.data.data;
      this.isEditing = "";
    },
    getIsEditing(id) {
      return this.isEditing === id;
    },
    isMe(assigned) {
      return localStorage.getItem("username") === assigned;
    },
    async handleDeletePatient(doctorId, patientId) {
      this.error = null;
      try {
        await this.$store.dispatch("deletePatient", { doctorId, patientId });
        this.getDoctor();
      } catch (error) {
        this.error = error.message;
      }
    },
    handleAddPatient() {
      this.$router.push("/add-patients/" + this.id);
    },
  },
};
</script>

<style scoped>
.page {
  background-color: red;
  padding: 3rem;
  width: auto;
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

h2 {
  display: inline;
  font-size: 1rem;
}

form {
  font-size: 2rem;
}

.main {
  padding: 3rem;
  width: auto;
}

button {
  margin-top: 0.8rem;
  cursor: pointer;
  background: #a79ab2;
  width: 30%;
  border: 0;
  padding: 10px 15px;
  color: #fff;
  font-size: 8px;
  -webkit-transition: 0.3s linear;
  transition: 0.3s linear;
  border-radius: 1rem;
}

.page {
  width: 420px;
  background: #8c8a9c6c;
  margin: 20px auto;
  min-height: 200px;
  border: 1px solid #f3f3f3;
  border-radius: 1rem;
}

.property {
  /* background-color: red; */
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

p {
  font-size: 0.8rem;
}

.description {
  text-align: left;
}

li {
  background-color: #96c3ce;
  margin: 1rem 1rem;
  border-radius: 1rem;
  list-style-type: none;
}

.divButtonPatient {
  display: flex;
  justify-content: space-around;
}

button {
  width: 8rem;
}
</style>
