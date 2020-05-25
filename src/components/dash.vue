<template>
  <div v-if="!editBatch && !addBatch" style="padding: 2.5%">
    <div class="columns">
      <div class="column is-6">
        <div class="box">
          <article class="media">
            <div class="media-left">
              <figure class="image is-128x128">
                <img :src="teacher.photoUrl" alt="Image" />
              </figure>
            </div>
            <div class="media-content">
              <div class="content">
                <p>
                  <strong>{{ teacher.name }}</strong>
                  <br />
                  Batches: {{ teacher.batch.length }} <br />
                  Students: {{ countStudent() }} <br />
                  Quizzes: {{ teacher.quizes == undefined ? 0 : teacher.quizes.length }}
                </p>
              </div>
            </div>
          </article>
        </div>
        <div class="box contact">
          <strong>Contact admin</strong><br />
          <input
            type="text"
            class="input"
            v-model="contact.subject"
            placeholder="subject"
          /><br />
          <input
            type="textarea"
            class="input"
            v-model="contact.query"
            placeholder="query"
          />
          <div
            style="display: flex; justify-content: flex-end; margin-top: 5px"
          >
            <a class="button is-rounded is-small is-warning">SUBMIT</a>
          </div>
        </div>
      </div>
      <div class="column is-6" id="whocares" style=""></div>
    </div>
    <div class="box is-12">
      <div style="display: flex; justify-content: space-between;">
        <h1 style="font-weight:600; font-size: 3vh; ">
          Batch management<br />
          <small class="text-muted" style="font-size: 2vh"
            >Add, delete and edit batches</small
          >
        </h1>
        <a class="button is-success" @click="addBatch = true">Add batch</a>
      </div>
      <table class="table is-fullwidth is-hoverable">
        <tr>
          <th>
            Batch Name
          </th>
          <th>
            No. of students
          </th>
          <th>
            Actions
          </th>
        </tr>
        <tr v-for="(Batch, ind) in teacher.batch" :key="Batch.batch_id">
          <td>
            {{ Batch.name }}
          </td>
          <td>
            {{ Batch.student.length }}
          </td>
          <td>
            <a
              @click="openEdit(Batch)"
              class="button is-small is-rounded is-primary"
              >Edit</a
            >
            <a
              @click="deleteBatch(Batch.name, ind)"
              class="button is-small is-rounded is-danger"
              >Delete batch</a
            >
          </td>
        </tr>
      </table>
    </div>
  </div>
  <div v-else-if="editBatch && !addBatch" style="padding: 25px">
    <edit :batch="passBatch" />
  </div>
  <div v-else-if="!editBatch && addBatch">
    <add />
  </div>
</template>

<style scoped>
.contact strong {
  font-size: 15px;
  margin: 5px;
}
.contact input {
  margin: 7px;
}
td a {
  margin: 4px;
}
#whocares {
  background-image: url("../assets/svg/dash.svg");
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: center;
}
</style>

<script>
import add from "./addBatch";
import sha256 from "js-sha256";
import edit from "./editBatch.vue";
import firebaseApp from "../firebaseConfig";

export default {
  data() {
    return {
      passBatch: {},
      editBatch: false,
      addBatch: false,
      teacher: {
        tid: "",
        name: "",
        photoUrl: "",
        quizes: [""],
        email: "",
        batch: [],
        passHash: "",
      },
      contact: {
        subject: "",
        query: "",
        tid: "",
        created_at: "",
      },
      count: {
        teacher: 0,
        batch: 0,
        student: 0,
        video: 0,
        pdf: 0,
        quiz: 0,
        liveClass: 0
      }
    };
  },
  components: {
    edit,
    add,
  },
  beforeMount() {
    this.teacher.photoUrl = localStorage.getItem("photoUrl");
    this.teacher.name = localStorage.getItem("name");
    this.teacher.email = localStorage.getItem("email");
    if (localStorage.getItem("type") == "admin") {
      firebaseApp.db
        .collection("admin")
        .doc("pTA42ixCblHbbKcYQ2ft")
        .onSnapshot((doc) => {
          this.teacher.batch = doc.data().batch;
          this.teacher.quizes = doc.data().quizes;
          this.teacher.tid = doc.id;
          this.teacher.passHash = doc.data().passHash;
        });
    } else {
      this.teacher.tid = localStorage.getItem("id");
      firebaseApp.db
        .collection("teacher")
        .doc(this.teacher.tid)
        .onSnapshot((doc) => {
          this.teacher.batch = doc.data().batch;
          this.teacher.quizes = doc.data().quizes;
          this.teacher.tid = doc.id;
          this.teacher.passHash = doc.data().passHash;
        });
    }
  },
  methods: {
    countStudent() {
      var tempArr = []
      console.log(this.teacher)
      this.teacher.batch.forEach((batch) => {
          tempArr = tempArr.concat(batch.student)
      })
      var studentArr = Array.from(new Set(tempArr))
      return studentArr.length
    },
    deleteBatch(name, ind) {
      var pass = prompt("Enter password to delete " + name + " batch");
      var hash = sha256(pass).toString();
      if (hash == this.teacher.passHash) {
        this.teacher.batch.splice(ind, 1);
        var bat = this.teacher.batch
        if (localStorage.getItem("type") == "admin") {
          firebaseApp.db
            .collection("admin")
            .doc("pTA42ixCblHbbKcYQ2ft")
            .update({batch: bat});
          firebaseApp.db
              .collection("count")
              .doc()
              .get()
              .then((count) => {
                var counter = count.data().batch - 1;
                firebaseApp.db
                  .collection("count")
                  .doc('ZvZXwyhhYes2VSMCyYTD')
                  .update({ batch: counter });
              });
        } else {
          firebaseApp.db
            .collection("teacher")
            .doc(this.teacher.tid)
            .update({batch: bat});
            firebaseApp.db
              .collection("count")
              .doc()
              .get()
              .then((count) => {
                var counter = count.data().batch - 1;
                firebaseApp.db
                  .collection("count")
                  .doc('ZvZXwyhhYes2VSMCyYTD')
                  .update({ batch: counter });
              });
        }
      }
    },
    openEdit(batch) {
      this.passBatch = batch;
      this.editBatch = true;
    },
  },
};
</script>
