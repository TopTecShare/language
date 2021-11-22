import {
  DashboardOutlined,
  AlignLeftOutlined,
  UpSquareOutlined,
  DownSquareOutlined,
  PicCenterOutlined,
  ArrowRightOutlined,
  SwitcherOutlined,
  PlayCircleOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  PieChartOutlined,
  EnvironmentOutlined,
  AntDesignOutlined,
  SafetyOutlined,
  StopOutlined,
  DotChartOutlined,
  MailOutlined,
  MessageOutlined,
  CalendarOutlined,
  BulbOutlined,
  InfoCircleOutlined,
  CompassOutlined,
  LayoutOutlined,
  DesktopOutlined,
  FileDoneOutlined,
  CommentOutlined,
  RobotOutlined,
  PlusCircleOutlined,
  FundOutlined,
  ShoppingCartOutlined,
  BookOutlined,
  FileUnknownOutlined,
  CarOutlined,
  CoffeeOutlined,
  ProfileOutlined,
  UserOutlined,
  UserAddOutlined,
  TeamOutlined,
  WifiOutlined,
  FileImageOutlined,
  GlobalOutlined,
  FormOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from "configs/AppConfig";

const dashBoardNavTree = [
  {
    key: "dashboards",
    path: `${APP_PREFIX_PATH}/dashboards`,
    title: "sidenav.dashboard",
    icon: DashboardOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "dashboards",
        path: `${APP_PREFIX_PATH}/dashboards`,
        title: "sidenav.dashboard",
        icon: DashboardOutlined,
        breadcrumb: false,
        submenu: [],
      },
    ],
  },
];

const UserNavTree = [
  {
    key: "add-user",
    path: `${APP_PREFIX_PATH}/add-user`,
    title: "sidenav.manage-users",
    icon: UserOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "add-user",
        title: "sidenav.manage-users",
        icon: UserOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: "add-user-list",
            path: `${APP_PREFIX_PATH}/add-user/list`,
            title: "sidenav.view-user",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "add-user",
            path: `${APP_PREFIX_PATH}/add-user/new`,
            title: "sidenav.add-user",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "customers",
            path: `${APP_PREFIX_PATH}/customers`,
            title: "sidenav.customers",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
    ],
  },
];

const CategoriesNavTree = [
  {
    key: "categories",
    path: `${APP_PREFIX_PATH}/units`,
    title: "sidenav.categories",
    icon: AlignLeftOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "categories",
        path: `${APP_PREFIX_PATH}/units`,
        title: "sidenav.categories",
        icon: AlignLeftOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: "acronym-categories",
            path: `${APP_PREFIX_PATH}/acronyms`,
            title: "sidenav.acronym-categories",
            breadcrumb: false,
            submenu: [],
          },
          {
            key: "substition-categories",
            path: `${APP_PREFIX_PATH}/substitutions`,
            title: "sidenav.substition-categories",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
    ],
  },
];

const WorkspaceNavTree = [
  {
    key: "workspace",
    path: `${APP_PREFIX_PATH}/workspace`,
    title: "sidenav.workspace",
    icon: AlignLeftOutlined,
    breadcrumb: false,
    submenu: [
      {
        key: "workspace",
        path: `${APP_PREFIX_PATH}/workspace`,
        title: "sidenav.workspace",
        icon: AlignLeftOutlined,
        breadcrumb: false,
        submenu: [
          {
            key: "workspace",
            path: `${APP_PREFIX_PATH}/workspace`,
            title: "sidenav.workspace",
            breadcrumb: false,
            submenu: [],
          },
        ],
      },
    ],
  },
];


// const HeaderNavTree = [{
//   key: 'header',
//   path: `${APP_PREFIX_PATH}/`,
//   title: 'sidenav.header',
//   icon: UpSquareOutlined,
//   breadcrumb: false,
//   submenu: [
//     {
//       key: 'header',
//       path: `${APP_PREFIX_PATH}/`,
//       title: 'sidenav.header',
//       icon: UpSquareOutlined,
//       breadcrumb: false,
//       submenu: [
//         {
//           key: 'header',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.view-header',

//           breadcrumb: false,
//           submenu: []
//         },
//       ]
//     }
//   ]
// }]

