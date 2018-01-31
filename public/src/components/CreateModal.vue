<template>
  <modal :title="'Criar Bueiro'" @close="$emit('close')">
    <slot name="header">
      <p class="modal-card-title">Modal title</p>
      <button class="delete" aria-label="close"></button>
    </slot>
    <div slot="body">
      <form @submit.prevent="save">
        <div class="field">
          <label for="" class="label">Nome</label>
          <input type="text" v-model="name" class="input" :class="{ 'is-danger' : ($v.name.$error) }">
        </div>

        <div class="field">
          <label for="center" class="label">Procure o Bueiro por endereço</label>
        </div>

        <div class="field has-addons">
          <div class="control is-expanded" :class="{ 'is-loading': fetchingAddress }">
            <input type="text" v-model="address" :disabled="fetchingAddress" class="input" :class="{ 'is-danger' : ($v.name.$error) }">
          </div>
          <div class="control">
            <button type="button" :disabled="fetchingAddress" class="button is-info" @click="fetchAddress"><i class="fa fa-map-marker"></i></button>
          </div>
        </div>

        <div class="field">
          <label class="label">Ajuste onde está o bueiro</label>
          <div class="control control__map">
            <gmap-map
              :options="map.options"
              :center="mapCenter"
              :zoom="map.zoom"
              map-type-id="roadmap"
              @center_changed="center => map.center = center"
              style="width: 100%; height: 200px"
            >
              <gmap-marker
                :position="map.center"
                :clickable="true"
                :draggable="false"
                @click="showMarkerInfo(m, index)"
              ></gmap-marker>
            </gmap-map>
          </div>
        </div>

      </form>
    </div>
    <div slot="footer">
      <button @click="save" class="button is-success">
        <span class="icon"><i class="fa fa-save"></i></span>
        <span>Salvar</span>
      </button>
      <button @click="$emit('close')" class="button">Cancelar</button>
    </div>
  </modal>
</template>

<script>
import { required } from 'vuelidate/lib/validators'

import Api from '@/api'
import Modal from '@/components/Modal'

export default {
  validations: {
    name: { required }
  },
  components: { Modal },
  computed: {
    mapCenter () {
      return {
        lat: this.map.center.lat,
        lng: this.map.center.lng
      }
    }
  },
  data () {
    return {
      fetchingAddress: false,
      name: '',
      address: '',
      map: {
        zoom: 17,
        center: {
          lat: 0,
          lng: 0
        },
        options: {
          zoomControl: true,
          mapTypeControl: true,
          scaleControl: false,
          streetViewControl: false,
          rotateControl: false,
          fullscreenControl: false
        }
      }
    }
  },
  methods: {
    save () {
      if (this.$v.$invalid) {
        return this.$v.$touch()
      }

      const lat = (typeof this.map.center.lat === 'function') ? this.map.center.lat() : this.map.center.lat
      const lng = (typeof this.map.center.lng === 'function') ? this.map.center.lng() : this.map.center.lng

      const data = {
        name: this.name,
        location: [lat, lng]
      }

      Api.manholeCreate(data)
        .then(response => {
          this.$emit('created', response.data)
          this.$emit('close')

          window.swal({
            title: 'Criado!',
            text: 'Parabéns o bueiro agora está disponível para adoção.',
            icon: 'success'
          })
        })
        .catch(error => {
          console.error(error)
        })
    },
    fetchAddress () {
      const vue = this
      const geocoder = new window.google.maps.Geocoder()

      this.fetchingAddress = true

      geocoder.geocode({address: this.address}, function (results, status) {
        vue.fetchingAddress = false

        if (status !== 'OK') {
          return false
        }

        vue.map.center.lat = results[0].geometry.location.lat()
        vue.map.center.lng = results[0].geometry.location.lng()
      })
    }
  },
  mounted () {
    this.map.center = {
      lat: this.$store.state.lat,
      lng: this.$store.state.lng
    }
  }
}
</script>

<style scoped>
.control__map{
  margin-top: 10px;
}
</style>
