<template>
    <div>
    <div style="text-align: left;padding: 2.5%">
        <h1 style="font-weight:600; font-size: 3vh; ">Notes<br>
        <small class="text-muted" style="font-size: 2vh">PDF notes downloadable</small>
    </h1>
    </div>
    <div class="columns is-multiline" v-for="pdfs in pdf" :key="pdfs.id" style="padding:2.5%">
        <div class="column is-one-quarter">
            <div class="card">
                <div class="card-content">
                    <div class="media">
                    <div class="media-content has-text-centered">
                        <p class="title is-4">{{pdfs.data.title}}</p>
                    </div>
                    </div>
                        
                    <div class="content has-text-grey-lighter" style="height:100px;overflow:hidden">
                    {{pdfs.data.subtitle}}
                    </div>
                    <div class="content">
                    <button class="button is-warning is-focused" @click="$router.push('/notes/' + pdfs.data.id)">Open PDF</button>
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
            first: '',
            last: '',
            pdf: [],
            page: 0
        }
    },
    beforeMount() {
        this.logged = localStorage.getItem('logged')
        firebaseApp.db.collection('pdf').orderBy('id').limit(12).get().then((pdfs) => {
            this.pdf = []
            pdfs.forEach((te) => {
                var pdf = {
                    id: te.id,
                    data: te.data()
                }
                this.pdf.push(pdf)
            })
            this.last = this.pdf[11].id
            this.first = this.pdf[0].id
        })
    },
    methods: {
        loadNext() {
            if(this.total/10 !== this.page) {
                firebaseApp.db.collection('pdf').orderBy('id').startAfter(this.last).limit(12).onSnapshot((pdfs) => {
                    this.pdf = []
                    pdfs.forEach((te) => {
                        var pdf = {
                            id: te.id,
                            data: te.data()
                        }
                        this.pdf.push(pdf)
                    })
                    this.page += 1

                    this.last = this.pdf[11].id
                    this.first = this.pdf[0].id
                })
            }
        },
        loadprev() {
            firebaseApp.db.collection('pdf').orderBy('id').endBefore(this.first).limit(12).onSnapshot((doc) => {
                this.pdf = []
                doc.forEach((te) => {
                    var pdf = {
                        id: te.id,
                        data: te.data()
                    }
                    this.pdf.push(pdf)
                })
                this.page -= 1

                this.last = this.pdf[11].id
                this.first = this.pdf[0].id
            })
        },
    }
}
</script>