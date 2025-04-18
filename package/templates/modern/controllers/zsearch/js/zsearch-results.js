export default {
    props: {
        results: Array
    },
    setup() {
        return {}
    },
    template: `<div class="zsearch__items" v-if="results.length">
                <div class="zsearch__item zs-item" v-for="item in results" :key="item.id">
                    <div class="zs-item__date">
                        {{ item.date }}
                    </div>
                    <div class="zs-item__row">
                        <div class="zs-item__content">
                            <a :href="item.url" class="zs-item__title" v-html="item.title"></a>
                            <div class="zs-item__text" v-html="item.content"></div>
                        </div>
                        <div class="zs-item__photo" v-if="item.photo" v-html="item.photo"></div>
                    </div>
                </div>
            </div>`
}