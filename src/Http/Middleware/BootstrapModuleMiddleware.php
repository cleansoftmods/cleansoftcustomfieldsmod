<?php namespace WebEd\Base\CustomFields\Http\Middleware;

use \Closure;

class BootstrapModuleMiddleware
{
    public function __construct()
    {

    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  \Closure $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        /**
         * Register to dashboard menu
         */
        \DashboardMenu::registerItem([
            'id' => 'webed-custom-fields',
            'priority' => 999.3,
            'parent_id' => null,
            'heading' => null,
            'title' => trans('webed-custom-fields::base.admin_menu.title'),
            'font_icon' => 'icon-briefcase',
            'link' => route('admin::custom-fields.index.get'),
            'css_class' => null,
            'permissions' => ['view-custom-fields'],
        ]);

        $this->registerUsersFields();
        $this->registerPagesFields();

        return $next($request);
    }

    protected function registerUsersFields()
    {
        custom_field_rules()
            ->registerRule('other', trans('webed-custom-fields::rules.logged_in_user'), 'logged_in_user', function () {
                $userRepository = app(\WebEd\Base\Users\Repositories\Contracts\UserRepositoryContract::class);

                $users = $userRepository->get();

                $userArr = [];
                foreach ($users as $user) {
                    $userArr[$user->id] = $user->username . ' - ' . $user->email;
                }

                return $userArr;
            })
            ->registerRule('other', trans('webed-custom-fields::rules.logged_in_user_has_role'), 'logged_in_user_has_role', function () {
                $repository = app(\WebEd\Base\ACL\Repositories\Contracts\RoleRepositoryContract::class);

                $roles = $repository->get();

                $rolesArr = [];
                foreach ($roles as $role) {
                    $rolesArr[$role->id] = $role->name . ' - (' . $role->slug . ')';
                }

                return $rolesArr;
            });
    }

    protected function registerPagesFields()
    {
        custom_field_rules()
            ->registerRule('basic', trans('webed-custom-fields::rules.page_template'), 'page_template', get_templates('Page'))
            ->registerRule('basic', trans('webed-custom-fields::rules.page'), 'page', function () {
                $pageRepository = app(\WebEd\Base\Pages\Repositories\Contracts\PageRepositoryContract::class);
                $pages = $pageRepository->get();
                $pageArray = [];
                foreach ($pages as $row) {
                    $pageArray[$row->id] = $row->title;
                }
                return $pageArray;
            })
            ->registerRule('other', trans('webed-custom-fields::rules.model_name'), 'model_name', [
                'page' => 'Page'
            ]);
    }

    protected function registerBlogFields()
    {
        if (modules_management()->isActivated('webed-blog') && modules_management()->isInstalled('webed-blog')) {
            custom_field_rules()
                ->registerRuleGroup('blog')
                ->registerRule('blog', 'Post template', 'blog.post_template', get_templates('Post'))
                ->registerRule('blog', 'Category template', 'blog.category_template', get_templates('Category'))
                ->registerRule('blog', 'Category', 'blog.category', function () {
                    $categories = get_categories();

                    $categoriesArr = [];
                    foreach ($categories as $row) {
                        $categoriesArr[$row->id] = $row->indent_text . $row->title;
                    }
                    return $categoriesArr;
                })
                ->registerRule('blog', 'Posts with related category', 'blog.post_with_related_category', function () {
                    $categories = get_categories();

                    $categoriesArr = [];
                    foreach ($categories as $row) {
                        $categoriesArr[$row->id] = $row->indent_text . $row->title;
                    }
                    return $categoriesArr;
                })
                ->registerRule('blog', 'Post with related category template', 'blog.post_with_related_category_template', get_templates('Category'))
                ->registerRule('other', 'Model name', 'model_name', [
                    'blog.post' => '(Blog) Post',
                    'blog.category' => '(Blog) Category',
                ]);
        }
    }
}
