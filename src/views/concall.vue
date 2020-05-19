<template>
    <div style="overflow-x: hidedn">
        <div id="jitsi-container"></div>
        <div>
            <div v-if="!ready" class="columns is-vcentered">
                <div class="column is-6" style="height: 70vh; background-image: url(&quot;./svg/callJoin.svg&quot;); background-size: contain"></div>
                <div class="column is-5 is-hcentered" style="justify-content: center; align-items: center;background-image: url(&quot;./svg/plant-3.svg&quot;); background-position: bottom right">
                    <div style="margin-top: 50px; width: 100%; padding: 40px">
                        <div class="login-box-header">
                            <h4 style="color:rgb(139,139,139);margin-bottom:0px;font-weight:800;font-size:37px;">Join Class</h4>
                        </div>
                        <div class="email-login" style="background-color: transparent;">
                            <input type="text" class="email-imput form-control" style="margin-top:10px; background: white;" required="true" disabled :value="user" minlength="6">
                            <input type="text" class="password-input form-control" style="margin-top:10px;" required="true" placeholder="Room name" v-model="room" @keypress.prevent.enter="ready = true;openRoom()" minlength="6"></div>
                        <div class="submit-row" style="margin-bottom:8px; margin-top: 20px; padding-top:0px;"><button class="button is-rounded is-large" style="background-color: #ffdd57;color: black" @click="ready = true;openRoom()" id="submit-id-submit" >Join</button>
                        <br>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="ended" class="columns">
                <div class="column">
                    <h1 style="text-algin: center">
                        The class was ended;<br>
                        Thank you for joining
                    </h1>
                </div>
                <div class="column whyy" style="height: 70vh;backgroud-image: url(&quot;./svg/end.svg&quot;); background-size: contain;"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
#jitsi-container {
    z-index: 10;
}
</style>

<script src='https://meet.jit.si/external_api.js'></script>


<script>

export default {
    data()
	{
        return {
            ready: false,
            logged: '',
            user: '',
            room: '',
            ended: false
        }
    },
    beforeMount() {
        this.logged = localStorage.getItem('logged')
        this.user = localStorage.getItem('name')
    },
    methods:{
   startConference() {
        var _this=this
        try {
        const domain = 'meet.jit.si';
        const options = {
            audioInput: '<deviceLabel>',
                audioOutput: '<deviceLabel>',
                videoInput: '<deviceLabel>',
            roomName: this.room,
            height: document.documentElement.clientHeight - 100,
            parentNode: this.$el.querySelector('#jitsi-container'),
            interfaceConfigOverwrite: {
            filmStripOnly: false,
            SHOW_JITSI_WATERMARK: false,
            },
            configOverwrite: {
                disableSimulcast: false,
            },
        };

        this.api = new JitsiMeetExternalAPI(domain, options);
        this.api.addEventListener('videoConferenceJoined', () => {
        console.log('Local User Joined');
   
        _this.api.executeCommand('displayName', _this.username);
        });
        this.api.addEventListener('videoConferenceLeft', () => {
            _this.$el.querySelector('#jitsi-container').style.display = 'none';
            _this.ended = true;
        })
    } catch (error) {
    console.error('Failed to load Jitsi API', error);
    }
 },
 openRoom(){
 // verify the JitsiMeetExternalAPI constructor is added to the global..
    
    for(var i = 0; i< 400; i++) {
        if(this.ready) {
            if (window.JitsiMeetExternalAPI) {
                this.startConference();
            }
            else alert('Jitsi Meet API script not loaded');
            }
            break;
        }
    }
 },
}	

</script>