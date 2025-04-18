export default {
    props: {
        types: Array
    },
    setup(props, context) {

        const selectType = (index) => {
            context.emit('selectType', index);
        }

        return {
            selectType
        }
    },
    template: `<ul v-if="types.length">
                    <li :class="{selected: item.isActive}" v-for="(item, index) in types" :key="index" @click="selectType(index)">
                    {{ item.title }} <span>{{ item.count }}</span>
                    </li>
                </ul>`
}