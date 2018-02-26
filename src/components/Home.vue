<template>
  <v-container>

    <v-layout row wrap>
      <v-flex xs12 sm6 class="text-xs-center text-sm-right">
        <v-btn large router to="/meetups" class="primary">Explore Meetups</v-btn>
      </v-flex>
      <v-flex xs12 sm6 class="text-xs-center text-sm-left">
        <v-btn large router to="/meetup/new" class="primary">Organize Meetup</v-btn>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12>
        <v-carousel>
          <v-carousel-item 
            v-for="meetup in meetups" 
            :src="meetup.imageUrl" 
            :key="meetup.id">
            <div class="title">
              {{ meetup.title }}
            </div>
          </v-carousel-item>
        </v-carousel>
      </v-flex>
    </v-layout>

    <v-layout row wrap class="mt-2">
      <v-flex xs12 class="text-xs-center">
        <p>Join our awesome meetups!</p>
      </v-flex>
    </v-layout>

  </v-container>
</template>

<script>
export default {
  data () {
    return {
      meetups: [
        { imageUrl: 'https://www.acg.org/sites/files/styles/masthead_1440/public/acg-new-york-2880x1200.jpg?itok=UcGCICsV', id: 'asdasdasgdf123', title: 'Meetup in NewYork' },
        { imageUrl: 'http://www.livetradingnews.com/wp-content/uploads/2017/06/paris-attractions-xlarge.jpg', id: 'asdfdssgdf123', title: 'Meetup in Paris' }
      ]
    }
  }
}
</script>

<style lang="stylus">
  $color-pack = false
  @import '~vuetify/src/stylus/main'
</style>


