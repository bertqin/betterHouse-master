import Taro from "@tarojs/taro";

export const buildCdnPath = (url) => {
    try {
        return /^imgs/.test(url) ? require('@/assets/' + url) :
            /^http/.test(url) ? url :
                (global.appInfo.upload_domain + '/' + url)
    } catch (e) {
        return 'https://taro-docs.jd.com/taro/img/logo-taro.png'
    }
}

export function parseURL(url) {
    url = url.toString();
    let a = document.createElement("a");
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(":", ""),
        origin: a.origin,
        host: a.hostname,
        port: a.port,
        query: a.search,
        file: (a.pathname.match(/\/([^/?#]+)$/i) || ['', ""])[1],
        hash: a.hash.replace("#", ""),
        path: a.pathname.replace(/^([^/])/, "/$1"),
        pathname: a.pathname.replace(/^([^/])/, "/$1"), // 兼容
        relative: (a.href.match(/tps?:\/\/[^/]+(.+)/) || ['', ""])[1],
        segments: a.pathname.replace(/^\//, "").split("/"),
        params: (function () {
            var ret = {};
            var seg = a.search
                .replace(/^\?/, "")
                .split("&")
                .filter(function (v, i) {
                    return v !== "" && v.indexOf("=")
                });
            seg.forEach(function (element, index) {
                var idx = element.indexOf("=");
                var key = element.substring(0, idx);
                var val = element.substring(idx + 1);
                ret[key] = decodeURIComponent(val);
            });
            return ret;
        })()
    };
}

// 将对象转成 querystring 字符串
// 如 {a:1, b:2} => 'a=1&b=2'
export const queryToString = (query) => {
    let queryString = ''
    if (typeof query === 'object' && Object.entries(query).length) {
        Object.entries(query).forEach(([key, value], index) => {
            if (value) {
                queryString += `${key}=${encodeURIComponent(value)}&`
            }
        })
        queryString = queryString.replace(/&$/, '')
    }
    return queryString
}

export const stringifyURL = function (urlOptions) {
    let {origin = '', pathname = '', query = '', hash = ''} = urlOptions
    let search = queryToString(query) ? ('?' + queryToString(query)) : ''
    let urlString = `${origin}${pathname}${search}`

    if (hash) urlString += `#${hash}`
    return urlString.replace(/[^:](\/\/)+/g, '/')
}

/**
 * 加入一些 query 到 url 上, 返回新的 url
 * @param url
 * @param query
 * @returns {string}
 * @example joinQueryToURL('http://xx.com?a=1', {b:2,c:3}) => http://xx.com?a=1&b=2&c=3
 */
export const joinQueryToURL = (url, query) => {
    let urlObj = parseURL(url)
    urlObj.query = {...urlObj.params, ...query}
    return stringifyURL(urlObj)
}

/**
 * 移除 url 的某些 key，返回新的 url
 * @param url
 * @param keys
 * @returns {string|*}
 * @example removeQueryFromURL('http://xx.com?a=1&code=2', 'code') => http://xx.com?a=1
 */
export const removeQueryFromURL = (url, ...keys) => {
    if (!keys) return url

    let urlObj = parseURL(url)
    keys.forEach(key => delete urlObj.params[key])
    urlObj.query = urlObj.params
    return stringifyURL(urlObj)
}

// 当前 location.href 的解析后的对象


export const getPageParam = (key) => {
    let pages = Taro.getCurrentPages()
    let page = pages[pages.length - 1]
    return page.$router.params[key] || null
}

export const getCurrentPage = () => {
    let pages = Taro.getCurrentPages()
    let page = pages[pages.length - 1]
    return page
}

export const getCurrentPath = () => {
    let pages = Taro.getCurrentPages()
    let page = pages[pages.length - 1]
    return page.$router.path
}


export default {}
