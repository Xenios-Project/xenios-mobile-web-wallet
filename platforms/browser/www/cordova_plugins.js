cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-network-information/www/network.js",
        "id": "cordova-plugin-network-information.network",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "navigator.connection",
            "navigator.network.connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/www/Connection.js",
        "id": "cordova-plugin-network-information.Connection",
        "pluginId": "cordova-plugin-network-information",
        "clobbers": [
            "Connection"
        ]
    },
    {
        "file": "plugins/cordova-plugin-network-information/src/browser/network.js",
        "id": "cordova-plugin-network-information.NetworkInfoProxy",
        "pluginId": "cordova-plugin-network-information",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-native-spinner/www/SpinnerDialog.js",
        "id": "cordova-plugin-native-spinner.SpinnerDialog",
        "pluginId": "cordova-plugin-native-spinner",
        "clobbers": [
            "SpinnerDialog"
        ]
    },
    {
        "file": "plugins/cordova-plugin-app-exit/www/ExitApp.js",
        "id": "cordova-plugin-app-exit.exitApp",
        "pluginId": "cordova-plugin-app-exit",
        "merges": [
            "navigator.app"
        ]
    },
    {
        "file": "plugins/cordova-plugin-app-exit/src/browser/ExitApp.js",
        "id": "cordova-plugin-app-exit.ExitApp",
        "pluginId": "cordova-plugin-app-exit",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/notification.js",
        "id": "cordova-plugin-dialogs.notification",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-dialogs/www/browser/notification.js",
        "id": "cordova-plugin-dialogs.notification_browser",
        "pluginId": "cordova-plugin-dialogs",
        "merges": [
            "navigator.notification"
        ]
    },
    {
        "file": "plugins/cordova-plugin-fingerprint-aio/www/Fingerprint.js",
        "id": "cordova-plugin-fingerprint-aio.Fingerprint",
        "pluginId": "cordova-plugin-fingerprint-aio",
        "clobbers": [
            "Fingerprint"
        ]
    },
    {
        "file": "plugins/cordova-plugin-pin-dialog/www/pin.js",
        "id": "cordova-plugin-pin-dialog.PinDialog",
        "pluginId": "cordova-plugin-pin-dialog",
        "merges": [
            "window.plugins.pinDialog"
        ]
    },
    {
        "file": "plugins/cordova-plugin-secure-storage-echo/www/securestorage.js",
        "id": "cordova-plugin-secure-storage-echo.SecureStorage",
        "pluginId": "cordova-plugin-secure-storage-echo",
        "clobbers": [
            "SecureStorage"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
        "id": "cordova-plugin-inappbrowser.inappbrowser",
        "pluginId": "cordova-plugin-inappbrowser",
        "clobbers": [
            "cordova.InAppBrowser.open"
        ]
    },
    {
        "file": "plugins/cordova-plugin-inappbrowser/src/browser/InAppBrowserProxy.js",
        "id": "cordova-plugin-inappbrowser.InAppBrowserProxy",
        "pluginId": "cordova-plugin-inappbrowser",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/src/browser/SplashScreenProxy.js",
        "id": "cordova-plugin-splashscreen.SplashScreenProxy",
        "pluginId": "cordova-plugin-splashscreen",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
        "id": "cordova-plugin-splashscreen.SplashScreen",
        "pluginId": "cordova-plugin-splashscreen",
        "clobbers": [
            "navigator.splashscreen"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-network-information": "2.0.2",
    "cordova-plugin-native-spinner": "1.1.3",
    "cordova-plugin-console": "1.1.0",
    "cordova-plugin-app-exit": "0.0.1",
    "cordova-plugin-dialogs": "2.0.2",
    "cordova-plugin-fingerprint-aio": "4.0.2",
    "cordova-plugin-pin-dialog": "0.1.3",
    "cordova-plugin-secure-storage-echo": "5.1.1",
    "cordova-plugin-inappbrowser": "5.0.0",
    "cordova-plugin-splashscreen": "6.0.0"
}
// BOTTOM OF METADATA
});