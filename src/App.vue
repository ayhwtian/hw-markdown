<template>
  <div id="app">
<!--    <img alt="Vue logo" src="./assets/logo.png">-->
<!--    <a-button type="primary">Button</a-button>-->
    <a-row>
        <a-col :span="4">
            <side-bar></side-bar>
        </a-col>
        <a-col :span="10">
            <main-edit></main-edit>
        </a-col>
        <a-col :span="8">
            <show-panel></show-panel>
        </a-col>
    </a-row>



  </div>
</template>

<script>
import { SideBar,MainEdit,ShowPanel} from './components/content'

export default {
  name: 'App',
  components: {
    SideBar,
    MainEdit,
    ShowPanel
  }
}
</script>

<style lang="less">

</style>
