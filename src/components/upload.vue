<template>
    <div>
        <div class="columns">
            <div class="column is-half">
                <div class="column is-9 is-offset-one-quarter">
                    <h1 class="is-size-2">Upload Note</h1>
                    <div class="is-divider"></div>
                    <div style="background:url(./svg/notes.svg);background-size:90%;background-repeat:no-repeat;height:320px;background-position:center"></div><br><br>
                    <div>
                           
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
                    
                    </div>
            </div> 



            </div>



        </div>

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
