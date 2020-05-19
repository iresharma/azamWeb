<template>
    <div>
        <div style="text-align: left;padding: 2.5%">
            <h1 style="font-weight:600; font-size: 5vh; ">{{ video.title }}<br>
            <small class="text-muted" style="font-size: 2vh">{{ video.subtitle }}</small>
        </h1>
        </div>
        <iframeViewer name="vid1" :link="video.src" style="width:80vw;height: 80vh"/>
        <div>
            <commentSection :comments="video.comments" />
        </div>
    
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
            vid:'',
            video: {
                src: 'https://www.youtube.com/embed/zT0GudaEois',
                title: 'Video 1',
                subtitle: 'Video about programming',
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
        this.vid = this.$route.params.id

    }
}
</script>






