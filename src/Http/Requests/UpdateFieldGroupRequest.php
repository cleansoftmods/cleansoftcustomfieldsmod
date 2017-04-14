<?php namespace WebEd\Base\CustomFields\Http\Requests;

use WebEd\Base\Http\Requests\Request;

class UpdateFieldGroupRequest extends Request
{
    public $rules = [

    ];

    public function authorize()
    {
        //return $this->user()->hasPermission('edit-page');
        return true;
    }
}
