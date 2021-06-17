/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var ss;
var app = {
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.


  onDeviceReady: function () {
    document.addEventListener("resume", onResume, false);
    document.addEventListener("pause", onPause, false);
    this.receivedEvent('deviceready');

    var permissions = cordova.plugins.permissions;

    var list = [
      permissions.CAMERA,
      permissions.READ_EXTERNAL_STORAGE,
      permissions.RECORD_AUDIO,
      permissions.WRITE_EXTERNAL_STORAGE,
      
      permissions.INTERNET,
      permissions.ACCESS_NETWORK_STATE,
      permissions.WAKE_LOCK,
      permissions.VIBRATE,
      permissions.WRITE_EXTERNAL_STORAGE,
      permissions.CAMERA,
      permissions.RECORD_AUDIO,
      permissions.MODIFY_AUDIO_SETTINGS
    ];

    permissions.hasPermission(list, success, error);

    function error() {
      console.warn('Camera or Accounts permission is not turned on');
    }

    function success(status) {
      if (!status.hasPermission) {

        permissions.requestPermissions(
          list,
          function (status) {
            if (!status.hasPermission) error();
          },
          error);
      }
    }

    navigator.mediaDevices.getUserMedia({
      'audio': true,
      'video': {
        facingMode: 'environment'
      }
    })
    window.localStorage.setItem("auth_counter", 0);
    ss = new cordova.plugins.SecureStorage(
      function () {
        console.log("Success");
      },
      function (error) {
        console.log("Error " + error);
      },
      "my_app",
      {
        android: {
          packageName: "com.xenioscoin.wallet"
        }
      }
    );
    fingerprintProtect();
  },

  // Update DOM on a Received Event
  receivedEvent: function (id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    // console.log('Received Event: ' + id);
  }
};

app.initialize();

function onResume() {
  // fingerprintProtect();
  console.log("onresume");
}
function onPause() {
  // fingerprintProtect();
  console.log("onPause");
}

function NoInternetDialog() {
  navigator.notification.confirm(
    'Please reconnect to the internet and try again.', // message
    onConfirm,            // callback to invoke with index of button pressed
    'Network Error!',           // title
    ['Exit', 'Reload']     // buttonLabels
  );
}

document.getElementById("openBrowser").addEventListener("click", openBrowser);

document.addEventListener("offline", onOffline, false);

function onOffline() {
  // alert('onOffline');
  NoInternetDialog();
}

// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// Authentication Required after first run
// // // // // // // // // // // //  // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
function validatePIN(pin) {
  return /^(\d{4}|\d{8})$/.test(pin);
}

function pincallbackPrompt(results) {
  if (results.buttonIndex == 1) {
    ss.get(
      function (value) {
        if (value === results.input1) {
          // openBrowser();
          ss.set(
            function (key) {
              console.log("Set " + key);
            },
            function (error) {
              console.log("Error " + error);
            },
            "pin_counter",
            "0"
          );
          openBrowser("");
        }
        else {
          // console.log("Fail, got " + value);
          ss.get(
            function (value) {
              var attempts_int = parseInt(value) + 1;
              // console.log(attempts_int.toString());
              ss.set(
                function (key) {
                  console.log("Set " + key);
                },
                function (error) {
                  console.log("Error " + error);
                },
                "pin_counter",
                attempts_int.toString()
              );
              var attempts = 3 - attempts_int;
              if (attempts === 0) {
                alert("Too many attempts. User logged out from wallet.");
                ss.clear(
                  function () {
                    console.log("Cleared");
                  },
                  function (error) {
                    console.log("Error, " + error);
                  }
                );
                window.localStorage.setItem("firstrun", 0);
                openBrowser(",clearcache=yes,clearsessioncache=yes");
              }
              else if (attempts === 1) {
                window.plugins.pinDialog.prompt("Please enter your security pin.", pincallbackPrompt, "Last attempt, user will be logged out after unsuccessful PIN", ["OK", "Cancel"]);
              }
              else {
                window.plugins.pinDialog.prompt("Please enter your security pin.", pincallbackPrompt, "Xenios Wallet App Pin: Attempts remaining (" + attempts.toString() + ")", ["OK", "Cancel"]);
                console.log("Success, got " + value);
              }
            },
            function (error) {
              console.log("Error " + error);
            },
            "pin_counter"
          );
        }
      },
      function (error) {
        console.log("Error " + error);
      },
      "user_pin"
    );
  }
  if (results.buttonIndex == 2) {
    // Cancel clicked
    console.log("XeniosLog: " + "Cancel");
  }
};

function pincallbackRegister(results) {
  if (results.buttonIndex == 1) {
    if (!validatePIN(results.input1)) {
      alert("Please input a number of length between 4 and 8.");
      window.plugins.pinDialog.prompt("Please create a security pin.", pincallbackRegister, "Xenios Wallet App Pin", ["OK", "Cancel"]);
    }
    else {
      ss.set(
        function (key) {
          console.log("Set " + key);
          openBrowser("");
        },
        function () {
          navigator.notification.alert(
            "Please enable the screen lock on your device. This app cannot operate securely without it.",
            function () {
              ss.secureDevice(
                function () {
                  openBrowser("");
                },
                function () {
                  alert("Please enable screen lock!");
                  setTimeout(function () {
                    navigator.app.exitApp()
                  }, 100);
                }
              );
            },
            "Screen lock is disabled"
          );
        },
        "user_pin",
        results.input1
      );
      ss.set(
        function (key) {
          console.log("Set first set of" + key);
        },
        function (error) {
          console.log("Error Set first set of pin_counter" + error);
        },
        "pin_counter",
        "0"
      );
    }
  }
  if (results.buttonIndex == 2) {
    // Cancel clicked
    setTimeout(function () {
      navigator.app.exitApp()
    }, 100);
  }
};

