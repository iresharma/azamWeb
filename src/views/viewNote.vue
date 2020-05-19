<template>
    <div>
    <div style="text-align: left;padding: 2.5%">
            <h1 style="font-weight:600; font-size: 5vh; ">{{ pdf.title }}<br>
            <small class="text-muted" style="font-size: 2vh">{{ pdf.subtitle }}</small>
        </h1>
        </div>
    <iframeViewer name="note1" :link="pdf.src" style="width:70vw;height:80vh"/>
    <commentSection :comments="pdf.comments" />
    
    </div>
</template>

<style scoped>

</style>

<script>
import iframeViewer from '@/components/iframeViewer.vue'
import commentSection from '@/components/commentSection.vue'

export default {
    components: {
        iframeViewer,
        commentSection
    },
    data() {
        return {
            logged: '',
            nid:'',
            pdf: {
                src: './../pdf/surfaces.pdf',
                title: 'Pdf 1',
                subtitle: 'Pdf about programming',
                comments: [
                    {
                        name: 'Iresh Sharma',
                        info: 'Hi this is my comment',
                        created_at: '00:00:00',
                        photoUrl: 'https://lh3.googleusercontent.com/a-/AOh14Giy9wcm08RzKyvi2eZOP8qRH9j3-EIvZKUNCc2xKw',
                        replies: [
                            {
                                name: 'Iresh Sharma',
                                info: 'Hi this is my comment',
                                created_at: '00:00:00',
                                photoUrl: 'https://lh3.googleusercontent.com/a-/AOh14Giy9wcm08RzKyvi2eZOP8qRH9j3-EIvZKUNCc2xKw',

                            },
                            {
                                name: 'Azam Ansari',
                                info: 'Hi this is my comment',
                                created_at: '00:00:00',
                                photoUrl: 'https://lh3.googleusercontent.com/a-/AOh14Giy9wcm08RzKyvi2eZOP8qRH9j3-EIvZKUNCc2xKw',

                            }
                        ]
                    }
                ]
            }
        }
    },
    beforeMount() {
        this.logged = localStorage.getItem('logged')
        this.nid = this.$route.params.id

    }
}
</script>