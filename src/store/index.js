import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loadedMeetups: [
      {
        imageUrl: 'https://www.acg.org/sites/files/styles/masthead_1440/public/acg-new-york-2880x1200.jpg?itok=UcGCICsV',
        id: 'asdasdasgdf123',
        title: 'Meetup in NewYork',
        date: '2017-07-17'
      },
      {
        imageUrl: 'http://www.livetradingnews.com/wp-content/uploads/2017/06/paris-attractions-xlarge.jpg',
        id: 'asdfdssgdf1234',
        title: 'Meetup in Paris',
        date: '2017-07-19'
      }
    ],
    user: {
      id: 'asdasdgfdgfdwq',
      registeredMeetups: ['asdfdssgdf1234']
    }
  },
  mutations: {
    createMeetup (state, payload) {
      state.loadedMeetups.push(payload)
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
    }
  }
})