// const FooterNavTree = [{
//   key: 'footer',
//   path: `${APP_PREFIX_PATH}/`,
//   title: 'sidenav.footer',
//   icon: DownSquareOutlined,
//   breadcrumb: false,
//   submenu: [
//     {
//       key: 'footer',
//       path: `${APP_PREFIX_PATH}/`,
//       title: 'sidenav.footer',
//       icon: DownSquareOutlined,
//       breadcrumb: false,
//       submenu: [
//         {
//           key: 'footer',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.view-footer',

//           breadcrumb: false,
//           submenu: []
//         },
//       ]
//     }
//   ]
// }]

// const PagesNavTree = [{
//   key: 'pages',
//   path: `${APP_PREFIX_PATH}/`,
//   title: 'sidenav.sidepages',
//   icon: PicCenterOutlined,
//   breadcrumb: false,
//   submenu: [
//     {
//       key: 'pages',
//       title: 'sidenav.sidepages',
//       icon: PicCenterOutlined,
//       breadcrumb: false,
//       submenu: [
//         {
//           key: 'view-pages',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.view-pages',
//           breadcrumb: false,
//           submenu: []
//         },
//         {
//           key: 'add-page',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.add-page',
//           breadcrumb: false,
//           submenu: []
//         },
//       ]
//     }
//   ]
// }]

// const FormsNavTree = [{
//   key: 'forms',
//   path: `${APP_PREFIX_PATH}/`,
//   title: 'sidenav.forms',
//   icon: FormOutlined,
//   breadcrumb: false,
//   submenu: [
//     {
//       key: 'forms',
//       title: 'sidenav.forms',
//       icon: FormOutlined,
//       breadcrumb: false,
//       submenu: [
//         {
//           key: 'view-forms',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.view-forms',
//           breadcrumb: false,
//           submenu: []
//         },
//         {
//           key: 'add-form',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.add-form',
//           breadcrumb: false,
//           submenu: []
//         },
//       ]
//     }
//   ]
// }]

// const AdsNavTree = [{
//   key: 'ads',
//   path: `${APP_PREFIX_PATH}/`,
//   title: 'sidenav.ads',
//   icon: PlayCircleOutlined,
//   breadcrumb: false,
//   submenu: [
//     {
//       key: 'ads',
//       title: 'sidenav.ads',
//       icon: PlayCircleOutlined,
//       breadcrumb: false,
//       submenu: [
//         {
//           key: 'view-page-ads',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.view-page-ads',
//           breadcrumb: false,
//           submenu: []
//         },
//         {
//           key: 'add-ads',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.add-page-ads',
//           breadcrumb: false,
//           submenu: []
//         },
//         {
//           key: 'view-ads',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.view-city-list-ads',
//           breadcrumb: false,
//           submenu: []
//         },
//         {
//           key: 'add-ads',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.add-city-list-ads',
//           breadcrumb: false,
//           submenu: []
//         },
//       ]
//     }
//   ]
// }]

// const SubscriptionsNavTree = [{
//   key: 'subscriptions',
//   path: `${APP_PREFIX_PATH}/`,
//   title: 'sidenav.subscriptions',
//   icon: SwitcherOutlined,
//   breadcrumb: false,
//   submenu: [
//     {
//       key: 'subscriptions',
//       title: 'sidenav.subscriptions',
//       icon: SwitcherOutlined,
//       breadcrumb: false,
//       submenu: [
//         {
//           key: 'view-subscriptions',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.view-subscriptions',
//           breadcrumb: false,
//           submenu: []
//         },
//       ]
//     }
//   ]
// }]

// const NewsletterNavTree = [{
//   key: 'newsletter',
//   path: `${APP_PREFIX_PATH}/`,
//   title: 'sidenav.newsletter',
//   icon: ArrowRightOutlined,
//   breadcrumb: false,
//   submenu: [
//     {
//       key: 'newsletter',
//       title: 'sidenav.newsletter',
//       icon: ArrowRightOutlined,
//       breadcrumb: false,
//       submenu: [
//         {
//           key: 'view-newsletter',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.view-newsletters',
//           breadcrumb: false,
//           submenu: []
//         },
//         {
//           key: 'add-form',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.add-newsletter',
//           breadcrumb: false,
//           submenu: []
//         },
//       ]
//     }
//   ]
// }]

// const LanguagesNavTree = [{
//   key: 'languages',
//   path: `${APP_PREFIX_PATH}/`,
//   title: 'sidenav.languages',
//   icon: GlobalOutlined,
//   breadcrumb: false,
//   submenu: [
//     {
//       key: 'languages',
//       title: 'sidenav.languages',
//       icon: GlobalOutlined,
//       breadcrumb: false,
//       submenu: [
//         {
//           key: 'view-languages',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.view-languages',
//           breadcrumb: false,
//           submenu: []
//         },
//         {
//           key: 'add-language',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.add-language',
//           breadcrumb: false,
//           submenu: []
//         },
//       ]
//     }
//   ]
// }]

