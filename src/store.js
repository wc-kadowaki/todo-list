import { createStore } from 'vuex';

// localStorage使用しない時の初期データ
// userの追加 'mike', 'john', 'jane', 'bob'
// const userList = [
//   { name: 'mike', id: 0 },
//   { name: 'john', id: 1 },
//   { name: 'jane', id: 2 },
//   { name: 'bob', id: 3 },
// ];

// todoリスト用のローカルストレージのデータのやり取り
const localStorageKey = 'todoList';
// ローカルストレージのデータを取得
let data = localStorage.getItem(localStorageKey); // ローカルストレージからkeyがtodoListのデータを取得
let initId = 0; // データがない場合のタスクIDの初期値
if (data) {
  // ローカルストレージにデータが存在している時の処理
  data = JSON.parse(data); // 文字列になっているデータをパースする
  initId = data[data.length - 1].id + 1; // データの配列の最後のIDに+1した数値を代入
} else {
  // ローカルストレージにデータがない場合
  data = []; // オブジェクトを配列にしてtodoリストを管理しているため空の配列を代入
}

// ユーザーデータ用。todoリスト用のものと処理は特に変わらないです。処理がほぼ同じなので関数化したらまとめられそう
const localStorageKeyUser = 'userList';
let userData = localStorage.getItem(localStorageKeyUser);
let userInitId = 0;
if (userData) {
  userData = JSON.parse(userData);
  userInitId = userData[userData.length - 1].id + 1;
} else {
  userData = [];
}

export default createStore({
  state() {
    return {
      todoList: data, //todoリストのデータ
      lastId: initId, // todoリストの最後に追加したtodoのidに+1しユニークな数値のid
      userList: userData, // ユーザーリストのデータ
      userLastId: userInitId, // todoリストの方と同じでそれのユーザーデータ版
    };
  },
  mutations: { // idが引数になっているものは変更対象の特定にidを使用している
    doneChange(state, id) { // todoの完了、未完了の切り替えの関数
      // 日時の入力で一桁の時先頭に「0」を付ける関数
      function dateFormat(number) {
        let target = String(number); // 受け取った数値を文字列に変換
        if (target.length === 1) { // 変換した文字列の文字数が1文字の場合
          return `0${target}`; // 先頭に0をつけて返す
        } else {
          return target; // 2文字の場合はそのまま返す(特に処理を挟まないので文字列のまま)
        }
      }
      const today = new Date(); // 完了を押したときのDateオブジェクト
      const year = today.getFullYear(); // 年の取得
      const month = dateFormat(today.getMonth() + 1); // 月の取得
      const day = dateFormat(today.getDate()); // 日付の取得
      const hours = dateFormat(today.getHours()); // 時間の取得
      const minutes = dateFormat(today.getMinutes()); // 分の取得
      const doneDate = `${year}-${month}-${day}`; // 日付のフォーマットをYYYY-MM-DDにする
      const doneTime = `${hours}:${minutes}`; // 時間のフォーマットをHH:MM
      for (let i = 0; i < state.todoList.length; i++) {
        if (state.todoList[i].id === id) {
          if (state.todoList[i].done) {
            // 未完了に変更するときの処理
            state.todoList[i].done = false;
            state.todoList[i].doneDate = '';
            state.todoList[i].doneTime = '';
          } else {
            // 完了に変更する時の処理
            state.todoList[i].done = true;
            state.todoList[i].doneDate = doneDate;
            state.todoList[i].doneTime = doneTime;
          }
        }
      }
    },
    openEditor(state, id) { // 編集を押した際にtodoを編集できるようにする
      state.todoList.forEach((element) => { // 編集を押したもの以外のtodoを編集できない状態にする
        element.editFlag = false;
      });
      // 編集するtodoの編集用のフラグを立てる
      for (let i = 0; i < state.todoList.length; i++) {
        if (state.todoList[i].id === id) {
          state.todoList[i].editFlag = true;
        }
      }
    },
    removeTodo(state, id) { // 削除を押した際に対象のtodoを削除する
      for (let i = 0; i < state.todoList.length; i++) {
        if (state.todoList[i].id === id) {
          state.todoList.splice(i, 1); // todoリストの配列から対象のものを削除
        }
      }
    },
    addUser(state, newUserName) { // ユーザーの追加。一旦ユーザーのデータは名前のみにしているのでこの関数で大丈夫だが他の情報を入れる場合変更する必要がある
      let newUser = {
        name: newUserName,
        id: state.userLastId,
      };
      state.userList.push(newUser); // ユーザーリストの配列の最後にユーザーを追加
      state.userLastId = state.userList[state.userList.length - 1].id + 1; // ユーザーが増えたので次回移行追加された時のためidを更新
    },
    removeUser(state, id) { // ユーザーの削除。処理内容はtodoの削除の時と同じ
      for (let i = 0; i < state.userList.length; i++) {
        if (state.userList[i].id === id) {
          state.userList.splice(i, 1);
        }
      }
    },
    updateLastId(state) {
      // 最後に追加したtodoのidに+1することでかぶらない数値のidを作成
      state.lastId = state.todoList[state.todoList.length - 1].id + 1;
    },
    // keyとvalueを引数に入れれば関数を一つにできそう
    pushLocalStorage(state) {
      // ローカルストレージのデータを更新する関数
      localStorage.removeItem(localStorageKey); // 既存のデータを削除
      let json = JSON.stringify(state.todoList, undefined, 1); // 現在のtodoリスト(オブジェクトの配列)をローカルストレージのvalueに入れる為文字列型に変換
      localStorage.setItem(localStorageKey, json); //
    },
    pushLocalStorageUser(state) {
      localStorage.removeItem(localStorageKeyUser); // 既存のデータを削除
      let json = JSON.stringify(state.userList, undefined, 1); // 現在のtodoリスト(オブジェクトの配列)をローカルストレージのvalueに入れる為文字列型に変換
      localStorage.setItem(localStorageKeyUser, json); //
    },
  },
});
