<?php namespace WebEd\Base\CustomFields\Facades;

use Illuminate\Support\Facades\Facade;

class CustomFieldRulesFacade extends Facade
{
    /**
     * @return string
     */
    protected static function getFacadeAccessor()
    {
        return \WebEd\Base\CustomFields\Support\CustomFieldRules::class;
    }
}
