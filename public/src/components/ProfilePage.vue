<template>
  <div>
    <ProfileForm v-if="user.name" :user-data="user"></ProfileForm>
  </div>
</template>

<script>
import ProfileForm from '@/components/ProfileForm'

export default {
  components: {
    ProfileForm
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  }
}
</script>

<style>

</style>
