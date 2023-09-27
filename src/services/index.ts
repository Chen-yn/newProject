// import * as user from '@/services/user';
// import * as department from '@/services/department';
// import * as role from '@/services/role';
// import * as project from '@/services/project';
// import * as product from '@/services/product';
// import * as requirement from '@/services/requirement';
// import * as schedule from '@/services/schedule';
// import * as taskpool from './taskpool';
// import * as Casepool from './Casepool'
// import * as BugData from './BugData'
// import * as Login from './login'
// import * as system from './system'
// import * as exports from './export'
// import * as common from './common'

//本地
// export const GLOBAL_HTTP_CTX =
//   process.env.NODE_ENV === 'production' ? 'http://172.22.175.194:8088/api-sys' : '/api-sys';
export const GLOBAL_HTTP_CTX =
    process.env.NODE_ENV === 'production' ? 'http://172.22.175.194:8088/api' : '/api';

// 定义接口地址
export const URL = {
    CHECK_USERNAME: `${GLOBAL_HTTP_CTX}/user/check-username`,
    DOWNLOAD_USER_TEMPLATE: `${GLOBAL_HTTP_CTX}/user/download-template`,
    EXPORT_USER: `${GLOBAL_HTTP_CTX}/user/export`,
    ADD_USER_PROJECT: `${GLOBAL_HTTP_CTX}/user/add-user-project`,
    UPDATE_USER_PROJECT: `${GLOBAL_HTTP_CTX}/user/update-user-project`,
    DELETE_USER_PROJECT: `${GLOBAL_HTTP_CTX}/user/delete-user-project`,
    GET_USER_PROJECT_LIST: `${GLOBAL_HTTP_CTX}/user/get-user-project-list`,
    EXPORT_USER_PROJECT: `${GLOBAL_HTTP_CTX}/user/export-user-project`,
    EXPORT_PROJECT: `${GLOBAL_HTTP_CTX}/project/export`,
    DOWNLOAD_PROJECT_TEMPLATE: `${GLOBAL_HTTP_CTX}/project/download_template`,
    FILE_UPLOAD: `${GLOBAL_HTTP_CTX}/file/upload2`, //上传BUG附件
    FILE_DOWNLOAD: `${GLOBAL_HTTP_CTX}/file/file_download`, //下载附件
    CUSTOMER_CONFIRMATION_DELETE: `${GLOBAL_HTTP_CTX}/requirement/customer_confirmation_delete`, //删除用户上传的客户确认资料
    CUSTOMER_CONFIRMATION_GET: `${GLOBAL_HTTP_CTX}/requirement/customer_confirmation_get`, //客户端列表

    AUTH_TOKEN_LOGIN: `${GLOBAL_HTTP_CTX}/auth/token_login`,
    AUTH_ISUSER: `${GLOBAL_HTTP_CTX}/auth/isuser`,//校验账户是否存在
    AUTH_FVCEMAIL: `${GLOBAL_HTTP_CTX}/auth/fvcemail`,//校验账户是否存在
    AUTH_FPD: `${GLOBAL_HTTP_CTX}/auth/fpd`,//密码重置

    my_todo_project_folder: `${GLOBAL_HTTP_CTX}/my/todo/project_folder`,



    EXPORT_TEMPLATE_INFO: `${GLOBAL_HTTP_CTX}/export/template_info`,//个人工作台导出的默认字段获取
    EXPORT_USER_TEMPLE_ADD: `${GLOBAL_HTTP_CTX}/export/user_template_add`,//个人工作台用户模板新建
    EXPORT_USER_TEMPLATE: `${GLOBAL_HTTP_CTX}/export/user_template`,//个人工作台用户模板获取
    EXPORT_USER_TEMPLATE_DEL: `${GLOBAL_HTTP_CTX}/export/user_template_del`,//个人工作台模板删除
    MY_PROJECTS_EXPORT: `${GLOBAL_HTTP_CTX}/my/projects/export`,//个人工作台导出

    REQUIREMENT_IMPORT_TEMPLTE: `${GLOBAL_HTTP_CTX}/requirement/import/template`,//需求导入模板下载


    SCHEDULE_RXPORT: `${GLOBAL_HTTP_CTX}/schedule/export`,//需求导出
    REQUIREMENT_RXPORT: `${GLOBAL_HTTP_CTX}/requirement/export`,//需求导出
    REQUIREMENT_IMPORT: `${GLOBAL_HTTP_CTX}/requirement/import`,//需求导入

    TASK_EXPORT: `${GLOBAL_HTTP_CTX}/task/export`,//任务导出
    USE_CASE_EXPORT: `${GLOBAL_HTTP_CTX}/use-case/export`,//用例导出
    BUG_EXPORT: `${GLOBAL_HTTP_CTX}/bug/export`,//bug导出


    LOGIN: `${GLOBAL_HTTP_CTX}/auth/token`, // 用做登陆
    // LOGIN_Info: `${GLOBAL_HTTP_CTX}/my/roles`, //获取权限
    LOGIN_Info: `${GLOBAL_HTTP_CTX}/my/roles_set`, //获取权限
    Scope: `${GLOBAL_HTTP_CTX}/auth/verifycode`, //验证码

    GET_MY_TODO: `${GLOBAL_HTTP_CTX}/my/todo`, // 我的待办
    GET_MY_UNCLOSE: `${GLOBAL_HTTP_CTX}/my/unclose`, // 我的未关闭
    GET_MY_PROJECTS: `${GLOBAL_HTTP_CTX}/my/projects`, // 个人工作台的项目列表
    EXPORT_MY_PROJECTS: `${GLOBAL_HTTP_CTX}/my/projects/export`, // 导出全部项目列表
    CHANGE_PASSWORD: `${GLOBAL_HTTP_CTX}/my/change-password`, // 修改密码


    ATTACH_MYPROJECTS: `${GLOBAL_HTTP_CTX}/my/projects/attach`, // 大生产项目关联到我
    UPDATE_PROJECT: `${GLOBAL_HTTP_CTX}/project/`, // 更新大生产项目状态
    ADD_PROJECT: `${GLOBAL_HTTP_CTX}/project/add`, // 新增大生产项目
    GET_PROJECT_LIST: `${GLOBAL_HTTP_CTX}/project/get-list`, // 获取大生产项目信息
    GET_PROJECT_LIST_User: `${GLOBAL_HTTP_CTX}/project/get-list-user`, // 获取大生产项目信息
    DELETE_Project_Delete: `${GLOBAL_HTTP_CTX}/project/`,//大生产项目删除
    GET_INFO_LIST: `${GLOBAL_HTTP_CTX}/project/get-info`, // 获取大生产项目信息
    POST_schedule_close: `${GLOBAL_HTTP_CTX}/schedule/close`, // 关闭计划

    GET_PRODUCT_LIST: `${GLOBAL_HTTP_CTX}/product/get-product`, // 获取产品列表
    ADD_PRODUCT: `${GLOBAL_HTTP_CTX}/product/add-product`, // 添加产品列表
    DEL_PRODUCT: `${GLOBAL_HTTP_CTX}/product/delete-product`, // 删除产品
    UPDATE_PRODUCT: `${GLOBAL_HTTP_CTX}/product/update-product`, // 更新产品顺序

    GET_USER_LIST: `${GLOBAL_HTTP_CTX}/user/get-list?include_roles=yes`, // 用户管理的列表
    GET_USER_STAFF_TYPE: `${GLOBAL_HTTP_CTX}/user/get-staff-type`, // 获取角色类别
    GET_department_user: `${GLOBAL_HTTP_CTX}/department/get-department_user`, //部门获取人员信息 
    USER_GET_LIST_ASSIGN: `${GLOBAL_HTTP_CTX}/user/get-list-assign`, //获取可指派用户列表



    DELETE_USER: `${GLOBAL_HTTP_CTX}/user/delete-user`, // 删除用户列表用户
    ADD_USER: `${GLOBAL_HTTP_CTX}/user/add-user`, // 新增用户
    UPDATE_USER: `${GLOBAL_HTTP_CTX}/user/update-user`, // 更新用户状态
    ROLE_STATUS: `${GLOBAL_HTTP_CTX}/role/change-status`, // 更新角色状态
    User_Change_Status: `${GLOBAL_HTTP_CTX}/user/change-status`, // 更新用户状态
    GET_ALL_USER: `${GLOBAL_HTTP_CTX}/user/get-list-local`, // 获取所有人员信息

    GET_DEPARTMENT_INFO: `${GLOBAL_HTTP_CTX}/department/get-department`, // 获取部门树列表
    ADD_DEPARTMENT: `${GLOBAL_HTTP_CTX}/department/add-department`,
    UPDATE_DEPARTMENT: `${GLOBAL_HTTP_CTX}/department/update-department`, // 更新部门信息
    DELETE_DEPARTMENT: `${GLOBAL_HTTP_CTX}/department/delete-department`, // 删除部门
    UPDATE_DEPARTMENT_LEVEL: `${GLOBAL_HTTP_CTX}/department/update-department-level`,

    GET_ROLE_PAGING_LIST: `${GLOBAL_HTTP_CTX}/role/get-list`, // 获取角色列表
    ADD_ROLE: `${GLOBAL_HTTP_CTX}/role/add-role`, // 添加角色
    DELETE_ROLE: `${GLOBAL_HTTP_CTX}/role/delete-role`, // 删除角色
    UPDATE_ROLE: `${GLOBAL_HTTP_CTX}/role/update-role`, // 更新角色
    ADD_WHITE_LIST: `${GLOBAL_HTTP_CTX}/role/add-whitelist`, // 设置白名单
    GET_WHITE_LIST: `${GLOBAL_HTTP_CTX}/role/whitelist`, // 获取白名单列表

    EXPORT_ROLE: `${GLOBAL_HTTP_CTX}/role/export`,
    GET_ROLE_LIST: `${GLOBAL_HTTP_CTX}/user/get-role`,

    Rquirement_Search: `${GLOBAL_HTTP_CTX}/requirement/`, //需求列表
    Rquirement_Create: `${GLOBAL_HTTP_CTX}/requirement/`, //新增
    Rquirement_Update: `${GLOBAL_HTTP_CTX}/requirement/`, //更新
    Rquirement_Delete: `${GLOBAL_HTTP_CTX}/requirement/`, //删除
    Rquirement_Detail: `${GLOBAL_HTTP_CTX}/requirement/`, //获取需求详情
    Rquirement_Close: `${GLOBAL_HTTP_CTX}/requirement/close`, //关闭

    Rquirement_Change: `${GLOBAL_HTTP_CTX}/requirement/change`, //变更需求
    Rquirement_ChangePass: `${GLOBAL_HTTP_CTX}/requirement/change-pass`, //通过变更需求
    Rquirement_ChangeReject: `${GLOBAL_HTTP_CTX}/requirement/change-reject`, // 需求变更驳回
    Requirement_Specification_Template: `${GLOBAL_HTTP_CTX}/requirement/specification/template`, //生成说明书
    MT_TODO_CHECK_REQUIREMENT: `${GLOBAL_HTTP_CTX}/my/todo/check_requirement`,// 变更审批
    REQUIREMENT_REQUIREMENT_INFO: `${GLOBAL_HTTP_CTX}/requirement/requirement_info`,//需求变更单


    Moudle_Index: `${GLOBAL_HTTP_CTX}/module/`, // 模块列表
    Moudle_Create: `${GLOBAL_HTTP_CTX}/module/`, // 新增模块
    Moudle_Updata: `${GLOBAL_HTTP_CTX}/module/`, // 修改模块
    Moudle_Delete: `${GLOBAL_HTTP_CTX}/module/delete`, // 删除模块

    Rquirement_ReviewStart: `${GLOBAL_HTTP_CTX}/requirement/review-start`, // 提交评审
    Rquirement_ReviewUser: `${GLOBAL_HTTP_CTX}/requirement/review-user`, // 修改评审用户
    Rquirement_ReviewPass: `${GLOBAL_HTTP_CTX}/requirement/review-pass`, //需求评审通过
    Rquirement_ReviewReject: `${GLOBAL_HTTP_CTX}/requirement/review-reject`, //需求驳回
    Rquirement_AttachSchedule: `${GLOBAL_HTTP_CTX}/requirement/attach-schedule`, //需求关联计划

    Schedule_Search: `${GLOBAL_HTTP_CTX}/schedule/`, //计划列表
    Schedule_Detail: `${GLOBAL_HTTP_CTX}/schedule/`, //计划详情
    Schedule_ADD: `${GLOBAL_HTTP_CTX}/schedule/`, //计划列表
    Schedule_CHANGE: `${GLOBAL_HTTP_CTX}/schedule/`, //修改计划


    TaskPool_Search: `${GLOBAL_HTTP_CTX}/task/`, //任务列表
    TaskPool_TaskCreate: `${GLOBAL_HTTP_CTX}/task/`, //任务新建
    TaskPool_Detail: `${GLOBAL_HTTP_CTX}/task/`, //任务详情
    TaskPool_Search_List: `${GLOBAL_HTTP_CTX}/task/`, //查询任务列表
    TaskPool_Update: `${GLOBAL_HTTP_CTX}/task/`, //查询任务列表
    TaskPool_Delete: `${GLOBAL_HTTP_CTX}/task/`, //任务删除
    TaskPool_Rquirement_Search: `${GLOBAL_HTTP_CTX}/requirement/`,//关联需求
    TaskPool_ADD: `${GLOBAL_HTTP_CTX}/schedule/`, //所属计划
    TaskPool_Task_Report: `${GLOBAL_HTTP_CTX}/task-report/`, //任务日报详情
    TaskPool_Report_Search: `${GLOBAL_HTTP_CTX}/task-report/`, //任务日报列表
    Task_update_status: `${GLOBAL_HTTP_CTX}/task/status`, //任务关闭
    Task_report_create: `${GLOBAL_HTTP_CTX}/task-report/`, //任务日报新建
    Task_report_delete: `${GLOBAL_HTTP_CTX}/task-report/`, //任务日报删除
    Task_report_update: `${GLOBAL_HTTP_CTX}/task-report/`, //任务日报修改
    TASK_REOPEN: `${GLOBAL_HTTP_CTX}/task/reopen`, //任务重新启动



    Casepool_detail: `${GLOBAL_HTTP_CTX}/use-case/`, //用例详情
    Casepool_create: `${GLOBAL_HTTP_CTX}/use-case/`, //用例新建
    Casepool_update: `${GLOBAL_HTTP_CTX}/use-case/`, //用例修改
    Casepool_search: `${GLOBAL_HTTP_CTX}/use-case/`, //用例列表
    Casepool_delete: `${GLOBAL_HTTP_CTX}/use-case/`, //用例删除
    Casepool_labels: `${GLOBAL_HTTP_CTX}/use-case/export/labels`, //用例导出列名称
    Casepool_export: `${GLOBAL_HTTP_CTX}/use-case/export`, //用例导出
    Casepool_import_data: `${GLOBAL_HTTP_CTX}/use-case/import`,//用例导入
    Casepool_execute_create: `${GLOBAL_HTTP_CTX}/use-case/execute`, //执行用例新建

    Bug_search: `${GLOBAL_HTTP_CTX}/bug/`, //BUG列表
    Bug_search_List: `${GLOBAL_HTTP_CTX}/bug/`, //Bug查询列表
    Bug_Create: `${GLOBAL_HTTP_CTX}/bug/`, //BUG新增
    Bug_Update: `${GLOBAL_HTTP_CTX}/bug/`, //BUG修改
    Bug_delete: `${GLOBAL_HTTP_CTX}/bug/`, //Bug删除
    Bug_Detail: `${GLOBAL_HTTP_CTX}/bug/`,//Bug详情
    Bug_Close: `${GLOBAL_HTTP_CTX}/bug/close`,//Bug关闭
    Bug_records: `${GLOBAL_HTTP_CTX}/bug/records/`,//Bug流转
    Bug_process: `${GLOBAL_HTTP_CTX}/bug/process`,//Bug处理
    Bug_assign: `${GLOBAL_HTTP_CTX}/bug/assign`,//Bug指派
};