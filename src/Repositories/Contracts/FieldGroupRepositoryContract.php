<?php namespace WebEd\Base\CustomFields\Repositories\Contracts;

use WebEd\Base\Models\Contracts\BaseModelContract;

interface FieldGroupRepositoryContract
{
    /**
     * @param array $data
     * @return int
     */
    public function createFieldGroup(array $data);

    /**
     * @param int|null|BaseModelContract $id
     * @param array $data
     * @return int
     */
    public function createOrUpdateFieldGroup($id, array $data);

    /**
     * @param int|null|BaseModelContract $id
     * @param array $data
     * @return int
     */
    public function updateFieldGroup($id, array $data);

    /**
     * @param int|BaseModelContract|array $id
     * @return bool
     */
    public function deleteFieldGroup($id);

    /**
     * @param int $groupId
     * @param null $parentId
     * @param bool $withValue
     * @param null $morphClass
     * @param null $morphId
     * @return array
     */
    public function getFieldGroupItems($groupId, $parentId = null, $withValue = false, $morphClass = null, $morphId = null);
}
