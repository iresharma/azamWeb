<template>
    <nav style="z-index: 4; position: sticky; top: 0px" class="navbar navbar-light navbar-expand-md navigation-clean-button">
        <div class="container">
        <span style="font-size: 30px;border-bottom: 2px dashed red">Azam Anzari</span>
        <button data-toggle="collapse" class="navbar-toggler"><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse"
                id="navcol-1">
                <ul class="nav navbar-nav mr-auto">
                    <li class="nav-item" role="presentation"><router-link class="aim nav-link" :to="'/'">Home</router-link></li>
                    <li class="nav-item" role="presentation"><router-link class="aim nav-link" :to="'/notes'">Notes</router-link></li>
                    <li class="nav-item" role="presentation"><router-link class="aim nav-link" :to="'/videos'">Videos</router-link></li>
                    <li class="nav-item" v-if="type == 'student'" role="presentation"><router-link class="aim nav-link" :to="'/class'">Live Class</router-link></li>
                    <li v-if="type == 'teacher' || type == 'admin'" class="nav-item" role="presentation"><a class="aim nav-link" @click="$router.push('/panel')">Teacher Panel</a></li>
                </ul>
                <span class="navbar-text actions"> {{ username }} 
                    <img :src="photo == '' || photo == 'undefined' || photo === undefined ? emer : photo" @click="drop = !drop" style="height: 5vh; width: 5vh; border-radius: 100%">
                    <div class="dropdown-menu" v-if="drop">
                        <a @click="addBatch()" class="dropdown-item aim">Join batch</a>
                        <a class="dropdown-item aim" @click="logout">Logout</a>
                    </div>
                </span>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.dropdown-menu {
    display: block;
    position: absolute;
    min-width: 3vw;
    left: 80vw;
    top: 5.8vw;
}
.aim {
    cursor: pointer;
}
.icon-feature{text-align:center}.icon-feature .glyphicon{font-size:60px}section.features{background-color:#369;padding:40px 0;color:#fff}.features h2{color:#fff}.features .icon-features{margin-top:15px}.cd-words-wrapper{display:inline-block;position:relative;text-align:left;font-size:70px}.cd-words-wrapper b{display:inline-block;position:absolute;white-space:nowrap;left:0;top:0}.blc{font-size:70px}.cd-words-wrapper b.is-visible{position:relative}.cd-headline.clip span{display:inline-block;padding:.2em 0}.cd-headline.clip .cd-words-wrapper{overflow:hidden;vertical-align:top}.cd-headline.clip b{opacity:0}.cd-headline b.is-visible{opacity:1;font-weight:900}.highlight-clean{color:#313437;background-color:#fff;padding:50px 0}.highlight-clean p{color:#7d8285}.highlight-clean h2{font-weight:700;margin-bottom:25px;line-height:1.5;padding-top:0;margin-top:0;color:inherit}.highlight-clean .intro{font-size:16px;max-width:500px;margin:0 auto 25px}.highlight-clean .buttons{text-align:center}.highlight-clean .buttons .btn{padding:16px 32px;margin:6px;border:none;background:#ddd;box-shadow:none;text-shadow:none;opacity:.9;text-transform:uppercase;font-weight:700;font-size:13px;letter-spacing:.4px;line-height:1;outline:0}.highlight-clean .buttons .btn:hover{opacity:1}.highlight-clean .buttons .btn:active{transform:translateY(1px)}.highlight-clean .buttons .btn-primary{background-color:#055ada;color:#fff}.navigation-clean-button{background:#fff;padding-top:.75rem;padding-bottom:.75rem;color:#333;border-radius:0;box-shadow:none;border:none;margin-bottom:0}@media (min-width:768px){.navigation-clean-button{padding-top:1rem;padding-bottom:1rem}}.navigation-clean-button .navbar-brand{font-weight:700;color:inherit}.navigation-clean-button .navbar-brand:hover{color:#222}.navigation-clean-button.navbar-dark .navbar-brand:hover{color:#f0f0f0}.navigation-clean-button .navbar-brand img{height:100%;display:inline-block;margin-right:10px;width:auto}.navigation-clean-button .navbar-toggler{border-color:#ddd;color:#888}.navigation-clean-button .navbar-toggler:focus,.navigation-clean-button .navbar-toggler:hover{background:0 0}.navigation-clean-button.navbar-dark .navbar-toggler{border-color:#555;color:#eee}.navigation-clean-button .form-inline,.navigation-clean-button .navbar-collapse{border-top-color:#ddd}.navigation-clean-button.navbar-dark .form-inline,.navigation-clean-button.navbar-dark .navbar-collapse{border-top-color:#333}.navigation-clean-button .navbar-nav a.active,.navigation-clean-button .navbar-nav>.show>a{background:0 0;box-shadow:none}.navigation-clean-button.navbar-light .navbar-nav a.active,.navigation-clean-button.navbar-light .navbar-nav a.active:focus,.navigation-clean-button.navbar-light .navbar-nav a.active:hover{color:#8f8f8f;box-shadow:none;background:0 0;pointer-events:none}.navigation-clean-button.navbar .navbar-nav .nav-link{padding-left:18px;padding-right:18px}.navigation-clean-button.navbar-light .navbar-nav .nav-link{color:#465765}.navigation-clean-button.navbar-light .navbar-nav .nav-link:focus,.navigation-clean-button.navbar-light .navbar-nav .nav-link:hover{color:#37434d!important;background-color:transparent}.navigation-clean-button .navbar-nav>li>.dropdown-menu{margin-top:-5px;box-shadow:0 4px 8px rgba(0,0,0,.1);background-color:#fff;border-radius:2px}.navigation-clean-button .dropdown-menu .dropdown-item,.navigation-clean-button .dropdown-menu .dropdown-item:focus{line-height:2;font-size:14px;color:#37434d}.navigation-clean-button .dropdown-menu .dropdown-item:focus,.navigation-clean-button .dropdown-menu .dropdown-item:hover{background:#eee;color:inherit}@media (max-width:767px){.navigation-clean-button .navbar-nav .show .dropdown-menu{box-shadow:none}.navigation-clean-button .navbar-nav .show .dropdown-menu .dropdown-item{color:#37434d;padding-top:12px;padding-bottom:12px;line-height:1}}.navigation-clean-button.navbar-dark{background-color:#1f2021;color:#fff}.navigation-clean-button.navbar-dark .navbar-nav a.active,.navigation-clean-button.navbar-dark .navbar-nav a.active:focus,.navigation-clean-button.navbar-dark .navbar-nav a.active:hover{color:#8f8f8f;box-shadow:none;background:0 0;pointer-events:none}.navigation-clean-button.navbar-dark .navbar-nav .nav-link{color:#dfe8ee}.navigation-clean-button.navbar-dark .navbar-nav .nav-link:focus,.navigation-clean-button.navbar-dark .navbar-nav .nav-link:hover{color:#fff!important;background-color:transparent}.navigation-clean-button.navbar-dark .navbar-nav>li>.dropdown-menu{background-color:#1f2021}.navigation-clean-button.navbar-dark .dropdown-menu .dropdown-item,.navigation-clean-button.navbar-dark .dropdown-menu .dropdown-item:focus{color:#f2f5f8}.navigation-clean-button.navbar-dark .dropdown-menu .dropdown-item:focus,.navigation-clean-button.navbar-dark .dropdown-menu .dropdown-item:hover{background:#363739}@media (max-width:767px){.navigation-clean-button.navbar-dark .navbar-nav .show .dropdown-menu .dropdown-item{color:#fff}.navigation-clean-search .form-inline .search-field{display:inline-block;width:80%}}.navigation-clean-button .actions .login{margin-right:1rem;text-decoration:none;color:#465765}.navigation-clean-button.navbar-dark .actions .login{color:#dfe8ee}.navigation-clean-button.navbar-dark .actions .login:hover{color:#fff}.navigation-clean-button .navbar-text .action-button,.navigation-clean-button .navbar-text .action-button:active,.navigation-clean-button .navbar-text .action-button:hover{background:#56c6c6;border-radius:20px;color:#fff;box-shadow:none;border:none;text-shadow:none;padding:.5rem 1rem;transition:background-color .25s;font-size:inherit}.navigation-clean-button .navbar-text .action-button:hover{background:#66d7d7}.navigation-clean-button.navbar-dark .action-button,.navigation-clean-button.navbar-dark .action-button:active{background:#208f8f}.navigation-clean-button.navbar-dark .action-button:hover{background:#269d9d}[type=button]:not(:disabled),[type=reset]:not(:disabled),[type=submit]:not(:disabled),button:not(:disabled){background-color:#55c6c6}.caption.v-middle.text-center{position:relative;top:40%;color:#000;font-size:3vw}.navigation-clean-search{background:#fff;padding-top:.75rem;padding-bottom:.75rem;color:#333;border-radius:0;box-shadow:none;border:none;margin-bottom:0}@media (min-width:768px){.navigation-clean-search{padding-top:1rem;padding-bottom:1rem}}.navigation-clean-search .navbar-brand{font-weight:700;color:inherit}.navigation-clean-search .navbar-brand:hover{color:#222}.navigation-clean-search .navbar-toggler{border-color:#ddd;color:#888}.navigation-clean-search .navbar-toggler:focus,.navigation-clean-search .navbar-toggler:hover{background:0 0}.navigation-clean-search .form-inline,.navigation-clean-search .navbar-collapse{border-top-color:#ddd}.navigation-clean-search .navbar-nav a.active,.navigation-clean-search .navbar-nav>.show>a{background:0 0;box-shadow:none}.navigation-clean-search.navbar-light .navbar-nav a.active,.navigation-clean-search.navbar-light .navbar-nav a.active:focus,.navigation-clean-search.navbar-light .navbar-nav a.active:hover{color:#8f8f8f;box-shadow:none;background:0 0;pointer-events:none}.navigation-clean-search.navbar .navbar-nav .nav-link{padding-left:18px;padding-right:18px}.navigation-clean-search.navbar-light .navbar-nav .nav-link{color:#465765}.navigation-clean-search.navbar-light .navbar-nav .nav-link:focus,.navigation-clean-search.navbar-light .navbar-nav .nav-link:hover{color:#37434d!important;background-color:transparent}.navigation-clean-button .action-button:active,.navigation-clean-search .action-button{background:#56c6c6;border-radius:20px;font-size:inherit;color:#fff!important;box-shadow:none;border:none;text-shadow:none;padding:8px 20px;transition:background-color .25s}.navigation-clean-search .action-button:focus,.navigation-clean-search .action-button:hover{background:#66d7d7}.navigation-clean-search .form-inline label{color:#ccc}.navigation-clean-search .form-inline .search-field{background:0 0;border:none;border-bottom:1px solid transparent;border-radius:0;box-shadow:none;color:inherit;transition:border-bottom-color .3s}.navigation-clean-search .form-inline .search-field:focus{border-bottom:1px solid #ccc}
</style>

<script>
export default {
    data() {
        return {
            username: '',
            type: '',
            photo: '',
            drop: false,
            emer: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&accessoriesType=Prescription02&hairColor=Black&facialHairType=BeardLight&facialHairColor=Black&clotheType=BlazerSweater&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light"
        }
    },
    beforeMount() {
        this.type = localStorage.getItem('type');
    },
    created() {
        this.photo = localStorage.getItem('photoUrl') == undefined ? this.emer : localStorage.getItem('photoUrl');
        this.username = localStorage.getItem('name')
        console.log(this.photo)
    },
    methods: {
        logout() {
            localStorage.setItem('name', undefined)
            localStorage.setItem('photoUrl', undefined)
            localStorage.setItem('logged', false)
            this.$router.go('/')
        },
        addBatch() {
            var id = prompt('Batch join token')
            console.log(id)
        }
    }
}
</script>