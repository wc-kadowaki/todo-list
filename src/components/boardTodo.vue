<template>
  <div class="board-todo">
    <h2>TODOダッシュボード</h2>
    <!-- todoの追加 -->
    <div class="board-todo__add add-todo">
      <h3 class="board-todo__subtitle"></h3>
      <!-- タスクの内容 タイトル、期日、詳細・・・最初はタイトルのみでのちに追加 -->
      <div class="add-todo__editor">
        <EditTodo></EditTodo>
      </div>
    </div>
    <!-- todoのリスト -->
    <div class="board-todo__list">
      <div>ToDOリスト</div>
      <!-- todo自体もコンポーネントにした方が管理しやすい？ -->
      <div v-for="(todo, key) in todoList" :key="key">
        <div v-if="todo.done === false">
          <div>{{ todo.title }}</div>
          <!-- 編集でEditTodoを呼び出し保有しているデータを引き継ぎ編集する状態にする -->
          <button type="button">編集</button>
          <button type="button">完了</button>
          <button type="button">削除</button>
        </div>
      </div>
    </div>
    <!-- 完了したtodoのリスト -->
    <div class="board-todo__list board-todo__list--finish">
      <div>完了したToDo</div>
      <div v-for="(todo, key) in todoList" :key="key">
        <div v-if="todo.done === true">
          <div>{{ todo.title }}</div>
          <!-- 編集はリストと完了したリスト共通にする -->
          <button type="button">編集</button>
          <!-- 未完了でリストに追加 -->
          <button type="button">未完了</button>
          <button type="button">削除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditTodo from "./function/EditTodo.vue";

export default {
  name: "boardTodo",
  components: {
    EditTodo,
  },
  data() {
    return {
      todoList: [
        {
          title: "vue",
          done: false,
        },
        {
          title: "vuex",
          done: false,
        },
        {
          title: "javascript",
          done: true,
        },
      ],
    };
  },
  methods: {
    addTodo() {
      console.log("add todo");
    },
    openEditor() {
      console.log("open editor");
    },
    // ローカルストレージへのデータの登録と呼び出し
  },
  props: {
    todo: {
      title: {
        type: String,
        default: "",
        required: true,
      },
    },
  },
};
</script>