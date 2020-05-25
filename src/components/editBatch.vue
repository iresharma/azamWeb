<template>
  <div class="box" style="text-align:left;padding: 25px">
    <svg
      @click="$router.go()"
      class="bi bi-arrow-left"
      width="3em"
      height="3em"
      viewBox="0 0 16 16"
      fill="red"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z"
        clip-rule="evenodd"
      />
      <path
        fill-rule="evenodd"
        d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z"
        clip-rule="evenodd"
      />
    </svg>
    <h1 style="text-align: left; font-weight:600; font-size: 3vh;">
      {{ batch.name }}<br />
      <div
        style="display: flex; justify-content: space-between; align-items: center; width: 40%"
      >
        <small class="text-muted" style="font-size: 2vh"
          >No. of students: {{ batch.student.length }}</small
        >
        <a @click="addStudent()" v-if="!show" class="button is-success is-inverted">Add Students</a>
        <div style="margin: 5px;" v-if="show" class="tokenn notification is-primary is-light;">
            <button class="delete" @click="show = false"></button>
              token <br>
            <strong>{{ token }}</strong>
        </div>
      </div>
    </h1>
    <table style="margin-top: 20px" class="table is-fullwidth is-hoverable">
      <tr>
        <th></th>
        <th>
          Student
        </th>
        <th>
          Action
        </th>
      </tr>
      <tr v-for="stud in studen" :key="stud">
        <td>
          <figure class="image is-48x48">
            <img :src="stud['photoUrl']" :alt="stud['name']" />
          </figure>
        </td>
        <td>
          {{ stud["name"] }}
        </td>
        <td>
          <a
            class="button is-danger is-inverted"
            @click="removeStudent(stud['id'])"
            >Remove</a
          >
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped></style>

<script>
import firebaseApp from "../firebaseConfig";
export default {
  data() {
    return {
      studen: [],
      token: '',
      show: false
    };
  },
  props: {
    batch: Object,
  },
  beforeMount() {
    console.log(this.batch);

    this.batch["student"].forEach((std) => {
      if(std != '') {
        firebaseApp.db
        .collection("student")
        .doc(std)
        .onSnapshot((val) => {
          this.studen.push(val.data());
        });
      }
    });
  },
  methods: {
    removeStudent(id) {
      firebaseApp.db
        .collection("student")
        .doc(id)
        .get()
        .then((student) => {
          var batch = student.data().batch;
          batch = batch.filter((val) => {
            return val != this.batch.batch_id;
          });
          if (batch.length == 0) {
            firebaseApp.db
              .collection("student")
              .doc(id)
              .delete();
            firebaseApp.db
              .collection("count")
              .doc("ZvZXwyhhYes2VSMCyYTD")
              .get()
              .then((student) => {
                var counter = student.data().student - 1;
                firebaseApp.db
                  .collection("count")
                  .doc("ZvZXwyhhYes2VSMCyYTD")
                  .update({ student: counter });
              });
          } else {
            firebaseApp.db
              .collection("student")
              .doc(id)
              .update({ batch: batch });
          }
        });
      this.batch.student = this.batch.student.filter((val) => {
        return val != id;
      });
      var type = localStorage.getItem("type");
      var tid = localStorage.getItem("id");
      firebaseApp.db
        .collection(type)
        .doc(tid)
        .get().then((batcharr) => {
          var bat = []
          batcharr.data().batch.filter((ba) => {
            if(ba.batch_id == this.batch.batch_id) {
              bat.push(this.batch)
            }
            else {
              bat.push(ba)
            }
          })
          firebaseApp.db.collection(type).doc(tid).update({batch: bat})
        })
    },
    addStudent() {
      var result = "";
        var characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        var charactersLength = characters.length;
        for (var i = 0; i < 6; i++) {
          result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
          );
        }
        this.token = result;
        this.show = true
        var type = localStorage.getItem('type')
        firebaseApp.db.collection('token').doc(result).set({
          creator: type,
          type: 'student',
          token: result,
          batch: this.batch.batch_id,
          nTotal: 1,
          nUse: 0
        })
    }
  },
};
</script>
