"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useApollo = exports.addApolloState = exports.initializeApollo = exports.APOLLO_STATE_PROP_NAME = void 0;
var react_1 = require("react");
var client_1 = require("@apollo/client");
var utilities_1 = require("@apollo/client/utilities");
var deepmerge_1 = __importDefault(require("deepmerge"));
var isEqual_1 = __importDefault(require("lodash/isEqual"));
var error_1 = require("@apollo/client/link/error");
var context_1 = require("@apollo/client/link/context");
exports.APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
var apolloClient;
var errorLink = error_1.onError(function (_a) {
    var graphQLErrors = _a.graphQLErrors;
    if (graphQLErrors) {
        graphQLErrors.map(function (_a) {
            var message = _a.message, path = _a.path;
            console.log("err", message, path);
        });
    }
});
var httpLink = client_1.from([
    errorLink,
    new client_1.HttpLink({
        uri: (process.env.BASE_URL || 'http://localhost:3000') + "/api/graphql",
        credentials: 'same-origin',
    })
]);
var addCustomHeaderLink = context_1.setContext(function (_, _a) {
    var headers = _a.headers;
    return {
        headers: __assign(__assign({}, headers), { accept: "accept-request" })
    };
});
function createApolloClient() {
    return new client_1.ApolloClient({
        ssrMode: typeof window === 'undefined',
        credentials: "same-origin",
        link: addCustomHeaderLink.concat(httpLink),
        cache: new client_1.InMemoryCache({
            typePolicies: {
                Query: {
                    fields: {
                        allPosts: utilities_1.concatPagination(),
                    },
                },
            },
        }),
    });
}
function initializeApollo(initialState) {
    if (initialState === void 0) { initialState = null; }
    var _apolloClient = apolloClient !== null && apolloClient !== void 0 ? apolloClient : createApolloClient();
    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        // Get existing cache, loaded during client side data fetching
        var existingCache = _apolloClient.extract();
        // Merge the existing cache into data passed from getStaticProps/getServerSideProps
        var data = deepmerge_1.default(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: function (destinationArray, sourceArray) { return __spreadArray(__spreadArray([], sourceArray), destinationArray.filter(function (d) {
                return sourceArray.every(function (s) { return !isEqual_1.default(d, s); });
            })); },
        });
        // Restore the cache with the merged data
        _apolloClient.cache.restore(data);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined')
        return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient)
        apolloClient = _apolloClient;
    return _apolloClient;
}
exports.initializeApollo = initializeApollo;
function addApolloState(client, pageProps) {
    if (pageProps === null || pageProps === void 0 ? void 0 : pageProps.props) {
        pageProps.props[exports.APOLLO_STATE_PROP_NAME] = client.cache.extract();
    }
    return pageProps;
}
exports.addApolloState = addApolloState;
function useApollo(pageProps) {
    var state = pageProps[exports.APOLLO_STATE_PROP_NAME];
    var store = react_1.useMemo(function () { return initializeApollo(state); }, [state]);
    return store;
}
exports.useApollo = useApollo;
