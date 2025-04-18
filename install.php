<?php

function install_package() {

    $core = cmsCore::getInstance();

    //установка компонента
    if (!$core->db->getRowsCount('controllers', "name = 'zsearch'")) {
        $core->db->query("INSERT INTO `{#}controllers` (`title`, `name`, `slug`, `is_enabled`, `options`, `author`, `url`, `version`, `is_backend`, `is_external`, `files`, `addon_id`) VALUES ('ZПоиск', 'zsearch', NULL, 1, NULL , 'Zau4man', 'https://www.zau4man.ru', '1.0.0', NULL, NULL, NULL, NULL);");
    }

    if (!$core->db->getRowsCount('widgets', "controller = 'zsearch' AND `name` = 'zsearch'")) {
        $core->db->query("INSERT INTO `{#}widgets` (`controller`, `name`, `title`, `author`, `url`, `version`) VALUES
    ('zsearch', 'zsearch', 'ZПоиск', 'Zau4man', 'https://www.zau4man.ru', '1.0.0');");
    }

    //обновление
    $core->db->query("UPDATE `{#}controllers` SET `version` = '1.0.1' WHERE `name` = 'zsearch';");
    $core->db->query("UPDATE `{#}widgets` SET `version` = '1.0.1' WHERE `controller` = 'zsearch' AND `name` = 'zsearch';");

    return true;
}