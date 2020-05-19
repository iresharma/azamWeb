<template>
    <div>
        <!-- <div class="columns">
            <div class="column is-half">
                <div class="column is-9 is-offset-one-quarter">
                    <h1 class="is-size-2">Upload Note</h1>
                    <div class="is-divider"></div>
                    <div style="background:url(./svg/notes.svg);background-size:90%;background-repeat:no-repeat;height:320px;background-position:center"></div><br><br>
                    <div>
                    <v-file-input
                            v-model="note.file"
                            color="deep-purple accent-4"
                            counter
                            label="File input"
                            placeholder="Select your files"
                            prepend-icon="mdi-paperclip"
                            solo
                            :show-size="1000"
                            multiple
                        >
                            <template v-slot:selection="{ index, text }">
                            <v-chip
                                v-if="index < 2"
                                color="deep-purple accent-4"
                                dark
                                label
                                small
                            >
                                {{ text }}
                            </v-chip>

                            <span
                                v-else-if="index === 2"
                                class="overline grey--text text--darken-3 mx-2"
                            >
                                +{{ files.length - 2 }} File(s)
                            </span>
                            </template>
                        </v-file-input>
                        <v-text-field
                            label="Name"
                            v-model="note.name"
                            solo
                        ></v-text-field>
                        <v-textarea
                        solo
                        v-model="note.desc"
                        name="input-7-4"
                        label="Description"
                        ></v-textarea>
                        <div class="my-2">
                            <a @click="uploadNote" class="button is-rounded is-warning is-medium">Upload notes</a>
                        </div>
                    </div>
                </div> 
            </div>

            <div class="is-divider-vertical" data-content="OR"></div>

            <div class="column is-half">
                <div class="column is-9">
                    <h1 class="is-size-2">Upload Video</h1>
                    <div class="is-divider"></div>
                    <div style="background:url(./svg/video.svg);background-size:contain;background-repeat:no-repeat;height:320px;background-position:center"></div><br><br>
                    <div>
                    <v-file-input
                            v-model="video.file"
                            color="deep-purple accent-4"
                            counter
                            label="File input"
                            multiple
                            placeholder="Select your files"
                            prepend-icon="mdi-paperclip"
                            solo
                            :show-size="1000"
                        >
                            <template v-slot:selection="{ index, text }">
                            <v-chip
                                v-if="index < 2"
                                color="deep-purple accent-4"
                                dark
                                label
                                small
                            >
                                {{ text }}
                            </v-chip>

                            <span
                                v-else-if="index === 2"
                                class="overline grey--text text--darken-3 mx-2"
                            >
                                +{{ files.length - 2 }} File(s)
                            </span>
                            </template>
                        </v-file-input>
                        <v-text-field
                            label="Name"
                            solo
                            v-model="video.name"
                        ></v-text-field>
                        <v-textarea
                        solo
                        v-model="video.desc"
                        name="input-7-4"
                        label="Description"
                        ></v-textarea>
                        <div class="my-2">
                            <a @click="uploadVideo" class="button is-rounded is-warning is-medium">Upload videos</a>
                        </div>
                    </div>
            </div> 



            </div>



        </div> -->

    </div>
</template>

<script>

export default {
    components:{
    },
    data: () => ({
      note:[{file:"",name:"",desc:""}],
      video:[{file:"",name:"",desc:""}],
    }),
    methods:{
        uploadNote:function(){
            console.log(this.note)
        },
        uploadVideo:function(){
            console.log(this.video)
        }
    }
}
</script>
