<template>
    <div>
        <div class="columns" style="background-color:">
            <div class="column is-half">
                <div class="column is-9 is-offset-one-quarter">
                    <h1 class="is-size-2">Upload Note</h1>
                    <div class="is-divider"></div>
                    <div id="fuck1"></div><br><br>
                    <div>
                        <div class="file has-name">
                            <label class="file-label">
                                <input class="file-input" type="file" name="pdfnote" @change="pdfNotes = $event.target.files[0];uploadValue=0;">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Choose a file…
                                    </span>
                                </span>
                                <span v-if="pdfNotes !== null" class="file-name">
                                    {{pdfNotes.name}}
                                </span>
                            </label>
                            </div>
                            <br>
                            <input class="input" v-model="pdf.title" placeholder="Pdf name" type="text"><br><br>
                            <input class="input" v-model="pdf.subtitle" placeholder="Pdf description" type="text"><br><br>
                            <strong v-if="fillpdf">Please fill all fields</strong>
                            
                            <div style="margin: 10px;">
                                <div style="display: flex; justify-content: space-between">
                                    <big class="muted-text">Progress: {{uploadValuepdf.toFixed()+"%"}}</big>
                                    <small v-if="pdfNotes !== null" class="muted-text">{{ bytesToSize(pdfNotes.size )}}</small>
                                </div>
                                <progress class="progress is-success" :value="uploadValuepdf" max="100" ></progress>  
                            </div>
                            
                            <a v-if="pdfNotes == null" class="button is-rounded is-warning is-medium is-loading">Upload pdf</a>
                            <a v-else @click="onUploadpdf" class="button is-rounded is-warning is-medium">Upload pdf</a>
                    </div>
                </div> 
            </div>

            <div class="is-divider-vertical" data-content="OR"></div>

            <div class="column is-half">
                <div class="column is-9">
                    <h1 class="is-size-2">Upload Video</h1>
                    <div class="is-divider"></div>
                    <div id="fuck2"></div><br><br>
                    <div>
                        <div class="file has-name">
                            <label class="file-label">
                                <input class="file-input" type="file" name="pdfnote" @change="videoclass = $event.target.files[0];uploadValue=0;">
                                <span class="file-cta">
                                    <span class="file-icon">
                                        <i class="fas fa-upload"></i>
                                    </span>
                                    <span class="file-label">
                                        Choose a file…
                                    </span>
                                </span>
                                <span v-if="videoclass !== null" class="file-name">
                                    {{videoclass.name}}
                                </span>
                            </label>
                            </div>
                            <br>
                            <input class="input" v-model="video.title" placeholder="Video name" type="text"><br><br>
                            <input class="input" v-model="video.subtitle" placeholder="Vedio description" type="text"><br><br>
                            <strong v-if="fillvideo">Please fill all fields</strong>
                            <div style="margin: 10px;">
                                <div style="display: flex; justify-content: space-between">
                                    <big class="muted-text">Progress: {{uploadValuevideo.toFixed()+"%"}}</big>
                                    <small v-if="videoclass !== null" class="muted-text">{{ bytesToSize(videoclass.size )}}</small>
                                </div>
                                <progress class="progress is-success" :value="uploadValuevideo" max="100" ></progress>  
                            </div>
                            
                            <a v-if="videoclass == null" class="button is-rounded is-warning is-medium is-loading">Upload pdf</a>
                            <a v-else @click="onUploadvideo" class="button is-rounded is-warning is-medium">Upload pdf</a>
                    </div>
            </div> 



            </div>



        </div>

    </div>
</template>

<style scoped>
#fuck1 {
    background:url("../assets/svg/notes.svg");
    background-size:90%;
    background-repeat:no-repeat;
    height:320px;
    background-position:center
}
#fuck2 {
    background:url("../assets/svg/video.svg");
    background-size:contain;
    background-repeat:no-repeat;
    height:320px;
    background-position:center
}
</style>

<script>
// import firebase from 'firebase'
import firebaseApp from '../firebaseConfig'

export default {
    components:{
    },
    data: () => ({
      pdfNotes: null,
      pdf: {
          title: '',
          src: '',
          subtitle: '',
          tid: '',
          comments: []
      },
      video: {
          title: '',
          src: '',
          subtitle: '',
          tid: '',
          comments: []
      },
      videoclass: null,
      uploadValuepdf: 0,
      uploadValuevideo: 0,
      load: true,
      fillpdf: false,
      fillvideo: false
    }),
    methods:{
        bytesToSize(bytes) {
            var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return '0 Byte';
            var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        },

        onUploadpdf(){
            if(this.pdf.title !== '' && this.pdf.subtitle !== '') {
                this.fillpdf = false
                this.pdf.tid = localStorage.getItem('type') == 'admin' ? 'admin' : localStorage.getItem('tid')
                const storageRef=firebaseApp.storageBucket.ref(`pdfs/${this.pdfNotes.name}`).put(this.pdfNotes);
                storageRef.on(`state_changed`,snapshot => {
                    this.uploadValuepdf = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    }, 
                    error => {
                        console.log(error.message)
                    },
                    () => {
                        this.uploadValue=100;
                        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                            this.pdf.src = url;
                            firebaseApp.db.collection('pdf').doc().set(this.pdf)
                        });
                    }
                );
            }
            else {
                this.fillpdf = true
            }
        },
        onUploadvideo(){
            if(this.video.title !== '' && this.video.subtitle !== '') {
                this.fillvideo = false
                this.video.tid = localStorage.getItem('type') == 'admin' ? 'admin' : localStorage.getItem('tid')
                const storageRef=firebaseApp.storageBucket.ref(`videos/${this.videoclass.name}`).put(this.videoclass);
                storageRef.on(`state_changed`,snapshot => {
                    this.uploadValuepdf = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                    }, 
                    error => {
                        console.log(error.message)
                    },
                    () => {
                        this.uploadValue=100;
                        storageRef.snapshot.ref.getDownloadURL().then((url)=>{
                            this.video.src = url;
                            firebaseApp.db.collection('video').doc().set(this.video)
                        });
                    }
                );
            }
            else {
                this.fillvideo = true
            }
        }

    }
}
</script>
