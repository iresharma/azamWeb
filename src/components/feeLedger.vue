<template>
    <div class="box" style="padding: 2.5%">
        <h1 style="font-weight:600; font-size: 3vh; text-align: left">Videos<br>
            <small class="text-muted" style="font-size: 2vh">Video lectures</small>
        </h1>
        <table class="table is-fullwidth is-hoverable">
            <tr>
                <th>Name</th>
                <th>{{ month[0] }}</th>
                <th>{{ month[0] }}</th>
                <th>{{ month[0] }}</th>
            </tr>
        </table>
    </div>
</template>

<style scoped>

</style>

<script>
export default {
    data() {
        return {
            month: ['January', 'Febuary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'Octuber', 'November', 'December'],
            mon: 0,
            mon1: 0,
            mon2: 0,
        }
    },
    beforeMount() {
        this.mon = new Date().getMonth()

    }
}
</script>