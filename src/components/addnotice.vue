<template>
    <div class="box columns" style="margin: 2.5%:">
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
</template>

<style scoped>
#fuck {
    background-image: url('../assets/svg/notice.svg');
    height: 78vh;
    background-size: contain;
}
</style>

<script>
import firebaseApp from '../firebaseConfig'
export default {
    data() {
        return {
            notice: ''
        }
    },
    methods: {
        add() {
            firebaseApp.db.collection('notice').doc().set({notice: this.notice})
        }
    }
}
</script>