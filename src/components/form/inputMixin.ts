import {Options, Vue} from 'vue-class-component'
import {Model, Prop} from 'vue-property-decorator'

export type InputMixinOptions = {
    id: string
    name?: string
    readonly?: boolean
}

@Options({
    emits: ['update:modelValue'],
})
export class InputMixin<
    Options extends InputMixinOptions,
    ValueType = unknown
    > extends Vue {
    @Model('update:modelValue')
    protected readonly modelValue!: ValueType

    @Prop({type: Object, required: true})
    readonly options!: Options

    get innerOptions(): Options {
        return Object.assign({}, this.options)
    }

    get innerName(): string {
        const {id, name} = this.innerOptions
        return name || id
    }
}
