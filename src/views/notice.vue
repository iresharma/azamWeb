<template>
    <div style="text-align: left;">
        <h1 class="notification" style="font-weight: 1500; font-size: 60px">
            Notices
        </h1>
        <ul style="padding: 30px">
            <li style="color: red" v-for="notice in notices" :key="notice">
                ◉ {{notice}}
            </li>
        </ul>
    </div>
</template>

<script>
import firebaseApp from '../firebaseConfig'

export default {
    data() {
        return {
            notices: ''
        }
    },
    beforeMount() {
        firebaseApp.db.collection('notice').onSnapshot((doc) => {
            if(!doc.empty) {
                this.notices = []
                doc.forEach((notices) => {
                    this.notices.push(notices.data().notice)
                })
            }
        })
    }
}
</script>