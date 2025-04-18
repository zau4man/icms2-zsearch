const {ref, onMounted, computed} = Vue;
import zsearchForm from './zsearch-form.js';
import zsearchTypes from "./zsearch-types.js";
import zsearchResults from "./zsearch-results.js";

export default {
    setup() {
        const form = ref({
            q: '',
            type: 'words',
            date: 'all',
            order_by: 'fsort'
        });

        const types = ref([]);
        const results = ref([]);
        const target = ref('');
        const page = ref(1);
        const error = ref('');
        const more = ref(null);
        const loading = ref(false);
        const url = computed(() => {
            return target.value ? ZSEARCH_URL + '/' + target.value : ZSEARCH_URL;
        });

        const debounce = function (fn, ms) {
            let timer;
            return () => {
                clearTimeout(timer);
                timer = setTimeout(fn, ms);
            }
        }

        const inputFocus = () => {
            document.querySelector('#zsearch input').focus();
        }

        const getReset = (withoutTypes = false) => {
            if (!withoutTypes) {
                types.value = [];
                target.value = '';
            }
            results.value = [];
            page.value = 1;
        }

        const formError = (text = ZSEARCH_NO_RESULTS) => {
            getReset();
            error.value = text;
        }

        const showAnswer = (answer, withoutTypes) => {
            if ('error' in answer) {
                formError(answer.error);
            } else {
                error.value = '';
                if (('types' in answer) && !withoutTypes) {
                    types.value = answer.types;
                }
                if ('results' in answer) {
                    results.value = [...results.value, ...answer.results];
                }
                checkShowNext();
            }
        }

        const checkShowNext = () => {
            if ($('.zsearch__more').offset().top < window.innerHeight) {
                showNext();
            }
        }

        const showNext = () => {
            if (!types.value.length) {
                return;
            }
            const targetMax = types.value.filter(item => item.isActive)[0].count;
            if (results.value.length >= targetMax) {
                return;
            }
            page.value += 1;
            getResults(true);
        }

        const getResults = async (withoutTypes = false) => {
            let data = new FormData();
            data.append('zsearch', 1);
            data.append('page', page.value);
            Object.keys(form.value).map((name) => {
                data.append(name, form.value[name]);
            })
            loading.value = true;
            let response = await fetch(url.value, {
                method: 'POST',
                body: data,
                redirect: "error"
            }).catch(() => {
                console.log('error promise')
            }).finally(() => {
                loading.value = false;
            });

            if (response.ok) {
                let answer = await response.json();
                showAnswer(answer, withoutTypes);
            } else {
                formError();
            }

        };

        const getResultsDebounced = debounce(getResults, 1000);

        const formChanged = (newValue, immediately = false) => {
            form.value = newValue;
            getReset();
            if (newValue.q.length === 0) {
                inputFocus();
            }
            if (newValue.q.length >= 3) {
                immediately ? getResults() : getResultsDebounced();
            }
        }

        const selectType = (index) => {
            target.value = types.value[index].name;
            types.value.map(item => {
                item.isActive = false;
                return item;
            });
            types.value[index].isActive = true;
            getReset(true);
            getResults(true);
        }

        onMounted(() => {
            inputFocus();
            $('[zsearch-show-options]').click(function (e) {
                $('.zsearch__options').toggleClass('zsearch__options_opened');
            });
            const callback = (entries, observer) => {
                if (entries[0].isIntersecting) {
                    showNext();
                }
            };
            const observer = new IntersectionObserver(callback, {
                rootMargin: "300px",
                threshold: 0.1,
            });
            observer.observe(more.value);

            const slider = document.querySelector('.zsearch__types');
            let isDown = false;
            let startX;
            let scrollLeft;

            slider.addEventListener('mousedown', (e) => {
                isDown = true;
                startX = e.pageX - slider.offsetLeft;
                scrollLeft = slider.scrollLeft;
            });
            slider.addEventListener('mouseleave', () => {
                isDown = false;
            });
            slider.addEventListener('mouseup', () => {
                isDown = false;
            });
            slider.addEventListener('mousemove', (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - slider.offsetLeft;
                const walk = (x - startX);
                slider.scrollLeft = scrollLeft - walk;
            });
        });

        return {
            form,
            types,
            results,
            error,
            more,
            loading,
            formChanged,
            selectType
        }
    },
    components: {
        zsearchForm, zsearchTypes, zsearchResults
    },
    template: `<div class="zsearch__body" :class="{finded: form.q.length}">
        <div zsearch-close class="zsearch__close">
            <svg class="icms-svg-icon w-16" fill="currentColor">
                <use href="/templates/modern/images/icons/solid.svg#times"></use>
            </svg>
        </div>
        <div class="zsearch__form" :class="{animated: loading}">
            <zsearch-form :form="form" @formChanged='formChanged'></zsearch-form>
        </div>
        <div class="zsearch__result">
            <div class="zsearch__types">
                <zsearch-types :types="types" @selectType="selectType"></zsearch-types>
            </div>
            <zsearch-results :results="results"></zsearch-results>
        </div>
        <div v-if="error" class="zsearch__error">{{ error }}</div>
        <div class="zsearch__more" ref="more"></div>
    </div>`
}