export default {
  namespace: 'userModal',
  state: {
    visible: false,
    title: '',
    record: {}
  },
  reducers: {
    show(state, { payload: { title, record } }) {
      return { ...state, title, record, visible: true };
    },
    hide(state) {
      return { ...state, visible: false };
    }
  }
};
