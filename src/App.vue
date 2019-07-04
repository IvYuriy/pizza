<template>
  <div id="app">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Material+Icons" rel="stylesheet">
    <Header/>
    <div class="container">
        <header
            is="AppHeader"
            :tabs="tabs"
            @change-tab="changeTab"
        ></header>

        <div class="row">
            <div class="col-sm-1"></div>

            <keep-alive>
                <component
                    :is="currentTab"
                    class="col-sm-10"
                ></component>
            </keep-alive>

            <div class="col-sm-1"></div>
        </div>

        <footer is="AppFooter"></footer>
    </div>
  </div>
</template>


<script>
import Header from './components/Header.vue'
import Brands from './Brands.vue'
import eventBus from '../src/eventBus.js'

export default {
  name: 'app',
  components: {
    Header,
    Brands,
  },
    data () {
        return {
            currentTab: 'Products',
            tabs: [ {
                component: 'Brands',
                title: 'Бренды'
            }]
        }
    },
    methods: {
        changeTab (tab) {
            this.currentTab = tab.component;
        }
    }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
}
</style>
