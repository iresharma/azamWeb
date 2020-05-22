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
                                            <td><b>Teachers</b>: {{ total }}</td>
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
                <div style="display: flex; flex-direction: row; align-items: center">
                    <a class="button is-small is-success" v-if="!show" @click="add">Add Teacher</a>
                    <div style="margin: 5px;" v-if="show" class="tokenn notification is-primary is-light;">
                        <button class="delete" @click="show = false"></button>
                        Teacher register token <br>
                        <strong>{{ token }}</strong>
                    </div>
                </div>
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
        <nav class="pagination is-rounded">
            <a v-if="page == 1" class="button is-rounded is-outlined pagination-previous is-danger">Previous</a>
            <a v-else class="pagination-previous is-success button is-rounded is-outlined" @click="loadprev">Previous</a>
            <ul class="pagination-list">
                <li class="pagination-link"><strong>{{ page }}</strong></li>
            </ul>
            <a v-if="page == Number(total/10)" class="pagination-next is-outlined button is-rounded is-danger">Next Page</a>
            <a v-else class="pagination-next is-success button is-rounded is-outlined" @click="loadNext">Next Page</a>
        </nav>
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
            first: '',
            last: '',
            page: 1,
            total: 1,
            token: '',
            show: false
        }
    },
    beforeMount() {
        firebaseApp.db.collection('admin').doc('pTA42ixCblHbbKcYQ2ft').onSnapshot((response) => {
            this.admin = response.data()
            console.log(this.admin)
        })
        firebaseApp.db.collection('count').doc('ZvZXwyhhYes2VSMCyYTD').onSnapshot((doc) => {
            this.total = doc.data().teacher
        })
        firebaseApp.db.collection('teacher').orderBy('tid').limit(10).onSnapshot((doc) => {
            this.teachers = []
            doc.forEach((te) => {
                var teacher = {
                    id: te.id,
                    data: te.data()
                }
                this.teachers.push(teacher)
            })
            this.last = this.teachers[9].id
            this.first = this.teachers[0].id
        })
        this.admin.photoUrl = localStorage.getItem('photoUrl')
        this.admin.name = localStorage.getItem('name')
        
    },
    methods: {
        loadNext() {
            if(this.total/10 !== this.page) {
                firebaseApp.db.collection('teacher').orderBy('tid').startAfter(this.last).limit(10).onSnapshot((doc) => {
                    this.teachers = []
                    doc.forEach((te) => {
                        var teacher = {
                            id: te.id,
                            data: te.data()
                        }
                        this.teachers.push(teacher)
                    })
                    this.page += 1

                    this.last = this.teachers[9].id
                    this.first = this.teachers[0].id
                })
            }
        },
        loadprev() {
            firebaseApp.db.collection('teacher').orderBy('tid').endBefore(this.first).limit(10).onSnapshot((doc) => {
                this.teachers = []
                doc.forEach((te) => {
                    var teacher = {
                        id: te.id,
                        data: te.data()
                    }
                    this.teachers.push(teacher)
                })
                this.page -= 1

                this.last = this.teachers[9].id
                this.first = this.teachers[0].id
            })
        },
        nStudent(batches) {
            var students = 0
            batches.forEach((batch) => {
                students = students + batch.student.length
            })
            return students
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
            
            firebaseApp.db.collection('count').doc('ZvZXwyhhYes2VSMCyYTD').get().then((count) => {
                var counter = count.data().techer - 1
                firebaseApp.db.collection('count').doc('ZvZXwyhhYes2VSMCyYTD').update({teacher: counter})
            })
        },
        add() {
            var result = '';
            var characters  = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            var charactersLength = characters.length;
            for ( var i = 0; i < 6; i++ ) {
                result += characters.charAt(Math.floor(Math.random() * charactersLength));
            }
            this.token = result
            this.show = true
            firebaseApp.db.collection('token').doc(this.token).set({
                token: this.token,
                type: 'teacher'
            })
        }
    }
}
</script>