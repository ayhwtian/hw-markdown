<template>
  <div id="app">
    <div class="content">
      <div class="side-bar">
        <div class="new-btn"><button @click="newNote" :title="showBtnTitle">新建笔记</button></div>
        <div class="list"
             v-for="note in notes"
             @click="selectNote(note)" :class="{selected:note === selectedNote}"><div class="font">{{note.title}}</div></div>
      </div>
      <div class="edit-panel">
        <div class="edit-bar">
          <input type="text"
                 value="无标题笔记"
                 onfocus="if(value == '无标题笔记' ){value=''}"
                 onblur="if(value == '' ){value='无标题笔记'}"
                 ref="title" :disabled ='isShow'
                 @input="updateTitle">
          <button class="del-btn" @click="removeNote">删除选中笔记</button>
          <button class="delall-btn" @click="removeAllNote">清空笔记</button>
        </div>
        <div class="txt-edit">
          <div class="leftBox" ref="leftBox"><div class="lefNum"><div v-for="i in linesCount">{{i}}</div></div></div>
          <textarea id="txt-area"
                       v-model="content" :disabled ='isShow'
                       @input="updateContent" ref="txtarea"></textarea>
        </div>
      </div>
      <div class="show-panel" v-html="notePreview">{{notePreview}}</div>
    </div>
  </div>
</template>

<script>

  import marked from 'marked'

  export default {
    name: 'App',
    data() {
      return {
        content: '',
        notes: JSON.parse(localStorage.getItem('notes')) || [],
        selectedID: localStorage.getItem('selected-id') || null,
        title: '无标题笔记',
        isShow: true,
      }
    },
    mounted() {
      //监听滚动
      this.$refs.txtarea.addEventListener('scroll',this.handleScroll)

      if (this.selectedNote) {
        this.content = this.selectedNote.content;
        this.isShow = false;
      }

      if(localStorage.getItem('selected-id') == 'null'){
        this.selectedID = null
      }
    },
    computed: {
      notePreview() {
        // Markdown转换为HTML展示内容     
        return this.selectedNote ? marked(this.selectedNote.content) : marked(this.content)
      },
      //显示保存了多少笔记
      showBtnTitle() {
        return this.notes.length + '条笔记已保存'
      },
      //
      //选中的笔记，用于修改内容或者标题
      selectedNote() {
      //  返回与选择ID一样的笔记内容
        return this.notes.find(note => note.id === this.selectedID)
      },
      //计算行数
      linesCount() {
          // 计算换行符的个数
          // return this.selectedNote.content.split(/\r\n|\r|\n/).length
          return this.content.split(/\r\n|\r|\n/).length
      },
    },
    watch: {
      notes: {
        handler:'saveNotes',
        deep: true,
      },
      //保存客户当前选中项
      selectedID() {
        localStorage.setItem('selected-id', this.selectedID)
      },
    },
    methods: {
      //滚动方法
      handleScroll() {
        let s = this.$refs.txtarea.scrollTop
        this.$refs.leftBox.scrollTop = this.$refs.txtarea.scrollTop
        console.log(s);
        console.log('111');
      },
      //保存笔记列表
      saveNotes() {
        localStorage.setItem('notes', JSON.stringify(this.notes))
        // console.log('笔记已保存' + new Date);
      },
      //新建笔记：如果当前有笔记的话，保存当前笔记，清空标题和内容
      newNote() {
        //  新笔记默认值
        const note = {
                id: String(Date.now()),
                title: '无标题笔记',
                content:'',
                created: Date.now(),
        }

        // 添加到列表中
        this.notes.push(note)

        this.selectedID = note.id
        this.$refs.title.value = '无标题笔记'
        this.content = ''
        this.notes.sort((a, b) => b.created - a.created)
        this.isShow = false
      },

      //选中了那条笔记的ID，用此ID来选择笔记内容
      selectNote(note) {
        // console.log(this.selectedID)
        let seltitle = []
        return seltitle =[this.content = note.content,this.$refs.title.value = note.title ,this.selectedID = note.id]
      },
      //修改title
      updateTitle() {
        if(this.selectedID !== null) {
        return this.selectedNote.title = this.$refs.title.value
        }
      },
      //  修改内容
      updateContent() {
        if(this.selectedID !== null) {
          return this.selectedNote.content = this.content
        }
      },
      //删除笔记
      removeNote() {
        if (this.selectedNote && confirm('删除后不可恢复，确定要删除当前笔记吗')) {
          // 将选中的笔记从笔记列表中移除
          const index = this.notes.indexOf(this.selectedNote)
          if (index !== -1) {
            this.notes.splice(index, 1)
          }
          this.$refs.title.value = this.title
          this.content = ''
          this.selectedID = null
          this.isShow = true
        }
        else {
          confirm('您还未选中任何笔记！')
        }
      },
      //清空笔记
      removeAllNote() {
        if (confirm('笔记清空后不可恢复，确定要清空吗？')) {
          // 将选中的笔记从笔记列表中移除
          this.notes.splice(0, this.notes.length)
          this.$refs.title.value = this.title
          this.content = ''
          this.selectedID = null
          this.isShow = true
        }
      },

    },

  }

</script>

<style lang="less">
 @import "assets/css/babel.css";
</style>
