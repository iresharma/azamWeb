<template>
    <div class="box" style="padding: 2.5%">
        <h1 style="font-weight:600; font-size: 3vh; text-align: left">Videos<br>
            <small class="text-muted" style="font-size: 2vh">Video lectures</small>
        </h1>
        <table class="table is-fullwidth is-hoverable">
            <tr>
                <th>Name</th>
                <th>{{ month[mon1] }}</th>
                <th>{{ month[mon] }}</th>
                <th>{{ month[mon2] }}</th>
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
        this.mon1 = this.mon - 1 == -1 ? 11 : this.mon - 1
        this.mon2 = this.mon + 1 == 12 ? 0 : this.mon + 1
    }
}
</script>