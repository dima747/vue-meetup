<template>
  <v-container>

    <v-layout row>
      <v-flex xs12 class="text-xs-center">
        <v-progress-circular
          indeterminate
          class="primary--text"
          :width="7"
          :size="70"
          v-if="loading"></v-progress-circular>
      </v-flex>
    </v-layout>

    <v-layout row wrap v-if="!loading">
      <v-flex xs12>
        <v-card color="purple" class="white--text">
          <v-container fluid grid-list-lg>
            <v-layout row wrap>

               <v-flex xs12 sm3>
                <v-card-media
                  :src="user.userImage"
                  height="200px"
                  contain
                ></v-card-media>
              </v-flex>
              
              <v-flex xs12 sm9>
                <div>
                  <div class="headline">{{ user.fullname }}</div>
                  <div>{{ user.role === "admin" ? 'Administrator' : 'User' }}</div>
                </div>
              </v-flex>
             
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-3">
      <v-flex xs12>
        <v-card class="primary--text">
          <v-container fluid grid-list-lg>
            <v-layout row wrap>
              <v-flex xs7 sm8 md9>
                <v-card-title primary-title>
                  <div class="headline">
                    Registered Meetups
                  </div>
                </v-card-title>
                {{ user }}
                <v-card-actions>
                  <v-btn>
                    <v-icon left light>arrow_forward</v-icon>
                    View Meetup
                  </v-btn>
                </v-card-actions>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    error () {
      return this.$store.getters.error
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
  }
}
</script>

