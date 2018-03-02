export default {
  namespace: 'userModal',
  state: {
    visible: false,
    isCreate: false,
    record: {}
  },
  reducers: {
    show(state, { payload: { isCreate, record } }) {
      return { ...state, isCreate, record, visible: true };
    },
    hide(state) {
      return { ...state, visible: false };
    }
  }
};
