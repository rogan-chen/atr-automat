import Main from '@/components/main'
import parentView from '@/components/parent-view'

/**
 * iview-admin中meta除了原生参数外可配置的参数:
 * meta: {
 *  title: { String|Number|Function }
 *         显示在侧边栏、面包屑和标签栏的文字
 *         使用'{{ 多语言字段 }}'形式结合多语言使用，例子看多语言的路由配置;
 *         可以传入一个回调函数，参数是当前路由对象，例子看动态路由和带参路由
 *  hideInBread: (false) 设为true后此级路由将不会出现在面包屑中，示例看QQ群路由配置
 *  hideInMenu: (false) 设为true后在左侧菜单不会显示该页面选项
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  access: (null) 可访问该页面的权限数组，当前路由设置的权限会影响子路由
 *  icon: (-) 该页面在左侧菜单、面包屑和标签导航处显示的图标，如果是自定义图标，需要在图标名称前加下划线'_'
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */

export default [
  {
    path: '/login',
    name: 'login',
    meta: {
      title: 'Login - 登录',
      hideInMenu: true
    },
    component: () => import('@/view/login/login.vue')
  },
  {
    path: '/',
    name: '_home',
    redirect: '/home',
    component: Main,
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: {
          hideInMenu: true,
          title: '首页',
          notCache: true,
          icon: 'md-home'
        },
        component: () => import('@/view/single-page/home')
      }
    ]
  },
  {
    path: '/message',
    name: 'message',
    component: Main,
    meta: {
      hideInBread: true,
      hideInMenu: true
    },
    children: [
      {
        path: 'message_page',
        name: 'message_page',
        meta: {
          icon: 'md-notifications',
          title: '消息中心'
        },
        component: () => import('@/view/single-page/message/index.vue')
      }
    ]
  },
  // {
  //   path: '',
  //   name: 'doc',
  //   meta: {
  //     title: '日运行监控',
  //     href: 'https://lison16.github.io/iview-admin-doc/#/',
  //     icon: 'ios-book'
  //   }
  // },
  {
    path: '/components',
    name: 'components',
    meta: {
      icon: 'logo-buffer',
      title: '组件'
    },
    component: Main,
    children: [
      {
        path: 'tree_select_page',
        name: 'tree_select_page',
        meta: {
          icon: 'md-arrow-dropdown-circle',
          title: '树状下拉选择器'
        },
        component: () => import('@/view/components/tree-select/index.vue')
      },
      {
        path: 'count_to_page',
        name: 'count_to_page',
        meta: {
          icon: 'md-trending-up',
          title: '数字渐变'
        },
        component: () => import('@/view/components/count-to/count-to.vue')
      },
      {
        path: 'drag_list_page',
        name: 'drag_list_page',
        meta: {
          icon: 'ios-infinite',
          title: '拖拽列表'
        },
        component: () => import('@/view/components/drag-list/drag-list.vue')
      },
      {
        path: 'drag_drawer_page',
        name: 'drag_drawer_page',
        meta: {
          icon: 'md-list',
          title: '可拖拽抽屉'
        },
        component: () => import('@/view/components/drag-drawer')
      },
      {
        path: 'org_tree_page',
        name: 'org_tree_page',
        meta: {
          icon: 'ios-people',
          title: '组织结构树'
        },
        component: () => import('@/view/components/org-tree')
      },
      {
        path: 'tree_table_page',
        name: 'tree_table_page',
        meta: {
          icon: 'md-git-branch',
          title: '树状表格'
        },
        component: () => import('@/view/components/tree-table/index.vue')
      },
      {
        path: 'cropper_page',
        name: 'cropper_page',
        meta: {
          icon: 'md-crop',
          title: '图片裁剪'
        },
        component: () => import('@/view/components/cropper/cropper.vue')
      },
      {
        path: 'tables_page',
        name: 'tables_page',
        meta: {
          icon: 'md-grid',
          title: '多功能表格'
        },
        component: () => import('@/view/components/tables/tables.vue')
      },
      {
        path: 'split_pane_page',
        name: 'split_pane_page',
        meta: {
          icon: 'md-pause',
          title: '分割窗口'
        },
        component: () => import('@/view/components/split-pane/split-pane.vue')
      },
      {
        path: 'markdown_page',
        name: 'markdown_page',
        meta: {
          icon: 'logo-markdown',
          title: 'Markdown编辑器'
        },
        component: () => import('@/view/components/markdown/markdown.vue')
      },
      {
        path: 'editor_page',
        name: 'editor_page',
        meta: {
          icon: 'ios-create',
          title: '富文本编辑器'
        },
        component: () => import('@/view/components/editor/editor.vue')
      },
      {
        path: 'icons_page',
        name: 'icons_page',
        meta: {
          icon: '_bear',
          title: '自定义图标'
        },
        component: () => import('@/view/components/icons/icons.vue')
      }
    ]
  },
  // {
  //   path: '/join',
  //   name: 'join',
  //   component: Main,
  //   meta: {
  //     hideInBread: true
  //   },
  //   children: [
  //     {
  //       path: 'join_page',
  //       name: 'join_page',
  //       meta: {
  //         icon: '_qq',
  //         title: 'QQ群'
  //       },
  //       component: () => import('@/view/join-page.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/update',
  //   name: 'update',
  //   meta: {
  //     icon: 'md-cloud-upload',
  //     title: '数据上传'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'update_table_page',
  //       name: 'update_table_page',
  //       meta: {
  //         icon: 'ios-document',
  //         title: '上传Csv'
  //       },
  //       component: () => import('@/view/update/update-table.vue')
  //     },
  //     {
  //       path: 'update_paste_page',
  //       name: 'update_paste_page',
  //       meta: {
  //         icon: 'md-clipboard',
  //         title: '粘贴表格数据'
  //       },
  //       component: () => import('@/view/update/update-paste.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/excel',
  //   name: 'excel',
  //   meta: {
  //     icon: 'ios-stats',
  //     title: 'EXCEL导入导出'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'upload-excel',
  //       name: 'upload-excel',
  //       meta: {
  //         icon: 'md-add',
  //         title: '导入EXCEL'
  //       },
  //       component: () => import('@/view/excel/upload-excel.vue')
  //     },
  //     {
  //       path: 'export-excel',
  //       name: 'export-excel',
  //       meta: {
  //         icon: 'md-download',
  //         title: '导出EXCEL'
  //       },
  //       component: () => import('@/view/excel/export-excel.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/tools_methods',
  //   name: 'tools_methods',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'tools_methods_page',
  //       name: 'tools_methods_page',
  //       meta: {
  //         icon: 'ios-hammer',
  //         title: '工具方法',
  //         beforeCloseName: 'before_close_normal'
  //       },
  //       component: () => import('@/view/tools-methods/tools-methods.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/i18n',
  //   name: 'i18n',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'i18n_page',
  //       name: 'i18n_page',
  //       meta: {
  //         icon: 'md-planet',
  //         title: 'i18n - {{ i18n_page }}'
  //       },
  //       component: () => import('@/view/i18n/i18n-page.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_store',
  //   name: 'error_store',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_store_page',
  //       name: 'error_store_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/error-store/error-store.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/error_logger',
  //   name: 'error_logger',
  //   meta: {
  //     hideInBread: true,
  //     hideInMenu: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'error_logger_page',
  //       name: 'error_logger_page',
  //       meta: {
  //         icon: 'ios-bug',
  //         title: '错误收集'
  //       },
  //       component: () => import('@/view/single-page/error-logger.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/directive',
  //   name: 'directive',
  //   meta: {
  //     hideInBread: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'directive_page',
  //       name: 'directive_page',
  //       meta: {
  //         icon: 'ios-navigate',
  //         title: '指令'
  //       },
  //       component: () => import('@/view/directive/directive.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/multilevel',
  //   name: 'multilevel',
  //   meta: {
  //     icon: 'md-menu',
  //     title: '多级菜单'
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'level_2_1',
  //       name: 'level_2_1',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-1'
  //       },
  //       component: () => import('@/view/multilevel/level-2-1.vue')
  //     },
  //     {
  //       path: 'level_2_2',
  //       name: 'level_2_2',
  //       meta: {
  //         access: ['super_admin'],
  //         icon: 'md-funnel',
  //         showAlways: true,
  //         title: '二级-2'
  //       },
  //       component: parentView,
  //       children: [
  //         {
  //           path: 'level_2_2_1',
  //           name: 'level_2_2_1',
  //           meta: {
  //             icon: 'md-funnel',
  //             title: '三级'
  //           },
  //           component: () => import('@/view/multilevel/level-2-2/level-2-2-1.vue')
  //         },
  //         {
  //           path: 'level_2_2_2',
  //           name: 'level_2_2_2',
  //           meta: {
  //             icon: 'md-funnel',
  //             title: '三级'
  //           },
  //           component: () => import('@/view/multilevel/level-2-2/level-2-2-2.vue')
  //         }
  //       ]
  //     },
  //     {
  //       path: 'level_2_3',
  //       name: 'level_2_3',
  //       meta: {
  //         icon: 'md-funnel',
  //         title: '二级-3'
  //       },
  //       component: () => import('@/view/multilevel/level-2-3.vue')
  //     }
  //   ]
  // },
  // {
  //   path: '/argu',
  //   name: 'argu',
  //   meta: {
  //     hideInMenu: true
  //   },
  //   component: Main,
  //   children: [
  //     {
  //       path: 'params/:id',
  //       name: 'params',
  //       meta: {
  //         icon: 'md-flower',
  //         title: route => `{{ params }}-${route.params.id}`,
  //         notCache: true,
  //         beforeCloseName: 'before_close_normal'
  //       },
  //       component: () => import('@/view/argu-page/params.vue')
  //     },
  //     {
  //       path: 'query',
  //       name: 'query',
  //       meta: {
  //         icon: 'md-flower',
  //         title: route => `{{ query }}-${route.query.id}`,
  //         notCache: true
  //       },
  //       component: () => import('@/view/argu-page/query.vue')
  //     }
  //   ]
  // },
  {
    path: '/401',
    name: 'error_401',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/401.vue')
  },
  {
    path: '/500',
    name: 'error_500',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/500.vue')
  },
  {
    path: '*',
    name: 'error_404',
    meta: {
      hideInMenu: true
    },
    component: () => import('@/view/error-page/404.vue')
  },
  {
    path: '/history_record',
    name: 'history_record',
    meta: {
      icon: 'ios-bookmarks',
      title: '历史记录',
    },
    component: Main,
    children: [
      {
        path: 'sale_detail',
        name: 'sale_detail',
        meta: {
          icon: 'md-filing',
          title: '销售明细',
        },
        component: () => import('@/view/multilevel/level-2-1.vue'),
      },
      {
        path: 'shipping_record',
        name: 'shipping_record',
        meta: {
          icon: 'ios-folder-open',
          title: '出货记录',
        },
        component: () => import('@/view/multilevel/level-2-1.vue'),
      },
      {
        path: 'coin_record',
        name: 'coin_record',
        meta: {
          icon: 'logo-yen',
          title: '钱币记录',
        },
        component: () => import('@/view/multilevel/level-2-1.vue'),
      },
      {
        path: 'call_police',
        name: 'call_police',
        meta: {
          icon: 'logo-github',
          title: '报警',
        },
        component: () => import('@/view/multilevel/level-2-1.vue'),
      },
      {
        path: 'non_cash_journal_record',
        name: 'non_cash_journal_record',
        meta: {
          icon: 'ios-list-box',
          title: '非现金流水记录',
        },
        component: () => import('@/view/multilevel/level-2-1.vue'),
      },
      {
        path: 'replenish_record',
        name: 'replenish_record',
        meta: {
          icon: 'ios-map',
          title: '补货记录',
        },
        component: () => import('@/view/history-record/replenish-record/replenish-record.vue'),
      },
      {
        path: 'door_record',
        name: 'door_record',
        meta: {
          icon: 'ios-calendar',
          title: '开关门记录',
        },
        component: () => import('@/view/history-record/door-record/door-record.vue'),
      },
    ],
  },
  {
    path: '/system_setting',
    name: 'system_setting',
    meta: {
      icon: 'md-settings',
      title: '系统设置',
    },
    component: Main,
    children: [
      {
        path: 'role_management',
        name: 'role_management',
        meta: {
          icon: 'md-contacts',
          title: '角色管理',
        },
        component: () => import('@/view/system-setting/role-management/role-management.vue'),
      },
      {
        path: 'user_management',
        name: 'user_management',
        meta: {
          icon: 'ios-person',
          title: '用户管理',
        },
        component: () => import('@/view/system-setting/user-management/user-management.vue'),
      },
      {
        path: 'user_group_management',
        name: 'user_group_management',
        meta: {
          icon: 'ios-people',
          title: '用户组管理',
        },
        component: () => import('@/view/system-setting/user-group-management/user-group-management.vue'),
      },
      {
        path: 'help_management',
        name: 'help_management',
        meta: {
          icon: 'md-help',
          title: '帮助管理',
        },
        component: () => import('@/view/multilevel/level-2-1.vue'),
      },
      {
        path: 'pay_parameter',
        name: 'pay_parameter',
        meta: {
          icon: 'md-help-buoy',
          title: '设置支付参数',
        },
        component: () => import('@/view/multilevel/level-2-1.vue'),
      },
      {
        path: 'personal_setting',
        name: 'personal_setting',
        meta: {
          icon: 'md-cog',
          title: '个人设置',
        },
        component: () => import('@/view/multilevel/level-2-1.vue'),
      },
      {
        path: 'agent_trademark',
        name: 'agent_trademark',
        meta: {
          icon: 'logo-instagram',
          title: '代理商标',
        },
        component: () => import('@/view/multilevel/level-2-1.vue'),
      },
    ],
  },
  {
    path: '/cargo_management',
    name: 'cargo_management',
    meta: {
      icon: 'ios-beer',
      title: '货机管理',
    },
    component: Main,
    children: [
      {
        path: 'machine_group_setting',
        name: 'machine_group_setting',
        meta: {
          icon: 'md-construct',
          title: '机器组设置'
        },
        component: () => import('@/view/cargo-management/machine-group-setting/machine-group-setting.vue')
      },
      {
        path: 'machine_management',
        name: 'machine_management',
        meta: {
          icon: 'ios-cut',
          title: '机器管理'
        },
        component: () => import('@/view/cargo-management/machine-management/machine-management.vue')
      },
      {
        path: 'freight_way_management',
        name: 'freight_way_management',
        meta: {
          icon: 'md-hammer',
          title: '货道管理'
        },
        component: () => import('@/view/cargo-management/freight-way-management/freight-way-management.vue')
      },
      {
        path: 'machine_advertise',
        name: 'machine_advertise',
        meta: {
          icon: 'logo-markdown',
          title: '机器广告'
        },
        component: () => import('@/view/cargo-management/machine-advertise/machine-advertise.vue')
      },
      {
        path: 'config_parameter',
        name: 'config_parameter',
        meta: {
          icon: 'ios-nuclear',
          title: '配置参数'
        },
        component: () => import('@/view/cargo-management/config-parameter/config-parameter.vue')
      },
      {
        path: 'pick_code_management',
        name: 'pick_code_management',
        meta: {
          icon: 'md-pricetags',
          title: '提货码管理'
        },
        component: () => import('@/view/cargo-management/pick-code-management/pick-code-management.vue')
      },
    ],
  },
  {
    path: '/commodity_management',
    name: 'commodity_management',
    meta: {
      icon: 'md-list-box',
      title: '商品管理',
    },
    component: Main,
    children: [
      {
        path: 'commodity_type',
        name: 'commodity_type',
        meta: {
          icon: 'logo-snapchat',
          title: '商品类型'
        },
        component: () => import('@/view/commodity-management/commodity-type/commodity-type.vue')
      },
      {
        path: 'manufacturer_management',
        name: 'manufacturer_management',
        meta: {
          icon: 'md-trophy',
          title: '厂商管理'
        },
        component: () => import('@/view/commodity-management/manufacturer-management/manufacturer-management.vue')
      },
      {
        path: 'commodity_information',
        name: 'commodity_information',
        meta: {
          icon: 'md-train',
          title: '商品信息'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
    ],
  },
  {
    path: '/report_statis',
    name: 'report_statis',
    meta: {
      icon: 'md-stats',
      title: '报表统计',
    },
    component: Main,
    children: [
      {
        path: 'sales_summary_statis',
        name: 'sales_summary_statis',
        meta: {
          icon: 'md-stats',
          title: '销售汇总统计'
        },
        component: () => import('@/view/multilevel/level-2-1.vue')
      },
    ],
  },
  {
    path: '/marketing_center',
    name: 'marketing_center',
    meta: {
      icon: 'md-basket',
      title: '营销中心',
    },
    component: Main,
    children: [
      {
        path: 'discount_code_statis',
        name: 'discount_code_statis',
        meta: {
          icon: 'logo-usd',
          title: '优惠码统计'
        },
        component: () => import('@/view/marketing-center/discount-code-statis/discount-code-statis.vue')
      },
      {
        path: 'marketing_campaign_management',
        name: 'marketing_campaign_management',
        meta: {
          icon: 'md-speedometer',
          title: '营销活动管理'
        },
        component: () => import('@/view/marketing-center/marketing-campaign-management/marketing-campaign-management.vue')
      },
    ],
  },
]
