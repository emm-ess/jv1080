import type {App} from 'vue'
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
    // The relative path of the components folder
    '@/components/globalComponents',
    // Whether or not to look in subfolders
    true,
    /\.(vue|ts)$/,
)

export function registerGlobalComponents(app: App): void {
    requireComponent.keys().forEach((path) => {
        // Get component config
        const componentConfig = requireComponent(path)

        const fileName = (path.split('/').pop() as string).replace(/\.\w+$/, '')
        // Get PascalCase name of component
        const componentName = upperFirst(camelCase(fileName))

        // Register component globally
        app.component(
            componentName,
            // Look for the component options on `.default`, which will
            // exist if the component was exported with `export default`,
            // otherwise fall back to module's root.
            componentConfig.default || componentConfig,
        )
    })
}
