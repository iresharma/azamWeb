<template>
    <div class="box" style="margin: 2.5%; text-align: left">
        <h1 style="font-weight:600; font-size: 3vh; ">Contact responses<br>
            <small class="text-muted" style="font-size: 2vh">Responses from various contact forms</small>
        </h1>
        <div class="columns is-multiline" style="padding: 0">
            <div class="column is-6 " v-for="contacts in contact" :key="contacts.id">
                <div class="notification">
                    <button class="delete" @click="deleted(contacts.id)"></button>
                    <strong>{{ contacts.data.name }}</strong><br>
                    <small style="font-size: 14px; color: #3273DC">{{ contacts.data.email }}</small><br>
                    <small style="font-size: 14px; color: #3273DC">{{ contacts.data.tel }}</small><br>
                    <big style="font-size: 24px;">{{ contacts.data.sub }}</big><br>
                    {{ contacts.data.info }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import firebaseApp from '../firebaseConfig'
export default {
    data() {
        return {
            contact: []
        }
    },
    beforeMount() {
        firebaseApp.db.collection('contact').onSnapshot((contact) => {
            if(!contact.empty) {
                this.contact = []
                contact.forEach((message) => {
                    var con = {
                        id: message.id,
                        data: message.data()
                    }
                    this.contact.push(con)
                })
            }
        })
    },
    methods: {
        deleted(id) {
            firebaseApp.db.collection('contact').doc(id).delete()
        }
    }
}
</script>