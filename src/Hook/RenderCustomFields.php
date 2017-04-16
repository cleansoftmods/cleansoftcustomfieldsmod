<?php namespace WebEd\Base\CustomFields\Hook;

use WebEd\Base\CustomFields\Facades\CustomFieldSupportFacade;
use WebEd\Base\Models\Contracts\BaseModelContract;
use WebEd\Base\Models\EloquentBase;
use WebEd\Base\Users\Models\User;

class RenderCustomFields
{
    public function __construct()
    {
        /**
         * @var User $loggedInUser
         */
        $loggedInUser = auth()->user();

        $roles = $loggedInUser->roles()->pluck('id')->toArray();

        add_custom_fields_rules_to_check([
            'logged_in_user' => $loggedInUser->id,
            'logged_in_user_has_role' => $roles
        ]);
    }

    /**
     * @param string $location
     * @param string $currentAction
     * @param BaseModelContract|EloquentBase $object
     */
    public function handle($location, $currentAction, $object = null)
    {
        if ($location != 'main') {
            return;
        }

        switch ($currentAction) {
            case WEBED_PAGES:
                add_custom_fields_rules_to_check([
                    'page_template' => isset($object->page_template) ? $object->page_template : '',
                    'page' => isset($object->id) ? $object->id : '',
                    'model_name' => WEBED_PAGES,
                ]);
                break;
        }

        $this->render($object);
    }

    protected function render($object)
    {
        $customFieldBoxes = get_custom_field_boxes($object, isset($object->id) ? $object->id : 0);

        if (!$customFieldBoxes) {
            return;
        }

        CustomFieldSupportFacade::renderAssets();

        echo CustomFieldSupportFacade::renderCustomFieldBoxes($customFieldBoxes);
    }
}