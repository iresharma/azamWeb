<template>
    <div>
        <div
        style="background-image: url(&quot;./svg/404svg.svg&quot;);background-repeat: no-repeat;background-position: center;backgroud-size: 50%;width: 100vw; height: 90vh"></div>
    </div>
</template>

<style scoped>

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