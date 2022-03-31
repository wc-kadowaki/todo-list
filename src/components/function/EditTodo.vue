<template>
  <!-- タスクの追加と編集で使用するエディタ -->
  <div class="editor">
    <div v-if="todo.editor === 'edit'">
      <div>元のタイトル</div>
      <div>{{ todo.title }}</div>
    </div>
    <input type="text" v-model="todo.newTitle" />
    <div v-if="todo.editor === 'add'">
      <button type="button" @click="sendTodo('add')">追加</button>
    </div>
    <div v-if="todo.editor === 'edit'">
      <button type="button" @click="sendTodo('update')">更新</button>
    </div>
    <button type="button" @click="sendTodo('cancel')">キャンセル</button>
  </div>
</template>

<script>
export default {
  name: "editTodo",
  data() {
    return {
      todo: {
        title: this.$props.title,
        newTitle: "",
        editor: this.$props.fn,
      },
    };
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    fn: {
      type: String,
      required: true,
      default: "add",
    },
  },
  methods: {
    sendTodo(fn) {
      // 入力したToDoを親に渡す
      // 編集が完了したことを親に伝える＆追加or更新orキャンセル
      if (this.todo.newTitle === "" && fn !== "cancel") {
        alert("入力してください");
      } else {
        this.$emit("emitEvent", fn, this.todo.newTitle);
        this.todo.newTitle = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
}
</style>