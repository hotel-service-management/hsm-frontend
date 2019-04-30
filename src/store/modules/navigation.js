export default {
  state: {
    drawer: {
      open: false,
      clipped: true,
      fixed: false,
      mini: false
    },
    toolbar: {
      fixed: true,
      clippedLeft: true
    },
    items: [
      { title: 'Home', icon: 'dashboard' },
      { title: 'About', icon: 'question_answer' }
    ]
  },
  mutations: {
    drawerOpen (state, open) {
      state.drawer.open = open
    },
    drawerMini (state, mini) {
      state.drawer.mini = mini
    }
  },
  actions: {}
}
