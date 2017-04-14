<?php namespace WebEd\Base\CustomFields\Repositories\Contracts;

use WebEd\Base\Models\Contracts\BaseModelContract;

interface FieldItemRepositoryContract
{
    /**
     * @param array $data
     * @return int
     */
    public function createFieldItem(array $data);

    /**
     * @param int|null|BaseModelContract $id
     * @param array $data
     * @return int
     */
    public function createOrUpdateFieldItem($id, array $data);

    /**
     * @param int|null|BaseModelContract $id
     * @param array $data
     * @return int
     */
    public function updateFieldItem($id, array $data);

    /**
     * @param int|BaseModelContract|array $id
     * @return bool
     */
    public function deleteFieldItem($id);
}
