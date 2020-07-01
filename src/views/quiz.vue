<template>
    <div>
        <div class="columns">
            <div class="column">

            </div>
            <div class="column">
                <h1 style="font-weight:600; font-size: 5vh; ">Quizes<br>
                    <small class="text-muted" style="font-size: 2vh">Currently active Quizes</small>
                </h1>
                <div style="margin: 15px" class="notification" v-for="quiz in quizes" :key="quiz.name">
                    {{ quiz.data().title }} <br>
                    <span class="text-muted">{{ quiz.data().subtitle }}</span>
                    <div v-if="!allow" style="display: flex; flex-direction: row; justify-content: space-evenly; margin: 20px">
                        <a :href="quiz.data().src" target="_blank" class="button is-success is-rounded">Download Questions</a>
                        <div class="file has-name">
                        <label class="file-label">
                        <input
                            class="file-input"
                            type="file"
                            name="pdfnote"
                            @change="
                            upload = $event.target.files[0];
                            uploadValue = 0;
                            "
                        />
                        <span class="file-cta">
                            <span class="file-icon">
                            <i class="fas fa-upload"></i>
                            </span>
                            <span class="file-label">
                            Choose a file…
                            </span>
                        </span>
                        <span v-if="upload !== null" class="file-name">
                            {{ upload.name }}
                        </span>
                        </label>
                    </div>
                    </div>
                    <div v-if="upload !== null" style="margin: 10px;">
                        <div style="display: flex; justify-content: space-between">
                        <big class="muted-text"
                            >Progress: {{ uploadValue.toFixed() + "%" }}</big
                        >
                        <small v-if="pdfNotes !== null" class="muted-text">{{
                            bytesToSize(upload.size)
                        }}</small>
                        </div>
                        <progress
                        class="progress is-success"
                        :value="uploadValue"
                        max="100"
                        ></progress>
                    </div>
                    <a v-if="upload !== null" @click="uploadmeth(quiz.id)" class="button is-link is-rounded">Confirm</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.column {
    height: 80vh;
}
.column:nth-child(1) {
    background-image: url('../assets/svg/uploadquizstu.svg');
    background-size: contain;
    background-position: center center;
    height: 80vh;
}
</style>


<script>
import firebaseApp from  '../firebaseConfig'
export default {
    nme: 'Quiz student',
    data() {
        return {
            quizes: [],
            allow: false,
            upload: null,
            uploadValue: 0
        }
    },
    beforeMount() {
        firebaseApp.db.collection('student').doc(localStorage.getItem('id')).get().then(doc => {
            var stu = doc.data().batch[0]
            console.log('hi>',stu)
            firebaseApp.db.collection('quiz').where('batch', '==', stu).get().then(quizes => {
                console.log(quizes)
                if(quizes.empty) {
                    this.allow = true
                    this.quizes = [{
                        "title": "No active quizes currently"
                    }]
                }
                else {
                    quizes.forEach(quiz => {
                        console.log(quiz.data())
                        this.quizes.push(quiz)
                    })
                }
            })
        })
    },
    methods: {
        bytesToSize(bytes) {
            var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
            if (bytes == 0) return "0 Byte";
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + " " + sizes[i];
        },
        uploadmeth(id) {
            const storageRef = firebaseApp.storageBucket.ref(`quizAns/${this.upload.name}`).put(this.upload);
            var qAns = {}
            storageRef.on('state_changed', snapshot => {
                this.uploadValue = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
            },
            error => {
                console.log(error)
            },
            () => {
                this.uploadValue = 100
                storageRef.snapshot.ref.getDownloadURL().then((url) => {
                    qAns.src = url
                    qAns.qid = id
                    qAns.id = localStorage.getItem('id')
                    firebaseApp.db.collection('qAnswers').doc().set(qAns)
                })
            })
        }
    }
}
</script>