<template>
    <div>
        <div
        id="fuck"></div>
    </div>
</template>

<style scoped>
#fuck {
    background-image: url("../assets/svg/404svg.svg");
    background-repeat: no-repeat;
    background-position: center;
    backgroud-size: 50%;
    width: 100vw; 
    height: 90vh
}
</style>

<script>


export default {
    data() {
        return {
            logged: ''
        }
    },
    beforeMount() {
        this.logged = localStorage.getItem('looged')
    }
}
</script>