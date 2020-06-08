// 黑夜模式
;(function initDarkTheme() {
    try {
        var darkStyle = document.createElement('style')

        if (/iOSAppPay/.test(location.href)) {
            darkStyle.innerHTML = '.app-theme-dark ,.app-theme-dark body,.container .content ,.container .content .header, .paydetail, .paytime,.payment .payment-items,.container .footer,.container, .container .content,.payment .title,.payment-item .item-title .item-name{ background: #000!important; color: #fff !important; } '
        }

        var platform = {
            isIOS: /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent),
            isAndroid: /(?:Android)/.test(navigator.userAgent),
        }

        function nativeAppCall(method, data) {
            var dataStr = JSON.stringify(data || {})

            try {
                if (platform.isIOS) {
                    return window.webkit.messageHandlers[method].postMessage(dataStr);
                }

                if (platform.isAndroid) {
                    var values = Object.values(data).map(function (item) {
                        return typeof item === 'object' ? JSON.stringify(item) : item
                    })
                    var dataLen = Object.keys(data).length

                    if (dataLen == 0) {
                        return window.android[method]()
                    }

                    if (dataLen <= 2) {
                        return window.android[method].apply(window, values)
                    }

                    return window.android[method](dataStr);
                }
            } catch (e) {
                throw e
            }
        }

        window.onGetAppInfo = function (data) {
            data = JSON.parse(data);
            if (data.dark === '1') {
                document.documentElement.classList.add('app-theme-dark');
            } else {
                document.documentElement.classList.remove('app-theme-dark');
            }
            document.head.appendChild(darkStyle)
            // 修改图片
            document.getElementById('back-btn').src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB0AAAAuCAQAAAB+dNqHAAABi0lEQVRIx53VPUSFYRjG8ff0/aVTOZUkSSJxRCLiaEhpiGiIhoZoaIiGhpJoKQ4t0Ri1RRIRUVJERCKSSJIkJaX0/flvqMj9DF1v//3nfZb7ej3PV7QyQ6LnPzp4BxZJ8Qu7+eCrNdL9wH5+t0mWCqPYhhUWYMyBk8T+DWOZcOAYgb9hPNMOjCpPTWLegQMKTGXZsA+6FRhk3cB3OhQYYsvAV1oVmMeugU80KbCQAwPvqVdgCccG3hBRYJgzAy+pVGAllwaeEVZghBsDjylRYB33Bh5QqMAmngzcJU9bnFcDtwjpi/O7dYL+FuenZVK16RhyzmqWBHV3+hy8QLKKu5xHr5Km4nbeDN4gQ8UtvBi8TbaKG3k0eI98FddyZ/AhRSqu5trgE0pVXMGFweeUq7iMU4OvqFJxMUcG31Kj4gL2DX6gQcW57Bj8TLOKs9g0+I02Faez5vx1OlWcwpJzVz0qTmTOwYMqjmPKwSMqjmH8/18OMPrPmzIrtk2O5y96v/cj0/MfXaz8rNYny1dREp5Z3NIAAAAASUVORK5CYII='

        };
        nativeAppCall('postAppInfo', {title: '',});

    } catch (e) {
    }
})();
