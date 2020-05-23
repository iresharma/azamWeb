<template>
  <div id="app" style="overflow-x: hidden">
    <navbarlog v-if="logged == 'true'" live="nav-link aim active" home="aim nav-link" video="nav-link aim" notes="nav-link aim" />
    <navbar v-else home="aim nav-link" live="nav-link aim active" video="nav-link aim" notes=" nav-link aim" />
    <router-view/>
    <footer class="text-right">
          <div class="credits">
            <span>©️</span>
            <span class="current-year">(2020)</span> Made with 
                <i style="color: red" class="fa fa-heart heart"
              alt="love">
                </i> 
                by 
                <a href="http://iresharma.me" target="_blank"> Iresharma
                </a>
          </div>
</footer>
  </div>
</template>

<style lang="scss">
@import 'bulma';
@import 'bulma-divider';
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

footer {
  position: static;
  width: 100vw;
  bottom: 0;
  text-align: right;
  padding-right: 10px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>


<script>
import navbar from './components/nav.vue'
import navbarlog from './components/navlog.vue'

export default {
  components: {
    navbar,
    navbarlog
  },
  data() {
    return {
      logged: ''
    }
  },
  beforeMount() {
    this.logged = localStorage.getItem('logged')
  }
}
</script>