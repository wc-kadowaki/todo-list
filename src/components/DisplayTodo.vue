<template>
  <!-- 編集するときの要素 -->
  <div v-if="todo.editFlag">
    <EditTodo fn="edit" :title="todo.title" @emit-event="emitEvent" />
  </div>
  <!-- 基本表示の要素 -->
  <div v-else>
    <div>{{ todo.title }}</div>
    <!-- 編集でEditTodoを呼び出し保有しているデータを引き継ぎ編集する状態にする -->
    <button type="button" @click="openEditor(todo)">編集</button>
    <span v-if="todo.done">
      <button type="button" @click="doneChange(todo.id)">未完了</button>
    </span>
    <span v-else>
      <button type="button" @click="doneChange(todo.id)">完了</button>
    </span>
    <button type="button" @click="removeTodo(todo)">削除</button>
  </div>
  <button type="button" @click="increment()"></button>
</template>

<script>
import EditTodo from "./function/EditTodo.vue";

export default {
  name: "DisplayTodo",
  components: {
    EditTodo,
  },
  data() {
    return {
      // todo: {
      //   title: this.$props.title,
      //   done: this.$props.done,
      //   id: this.$props.id,
      // },
    };
  },
  computed: {
    todo() {
      return {
        title: this.$props.title,
        done: this.$props.done,
        id: this.$props.id,
      };
    },
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    done: {
      type: Boolean,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    doneChange(id) {
      this.$store.commit("doneChange", id);
    },
  },
};
</script>