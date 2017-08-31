<?php namespace WebEd\Base\CustomFields\Http\Controllers;

use Illuminate\Http\Request;
use WebEd\Base\CustomFields\Actions\CreateCustomFieldAction;
use WebEd\Base\CustomFields\Actions\DeleteCustomFieldAction;
use WebEd\Base\CustomFields\Actions\ExportCustomFieldsAction;
use WebEd\Base\CustomFields\Actions\ImportCustomFieldsAction;
use WebEd\Base\CustomFields\Actions\UpdateCustomFieldAction;
use WebEd\Base\CustomFields\Http\DataTables\FieldGroupsListDataTable;
use WebEd\Base\CustomFields\Http\Requests\CreateFieldGroupRequest;
use WebEd\Base\CustomFields\Http\Requests\UpdateFieldGroupRequest;
use WebEd\Base\CustomFields\Repositories\Contracts\FieldGroupRepositoryContract;
use WebEd\Base\CustomFields\Repositories\FieldGroupRepository;
use WebEd\Base\Http\Controllers\BaseAdminController;
use WebEd\Base\Http\DataTables\AbstractDataTables;
use Yajra\Datatables\Engines\BaseEngine;

class CustomFieldController extends BaseAdminController
{
    protected $module = WEBED_CUSTOM_FIELDS;

    /**
     * @var FieldGroupRepository
     */
    protected $repository;

    /**
     * @param FieldGroupRepository $repository
     */
    public function __construct(FieldGroupRepositoryContract $repository)
    {
        parent::__construct();

        $this->repository = $repository;

        $this->middleware(function (Request $request, $next) {
            $this->getDashboardMenu($this->module);

            $this->breadcrumbs->addLink(trans($this->module . '::base.page_title'), route('admin::custom-fields.index.get'));

            return $next($request);
        });
    }

    /**
     * @param AbstractDataTables|BaseEngine $dataTables
     * @return @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getIndex(FieldGroupsListDataTable $dataTables)
    {
        $this->assets->addJavascriptsDirectly(asset('admin/modules/custom-fields/import-field-group.js'));

        $this->setPageTitle(trans($this->module . '::base.page_title'));

        $this->dis['dataTable'] = $dataTables->run();

        return do_filter(BASE_FILTER_CONTROLLER, $this, WEBED_CUSTOM_FIELDS, 'index.get', $dataTables)->viewAdmin('index');
    }

    /**
     * @param AbstractDataTables|BaseEngine $dataTables
     * @return mixed
     */
    public function postListing(FieldGroupsListDataTable $dataTables)
    {
        $data = $dataTables->with($this->groupAction());

        return do_filter(BASE_FILTER_CONTROLLER, $data, WEBED_CUSTOM_FIELDS, 'index.post', $this);
    }

    /**
     * Handle group actions
     * @return array
     */
    protected function groupAction()
    {
        $data = [];
        if ($this->request->get('customActionType', null) === 'group_action') {
            if (!$this->userRepository->hasPermission($this->loggedInUser, ['edit-field-groups'])) {
                return [
                    'customActionMessage' => trans('webed-acl::base.do_not_have_permission'),
                    'customActionStatus' => 'danger',
                ];
            }

            $ids = (array)$this->request->get('id', []);
            $actionValue = $this->request->get('customActionValue');

            switch ($actionValue) {
                case 'deleted':
                    if (!$this->userRepository->hasPermission($this->loggedInUser, ['delete-field-groups'])) {
                        return [
                            'customActionMessage' => trans('webed-acl::base.do_not_have_permission'),
                            'customActionStatus' => 'danger',
                        ];
                    }

                    $action = app(DeleteCustomFieldAction::class);
                    foreach ($ids as $id) {
                        $this->deleteDelete($action, $id);
                    }
                    break;
                case 1:
                case 0:
                    $action = app(UpdateCustomFieldAction::class);

                    foreach ($ids as $id) {
                        $action->run($id, [
                            'status' => $actionValue,
                        ]);
                    }
                    break;
                default:
                    return [
                        'customActionMessage' => trans('webed-core::errors.' . \Constants::METHOD_NOT_ALLOWED . '.message'),
                        'customActionStatus' => 'danger'
                    ];
                    break;
            }
            $data['customActionMessage'] = trans('webed-core::base.form.request_completed');
            $data['customActionStatus'] = 'success';
        }
        return $data;
    }

