<template>
  <div v-if="!editBatch && !addBatch" style="padding: 25px">
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
                  Quizzes: {{ teacher.quizes.length }}
                </p>
              </div>
            </div>
          </article>
        </div>
        <div class="box contact">
            <strong>Contact admin</strong><br>
            <input type="text" class="input" v-model="contact.subject" placeholder="subject"><br>
            <input type="textarea" class="input" v-model="contact.query" placeholder="query">
            <div style="display: flex; justify-content: flex-end; margin-top: 5px">
                <a class="button is-rounded is-small is-warning">SUBMIT</a>
            </div>
        </div>
      </div>
      <div class="column is-6" style="background-image: url(&quot;./svg/dash.svg&quot;); background-size: 80%; background-repeat: no-repeat; background-position: center">
      </div>
    </div>
    <div class="box is-12">
        <div style="display: flex; justify-content: space-between;">
            <h1 style="font-weight:600; font-size: 3vh; ">Batch management<br>
            <small class="text-muted" style="font-size: 2vh">Add, delete and edit batches</small>
            </h1>
            <a class="button is-success" @click="addBatch = true;">Add batch</a>
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
            <tr v-for="(Batch,ind) in teacher.batch" :key="Batch.batch_id">
                <td>
                    {{ Batch.name }}
                </td>
                <td>
                    {{ Batch.student.length }}
                </td>
                <td>
                    <a @click="editBatch = true; passBatch = Batch" class="button is-small is-rounded is-primary">Edit</a>
                    <a @click="deleteBatch(Batch.batch_id, ind)" class="button is-small is-rounded is-danger">Delete batch</a>
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
</style>

<script>
import add from './addBatch'
import sha256 from 'js-sha256'
import edit from './editBatch.vue'

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
        batch: [
          {
            batch_id: "",
            student: [""],
            name: "Batch 1",
          },
          {
            batch_id: "",
            student: ["",""],
            name: "Batch 2",
          },
          {
            batch_id: "",
            student: ["","",""],
            name: "Batch 3",
          },
          {
            batch_id: "",
            student: [""],
            name: "Batch 4",
          },
        ],
        quizes: [""],
        email: "",
      },
      contact: {
          subject: '',
          query: '',
          tid: '',
          created_at: ''
      }
    };
  },
  components: {
    edit,
    add
  },
  beforeMount() {
    this.teacher.photoUrl = localStorage.getItem("photoUrl");
    this.teacher.name = localStorage.getItem("name");
    this.teacher.email = localStorage.getItem("email");
  },
  methods: {
    countStudent() {
      var stu = 0;
      this.teacher.batch.forEach((batch) => {
        stu = stu + batch.student.length;
      });
      return stu;
    },
    deleteBatch(id, ind) {
        var pass = prompt("Enter password" + id)
        var hash = sha256(pass).toString()
        var hello = '2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824'
        if(hash === hello) {
            this.teacher.batch.splice(ind, 1)
        }
    }
  },
};
</script>
