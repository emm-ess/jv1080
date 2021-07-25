<template>
    <div class="input-field type-select">
        <label :for="innerOptions.id">
            <slot />
        </label>

        <select
            :id="innerOptions.id"
            v-model="innerModel"
            :name="innerName"
            :readonly="innerOptions.readonly"
        >
            <option v-if="innerOptions.defaultText" value="null" disabled>
                {{ innerOptions.defaultText }}
            </option>
            <option v-for="item in items" :key="item[itemValue]" :value="item[itemValue]">
                {{ item[itemTitle] }}
            </option>
        </select>
    </div>
</template>

<script lang="ts">
import {mixins, Options} from 'vue-class-component'
import {Prop} from 'vue-property-decorator'

import type {InputMixinOptions} from './input-mixin'
import {InputMixin} from './input-mixin'

export type SelectOptions = InputMixinOptions & {
    itemTitle?: string
    itemValue?: string
    defaultText?: string
    returnItemAsValue?: boolean
}

const OPTION_DEFAULTS = {
    itemTitle: 'title',
    itemValue: 'value',
    returnItemAsValue: false,
}

@Options({
    name: 'JvSelect',
})
export default class JvSelect<ValueType extends Record<string, unknown>> extends mixins(
    InputMixin,
) {
    @Prop({type: Array, required: true})
    private readonly items!: Array<ValueType>

    get innerModel(): ValueType | null {
        const {
            modelValue,
            itemValue,
            innerOptions: {returnItemAsValue},
        } = this

        if (modelValue === undefined || modelValue === null) {
            return null
        }
        return (returnItemAsValue
            ? modelValue[itemValue as keyof typeof modelValue]
            : modelValue) as ValueType
    }

    set innerModel(value: ValueType | null) {
        if (value && this.innerOptions.returnItemAsValue) {
            const {items, itemValue} = this
            value = items.find((item) => item[itemValue] === value) as ValueType
        }

        this.$emit('update:modelValue', value)
    }

    get innerOptions(): SelectOptions {
        return Object.assign({}, OPTION_DEFAULTS, this.options)
    }

    get itemValue(): keyof ValueType {
        return this.innerOptions.itemValue as keyof ValueType
    }

    get itemTitle(): string {
        return this.innerOptions.itemTitle as string
    }
}
</script>

<style lang="sass" scoped>
.type-select + .type-select
    margin-top: 25px
    margin-bottom: 25px

// as presented here: https://www.filamentgroup.com/lab/select-css.html
select
    display: block
    height: $select-height
    margin: 0
    padding: 0 50px 0 20px
    background-image: url('~@/assets/img/select-arrow.svg')
    background-repeat: no-repeat
    background-position: right 10px top 50%
    background-size: 22px 22px
    //avoid iOS Zoom
    font-size: $font-size-body
    font-weight: $font-weight-base
    line-height: $select-height
    appearance: none
    @extend %base-input

    &::-ms-expand
        display: none

    option
        color: $black
        background: $white
</style>