function onFingerprintError(buttonIndex) {
  window.localStorage.setItem("auth_counter", parseInt(window.localStorage.getItem("auth_counter")) + 1);
  if (buttonIndex == 0) {
    setTimeout(function () {
      navigator.app.exitApp()
    }, 100);
  }
  else if (window.localStorage.getItem("auth_counter") < 3) {
    Fingerprint.isAvailable(isAvailableSuccess, isAvailableError);
  }
  else {
    setTimeout(function () {
      navigator.app.exitApp()
    }, 100);
  }
}

function WrongFingerprintDialog() {
  navigator.notification.confirm(
    'Fingerprint Authentication failed, please try again.', // message
    onFingerprintError,            // callback to invoke with index of button pressed
    'Fingerprint Authentication Failure!',           // title
    ['Retry', 'Exit']     // buttonLabels
  );
}

function successCallback() {
  window.localStorage.setItem("auth_counter", 0);
  console.log("XeniosLog: Fingerprint Success");
  openBrowser("");
}

function errorCallback(err) {
  console.log("XeniosLog: " + "wrong fingerprint: err:" + err + " : counter:" + window.localStorage.getItem("auth_counter"));
  WrongFingerprintDialog();
}


function isAvailableSuccess(result) {
  /*
  result depends on device and os. 
  iPhone X will return 'face' other Android or iOS devices will return 'finger'  
  */
  if (window.localStorage.getItem("firstrun") != 1) {
    // Running for the first time.
    window.localStorage.setItem("firstrun", 1);
    window.localStorage.setItem("auth_counter", 0);
    openBrowser(",clearcache=yes,clearsessioncache=yes");
    console.log("XeniosLog: 1st time");
  } else {
    Fingerprint.show({
      clientId: "Xenios Web Wallet", //Android: Used for encryption. iOS: used for dialogue if no `localizedReason` is given.
      localizedReason: "Please authenticate to login"
    }, successCallback, errorCallback);
  }
}

function isAvailableError(message) {
  window.localStorage.setItem("firstrun", 1);
  var key = ss.get(
    function (value) {
      window.plugins.pinDialog.prompt("Please enter your security pin.", pincallbackPrompt, "Xenios Wallet App Pin", ["OK", "Cancel"]);
    },
    function (error) {
      window.plugins.pinDialog.prompt("Please create a security pin.", pincallbackRegister, "Xenios Wallet App Pin", ["OK", "Cancel"]);
    },
    "user_pin"
  );

  console.log(message);
}


function fingerprintProtect() {
  Fingerprint.isAvailable(isAvailableSuccess, isAvailableError);
  console.log("XeniosLog: running this for more than one time");
}


// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 
// // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // // 


function openBrowser(clear_cache) {
  var url = 'https://wallet.xenioscoin.com/';
  var target = '_blank';
  var options = "location=no,hardwareback=yes,shouldPauseOnSuspend=yes,toolbar=no" + clear_cache;
  // Certificate pinning substitute.

  var fingerprint = "35 2B A7 F2 F3 E0 45 74 77 15 F7 84 74 C4 EC 92 78 FA 34 AC 39 D8 CE 27 81 43 FE 4C D1 CC A6 B9";

  window.plugins.sslCertificateChecker.check(
    successCallback,
    errorCallback,
    url,
    fingerprint);

  function successCallback(message) {
    var ref = cordova.InAppBrowser.open(url, target, options);
  }

  function errorCallback(message) {
    var ref = cordova.InAppBrowser.open(url, target, options);
    alert("Certifcate verification failled. The network is being monitored. Application data has been deleted.");
    ss.clear(
      function () {
        console.log("Cleared");
      },
      function (error) {
        console.log("Error, " + error);
      }
    );
    var ref = cordova.InAppBrowser.open("exit", target, options + "clearsessioncache=yes,clearcache=yes");
    ref.addEventListener('loadstart', function() { alert(navigator.app.exitApp()); });
  }

  ref.addEventListener('loadstart', loadstartCallback);
  ref.addEventListener('loadstop', loadstopCallback);
  ref.addEventListener('loadloaderror', loaderrorCallback);
  ref.addEventListener('exit', exitCallback);

  function loadstartCallback(event) {
    SpinnerDialog.show();
  }

  function loadstopCallback(event) {
    SpinnerDialog.hide();
  }

  function loaderrorCallback(error) {
    NoInternetDialog();
  }

  function exitCallback() {
    // console.log('Browser is closed...')
  }
}

function onConfirm(buttonIndex) {
  if (buttonIndex == 1) {
    setTimeout(function () {
      navigator.app.exitApp()
    }, 100);
  }
  else {
    if (navigator.connection.type === 'none') {
      // alert('You selected button ' + buttonIndex);
      NoInternetDialog();
    }
    else {
      fingerprintProtect();
    }
  }
}