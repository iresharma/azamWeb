<template>
    <div>
        <div class="columns">
            <div class="column is-6">
                <div class="box">
                    <article class="media">
                        <div class="media-left">
                            <div style="width: 180px; height: 180px; background-image: url(&quot;svg/system.svg&quot;); background-size: contain; background-position: center"></div>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong style="font-size:35px">System Info</strong>
                                    <br />
                                    <table>
                                        <tr>
                                            <td><b>Teachers</b>: {{ teachers.length }}</td>
                                            <td><b>Students</b>: {{ totalStudent }}</td>
                                        </tr>
                                        <tr>
                                            <td><b>Videos</b>: 10</td>
                                            <td><b>Notes</b>: 10</td>
                                        </tr>
                                        <tr>
                                            <td><b>Live classes</b>: 10</td>
                                            <td><b>Quizes</b>: 10</td>
                                        </tr>
                                    </table>
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
            <div class="column is-6">
                <div class="box">
                    <article class="media">
                        <div class="media-left">
                            <figure class="image is-128x128">
                                <img :src="admin.photoUrl" alt="Image" />
                            </figure>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <p>
                                    <strong style="font-size: 35px">{{ admin.name }}</strong>
                                <br />
                                <table>
                                    <tr>
                                        <td><b>Batches</b>: {{ admin.batch.length }}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Students</b>: {{ countStudent() }}</td>
                                    </tr>
                                    <tr>
                                        <td><b>Quizzes</b>: {{ admin.quiz.length }}</td>
                                    </tr>
                                </table>
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
        <div class="box">
            <div style="display: flex; justify-content: space-between; align-items: center">
                <div>
                    <h1 style="font-weight:600; font-size: 3vh; text-align: left; margin-bottom:10px">Teacher Management<br>
                        <small class="text-muted" style="font-size: 2vh">Add or remove teachers here</small>
                    </h1>
                </div>
                <a class="button is-small is-success">Add Teacher</a>
            </div>
            <table class="table is-fullwidth is-hoverable">
            <tr>
                <th>Name</th>
                <th>No. of batches</th>
                <th>No. of students</th>
                <th>No. of quizes</th>
                <th>Action</th>
            </tr>
            <tr v-for="teacher in teachers" :key="teacher.id">
                <td>
                    <span style="font-weight: 480">{{ teacher.data.name }}</span>
                </td>
                <td>
                    {{ teacher.data.batch.length }}
                </td>
                <td>
                    {{ nStudent(teacher.data.batch) }}
                </td>
                <td>
                    {{ teacher.data.quizes.length }}
                </td>
                <td>
                    <a @click="removeTeacher(teacher.id)" class="button is-danger is-inverted">Remove</a>
                </td>
            </tr>
        </table>
        </div>
    </div>
</template>


<style scoped>

</style>

<script>
import firebaseApp from '../firebaseConfig'
import { sha256 } from 'js-sha256'
export default {
    name: 'adminSettings',
    data() {
        return {
            teachers: [],
            admin: {},
            classes: 10,
            totalStudent: 0,
        }
    },
    beforeMount() {
        firebaseApp.db.collection('admin').doc('pTA42ixCblHbbKcYQ2ft').onSnapshot((response) => {
            this.admin = response.data()
            console.log(this.admin)
        })
        firebaseApp.db.collection('teacher').onSnapshot((snapshot) => {
            this.teachers = []
            snapshot.docs.forEach((doc) => {
                var teacher = {
                    id: doc.id,
                    data: doc.data()
                }
                this.teachers.push(teacher)
            })
        })
        this.admin.photoUrl = localStorage.getItem('photoUrl')
        this.admin.name = localStorage.getItem('name')
        
    },
    methods: {
        nStudent(batches) {
            var students = 0
            batches.forEach((batch) => {
                students = students + batch.student.length
            })
            return students
        },
        countStudent() {
        var stu = 0;
        this.admin.batch.forEach((batch) => {
            stu = stu + batch.student.length;
        });
        return stu;
        },
        removeTeacher(id) {
            var pass = prompt("Enter password");
            var passHash = sha256(pass)
            var passcheck = ''
            firebaseApp.db.collection('admin').doc('pTA42ixCblHbbKcYQ2ft').get().then((doc) => {
                passcheck = doc.data().passHash
                if(passHash == passcheck) {
                    firebaseApp.db.collection('teacher').doc(id).delete()
                }
                else {
                    this.removeTeacher(id)
                }
            })
        }
    }
}
</script>