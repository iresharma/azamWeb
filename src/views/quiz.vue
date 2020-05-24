<template>
    <div>
        <div v-if="!upload" class="columns">
            <div class="column is-6" id="fuck"></div>
            <div class="column is-6">
                <strong style="font-size: 45px">Quizes available</strong><br><br><br>
                <div class="columns" style="text-align: left" v-for="quizs in quiz" :key="quizs.id">
                    <div class="column">
                        <Strong style="font-size: 25px">Quiz Name: {{ quizs.title }}</Strong><br><br>
                        Quiz info: {{ quizs.subtitle }}<br><br>
                    </div>
                    <div class="column"><a :href="quizs.src" class="button is-success is-rounded">Downlosd question</a><br><a @click="upload = true" class="button is-info is-rounded">Downlosd question</a></div>
                </div>
            </div>
        </div>
        <div id="fuck2" v-if="upload" class="columns">
            <div class="column is-6"></div>
            <div class="column is-6">
                <div class="file has-name">
                    <label class="file-label">
                        <input @change="answer = $event.target.files[0];uploadValue = 0;" class="file-input" type="file" name="resume">
                        <span class="file-cta">
                            <span class="file-icon">
                                <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                                Choose a file…
                            </span>
                        </span>
                        <span class="file-name">
                            {{ answer.name }}
                        </span>
                    </label>
                </div>
                <div style="margin: 10px;">
                <div style="display: flex; justify-content: space-between">
                <big class="muted-text"
                    >Progress: {{ uploadValue.toFixed() + "%" }}</big
                >
                <small v-if="answer !== null" class="muted-text">{{
                    bytesToSize(answer.size)
                }}</small>
                </div>
                <progress
                    class="progress is-success"
                    :value="uploadValue"
                    max="100"
                ></progress>
            </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#fuck {
    background-image: url('../assets/svg/student.svg');
    background-size: contain;
    height: 80vh;
    background-position: center center;
}
#fuck2 {
    background-image: url('../assets/svg/uploadquizstu.svg');
    background-size: contain;
    height: 78vh;
}
</style>

<script>
import firebaseApp from '../firebaseConfig'
export default {
    data() {
        return {
            student: {},
            quiz: [],
            answer: null,
            uploadValue: 0,
            uploadObj: {}
        }
    },
    beforeMount() {
        var id = localStorage.getItem('id')
        firebaseApp.db.collection('student').doc(id).get().then((student) => {
            this.student = student.data()
            firebaseApp.db.collection('quiz').where('batch', 'in', this.student.batch).onSnapshot((quizes) => {
                if(!quizes.empty) {
                    quizes.forEach((quiz) => {
                        this.quiz.push(quiz.data())
                    })
                }
            })
        })
    },
    methods: {
        upload(id) {
            var storage = firebaseApp.storageBucket.ref(`answers/${localStorage.getItem('name')}/${id}`).put(this.answer)
            storage.on('state_change', (snapshot) => {
                this.uploadValue = (snapshot.bytesTransferred)/(snapshot.totalBytes)*100
            },
            (error) => {
                console.error(error.message)
            },
            () => {
                storage.snapshot.ref.getDownloadURL().then((url) => {
                    var name = localStorage.getItem('name')
                    firebaseApp.db.collection('answer').doc().set({
                        src: url,
                        name: name,
                        qid: id
                    })
                })
            })
        },
        bytesToSize(bytes) {
            var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
            if (bytes == 0) return "0 Byte";
                var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
        },
    }
}
</script>