// const AdminsNavTree = [{
//   key: 'admins',
//   path: `${APP_PREFIX_PATH}/`,
//   title: 'sidenav.admins',
//   icon: UserAddOutlined,
//   breadcrumb: false,
//   submenu: [
//     {
//       key: 'admins',
//       title: 'sidenav.admins',
//       icon: UserAddOutlined,
//       breadcrumb: false,
//       submenu: [
//         {
//           key: 'view-admins',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.view-admins',
//           breadcrumb: false,
//           submenu: []
//         },
//         {
//           key: 'add-admin',
//           path: `${APP_PREFIX_PATH}/`,
//           title: 'sidenav.add-admin',
//           breadcrumb: false,
//           submenu: []
//         },
//       ]
//     }
//   ]
// }]

// const LogoutNavTree = [{
//   key: 'logout',
//   path: `${APP_PREFIX_PATH}`,
//   title: 'sidenav.logout',
//   icon: LogoutOutlined,
//   breadcrumb: false,
//   submenu: []
// }]

// // const dashBoardFinanceNavTree = [{
// //   key: 'dashboards-finance',
// //   path: `${APP_PREFIX_PATH}/dashboards`,
// //   title: 'sidenav.finance',
// //   icon: DashboardOutlined,
// //   breadcrumb: false,
// //   submenu: [
// //     {
// //       key: 'dashboards-finance',
// //       path: `${APP_PREFIX_PATH}/dashboards/finance`,
// //       title: 'sidenav.finance',
// //       icon: FundOutlined,
// //       breadcrumb: false,
// //       submenu: []
// //     }
// //   ]
// // }]

// // const ActivityNavTree = [{
// //   key: 'activities',
// //   path: `${APP_PREFIX_PATH}/activities`,
// //   title: 'sidenav.activities',
// //   icon: EnvironmentOutlined,
// //   breadcrumb: false,
// //   submenu: [
// //     {
// //       key: 'activities',
// //       title: 'sidenav.activities',
// //       icon: EnvironmentOutlined,
// //       breadcrumb: false,
// //       submenu: [
// //         {
// //           key: 'activities-new',
// //           path: `${APP_PREFIX_PATH}/activities/new`,
// //           title: 'sidenav.add',

// //           breadcrumb: false,
// //           submenu: []
// //         },
// //         {
// //           key: 'activities',
// //           path: `${APP_PREFIX_PATH}/activities/list`,
// //           title: 'sidenav.manange',

// //           breadcrumb: false,
// //           submenu: []
// //         },

// //       ]
// //     }
// //   ]
// // }]

// // const VendorNavTree = [{
// //   key: 'vendors',
// //   path: `${APP_PREFIX_PATH}/vendors`,
// //   title: 'sidenav.vendors',
// //   icon: TeamOutlined,
// //   breadcrumb: false,
// //   submenu: [
// //     {
// //       key: 'vendors',

// //       title: 'sidenav.vendors',
// //       icon: TeamOutlined,
// //       breadcrumb: false,
// //       submenu: [
// //         {
// //           key: 'vendors-add',
// //           path: `${APP_PREFIX_PATH}/vendors/new`,
// //           title: 'sidenav.add',

// //           breadcrumb: false,
// //           submenu: []
// //         },
// //         {
// //           key: 'vendors',
// //           path: `${APP_PREFIX_PATH}/vendors/list`,
// //           title: 'sidenav.manange',

// //           breadcrumb: false,
// //           submenu: []
// //         },

// //       ]
// //     }
// //   ]
// // }]

// // const VendorMealNavTree = [{
// //   key: 'vendor-meals',
// //   path: `${APP_PREFIX_PATH}/vendor-meals`,
// //   title: 'sidenav.vendor-meals',
// //   icon: CoffeeOutlined,
// //   breadcrumb: false,
// //   submenu: [
// //     {
// //       key: 'vendor-meals',
// //       title: 'sidenav.vendor-meals',
// //       icon: CoffeeOutlined,
// //       breadcrumb: false,
// //       submenu: [
// //         {
// //           key: 'vendor-meals-add',
// //           path: `${APP_PREFIX_PATH}/vendor-meals/new`,
// //           title: 'sidenav.add',

