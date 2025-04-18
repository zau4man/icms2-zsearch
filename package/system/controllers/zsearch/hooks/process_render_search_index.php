<?php

class onZsearchProcessRenderSearchIndex extends cmsAction {

    public function run($data) {

        if (cmsCore::getInstance()->request->has('zsearch')) {

            $results = $data[1]['results'];
            if (!$results) {
                return $this->cms_template->renderJSON([
                    'error' => LANG_SEARCH_NO_RESULTS
                ]);
            }

            $types = [];
            $reslts = [];

            foreach ($results as $result) {
                if ($result['items']) {
                    $reslts = $this->prepareResults($result['items']);
                    $result['isActive'] = true;
                }
                unset($result['items']);
                $types[] = $result;
            }

            return $this->cms_template->renderJSON(['types' => $types, 'results' => $reslts]);
        }

        return $data;
    }

    public function prepareResults($items) {
        $results = [];
        foreach ($items as $item) {

            if (!empty($item['image'])) {
                $item['photo'] = $item['image'];
            }
            $item['photo'] = empty($item['photo']) ? false : $item['photo'];
            $item['date'] = lang_date(date('j F Y', strtotime($item['date_pub'])));
            if (!empty($item['ctype'])) {
                $item['type'] = $item['ctype']['title'];
            } else {
                $item['type'] = '';
            }
            if (!empty($item['content'])) {
                $item['content'] = html_strip($item['content'], 150);
            }
            unset($item['ctype'], $item['fields'], $item['image'], $item['date_pub']);

            $item['id'] = string_random(10);

            $results[] = $item;

        }
        return $results;
    }

}