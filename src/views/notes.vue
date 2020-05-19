<template>
    <div>
    <div style="text-align: left;padding: 2.5%">
        <h1 style="font-weight:600; font-size: 3vh; ">Notes<br>
        <small class="text-muted" style="font-size: 2vh">PDF notes downloadable</small>
    </h1>
    </div>
    <div class="columns is-multiline" v-for="notes in notes" :key="notes.id" style="padding:2.5%">
        <div class="column is-one-quarter">
            <div class="card">
                <div class="card-image">
                    <figure class="image is-4by3">
                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder image">
                    </figure>
                </div>
                <div class="card-content">
                    <div class="media">
                    <div class="media-content has-text-centered">
                        <p class="title is-4">{{notes.title}}</p>
                    </div>
                    </div>
                        
                    <div class="content has-text-grey-lighter" style="height:100px;overflow:hidden">
                    {{notes.desc}}
                    </div>
                    <div class="content">
                    <button class="button is-warning is-focused" @click="$router.push('/notes/1')">Open PDF</button>
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

export default {
    data() {
        return {
            logged: '',
            notes:[{title:"Notes - 1",desc:"Hersiliidae is a tropical and subtropical family of spiders first described by Tamerlan Thorell in 1870,[1] which are commonly known as tree trunk spiders. They have two prominent spinnerets that are almost as long as their abdomen, earning them another nickname, the 'two-tailed spiders'. They range in size from 10 to 18 mm (0.4 to 0.7 in) long. Rather than using a web that captures prey directly, they lay a light coating of threads over an area of tree bark and wait for an insect to stray onto the patch. When this happens, they encircle their spinnerets around their prey while casting silk on it. When the insect is immobilized, they can bite it through the shroud."}],
        }
    },
    beforeMount() {
        this.logged = localStorage.getItem('logged')
    }
}
</script>