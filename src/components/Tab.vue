<template>
  <ul class="c-tab" :class="type">
    <li
      v-for="(item, index) in list"
      :key="index"
      :class="{ active: index === ownActive }"
      @click="change(index, params)"
    >
      <i
        v-if="(item.iconClass || iconClass) && (item.iconPosition === 'left' || iconPosition === 'left')"
        class="iconfont"
        :class="[item.iconClass ? item.iconClass : '', iconPosition ? iconPosition : '', iconClass ? iconClass : '']"
      ></i>

      <span v-if="item.name">{{ item.name }}</span>

      <i
        v-if="(item.iconClass || iconClass) && (item.iconPosition === 'right' || iconPosition === 'right')"
        class="iconfont"
        :class="[item.iconClass ? item.iconClass : '', iconPosition ? iconPosition : '', iconClass ? iconClass : '']"
      ></i>
    </li>
  </ul>
</template>

<script lang="ts">
import Mixins_Tab from '../mixins/tab'
import { Component, Prop, Mixins } from 'vue-property-decorator'

@Component
export default class Tab extends Mixins(Mixins_Tab) {}
</script>

<style lang="sass" scoped>
.c-tab
  display: flex
  align-items: center

  user-select: none

  li
    height: 100%
    display: flex
    align-items: center
    justify-content: center

    text-align: center
    font-size: 16px
    cursor: pointer

  &.favorites
    li
      $activeColor: #5794FC

      color: #666
      background-color: #EDEDED
      width: 220px
      height: 70px

      .iconfont
          font-size: 25px
          color:$activeColor

          &.left
            margin-right: 7px

          &.right
            margin-left: 7px

      &.active
        color:$activeColor
        background-color: #fff

  &.material
    $borderRadius: 3px

    height: 45px
    overflow: hidden
    border-top-left-radius: $borderRadius
    border-top-right-radius: $borderRadius

    li
      flex: 1
      box-sizing: border-box

      font-size: 16px
      font-weight: bold
      color: #333
      background-color: #fff

      &:not(:first-child)
        border-left: 1px solid #E8E8E8

      &.active
        color: #fff
        background: linear-gradient(90deg,#4D75FE 0%,#5696FD 100%)

  &.material-filter
    $borderColor: #E5E5E5
    height: 28px

    border: 1px solid $borderColor

    li
      padding-left: 11px
      padding-right: 11px

      &, .iconfont
        color: #666
        font-size: 12px

        &.left
          margin-right: 4px

        &.right
          margin-left: 4px

      &:not(:last-child)
        border-right: 1px solid $borderColor

      &.active

        &, .iconfont
          color: #5E82FE

  &.graphic
    display: flex
    align-items: center
    height: 33px
    border: 1px solid #EDEDED

    font-weight: bold

    li
      flex: 1
      color: #666
      font-size: 12px
      background-color: #EDEDED

      &.active
        color: #4D78FD
        background-color: #fff
</style>
