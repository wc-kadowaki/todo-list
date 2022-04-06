<template>
  <BoardTodo />
</template>

<script>
import 'normalize.css';
import './assets/base.css';
import BoardTodo from './components/BoardTodo.vue';

export default {
  name: 'App',
  components: {
    BoardTodo,
  },
};
</script>

<style lang="scss" scoped>
</style>
