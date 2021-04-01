cordova.define('cordova/plugin_list', function(require, exports, module) {
  module.exports = [
    {
      "id": "cordova-plugin-app-exit.exitApp",
      "file": "plugins/cordova-plugin-app-exit/www/ExitApp.js",
      "pluginId": "cordova-plugin-app-exit",
      "merges": [
        "navigator.app"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification",
      "file": "plugins/cordova-plugin-dialogs/www/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-dialogs.notification_android",
      "file": "plugins/cordova-plugin-dialogs/www/android/notification.js",
      "pluginId": "cordova-plugin-dialogs",
      "merges": [
        "navigator.notification"
      ]
    },
    {
      "id": "cordova-plugin-fingerprint-aio.Fingerprint",
      "file": "plugins/cordova-plugin-fingerprint-aio/www/Fingerprint.js",
      "pluginId": "cordova-plugin-fingerprint-aio",
      "clobbers": [
        "Fingerprint"
      ]
    },
    {
      "id": "cordova-plugin-inappbrowser.inappbrowser",
      "file": "plugins/cordova-plugin-inappbrowser/www/inappbrowser.js",
      "pluginId": "cordova-plugin-inappbrowser",
      "clobbers": [
        "cordova.InAppBrowser.open"
      ]
    },
    {
      "id": "cordova-plugin-native-spinner.SpinnerDialog",
      "file": "plugins/cordova-plugin-native-spinner/www/SpinnerDialog.js",
      "pluginId": "cordova-plugin-native-spinner",
      "clobbers": [
        "SpinnerDialog"
      ]
    },
    {
      "id": "cordova-plugin-network-information.network",
      "file": "plugins/cordova-plugin-network-information/www/network.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "navigator.connection",
        "navigator.network.connection"
      ]
    },
    {
      "id": "cordova-plugin-network-information.Connection",
      "file": "plugins/cordova-plugin-network-information/www/Connection.js",
      "pluginId": "cordova-plugin-network-information",
      "clobbers": [
        "Connection"
      ]
    },
    {
      "id": "cordova-plugin-pin-dialog.PinDialog",
      "file": "plugins/cordova-plugin-pin-dialog/www/pin.js",
      "pluginId": "cordova-plugin-pin-dialog",
      "merges": [
        "window.plugins.pinDialog"
      ]
    },
    {
      "id": "cordova-plugin-secure-storage-echo.SecureStorage",
      "file": "plugins/cordova-plugin-secure-storage-echo/www/securestorage.js",
      "pluginId": "cordova-plugin-secure-storage-echo",
      "clobbers": [
        "SecureStorage"
      ]
    },
    {
      "id": "cordova-plugin-splashscreen.SplashScreen",
      "file": "plugins/cordova-plugin-splashscreen/www/splashscreen.js",
      "pluginId": "cordova-plugin-splashscreen",
      "clobbers": [
        "navigator.splashscreen"
      ]
    }
  ];
  module.exports.metadata = {
    "cordova-plugin-app-exit": "0.0.1",
    "cordova-plugin-console": "1.1.0",
    "cordova-plugin-dialogs": "2.0.2",
    "cordova-plugin-fingerprint-aio": "4.0.2",
    "cordova-plugin-inappbrowser": "5.0.0",
    "cordova-plugin-native-spinner": "1.1.3",
    "cordova-plugin-network-information": "2.0.2",
    "cordova-plugin-pin-dialog": "0.1.3",
    "cordova-plugin-secure-storage-echo": "5.1.1",
    "cordova-plugin-whitelist": "1.3.4",
    "cordova-plugin-splashscreen": "6.0.0"
  };
});