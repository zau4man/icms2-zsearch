<?php $this->addControllerJSFromContext('zsearch-wd', 'zsearch'); ?>
<?php $this->addControllerCSSFromContext('zsearch-wd', 'zsearch'); ?>
<script>
    const ZSEARCH_VUE = '/<?php echo $this->getTplFilePath("js/vendors/vue/vue.min.js", false); ?>';
    const ZSEARCH_COMPONENT = '/<?php echo $this->getTplFilePath("controllers/zsearch/js/zsearch-component.js", false); ?>';
    const ZSEARCH_STYLES = '/<?php echo $this->getStylesFileName('zsearch'); ?>';
    const ZSEARCH_URL = '<?php echo href_to('search'); ?>';
    const ZSEARCH_NO_RESULTS = '<?php echo LANG_SEARCH_NO_RESULTS; ?>';
    let ZSEARCH_LOADED = false;
</script>
<a zsearch-show class="nav-link" href="#" title="Поиск"><?php html_svg_icon('solid', 'search'); ?></a>
<div id="zsearch" class="zsearch d-none"></div>