<template>
  <div id="mainmap">
    <tool-bar
      @updatedManhole="updatedManhole"
      @new-manhole="creating = true"
      :manhole="selectedManhole">
    </tool-bar>

    <user-toolbar></user-toolbar>

    <transition name="fade">
      <Loader v-if="loading"></Loader>
    </transition>

    <gmap-map
      :center="map.center"
      :zoom="map.zoom"
      map-type-id="roadmap"
      style="width: 100%; height: 100%;"
      @dragend="dragend"
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
        :icon="makeIcon(m)"
      ></gmap-marker>
    </gmap-map>

    <create-modal v-if="creating" @close="creating = false" @created="createdManhole">
      <div slot="body">
        <form @submit.prevent="newManhole"></form>
      </div>
    </create-modal>
  </div>
</template>

<script>
import Api from '@/api'
import Loader from '@/components/Loader'
import { debounce, extend } from 'lodash'

import CreateModal from '@/components/CreateModal'
import ToolBar from '@/components/ToolBar'
import UserToolbar from '@/components/UserToolbar'

// const now = window.moment()

export default {
  components: {
    Loader,
    CreateModal,
    ToolBar,
    UserToolbar
  },
  data () {
    return {
      selectedManhole: {},
      selectedMarker: null,
      creating: false,
      loading: false,
      map: {
        icons: {
          normal: '/static/marker-abandoned.png',
          success: '/static/marker-adopted.png',
          warning: '/static/marker-warning.png'
        },
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
    makeIcon (manhole) {
      if (manhole.adopted) {
        if (manhole.last_update) {
          return this.map.icons.success
        } else {
          return this.map.icons.warning
        }
      } else {
        return this.map.icons.normal
      }
    },
    loadCenter () {
      this.map.center.lat = this.$store.state.lat
      this.map.center.lng = this.$store.state.lng
    },
    dragend () {
      const lat = this.map.center.lat
      const lng = this.map.center.lng

      this.fetchManholes(lat, lng)
    },
    updatedCenter: debounce(function (center) {
      this.map.center = {
        lat: center.lat(),
        lng: center.lng()
      }
    }, 300),
    fetchManholes (lat, lng) {
      Api.getManholes({lat: lat, lng: lng})
        .then(response => {
          const manholes = response.data.manholes
          const manholesIds = this.map.markers.map((point) => {
            return point._id
          })

          manholes.map(point => {
            if (manholesIds.indexOf(point._id) !== -1) {
              return
            }

            this.addMarker(point)
          })
        })
        .catch(error => {
          console.error(error)
        })
    },
    addMarker (manhole) {
      this.map.markers.push({
        _id: manhole._id,
        name: manhole.name,
        adopted: manhole.adopted,
        user_id: manhole.user_id,
        position: {lat: manhole.location[0], lng: manhole.location[1]}
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
    },
    createdManhole (manhole) {
      this.addMarker(manhole)
    }
  },
  mounted () {
    const vue = this
    this.loadCenter()

    if (navigator.geolocation) {
      vue.loading = true
    }

    navigator.geolocation.getCurrentPosition((location) => {
      const data = {
        lat: location.coords.latitude,
        lng: location.coords.longitude
      }

      this.$store.commit('SET_LOCATION', data)
      vue.loading = false

      this.map.zoom = 14
      this.loadCenter()
      this.fetchManholes(data.lat, data.lng)

      console.log('accuracy', location.coords.accuracy)
    })
  }
}
</script>

<style scoped>
#mainmap{
  height: 100%;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s ease-out;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
