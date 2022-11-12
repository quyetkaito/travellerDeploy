//1.cài đặt vue router cmd: vue add router
//2. Import
import { createRouter, createWebHistory } from "vue-router";
import DashboardView from "@/views/dashboard/DashboardView.vue";
import SearchHistory from "@/views/landing-page/search-history/SearchHistoryPage.vue";
const routes = [
    //toàn bộ app
    {
        path: "/",
        name: "app",
        component: () =>
            import ("/src/AdminPage.vue"),
        children: [{
                path: "/overview",
                name: "Overview",
                component: () =>
                    import ("@/views/HomePage.vue"),
            },
            {
                path: "/dashboard",
                name: "Dashboard",
                component: () =>
                    import ("@/views/dashboard/DashboardView.vue"),
            },
            {
                path: "/transaction",
                name: "transaction",
                component: () =>
                    import ("@/views/transaction/TransactionDictionary.vue"), // giao dịch
            },
            {
                path: "/component",
                name: "component",
                component: () =>
                    import ("@/components/HelloWorld.vue"), // các component
            },
            {
                path: "/category",
                name: "category",
                component: () =>
                    import ("@/views/category/CategoryList.vue"),
            },
            // {
            //     path: "/character",
            //     name: "character",
            //     component: () =>
            //         import ("@/views/character/CharacterDictionary.vue"), // nhân vật
            // },
            {
                path: "/location",
                name: "location",
                component: () =>
                    import ("@/views/location/LocationList.vue"), // địa chỉ
            },
            {
                path: "/post",
                name: "post",
                component: () =>
                    import ("@/views/post/PostList.vue"), // địa chỉ
            },
            {
                path: "/post-editor",
                name: "PostEditor",
                component: () =>
                    import ("@/views/post/PostEditorDetail.vue"), // địa chỉ
            },
            {
                path: "/voucher",
                name: "voucher",
                component: () =>
                    import ("@/views/voucher/VoucherList.vue"), // địa chỉ
            },
            {
                path: "/user-info",
                name: "UserInfo",
                component: () =>
                    import ("@/views/user-info/UserInfo.vue"), // thông tin cá nhân
            },
            {
                path: "/user-list",
                name: "UserList",
                component: () =>
                    import ("@/views/user/UserList.vue"), // quản lý người dùng
            },
            {
                path: "/tour",
                name: "TourList",
                component: () =>
                    import ("@/views/tour/TourList.vue"), // quản lý người dùng
            },
            {
                path: "/settings",
                name: "Settings",
                component: () =>
                    import ("@/views/settings/SettingsPage.vue"), // cài đặt trang web
            },
        ],
    },
    //trang login
    {
        path: "/login",
        name: "login",
        component: () =>
            import ("@/views/login/LoginPage.vue"),
    },
    //trang các component
    {
        path: "/componentprivate",
        name: "componentprivate",
        component: () =>
            import ("@/components/HelloWorld.vue"),
    },
    //trang landing page
    {
        path: "/home-page",
        name: "LandingPage",
        component: () =>
            import ("@/views/landing-page/LandingPage.vue"),
        children: [{
                path: "/home",
                name: "postList",
                component: () =>
                    import ("@/views/post/PostList.vue"), //danh sách các bài viết
            },
            {
                path: "/search-history",
                name: "SearchHistory",
                component: () =>
                    import ("@/views/landing-page/search-history/SearchHistoryPage.vue"), //danh sách các bài viết
            },
            {
                path: "/filter",
                name: "postFilterList",
                component: () =>
                    import ("@/views/post/PostFilterList.vue"), //danh sách các bài viết tìm kiếm
            },
        ]
    },
    {
        path: '/hi',
        redirect: to => {
            return { path: '/home' }
        },
    },
];

//Khai báo mode
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

//export ra
export default router;