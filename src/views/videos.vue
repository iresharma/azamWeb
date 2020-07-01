<template>
    <div>
     <div style="text-align: left;padding: 2.5%">
        <h1 style="font-weight:600; font-size: 3vh; ">Videos<br>
            <small class="text-muted" style="font-size: 2vh">Video lectures</small>
        </h1>
    </div>
    <div class="columns is-multiline" >
        <div class="column is-one-quarter" v-for="videos in video" :key="videos.id" style="padding:2.5%">
            <div class="card">
                <div class="card-content">
                    <div class="media">
                    <div class="media-content has-text-centered">
                        <p class="title is-4">{{videos.data.title}}</p>
                    </div>
                    </div>
                        
                    <div class="content" style="height:100px;overflow:hidden">
                    {{videos.data.subtitle}}
                    </div>
                    <div class="content">
                    <button class="button is-warning is-focused" @click="$router.push('/videos/' + videos.data.id)">Open Video</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    </div>
</template>

<style scoped>

</style>

<script>
import firebaseApp from '../firebaseConfig'

export default {
    data() {
        return {
            logged: '',
            video:[],
            page: 0
        }
    },
    beforeMount() {
        this.logged = localStorage.getItem('logged')
        firebaseApp.db.collection('video').orderBy('id').limit(12).get().then((videos) => {
            this.video = []
            videos.forEach((te) => {
                var pdf = {
                    id: te.id,
                    data: te.data()
                }
                this.video.push(pdf)
            })
            this.last = this.video[11].id
            this.first = this.video[0].id
        })
    },
    methods: {
        loadNext() {
            if(this.total/12 !== this.page) {
                firebaseApp.db.collection('video').orderBy('id').startAfter(this.last).limit(12).onSnapshot((videos) => {
                    this.video = []
                    videos.forEach((te) => {
                        var pdf = {
                            id: te.id,
                            data: te.data()
                        }
                        this.video.push(pdf)
                    })
                    this.page += 1

                    this.last = this.video[11].id
                    this.first = this.video[0].id
                })
            }
        },
        loadprev() {
            firebaseApp.db.collection('video').orderBy('id').endBefore(this.first).limit(12).onSnapshot((videos) => {
                this.video = []
                videos.forEach((te) => {
                    var pdf = {
                        id: te.id,
                        data: te.data()
                    }
                    this.video.push(pdf)
                })
                this.page -= 1

                this.last = this.video[11].id
                this.first = this.video[0].id
            })
        },
    }
}
</script>