    /**
     * Update status
     * @param $id
     * @param $status
     * @return \Illuminate\Http\JsonResponse
     */
    public function postUpdateStatus(UpdateCustomFieldAction $action, $id, $status)
    {
        $result = $action->run($id, [
            'status' => $status
        ]);

        return response()->json($result, $result['response_code']);
    }

    /**
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function getCreate()
    {
        do_action(BASE_ACTION_BEFORE_CREATE, WEBED_CUSTOM_FIELDS, 'create.get');

        $this->setPageTitle(trans($this->module . '::base.form.create_field_group'));
        $this->breadcrumbs->addLink(trans($this->module . '::base.form.create_field_group'));

        return do_filter(BASE_FILTER_CONTROLLER, $this, WEBED_CUSTOM_FIELDS, 'create.get')->viewAdmin('create');
    }

    /**
     * @param CreateFieldGroupRequest $request
     * @param CreateCustomFieldAction $action
     * @return \Illuminate\Http\RedirectResponse
     */
    public function postCreate(CreateFieldGroupRequest $request, CreateCustomFieldAction $action)
    {
        $data = array_merge($request->get('field_group', []), [
            'created_by' => $this->loggedInUser->id,
        ]);

        $result = $action->run($data);

        $msgType = $result['error'] ? 'danger' : 'success';

        flash_messages()
            ->addMessages($result['messages'], $msgType)
            ->showMessagesOnSession();

        if (!$result) {
            return redirect()->back()->withInput();
        }

        if ($this->request->has('_continue_edit')) {
            return redirect()->to(route('admin::custom-fields.field-group.edit.get', ['id' => $result['data']['id']]));
        }

        return redirect()->to(route('admin::custom-fields.index.get'));
    }

    /**
     * @param $id
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\Http\RedirectResponse|\Illuminate\View\View
     */
    public function getEdit($id)
    {
        $item = $this->repository->find($id);

        $item = do_filter(BASE_FILTER_BEFORE_UPDATE, $item, WEBED_CUSTOM_FIELDS, 'edit.get');

        if (!$item) {
            flash_messages()
                ->addMessages(trans($this->module . '::base.item_not_exists'), 'danger')
                ->showMessagesOnSession();

            return redirect()->back();
        }

        $this->setPageTitle(trans($this->module . '::base.form.edit_field_group') . ' #' . $item->id);
        $this->breadcrumbs->addLink(trans($this->module . '::base.form.edit_field_group'));

        $this->dis['object'] = $item;

        $this->dis['customFieldItems'] = json_encode($this->repository->getFieldGroupItems($id));

        return do_filter(BASE_FILTER_CONTROLLER, $this, WEBED_CUSTOM_FIELDS, 'edit.get', $id)->viewAdmin('edit');
    }

    /**
     * @param $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function postEdit(UpdateFieldGroupRequest $request, UpdateCustomFieldAction $action, $id)
    {
        $data = array_merge($request->get('field_group', []), [
            'updated_by' => $this->loggedInUser->id,
        ]);

        $result = $action->run($id, $data);

        $msgType = $result['error'] ? 'danger' : 'success';

        flash_messages()
            ->addMessages($result['messages'], $msgType)
            ->showMessagesOnSession();

        if ($result['error'] || $this->request->has('_continue_edit')) {
            return redirect()->back();
        }

        return redirect()->to(route('admin::custom-fields.index.get'));
    }

    /**
     * @param DeleteCustomFieldAction $action
     * @param $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function deleteDelete(DeleteCustomFieldAction $action, $id)
    {
        $result = $action->run($id);

        return response()->json($result, $result['response_code']);
    }

    /**
     * @param ExportCustomFieldsAction $action
     * @param null $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function getExport(ExportCustomFieldsAction $action, $id = null)
    {
        $ids = [];

        if (!$id) {
            foreach ($this->repository->get(['id']) as $item) {
                $ids[] = $item->id;
            }
        } else {
            $ids[] = $id;
        }

        $json = $action->run($ids)['data'];

        return response()->json($json, \Constants::SUCCESS_CODE, [], JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);
    }

    /**
     * @param ImportCustomFieldsAction $action
     * @return array
     */
    public function postImport(ImportCustomFieldsAction $action)
    {
        $json = $this->request->get('json_data');

        return $action->run($json);
    }
}
