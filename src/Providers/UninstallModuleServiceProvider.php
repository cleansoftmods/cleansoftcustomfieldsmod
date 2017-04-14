<?php namespace WebEd\Base\CustomFields\Providers;

use Illuminate\Support\ServiceProvider;

class UninstallModuleServiceProvider extends ServiceProvider
{
    protected $moduleAlias = 'webed-custom-fields';

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        app()->booted(function () {
            $this->booted();
        });
    }

    protected function booted()
    {
        acl_permission()
        ->unsetPermissionByModule($this->moduleAlias);

        $this->dropSchema();
    }

    protected function dropSchema()
    {
        \Schema::dropIfExists('custom_fields');
        \Schema::dropIfExists('field_items');
        \Schema::dropIfExists('field_groups');
    }
}
