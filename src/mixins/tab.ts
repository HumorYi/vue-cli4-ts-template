import { Vue, Component, Prop } from 'vue-property-decorator'

@Component
export default class Tab extends Vue {
  @Prop({ type: Array, required: true }) readonly list!: Array<any>
  @Prop({ type: Number, default: 0 }) readonly active!: number
  @Prop({ type: Boolean, default: true }) readonly open!: Boolean
  @Prop({ type: String, default: '' }) readonly type!: String
  @Prop({ type: String, default: 'left' }) readonly iconPosition!: String
  @Prop({ type: String, default: '' }) readonly iconClass!: String
  @Prop({ type: Boolean, default: false }) readonly force!: Boolean
  @Prop() readonly params!: any

  get ownActive(): number {
    return this.active
  }

  set ownActive(val) {
    this.ownActive = val
  }

  change(index): void {
    if (!this.force && (!this.open || this.ownActive === index)) {
      return
    }

    this.ownActive = index

    this.$emit('change', index, this.params)
  }
}