// //           breadcrumb: false,
// //           submenu: []
// //         },
// //         {
// //           key: 'vendor-meals',
// //           path: `${APP_PREFIX_PATH}/vendor-meals/list`,
// //           title: 'sidenav.manange',

// //           breadcrumb: false,
// //           submenu: []
// //         },

// //       ]
// //     },

// //   ]
// // }]

// // const VendorTransportsNavTree = [{
// //   key: 'vendor-transports',
// //   path: `${APP_PREFIX_PATH}/vendor-transports`,
// //   title: 'sidenav.vendor-transports',
// //   icon: CarOutlined,
// //   breadcrumb: false,
// //   submenu: [
// //     {
// //       key: 'vendor-transports',
// //       title: 'sidenav.vendor-transports',
// //       icon: CarOutlined,
// //       breadcrumb: false,
// //       submenu: [
// //         {
// //           key: 'vendor-transports-add',
// //           path: `${APP_PREFIX_PATH}/vendor-transports/new`,
// //           title: 'sidenav.add',

// //           breadcrumb: false,
// //           submenu: []
// //         },
// //         {
// //           key: 'vendor-transports',
// //           path: `${APP_PREFIX_PATH}/vendor-transports/list`,
// //           title: 'sidenav.manange',

// //           breadcrumb: false,
// //           submenu: []
// //         },

// //       ]
// //     }
// //   ]
// // }]

// // const VendorAmenitiesNavTree = [{
// //   key: 'vendor-amenities',
// //   path: `${APP_PREFIX_PATH}/vendor-amenities`,
// //   title: 'sidenav.vendor-amenities',
// //   icon: WifiOutlined,
// //   breadcrumb: false,
// //   submenu: [
// //     {
// //       key: 'vendor-amenities',
// //       title: 'sidenav.vendor-amenities',
// //       icon: WifiOutlined,
// //       breadcrumb: false,
// //       submenu: [
// //         {
// //           key: 'vendor-amenities-add',
// //           path: `${APP_PREFIX_PATH}/vendor-amenities/new`,
// //           title: 'sidenav.add',
// //           breadcrumb: false,
// //           submenu: []
// //         },
// //         {
// //           key: 'vendor-amenities',
// //           path: `${APP_PREFIX_PATH}/vendor-amenities/list`,
// //           title: 'sidenav.manange',
// //           breadcrumb: false,
// //           submenu: []
// //         },

// //       ]
// //     }
// //   ]
// // }]

// // const VendorsSlabNavTree = [{
// //   key: 'agent_slabs',
// //   path: `${APP_PREFIX_PATH}/agent_slabs`,
// //   title: 'sidenav.agent_slabs',
// //   icon: RobotOutlined,
// //   breadcrumb: false,
// //   submenu: [
// //     {
// //       key: 'agent_slabs',
// //       title: 'sidenav.agent_slabs',
// //       icon: RobotOutlined,
// //       breadcrumb: false,
// //       submenu: [
// //         {
// //           key: 'agent_slabs_new',
// //           path: `${APP_PREFIX_PATH}/agent_slabs/new`,
// //           title: 'sidenav.add',
// //           breadcrumb: false,
// //           submenu: []
// //         },
// //         {
// //           key: 'agent_slabs_list',
// //           path: `${APP_PREFIX_PATH}/agent_slabs/list`,
// //           title: 'sidenav.manange',

// //           breadcrumb: false,
// //           submenu: []
// //         },

// //       ]
// //     }
// //   ]
// // }]

// // const DiscountsNavTree = [{
// //   key: 'discounts',
// //   path: `${APP_PREFIX_PATH}/discounts`,
// //   title: 'sidenav.discounts',
// //   icon: ShoppingCartOutlined,
// //   breadcrumb: false,
// //   submenu: [
// //     {
// //       key: 'discounts',
// //       path: `${APP_PREFIX_PATH}/discounts/list`,
// //       title: 'sidenav.discounts',
// //       icon: ShoppingCartOutlined,
// //       breadcrumb: false,
// //       submenu: []
// //     }
// //   ]
// // }]

