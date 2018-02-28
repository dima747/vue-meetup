import Vue from 'vue'
import Vuex from 'vuex'
import * as Firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://www.acg.org/sites/files/styles/masthead_1440/public/acg-new-york-2880x1200.jpg?itok=UcGCICsV',
        id: 'asdasdasgdf123',
        title: 'Meetup in NewYork',
        date: new Date(),
        location: 'New York',
        description: 'It\'s New York!'
      },
      {
        imageUrl: 'http://www.livetradingnews.com/wp-content/uploads/2017/06/paris-attractions-xlarge.jpg',
        id: 'asdfdssgdf1234',
        title: 'Meetup in Paris',
        date: new Date(),
        location: 'Paris',
        description: 'It\'s Paris!'
      }
    ],
    user: null
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    createMeetup ({commit}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        imageUrl: payload.imageUrl,
        description: payload.description,
        date: payload.date,
        id: 'adsdasfds543'
      }
      // Reach out to firebase and store it
      commit('createMeetup', meetup)
    },
    signUserUp ({ commit }, payload) {
      Firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        })
        .catch(err => {
          console.log(err)
        })
    },
    signUserIn ({ commit }, payload) {
      Firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
        .then(user => {
          const newUser = {
            id: user.uid,
            registeredMeetups: []
          }
          commit('setUser', newUser)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    },
    user (state) {
      return state.user
    }
  }
})
