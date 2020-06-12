<template>
  <div id="app">
      <div><h2>侧边栏</h2></div>
      <textarea id="txt-area" v-model="content">{{content}}</textarea>
      <div v-html="notePreview">{{notePreview}}</div>
  </div>
</template>

<script>

  import marked from 'marked'

export default {
  name: 'App',
  data() {
    return {
      content: '这是一个笔记'
    }
  },
  computed: {
    notePreview() {
      return marked(this.content);
    }
  },
  watch: {
    content(val,oldVal) {
        console.log('new note:', val, 'old note:', oldVal)
      }
  },
  // immediate: true
}
</script>

<style lang="less">
    html,body {
        margin: 0;
        padding: 0;
        height: 100%;
    }
    #app {
        display: -webkit-flex; /*Safari*/
        display: flex;
        height: 100%;
    }

    #app>div:first-child {
        width: 15%;
    }

    #txt-area {
        width: 45%;
        height: 100%;
        background-color: #333333;
        color: #FFFFFF;
        font-size: 14px;
        resize: none;
    }

    #app>div:nth-child(3) {
        width: 40%;
    }
</style>
