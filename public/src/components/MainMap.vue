<template>
  <div id="">
    <tool-bar @updatedManhole="updatedManhole" :manhole="selectedManhole"></tool-bar>
    <user-toolbar></user-toolbar>

    <gmap-map
      :center="map.center"
      :zoom="map.zoom"
      map-type-id="roadmap"
      style="width: 100%; height: 700px"
      @center_changed="updatedCenter"
      @rightclick="rightClick"
    >
      <gmap-info-window
        :options="map.infoOptions"
        :position="map.infoWindowPos"
        :opened="map.infoWinOpen"
        @closeclick="map.infoWinOpen = false">
        {{map.infoContent}}
      </gmap-info-window>

      <gmap-marker
        :key="index"
        v-for="(m, index) in map.markers"
        :position="m.position"
        :clickable="true"
        :draggable="false"
        @click="showMarkerInfo(m, index)"
      ></gmap-marker>
    </gmap-map>
  </div>
</template>

<script>
import { debounce, extend } from 'lodash'

import ToolBar from '@/components/ToolBar'
import UserToolbar from '@/components/UserToolbar'

export default {
  components: {
    ToolBar,
    UserToolbar
  },
  data () {
    return {
      selectedManhole: {},
      selectedMarker: null,
      map: {
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        infoWinOpen: false,
        infoContent: '',
        center: {
          lat: null,
          lng: null
        },
        zoom: 13,
        markers: []
      }
    }
  },
  methods: {
    loadCenter () {
      this.map.center.lat = this.$store.state.lat
      this.map.center.lng = this.$store.state.lng
    },
    updatedCenter: debounce(function (center) {
      const lat = center.lat()
      const lng = center.lng()

      this.fetchManholes(lat, lng)
    }, 300),
    fetchManholes (lat, lng) {
      window.axios.post('/points/', {lat: lat, lng: lng})
        .then(response => {
          const manholes = response.data.manholes
          const manholesIds = this.map.markers.map((point) => {
            return point._id
          })

          manholes.map(point => {
            if (manholesIds.indexOf(point._id) !== -1) {
              return
            }

            this.map.markers.push({
              _id: point._id,
              name: point.name,
              adopted: point.adopted,
              user_id: point.user_id,
              position: {lat: point.location[0], lng: point.location[1]}
            })
          })
        })
        .catch(error => {
          console.error(error)
        })
    },
    rightClick (e) {
      console.log(e.latLng.lat(), e.latLng.lng())
    },
    showMarkerInfo (marker, index) {
      if (this.selectedMarker === index) {
        this.selectedManhole = {}
        this.selectedMarker = null
        this.map.infoWinOpen = false
        return
      }

      this.map.infoWindowPos = JSON.parse(JSON.stringify(marker.position))
      this.map.infoContent = marker.name
      this.map.infoWinOpen = true

      this.selectedMarker = index
      this.selectedManhole = marker
    },
    updatedManhole (manhole) {
      this.selectedManhole = manhole
      this.$delete(this.map.markers, this.selectedMarker)

      this.map.markers = this.map.markers.filter((row) => {
        return (row._id !== manhole._id)
      })

      this.map.markers.push(extend(manhole, {
        position: {
          lat: manhole.location[0],
          lng: manhole.location[1]
        }
      }))
    }
  },
  mounted () {
    window.vm = this
    this.loadCenter()

    navigator.geolocation.getCurrentPosition((location) => {
      const data = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }

      this.$store.commit('SET_LOCATION', data)

      this.map.zoom = 14
      this.loadCenter()
      console.log('accuracy', location.coords.accuracy)
    })
  }
}
</script>

<style scoped>
</style>
