module.exports = [
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/lib/incremental-cache/tags-manifest.external.js [external] (next/dist/server/lib/incremental-cache/tags-manifest.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/lib/incremental-cache/tags-manifest.external.js", () => require("next/dist/server/lib/incremental-cache/tags-manifest.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/node:async_hooks [external] (node:async_hooks, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("node:async_hooks", () => require("node:async_hooks"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/constants/app.constants.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_TIMEOUT",
    ()=>API_TIMEOUT,
    "CURRENCIES",
    ()=>CURRENCIES,
    "DATETIME_FORMAT",
    ()=>DATETIME_FORMAT,
    "DATE_FORMAT",
    ()=>DATE_FORMAT,
    "PAGINATION",
    ()=>PAGINATION,
    "STORAGE_KEYS",
    ()=>STORAGE_KEYS
]);
const STORAGE_KEYS = {
    REFRESH_TOKEN: 'refresh_token',
    ACCESS_TOKEN: 'access_token',
    MERCHANT: 'merchant_data'
};
const PAGINATION = {
    DEFAULT_PAGE: 1,
    DEFAULT_LIMIT: 10,
    MAX_LIMIT: 100
};
const CURRENCIES = [
    {
        value: 'USD',
        label: 'USD - US Dollar'
    },
    {
        value: 'KWD',
        label: 'KWD - Kuwaiti Dinar'
    },
    {
        value: 'EUR',
        label: 'EUR - Euro'
    },
    {
        value: 'GBP',
        label: 'GBP - British Pound'
    }
];
const API_TIMEOUT = 30000; // 30 seconds
const DATE_FORMAT = 'MMM dd, yyyy';
const DATETIME_FORMAT = 'MMM dd, yyyy hh:mm a';
}),
"[project]/src/lib/constants/routes.constants.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "PROTECTED_ROUTES",
    ()=>PROTECTED_ROUTES,
    "PUBLIC_ROUTES",
    ()=>PUBLIC_ROUTES,
    "ROUTES",
    ()=>ROUTES
]);
const ROUTES = {
    LOGIN: '/login',
    REGISTER: '/register',
    DASHBOARD: '/dashboard'
};
const PUBLIC_ROUTES = [
    ROUTES.LOGIN,
    ROUTES.REGISTER
];
const PROTECTED_ROUTES = [
    ROUTES.DASHBOARD
];
}),
"[project]/src/lib/constants/index.ts [middleware] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$app$2e$constants$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/app.constants.ts [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$routes$2e$constants$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/routes.constants.ts [middleware] (ecmascript)");
;
;
}),
"[project]/src/proxy.ts [middleware] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "config",
    ()=>config,
    "proxy",
    ()=>proxy
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [middleware] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$index$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/src/lib/constants/index.ts [middleware] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$routes$2e$constants$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/constants/routes.constants.ts [middleware] (ecmascript)");
;
;
function proxy(request) {
    const token = request.cookies.get('access_token')?.value;
    const { pathname } = request.nextUrl;
    const isPublicRoute = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$routes$2e$constants$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["PUBLIC_ROUTES"].some((route)=>pathname === route);
    if (!token && !isPublicRoute && pathname !== __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$routes$2e$constants$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].LOGIN) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$routes$2e$constants$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].LOGIN, request.url));
    }
    if (token && (pathname === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$routes$2e$constants$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].LOGIN || pathname === __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$routes$2e$constants$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].REGISTER)) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].redirect(new URL(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$constants$2f$routes$2e$constants$2e$ts__$5b$middleware$5d$__$28$ecmascript$29$__["ROUTES"].DASHBOARD, request.url));
    }
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$middleware$5d$__$28$ecmascript$29$__["NextResponse"].next();
}
const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|public).*)'
    ]
};
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__09b3f954._.js.map