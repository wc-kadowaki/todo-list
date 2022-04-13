<template>
  <div class="todo">
    <!-- 編集するときの要素 -->
    <div v-if="todo.editFlag">
      <EditTodo fn="edit" :title="todo.title" @emit-event="emitEvent" :user="todo.user" />
    </div>
    <!-- 基本表示の要素 -->
    <div class="todo__default" v-else>
      <div class="todo__title">{{ todo.title }}</div>
      <div v-if="todo.details" class="todo__details">{{ todo.details }}</div>
      <div v-if="todo.date" class="todo__date">
        <div>期日：{{ todo.date }}</div>
      </div>
      <div v-if="todo.done" class="todo__done-date">
        <dir>完了した日付：{{ todo.doneDate }}</dir>
      </div>
      <div v-if="todo.time" class="todo__time">
        <dir>時間：{{ todo.time }}</dir>
      </div>
      <div v-if="todo.done" class="todo__done-time">
        <dir>完了した時間：{{ todo.doneTime }}</dir>
      </div>
      <div v-if="todo.user" class="todo__user">
        <div>担当者：{{ todo.user }}</div>
      </div>
      <div class="todo__buttons">
        <!-- 編集でEditTodoを呼び出し保有しているデータを引き継ぎ編集する状態にする -->
        <button class="todo__button" type="button" @click="openEditor(todo.id)">編集</button>
        <!-- 完了、未完了でテキストを出し換えている -->
        <button class="todo__button" type="button" @click="doneChange(todo.id)">
          <span v-if="todo.done"> 未完了 </span>
          <span v-else> 完了 </span>
        </button>
        <!-- タスクの削除 -->
        <button class="todo__button" type="button" @click="removeTodo(todo.id)">削除</button>
      </div>
    </div>
  </div>
</template>

<script>
import EditTodo from './function/EditTodo.vue';

export default {
  name: 'DisplayTodo',
  components: {
    EditTodo,
  },
  computed: {
    todo() {
      // title・・・タスクのタイトルの表示
      // done・・・タスクの完了、未完了のだし分け
      // id・・・完了や編集などをする際のタスクの特定の為のID
      return {
        title: this.$props.title,
        details: this.$props.details,
        date: this.$props.date,
        time: this.$props.time,
        user: this.$props.user,
        done: this.$props.done,
        doneDate: this.$props.doneDate,
        doneTime: this.$props.doneTime,
        id: this.$props.id,
      };
    },
  },
  props: {
    title: { type: String, required: true },
    details: { type: String, required: false },
    date: { type: Date, required: false },
    time: { type: Date, required: false },
    user: { type: String, required: false },
    done: { type: Boolean, required: true },
    doneDate: { type: Date, required: false },
    doneTime: { type: Date, required: false },
    id: { type: Number, required: true },
  },
  methods: {
    doneChange(id) {
      this.$store.commit('doneChange', id);
      this.$store.commit('pushLocalStorage');
    },
    openEditor(id) {
      this.$store.commit('openEditor', id);
    },
    removeTodo(id) {
      this.$store.commit('removeTodo', id);
      this.$store.commit('pushLocalStorage');
    },
  },
};
</script>

<style lang="scss" scoped>
.todo {
  padding: 10px 20px;
  border: 1px solid #000000;

  &__title {
    font-size: 18px;
    font-weight: bold;
    border-bottom: 1px solid #000000;
    overflow-wrap: break-word;
  }

  &__details {
    overflow-wrap: break-word;
    white-space: pre-line;
  }

  &__buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 10px;
  }

  &__button {
    background-color: transparent;
    border: 1px solid #000000;
    cursor: pointer;
    outline: none;
    padding: 5px 10px;
    appearance: none;
    font-size: 14px;
    border-radius: 50px;
    width: 100px;
  }
}
</style>