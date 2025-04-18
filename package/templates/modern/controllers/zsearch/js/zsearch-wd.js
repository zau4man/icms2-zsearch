(function () {
    function open() {
        $('#zsearch').removeClass('d-none');
        $('body').addClass('body_overlow');
        if (!ZSEARCH_LOADED) {
            loadCss();
            loadScripts();
            ZSEARCH_LOADED = true;
        }
    }

    function close() {
        $('#zsearch').addClass('d-none');
        $('body').removeClass('body_overlow');
    }

    function loadCss() {
        let zsearch_styles = document.createElement('link');
        zsearch_styles.setAttribute('href', ZSEARCH_STYLES);
        zsearch_styles.setAttribute('rel', 'stylesheet');
        document.body.appendChild(zsearch_styles);
    }

    function loadScripts() {
        let vue_script = document.createElement('script');
        vue_script.setAttribute('src', ZSEARCH_VUE);
        document.body.appendChild(vue_script);

        vue_script.onload = () => {
            let zsearch_component = document.createElement('script');
            zsearch_component.setAttribute('src', ZSEARCH_COMPONENT);
            zsearch_component.setAttribute('type', 'module');
            document.body.appendChild(zsearch_component);
        };
    }

    $('[zsearch-show]').click(function (e) {
        e.preventDefault();
        open();
    });
    $('#zsearch').on('click', '[zsearch-close]', function () {
        close();
    });
})()