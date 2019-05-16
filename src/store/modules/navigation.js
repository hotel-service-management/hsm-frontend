export default {
  namespaced: true,
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
      // { title: 'Dashboard', icon: 'fa-tachometer-alt', link: '/dashboard' },
      { title: 'Booking', icon: 'fa-book', link: '/booking' },
      { title: 'Location', icon: 'fa-compass', link: '/location' },
      // { title: 'Booking Detail', icon: 'fa-book-open', link: '/booking' },
      // { title: 'Privileges', icon: 'fa-certificate', link: '/privilege' },
      // { title: 'Services', icon: 'fa-concierge-bell', link: '/service' },
      { title: 'Review', icon: 'fa-pencil-alt', link: '/review' },
      { title: 'Profile', icon: 'fa-user', link: '/profile' }
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
