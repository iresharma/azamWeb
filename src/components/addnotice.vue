<template>
    <div class="box">
        <div class="columns" style="margin: 2.5%:">
            <div class="column" id="fuck"></div>
            <div class="column">
                <strong style="font-size: 45px">Add notice</strong><br>
                <div class="field" style="width: 100%; display: flex; justify-content: center; margin-top: 10px">
                    <div class="control" style="width: 70%">
                        <textarea v-model="notice" class="textarea is-warning" placeholder="Add notice"></textarea>
                    </div>
                </div>
                <a @click="add" class="button is-warning is-rounded">Add</a>
            </div>
        </div>
        <!-- {{ notices }} -->
        <table class="table">
            <tr>
                <th>Notice</th>
                <th>Actions</th>
            </tr>
            <tr v-for="notice in notices" :key="notice">
                <td>{{ notice.data().notice }}</td>
                <td>
                    <a @click="remove(notice.id)" class="button is-danger">Remove</a>
                </td>
            </tr>
        </table>
    </div>
</template>

<style scoped>
#fuck {
    background-image: url('../assets/svg/notice.svg');
    height: 58vh;
    background-size: contain;
}
</style>

<script>
import firebaseApp from '../firebaseConfig'
export default {
    data() {
        return {
            notice: '',
            notices: []
        }
    },
    beforeMount() {
        firebaseApp.db.collection('notice').onSnapshot(notices => {
            if(!notices.empty) {
                notices.forEach(h => this.notices.push(h))
            }
        })
    },
    methods: {
        add() {
            firebaseApp.db.collection('notice').doc().set({notice: this.notice})
        },
        remove(id) {
            // console.log(id)
            firebaseApp.db.collection('notice').doc(id).delete()
        }
    }
}
</script>