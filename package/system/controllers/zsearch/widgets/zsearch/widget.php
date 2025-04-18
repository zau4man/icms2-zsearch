<?php

class widgetZsearchZsearch extends cmsWidget {

    // запрещаем кеширование виджета
    public $is_cacheable = false;

    public function run() {

        cmsCore::loadControllerLanguage('search');
        return [];

    }

}
