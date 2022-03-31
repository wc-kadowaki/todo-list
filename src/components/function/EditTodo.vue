<template>
  <!-- タスクの追加と編集で使用するエディタ -->
  <div class="editor">
    <div v-if="todo.editor === 'edit'">
      <div>元のタイトル</div>
      <div>{{ todo.title }}</div>
    </div>
    <input type="text" v-model="todo.newTitle" />
    <button type="button" @click="sendTodo()">
      <span v-if="todo.editor === 'add'">追加</span>
      <span v-if="todo.editor === 'edit'">更新</span>
    </button>
    <button type="button" @click="reset()">キャンセル</button>
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
    reset() {
      // 入力をキャンセルしてタイトルを更新しない
      // キャンセルされたことを親に伝える
    },
    sendTodo() {
      // 入力したToDoを親に渡す
      // 編集が完了したことを親に伝える
      this.$emit("emitTitle", this.todo.newTitle);
      this.$emit("emitEvent", "complete");
    },
  },
};
</script>

<style lang="scss" scoped>
.editor {
  position: relative;
}
</style>