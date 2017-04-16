<?php

use WebEd\Base\Models\Contracts\BaseModelContract;
use WebEd\Base\Models\EloquentBase;
use WebEd\Base\CustomFields\Repositories\Contracts\CustomFieldRepositoryContract;
use WebEd\Base\CustomFields\Repositories\CustomFieldRepository;

if (!function_exists('get_field')) {
    /**
     * @param BaseModelContract|EloquentBase $object
     * @param null $alias
     * @param null|mixed $default
     * @return mixed|null
     */
    function get_field(BaseModelContract $object, $alias = null, $default = null)
    {
        /**
         * @var CustomFieldRepository $customFieldRepository
         */
        $customFieldRepository = app(CustomFieldRepositoryContract::class);

        $objectModelPrimaryKey = $object->getPrimaryKey();

        if ($alias === null || !trim($alias)) {
            return $customFieldRepository->findWhere([
                'use_for' => get_class($object),
                'use_for_id' => $object->$objectModelPrimaryKey
            ]);
        }

        $field = $customFieldRepository->findWhere([
            'use_for' => get_class($object),
            'use_for_id' => $object->$objectModelPrimaryKey,
            'slug' => $alias,
        ]);

        if (!$field) {
            return $default;
        }

        return $field->resolved_value;
    }
}

if (!function_exists('has_field')) {
    /**
     * @param BaseModelContract $object
     * @param null $alias
     * @return bool
     */
    function has_field(BaseModelContract $object, $alias = null)
    {
        if (!get_field($object, $alias)) {
            return false;
        }
        return true;
    }
}

if (!function_exists('get_sub_field')) {
    /**
     * @param array $parentField
     * @param $alias
     * @param null $default
     * @return mixed
     */
    function get_sub_field(array $parentField, $alias, $default = null)
    {
        foreach ($parentField as $field) {
            if (array_get($field, 'slug') === $alias) {
                return array_get($field, 'value', $default);
            }
        }
        return $default;
    }
}

if (!function_exists('has_sub_field')) {
    /**
     * @param array $parentField
     * @param $alias
     * @return bool
     */
    function has_sub_field(array $parentField, $alias)
    {
        if (!get_sub_field($parentField, $alias)) {
            return false;
        }
        return true;
    }
}

