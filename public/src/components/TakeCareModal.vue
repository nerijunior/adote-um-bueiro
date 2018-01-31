<template>
  <modal :title="modalTitle()" @close="$emit('close')">
    <div slot="body">
      <form @submit.prevent="save">
        <div class="field">
          <label for="" class="label">O que você fez?</label>
          <div class="control">
            <div class="select" :class="{ 'is-danger' : $v.type.$error }">
              <select v-model="type">
                <option value="cleaning">Limpeza</option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label for="" class="label">Quando?</label>
          <div class="control">
            <div class="control has-icons-left has-icons-right">
              <input class="input" type="date" v-model="date" :class="{ 'is-danger' : $v.date.$error }">
              <span class="icon is-small is-left">
                <i class="fa fa-calendar"></i>
              </span>
            </div>
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
  props: ['manhole'],
  components: {
    Modal
  },
  validations: {
    type: { required },
    date: { required }
  },
  data () {
    return {
      type: 'cleaning',
      date: null
    }
  },
  methods: {
    modalTitle () {
      return 'Cuidar do ' + this.manhole.name
    },
    save () {
      const vue = this

      if (this.$v.$invalid) {
        return this.$v.$touch()
      }

      const data = {
        type: this.type,
        date: this.date,
        id: this.manhole._id
      }

      Api.manholeTakeCare(data)
        .then(response => {
          console.log('teste')
          window.swal({
            title: 'PARABENS!',
            text: 'Cuidando do bueiro você está ajudando a cidade!',
            icon: 'success'
          })
            .then(() => {
              vue.$emit('close')
            })
        })
        .catch(response => {
          console.error(response)
        })
    }
  }
}
</script>

<style scoped>
</style>
