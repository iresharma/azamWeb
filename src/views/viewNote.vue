<template>
    <div>
    <div style="text-align: left;padding: 2.5%">
            <h1 style="font-weight:600; font-size: 5vh; ">{{ pdf.title }}<br>
            <small class="text-muted" style="font-size: 2vh">{{ pdf.subtitle }}</small>
        </h1>
        </div>
    <iframeViewer name="note1" :link="pdf.src" style="width:70vw;height:80vh"/>
    <commentSection :comments="pdf.comments" :pdf="pdf.id" :video="''"/>
    
    </div>
</template>

<style scoped>

</style>

<script>
import iframeViewer from '@/components/iframeViewer.vue'
import commentSection from '@/components/commentSection.vue'
import firebaseApp from '../firebaseConfig'

export default {
    components: {
        iframeViewer,
        commentSection
    },
    data() {
        return {
            logged: '',
            nid:'',
            pdf: {}
        }
    },
    beforeMount() {
        this.logged = localStorage.getItem('logged')
        this.nid = this.$route.params.id
        console.log(this.nid)
        firebaseApp.db.collection('pdf').doc(this.nid).get().then((pdf) => {
            console.log(pdf.data)
            this.pdf = pdf.data()
        })
    }
}
</script>