import * as Firebase from 'firebase'

export default {
  state: {
    user: null
  },
  mutations: {
    registerUserForMeetup (state, payload) {
      const id = payload.id
      if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
        return
      }
      state.user.registeredMeetups.push(id)
      state.user.fbKeys[id] = payload.fbKey
    },
    unregisterUserFromMeetup (state, payload) {
      const registeredMeetups = state.user.registeredMeetups
      registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
      Reflect.deleteProperty(state.user.fbKeys, payload)
    },
    updateUser (state, payload) {
      if (payload.fullname) {
        state.user.fullname = payload.fullname
      }
      if (payload.role) {
        state.user.role = payload.role
      }
      if (payload.userImage !== null) {
        state.user.userImage = payload.userImage
      } else {
        state.user.userImage = 'https://i1.wp.com/www.un.org/pga/72/wp-content/uploads/sites/51/2017/08/dummy-profile.jpg?ssl=1'
      }
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    registerUserForMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      Firebase.database().ref('/users/' + user.id).child('/registrations/')
        .push(payload)
        .then(data => {
          commit('setLoading', false)
          commit('registerUserForMeetup', {id: payload, fbKey: data.key})
        })
        .catch(err => {
          commit('setLoading', false)
          console.log(err)
        })
    },
    unregisterUserFromMeetup ({commit, getters}, payload) {
      commit('setLoading', true)
      const user = getters.user
      if (!user.fbKeys) {
        return
      }
      const fbKey = user.fbKeys[payload]
      Firebase.database().ref('/users/' + user.id + '/registrations/').child(fbKey)
        .remove()
        .then(() => {
          commit('setLoading', false)
          commit('unregisterUserFromMeetup', payload)
        })
        .catch(err => {
          commit('setLoading', false)
          console.log(err)
        })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
          commit('updateUser', {userImage: null})
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          console.log(err)
        })
    },
    signUserIn ({ commit }, payload) {
      commit('setLoading', true)
      commit('clearError')
      Firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          commit('setLoading', false)
          const newUser = {
            id: user.uid,
            registeredMeetups: [],
            fbKeys: {}
          }
          commit('setUser', newUser)
          commit('updateUser', {userImage: null})
        })
        .catch(err => {
          commit('setLoading', false)
          commit('setError', err)
          console.log(err)
        })
    },
    autoSignIn ({commit}, payload) {
      commit('setUser', {
        id: payload.uid,
        registeredMeetups: [],
        fbKeys: {}
      })
      commit('updateUser', {userImage: null})
    },
    loadProfile ({ commit, getters, dispatch }) {
      dispatch('fetchUserData')
      commit('setLoading', true)
      Firebase.database().ref('/users/' + getters.user.id + '/profile/')
        .once('value')
        .then(data => {
          const profile = data.val()
          if (profile !== null) {
            commit('setLoading', false)
            commit('updateUser', profile)
          } else {
            dispatch('updateProfile', {
              fullname: 'John Doe',
              role: 'user',
              userImage: 'https://i1.wp.com/www.un.org/pga/72/wp-content/uploads/sites/51/2017/08/dummy-profile.jpg?ssl=1'
            })
          }
        })
        .catch(err => {
          commit('setLoading', false)
          console.log(err)
        })
    },
    updateProfile ({commit, getters}, payload) {
      commit('setLoading', true)
      const updateProfile = {}
      if (payload.fullname) {
        updateProfile.fullname = payload.fullname
      }
      if (payload.userImage) {
        updateProfile.userImage = payload.userImage
      }
      if (payload.role) {
        updateProfile.role = payload.role
      }
      Firebase.database().ref('/users/' + getters.user.id + '/profile/')
        .update(updateProfile)
        .then(() => {
          commit('setLoading', false)
          commit('updateUser', payload)
        })
        .catch(err => {
          commit('setLoading', false)
          console.log(err)
        })
    },
    fetchUserData ({commit, getters}) {
      commit('setLoading', true)
      Firebase.database().ref('/users/' + getters.user.id + '/registrations/')
        .once('value')
        .then(data => {
          const dataPairs = data.val()
          let swappedPairs = {}
          let registeredMeetups = []
          for (let key in dataPairs) {
            swappedPairs[dataPairs[key]] = key
            registeredMeetups.push(dataPairs[key])
          }
          const updatedUser = {
            id: getters.user.id,
            registeredMeetups: registeredMeetups,
            fbKeys: swappedPairs
          }
          commit('setLoading', false)
          commit('setUser', updatedUser)
          commit('updateUser', {userImage: null})
        })
        .catch(err => {
          commit('setLoading', false)
          console.log(err)
        })
    },
    logout ({commit}) {
      Firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    }
  }
}
