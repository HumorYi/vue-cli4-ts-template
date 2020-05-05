import { Vue, Component } from 'vue-property-decorator'
@Component
export class Dialog extends Vue {
  mounted() {
    window.addEventListener('keyup',  (event) => {
      if (event.keyCode === 27) {
        this.cancel()
      }
    })
  }

  stop (e) {
    e.stopPropagation()
  }
  
  cancel () {
    this.$emit('cancel')
  }

  confirm () {
    this.$emit('confirm')
  }
}