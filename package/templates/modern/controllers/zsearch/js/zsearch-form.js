const {ref, watch} = Vue;
export default {
    props: {
        form: Object
    },
    setup(props, context) {
        const form = ref({
            q: props.form.q,
            type: 'words',
            date: 'all',
            order_by: 'fsort'
        });

        const submitClicked = function () {
            context.emit('formChanged', form.value, true);
        };

        const clearClicked = function () {
            form.value.q = '';
        }

        watch(form, (newValue) => {
            context.emit('formChanged', newValue);
        }, {deep: true})

        return {
            form,
            clearClicked,
            submitClicked
        }
    },
    template: `<form @submit.prevent>
                <div class="zsearch__mainform">
                    <div class="zsearch__input">
                        <input type="text" name="q" placeholder="Что ищем?" v-model="form.q">
                        <div class="zsearch__inputclean" v-if="form.q" @click="clearClicked">
                            <svg class="icms-svg-icon w-16" fill="currentColor">
                                <use href="/templates/modern/images/icons/solid.svg#times"></use>
                            </svg>
                        </div>
                    </div>
                    <div zsearch-show-options class="zsearch__btn">
                        <svg class="icms-svg-icon w-16" fill="currentColor">
                            <use href="/templates/modern/images/icons/solid.svg#cogs"></use>
                        </svg>
                    </div>
                    <button type="submit" name="submit" @click="submitClicked">
                        <svg class="icms-svg-icon w-16" fill="currentColor">
                            <use href="/templates/modern/images/icons/solid.svg#search"></use>
                        </svg>
                        <span class="d-none d-sm-inline-block">Поиск</span>
                    </button>
                </div>
                <div class="zsearch__options">
                    <div>
                        <div class="">
                            <select class="form-control " name="type" v-model="form.type">
                                <option value="words" selected="">все слова</option>
                                <option value="exact">точное совпадение</option>
                            </select>
                        </div>
                        <div class="">
                            <select class="form-control " name="date" v-model="form.date">
                                <option value="all" selected="">все даты</option>
                                <option value="w">за неделю</option>
                                <option value="m">за месяц</option>
                                <option value="y">за год</option>
                            </select>
                        </div>
                        <div class="">
                            <select class="form-control " name="order_by"  v-model="form.order_by">
                                <option value="fsort" selected="">По релевантности</option>
                                <option value="date_pub">По дате</option>
                            </select>
                        </div>
                    </div>
                </div>
            </form>`
}