// // const LinkedActivitiesNavTree = [{
// //   key: 'linked-activities',
// //   path: `${APP_PREFIX_PATH}/linked-activities`,
// //   title: 'sidenav.linked-activities',
// //   icon: CompassOutlined,
// //   breadcrumb: false,
// //   submenu: [
// //     {
// //       key: 'linked-activities',
// //       path: `${APP_PREFIX_PATH}/linked-activities/list`,
// //       title: 'sidenav.linked-activities',
// //       icon: CompassOutlined,
// //       breadcrumb: false,
// //       submenu: []
// //     }
// //   ]
// // }]

// // const OrdersNavTree = [{
// //   key: 'orders',
// //   path: `${APP_PREFIX_PATH}/orders`,
// //   title: 'sidenav.orders',
// //   icon: ShoppingCartOutlined,
// //   breadcrumb: false,
// //   submenu: [
// //     {
// //       key: 'orders',

// //       title: 'sidenav.orders',
// //       icon: ShoppingCartOutlined,
// //       breadcrumb: false,
// //       submenu: [
// //         {
// //           key: 'orders',
// //           path: `${APP_PREFIX_PATH}/orders/list`,
// //           title: 'sidenav.all',

// //           breadcrumb: false,
// //           submenu: []
// //         },
// //         {
// //           key: 'orders_abnd_checkout',
// //           path: `${APP_PREFIX_PATH}/orders/list`,
// //           title: 'sidenav.ab_checkout',

// //           breadcrumb: false,
// //           submenu: []
// //         },
// //         {
// //           key: 'orders_failed',
// //           path: `${APP_PREFIX_PATH}/orders/list`,
// //           title: 'sidenav.failed',

// //           breadcrumb: false,
// //           submenu: []
// //         },
// //       ]
// //     },

// //   ]
// // }]

// // const CustomerNavTree = [{
// //   key: 'customers',
// //   path: `${APP_PREFIX_PATH}/customers`,
// //   title: 'sidenav.customers',
// //   icon: TeamOutlined,
// //   breadcrumb: false,
// //   submenu: [
// //     {
// //       key: 'customers',
// //       path: `${APP_PREFIX_PATH}/customers/list`,
// //       title: 'sidenav.customers',
// //       icon: TeamOutlined,
// //       breadcrumb: false,
// //       submenu: []
// //     }
// //   ]
// // }]

// // const SalesAgentNavTree = [{
// //   key: 'sales_agents',
// //   path: `${APP_PREFIX_PATH}/customers`,
// //   title: 'sidenav.sales-agent',
// //   icon: TeamOutlined,
// //   breadcrumb: false,
// //   submenu: [
// //     {
// //       key: 'sales_agents',
// //       // path: `${APP_PREFIX_PATH}/sales_agent/list`,
// //       title: 'sidenav.sales-agent',
// //       icon: TeamOutlined,
// //       breadcrumb: false,
// //       submenu: [
// //         {
// //           key: 'sales_agents-add',
// //           path: `${APP_PREFIX_PATH}/sales_agent/new`,
// //           title: 'sidenav.add',

// //           breadcrumb: false,
// //           submenu: []
// //         },
// //         {
// //           key: 'sales_agents_list',
// //           path: `${APP_PREFIX_PATH}/sales_agent/list`,
// //           title: 'sidenav.manange',

// //           breadcrumb: false,
// //           submenu: []
// //         },
// //       ]
// //     }
// //   ]
// // }]

// // const InvoicesNavTree = [{
// //   key: 'invoices',
//   path: `${APP_PREFIX_PATH}/invoices`,
//   title: 'sidenav.invoices',
//   icon: FileImageOutlined,
//   breadcrumb: false,
//   submenu: [
//     {
//       key: 'invoices',
//       path: `${APP_PREFIX_PATH}/invoices/list`,
//       title: 'sidenav.invoices',
//       icon: FileImageOutlined,
//       breadcrumb: false,
//       submenu: []
//     }
//   ]
// }]

const navigationConfig = [
  ...dashBoardNavTree,
  ...UserNavTree,
  ...CategoriesNavTree,
  ...WorkspaceNavTree,

  // ...dashBoardFinanceNavTree,
  // ...ActivityNavTree,
  // ...VendorNavTree,
  // ...CustomerNavTree,
  // ...SalesAgentNavTree,
  // ...VendorMealNavTree,
  // ...VendorTransportsNavTree,
  // ...VendorAmenitiesNavTree,
  // ...VendorsSlabNavTree,
  // ...DiscountsNavTree,
  // ...LinkedActivitiesNavTree,
  // ...OrdersNavTree,
  //...dashBoarAnalyticsdNavTree,
  // ...InvoicesNavTree
];

export default navigationConfig;
