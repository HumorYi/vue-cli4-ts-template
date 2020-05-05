/*
 * @Author: Bamboo
 * @AuthorEmail: bamboo8493@126.com
 * @AuthorDescription:全局公用过滤器
 * @Modifier:
 * @ModifierEmail:
 * @ModifierDescription:
 * @Date: 2019-12-27 10:48:37
 * @LastEditTime : 2019-12-27 11:40:11
 */
import Vue from 'vue'
import filters from '../filter'

filters.forEach((filter: object): any => Vue.filter(filter['name'], filter['fn']))
