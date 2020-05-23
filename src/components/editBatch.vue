<template>
  <div class="box" style="text-align:left;padding: 25px">
    <svg @click="$router.go()" class="bi bi-arrow-left" width="3em" height="3em" viewBox="0 0 16 16" fill="red" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 010 .708L3.207 8l2.647 2.646a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3a.5.5 0 01.708 0z" clip-rule="evenodd"/>
        <path fill-rule="evenodd" d="M2.5 8a.5.5 0 01.5-.5h10.5a.5.5 0 010 1H3a.5.5 0 01-.5-.5z" clip-rule="evenodd"/>
    </svg>
    <h1 style="text-align: left; font-weight:600; font-size: 3vh;">
      {{ batch.name }}<br />
      <div style="display: flex; justify-content: space-between; align-items: center; width: 40%">
        <small class="text-muted" style="font-size: 2vh">No. of students: {{ batch.student.length }}</small>
        <a class="button is-success is-inverted">Add Students</a>
      </div>
    </h1>
    <table style="margin-top: 20px" class="table is-fullwidth is-hoverable">
      <tr>
        <th>
          Student
        </th>
        <th>
          Action
        </th>
      </tr>
      <tr v-for="stud in batch.student" :key="stud">
        <td>
          {{ students[stud]['name'] }}
        </td>
        <td>
          <a class="button is-danger is-inverted">Remove</a>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped></style>

<script>
import firebaseApp from '../firebaseConfig'
export default {
  props: {
    batch: Object,
  },
  data() {
    return {
      students: {}
    }
  },
  beforeMount() {
    this.batch.student.forEach((student) => {
      firebaseApp.db.collection('student').doc(student).get().then((add) => {
        this.students[student] = add.data()
      })
    })
    console.log(this.students)
  }
};
</script>
