<template>
    <div class="columns">
        <div class="column is-6" id="fuck"></div>
        <div class="column is-6">
            <strong style="font-size: 45px">Quizes available</strong><br><br><br>
            <div class="columns" style="text-align: left" v-for="quizs in quiz" :key="quizs.id">
                <div class="column">
                    <Strong style="font-size: 25px">Quiz Name: {{ quizs.title }}</Strong><br><br>
                    Quiz info: {{ quizs.subtitle }}<br><br>
                </div>
                <div class="column"><a :href="quizs.src" class="button is-success is-rounded">Downlosd question</a><br></div>
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
</style>

<script>
import firebaseApp from '../firebaseConfig'
export default {
    data() {
        return {
            student: {},
            quiz: []
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
    }
}
</script>