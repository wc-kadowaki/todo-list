<template>
  <!-- タスクの追加と編集で使用するエディタ -->
  <div class="editor">
    <input type="text" v-model="title" />
    <button type="button">{{ buttonText }}</button>
  </div>
</template>

<script>
export default {
  name: "editTodo",
  data() {
    return {
      todo: {
        title: "",
      },
      buttonText: '追加' // or 更新
    };
  },
  methods: {
    reset() {
      this.title = "";
    },
    addTodo() {
      // 入力したToDoを
    },
  },
};
</script>