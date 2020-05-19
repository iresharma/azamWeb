<template>
        <iframe :src=link width="100%" height="100%" ></iframe>
</template>

<script>
export default {
    name:'iframeViewer',
    props:{
        name: {
            type: String,
            required: true,
        },
        link:{
            type: String,
            required: true,
        }
        
    },
    // computed: {
    //     link() {
    //     return `link/${encodeURIComponent(this.name)}.pdf`;
    //     }
    // }
    
}
</script>