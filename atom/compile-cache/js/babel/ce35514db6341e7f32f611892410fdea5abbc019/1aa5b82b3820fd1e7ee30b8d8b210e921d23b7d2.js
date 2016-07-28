'use babel';
'use strict';

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

var child_process = require('child_process');
var fs = require('fs');
var path = require('path');

// This is only needed because Atom 1.6 doesn't have a consistent Env on OSX.
// When 1.6 is deprecated, this will not be needed.
var environmentHelpers = require('./environment-helpers');

var fixedEnv = environmentHelpers.getFromShell();

var CompatResult = {
  invalidAtDest: 0,
  nothingInDest: 1,
  wrongVersionInDest: 2,
  rightVersionInDest: 3
};

/**
 * Even if the first compatability check returned invalidAtDest,
 * we might still be able to install if the user corrects it.
 * This enum encodes what actually happened (or notDetermined) if
 * we haven't yet determined what happened.
 */
var InstallStatus = {
  notDetermined: 0,
  noInstallNeeded: 1,
  installNeededAndCompleted: 2,
  installNeededAndDeclined: 3
};
var apmPath = atom.packages.getApmPath();

var unloadAtomReason = function unloadAtomReason() {
  atom.packages.unloadPackage('atom-reason');
  atom.packages.unloadPackage('language-reason');
};
var packagePaths = atom.packages.packageDirPaths;
if (packagePaths.length == 0) {
  atom.notifications.addError("Cannot find Atom package paths - don't know how to use Reason.");
}

var defaultPackagePathLocation = packagePaths[0];
var checkIndividuallyInstalled = function checkIndividuallyInstalled() {
  return atom.packages.resolvePackagePath('atom-reason') || atom.packages.resolvePackagePath('language-reason');
};

var atomReasonDestDir = path.join(defaultPackagePathLocation, 'atom-reason');
var languageReasonDestDir = path.join(defaultPackagePathLocation, 'language-reason');

var shouldLog = atom.config.get('atom-reason-loader.outputDebugDataToConsole');
var debugLog = function debugLog(str) {
  if (shouldLog) {
    console.log(str);
  }
};

var checkVersionCompat = function checkVersionCompat(packageName, sourceDir, destDir, andThen) {
  var sourcePackageJsonPath = path.join(sourceDir, 'package.json');
  var destPackageJsonPath = path.join(destDir, 'package.json');
  fs.exists(destPackageJsonPath, function (destPackageJsonExists) {
    debugLog('Checking for existance of ' + destPackageJsonPath + ' and found exists:' + destPackageJsonExists);
    if (destPackageJsonExists) {
      (function () {
        var sourcePackageJson = null;
        var destPackageJson = null;
        var atomReasonLoaderPackage = require('../package.json');
        // We get the current version of *this* plugin - the autoloader.
        var versionOfAtomReasonLoader = atomReasonLoaderPackage.version;
        var analyzePackages = function analyzePackages() {
          if (sourcePackageJson && destPackageJson) {
            var messagesToInstaller = sourcePackageJson['messagesToInstaller'];
            // Put a little hook (not yet used) to inject messages if ever we need
            // to tell people "Hey, you - the atomReasonLoader autoloading plugin you're using
            // itself needs to be updated!"
            if (messagesToInstaller && messagesToInstaller[versionOfAtomReasonLoader]) {
              atom.notifications.addInfo('Message From:`' + packageName + '`', { detail: messagesToInstaller[versionOfAtomReasonLoader] });
            }
            if (sourcePackageJson.version === destPackageJson.version) {
              debugLog('Both ' + destPackageJsonPath + ' and ' + sourcePackageJsonPath + ' exist with equal versions:' + destPackageJson.version);
              andThen(null, CompatResult.rightVersionInDest);
            } else {
              debugLog('Both ' + destPackageJsonPath + ' and ' + sourcePackageJsonPath + 'exist with different versions:' + destPackageJson.version + ' vs. ' + sourcePackageJson.version);
              andThen(null, CompatResult.wrongVersionInDest);
            }
          }
        };
        fs.readFile(sourcePackageJsonPath, function (err, data) {
          err ? andThen(err) : (sourcePackageJson = JSON.parse(data.toString())) && analyzePackages();
        });
        fs.readFile(destPackageJsonPath, function (err, data) {
          err ? andThen(err) : (destPackageJson = JSON.parse(data.toString())) && analyzePackages();
        });
      })();
    } else {
      if (fs.existsSync(destDir)) {
        // The directory is there, but corrupt - no package.json
        andThen(null, CompatResult.invalidAtDest);
      } else {
        andThen(null, CompatResult.nothingInDest);
      }
    }
  });
};

// TODO: Do the installation:
var copyPluginAndInstall = function copyPluginAndInstall(packageName, sourceDir, destDir, andThen) {
  var loadingMsg = atom.notifications.addInfo('Installing ' + packageName + ' - This might take a while\n\n' + '- This message will close when complete\n' + '- Installing into `' + destDir + '`\n', { dismissable: true });
  // Note that language-reason doesn't require any npm install (yet).
  child_process.exec('cp -r "' + sourceDir + '" "' + destDir + '" && cd "' + destDir + '" && "' + apmPath + '" --color false install', { env: fixedEnv }, function (err, stdout, stderr) {
    loadingMsg.dismiss();
    if (err) {
      console.error(err, stderr);
      atom.notifications.addError('Error installing ' + packageName + ' ' + err, { detail: stderr });
      andThen(err);
    } else {
      atom.notifications.addSuccess('Successfully Installed ' + packageName + '\'s dependencies.');
      andThen(null);
    }
  });
};

/**
 * andThen will be invoked with (error, InstallStatus)
 */
var ensureInstalled = function ensureInstalled(packageName, sourceDir, destDir, res, andThen) {
  // Give chance to first uninstall the wrong version to make room for the right one.
  if (res === CompatResult.wrongVersionInDest || res === CompatResult.invalidAtDest) {
    atom.packages.deactivatePackage(packageName);
    debugLog('Trying to reinstall ' + packageName + ' because the wrong/invalid version is currently installed[' + res + ']');
    var msg = atom.notifications.addWarning("Help us upgrade `" + packageName + "`.\n\n" + "- Uninstall `" + packageName + "` (`Packages > Settings View > Manage Packages`).\n" + "- **After uninstalling**, close this dialog and the new version will be installed automatically.\n", {
      dismissable: true,
      icon: 'sync',
      detail: "Installing new version from " + sourceDir + " to " + destDir + "."
    });
    msg.onDidDismiss(function () {
      // Give it one final chance
      checkVersionCompat(packageName, sourceDir, destDir, function (err, secondAttemptRes) {
        if (err) {
          andThen(err);
        } else {
          if (secondAttemptRes === CompatResult.wrongVersionInDest || secondAttemptRes === CompatResult.invalidAtDest) {
            atom.notifications.addError("`" + packageName + "` not installed because previous version not removed.\n\n" + "- Restart Atom to try again.\n", { dismissable: false });
            andThen(null, InstallStatus.installNeededAndDeclined);
          } else {
            // TODO: Do the installation:
            copyPluginAndInstall(packageName, sourceDir, destDir, function (err) {
              andThen(err, err ? null : InstallStatus.installNeededAndCompleted);
            });
          }
        }
      });
    });
  } else if (res === CompatResult.rightVersionInDest) {
    andThen(null, InstallStatus.noInstallNeeded);
  } else if (res === CompatResult.nothingInDest) {
    // TODO: Do the installation:
    debugLog('Copying and installing ' + packageName + ' into ' + destDir);
    copyPluginAndInstall(packageName, sourceDir, destDir, function (err) {
      andThen(null, err ? null : InstallStatus.installNeededAndCompleted);
    });
  }
};

var getReasonShareDir = function getReasonShareDir() {
  // Eventually will allow configuring these as well, perhaps.
  var reasonBinDirConfig = null;
  var reasonShareDirConfig = null;
  var reasonBinDir = reasonBinDirConfig !== '' ? reasonBinDirConfig : null;
  var reasonShareDir = reasonShareDirConfig !== '' ? reasonShareDirConfig : null;
  if (reasonBinDir == null || reasonShareDir == null) {
    // Then look up the opam bin dir, and base any missing reason dirs based on that.
    var opamBinDir = null;
    try {
      opamBinDir = child_process.execSync('opam config var bin', { env: fixedEnv }).toString().trim();
    } catch (e) {
      throw new Error("Could not find OPAM in path. Do you have `opam` installed and in your PATH? " + "Report this error if you do have OPAM installed and in your PATH.");
    }
    if (opamBinDir) {
      reasonBinDir = reasonBinDir || path.join(opamBinDir, 'reason');
      reasonShareDir = reasonShareDir || path.join(opamBinDir, '..', 'share', 'reason');
    }
  }
  return reasonShareDir;
};
var syncPlugins = function syncPlugins() {
  var reasonShareDir = getReasonShareDir();
  if (!reasonShareDir) {
    atom.notifications.addError("Could not find Reason share directory");
  } else {
    (function () {
      var atomReasonDir = path.join(reasonShareDir, 'editorSupport', 'atom-reason');
      var languageReasonDir = path.join(reasonShareDir, 'editorSupport', 'language-reason');
      if (!fs.existsSync(languageReasonDir) || !fs.existsSync(atomReasonDir)) {
        atom.notifications.addError("Could not find Reason Atom plugin at " + atomReasonDir + " and " + languageReasonDir, { detail: "Make sure you have installed/pinned the latest version of Reason via OPAM" });
      } else {
        (function () {
          var atomReasonInstalled = InstallStatus.notDetermined;
          var languageReasonInstalled = InstallStatus.notDetermined;
          var loadAndActivateIfPossible = function loadAndActivateIfPossible() {
            // We'll only activate/load the packages if we actually coppied at least one over,
            // and if we've received responses back. It shouldn't hurt to load them twice.
            if (atomReasonInstalled !== InstallStatus.notDetermined && languageReasonInstalled !== InstallStatus.notDetermined && (atomReasonInstalled === InstallStatus.installNeededAndCompleted || languageReasonInstalled === InstallStatus.installNeededAndCompleted)) {
              atom.packages.loadPackage(atomReasonDestDir);
              atom.packages.loadPackage(languageReasonDestDir);
              atom.packages.activatePackage('atom-reason');
              atom.packages.activatePackage('language-reason');
            }
          };
          checkVersionCompat('atom-reason', atomReasonDir, atomReasonDestDir, function (err, res) {
            if (err) {
              atom.notifications.addError('Error checking currently installed atom-reason. Try uninstalling it.', { detail: err });
            } else {
              ensureInstalled('atom-reason', atomReasonDir, atomReasonDestDir, res, function (err, installStatus) {
                if (err) {
                  atom.notifications.addError('Error attempting to install atom-reason.', { detail: err });
                } else {
                  atomReasonInstalled = installStatus;
                  loadAndActivateIfPossible();
                }
              });
            }
          });

          checkVersionCompat('language-reason', languageReasonDir, languageReasonDestDir, function (err, res) {
            if (err) {
              atom.notifications.addError('Error checking currently installed language-reason. Try uninstalling it.', { detail: err });
            } else {
              ensureInstalled('language-reason', languageReasonDir, languageReasonDestDir, res, function (err, installStatus) {
                if (err) {
                  atom.notifications.addError('Error attempting to install atom-reason.', { detail: err });
                } else {
                  languageReasonInstalled = installStatus;
                  loadAndActivateIfPossible();
                }
              });
            }
          });
        })();
      }
    })();
  }
};

module.exports = {
  activate: function activate() {
    if (atom.config.get('atom-reason-loader.automaticallyInstallPluginsFromOpam')) {
      syncPlugins();
    }
  },

  deactivate: function deactivate() {
    unloadAtomReason();
  },

  config: {
    // These first three config values determine where to load the *actual* plugin
    // from OPAM.
    "automaticallyInstallPluginsFromOpam": {
      "title": "Automatically keep plugin in sync with installed Reason",
      "type": "boolean",
      "default": true,
      "description": "Will copy updated versions into the ~/.atom/packages directory. If developing " + " The Reason plugins themselves, you'd want to uncheck this box, and then manually " + " point symlinks from ~/.atom/packages to the respective packages under development."
    },
    "outputDebugDataToConsole": {
      "title": "Output plugin debug data to console",
      "type": "boolean",
      "default": false,
      "description": "If you're having problems with the loading of the Reason plugins, " + "enable this to see debug data in console."
    }
  }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2NoYXJsZXMvLmF0b20vcGFja2FnZXMvYXRvbS1yZWFzb24tbG9hZGVyL2xpYi9hdG9tLXJlYXNvbi1sb2FkZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVyxDQUFDO0FBQ1osWUFBWSxDQUFDOzs7Ozs7Ozs7O0FBV2IsSUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQy9DLElBQU0sRUFBRSxHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN6QixJQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Ozs7QUFJN0IsSUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsdUJBQXVCLENBQUMsQ0FBQzs7QUFFNUQsSUFBTSxRQUFRLEdBQUcsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7O0FBRW5ELElBQU0sWUFBWSxHQUFHO0FBQ25CLGVBQWEsRUFBRSxDQUFDO0FBQ2hCLGVBQWEsRUFBRSxDQUFDO0FBQ2hCLG9CQUFrQixFQUFHLENBQUM7QUFDdEIsb0JBQWtCLEVBQUUsQ0FBQztDQUN0QixDQUFDOzs7Ozs7OztBQVFGLElBQU0sYUFBYSxHQUFHO0FBQ3BCLGVBQWEsRUFBRSxDQUFDO0FBQ2hCLGlCQUFlLEVBQUUsQ0FBQztBQUNsQiwyQkFBeUIsRUFBRSxDQUFDO0FBQzVCLDBCQUF3QixFQUFFLENBQUM7Q0FDNUIsQ0FBQztBQUNGLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxFQUFFLENBQUM7O0FBRTNDLElBQU0sZ0JBQWdCLEdBQUcsU0FBbkIsZ0JBQWdCLEdBQVM7QUFDN0IsTUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUM7QUFDM0MsTUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsaUJBQWlCLENBQUMsQ0FBQztDQUNoRCxDQUFDO0FBQ0YsSUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FB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LFNBQVM7QUFDakIsZUFBUyxFQUFFLEtBQUs7QUFDaEIsbUJBQWEsRUFDWCxvRUFBb0UsR0FDcEUsMkNBQTJDO0tBQzlDO0dBQ0Y7Q0FDRixDQUFDIiwiZmlsZSI6Ii9ob21lL2NoYXJsZXMvLmF0b20vcGFja2FnZXMvYXRvbS1yZWFzb24tbG9hZGVyL2xpYi9hdG9tLXJlYXNvbi1sb2FkZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIndXNlIGJhYmVsJztcbid1c2Ugc3RyaWN0Jztcbi8qIEBmbG93ICovXG5cbi8qXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTUtcHJlc2VudCwgRmFjZWJvb2ssIEluYy5cbiAqIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKlxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgbGljZW5zZSBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluXG4gKiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5jb25zdCBjaGlsZF9wcm9jZXNzID0gcmVxdWlyZSgnY2hpbGRfcHJvY2VzcycpO1xuY29uc3QgZnMgPSByZXF1aXJlKCdmcycpO1xuY29uc3QgcGF0aCA9IHJlcXVpcmUoJ3BhdGgnKTtcblxuLy8gVGhpcyBpcyBvbmx5IG5lZWRlZCBiZWNhdXNlIEF0b20gMS42IGRvZXNuJ3QgaGF2ZSBhIGNvbnNpc3RlbnQgRW52IG9uIE9TWC5cbi8vIFdoZW4gMS42IGlzIGRlcHJlY2F0ZWQsIHRoaXMgd2lsbCBub3QgYmUgbmVlZGVkLlxuY29uc3QgZW52aXJvbm1lbnRIZWxwZXJzID0gcmVxdWlyZSgnLi9lbnZpcm9ubWVudC1oZWxwZXJzJyk7XG5cbmNvbnN0IGZpeGVkRW52ID0gZW52aXJvbm1lbnRIZWxwZXJzLmdldEZyb21TaGVsbCgpO1xuXG5jb25zdCBDb21wYXRSZXN1bHQgPSB7XG4gIGludmFsaWRBdERlc3Q6IDAsXG4gIG5vdGhpbmdJbkRlc3Q6IDEsXG4gIHdyb25nVmVyc2lvbkluRGVzdCA6IDIsXG4gIHJpZ2h0VmVyc2lvbkluRGVzdDogM1xufTtcblxuLyoqXG4gKiBFdmVuIGlmIHRoZSBmaXJzdCBjb21wYXRhYmlsaXR5IGNoZWNrIHJldHVybmVkIGludmFsaWRBdERlc3QsXG4gKiB3ZSBtaWdodCBzdGlsbCBiZSBhYmxlIHRvIGluc3RhbGwgaWYgdGhlIHVzZXIgY29ycmVjdHMgaXQuXG4gKiBUaGlzIGVudW0gZW5jb2RlcyB3aGF0IGFjdHVhbGx5IGhhcHBlbmVkIChvciBub3REZXRlcm1pbmVkKSBpZlxuICogd2UgaGF2ZW4ndCB5ZXQgZGV0ZXJtaW5lZCB3aGF0IGhhcHBlbmVkLlxuICovXG5jb25zdCBJbnN0YWxsU3RhdHVzID0ge1xuICBub3REZXRlcm1pbmVkOiAwLFxuICBub0luc3RhbGxOZWVkZWQ6IDEsXG4gIGluc3RhbGxOZWVkZWRBbmRDb21wbGV0ZWQ6IDIsXG4gIGluc3RhbGxOZWVkZWRBbmREZWNsaW5lZDogM1xufTtcbmNvbnN0IGFwbVBhdGggPSBhdG9tLnBhY2thZ2VzLmdldEFwbVBhdGgoKTtcblxuY29uc3QgdW5sb2FkQXRvbVJlYXNvbiA9ICgpID0+IHtcbiAgYXRvbS5wYWNrYWdlcy51bmxvYWRQYWNrYWdlKCdhdG9tLXJlYXNvbicpO1xuICBhdG9tLnBhY2thZ2VzLnVubG9hZFBhY2thZ2UoJ2xhbmd1YWdlLXJlYXNvbicpO1xufTtcbmNvbnN0IHBhY2thZ2VQYXRocyA9IGF0b20ucGFja2FnZXMucGFja2FnZURpclBhdGhzO1xuaWYgKHBhY2thZ2VQYXRocy5sZW5ndGggPT0gMCkge1xuICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoXCJDYW5ub3QgZmluZCBBdG9tIHBhY2thZ2UgcGF0aHMgLSBkb24ndCBrbm93IGhvdyB0byB1c2UgUmVhc29uLlwiKTtcbn1cblxuY29uc3QgZGVmYXVsdFBhY2thZ2VQYXRoTG9jYXRpb24gPSBwYWNrYWdlUGF0aHNbMF07XG5jb25zdCBjaGVja0luZGl2aWR1YWxseUluc3RhbGxlZCA9ICgpID0+IHtcbiAgcmV0dXJuIGF0b20ucGFja2FnZXMucmVzb2x2ZVBhY2thZ2VQYXRoKCdhdG9tLXJlYXNvbicpIHx8XG4gICAgYXRvbS5wYWNrYWdlcy5yZXNvbHZlUGFja2FnZVBhdGgoJ2xhbmd1YWdlLXJlYXNvbicpO1xufTtcblxuY29uc3QgYXRvbVJlYXNvbkRlc3REaXIgPSBwYXRoLmpvaW4oZGVmYXVsdFBhY2thZ2VQYXRoTG9jYXRpb24sICdhdG9tLXJlYXNvbicpO1xuY29uc3QgbGFuZ3VhZ2VSZWFzb25EZXN0RGlyID0gcGF0aC5qb2luKGRlZmF1bHRQYWNrYWdlUGF0aExvY2F0aW9uLCAnbGFuZ3VhZ2UtcmVhc29uJyk7XG5cbmNvbnN0IHNob3VsZExvZyA9IGF0b20uY29uZmlnLmdldCgnYXRvbS1yZWFzb24tbG9hZGVyLm91dHB1dERlYnVnRGF0YVRvQ29uc29sZScpO1xuY29uc3QgZGVidWdMb2cgPSAoc3RyKSA9PiB7XG4gIGlmIChzaG91bGRMb2cpIHtcbiAgICBjb25zb2xlLmxvZyhzdHIpO1xuICB9XG59O1xuXG5jb25zdCBjaGVja1ZlcnNpb25Db21wYXQgPSAocGFja2FnZU5hbWUsIHNvdXJjZURpciwgZGVzdERpciwgYW5kVGhlbikgPT4ge1xuICBjb25zdCBzb3VyY2VQYWNrYWdlSnNvblBhdGggPSBwYXRoLmpvaW4oc291cmNlRGlyLCAncGFja2FnZS5qc29uJyk7XG4gIGNvbnN0IGRlc3RQYWNrYWdlSnNvblBhdGggPSBwYXRoLmpvaW4oZGVzdERpciwgJ3BhY2thZ2UuanNvbicpO1xuICBmcy5leGlzdHMoZGVzdFBhY2thZ2VKc29uUGF0aCwgZGVzdFBhY2thZ2VKc29uRXhpc3RzID0+IHtcbiAgICBkZWJ1Z0xvZygnQ2hlY2tpbmcgZm9yIGV4aXN0YW5jZSBvZiAnICsgZGVzdFBhY2thZ2VKc29uUGF0aCArICcgYW5kIGZvdW5kIGV4aXN0czonICsgZGVzdFBhY2thZ2VKc29uRXhpc3RzKTtcbiAgICBpZiAoZGVzdFBhY2thZ2VKc29uRXhpc3RzKSB7XG4gICAgICBsZXQgc291cmNlUGFja2FnZUpzb24gPSBudWxsO1xuICAgICAgbGV0IGRlc3RQYWNrYWdlSnNvbiA9IG51bGw7XG4gICAgICBsZXQgYXRvbVJlYXNvbkxvYWRlclBhY2thZ2UgPSByZXF1aXJlKCcuLi9wYWNrYWdlLmpzb24nKTtcbiAgICAgIC8vIFdlIGdldCB0aGUgY3VycmVudCB2ZXJzaW9uIG9mICp0aGlzKiBwbHVnaW4gLSB0aGUgYXV0b2xvYWRlci5cbiAgICAgIGxldCB2ZXJzaW9uT2ZBdG9tUmVhc29uTG9hZGVyID0gYXRvbVJlYXNvbkxvYWRlclBhY2thZ2UudmVyc2lvbjtcbiAgICAgIGNvbnN0IGFuYWx5emVQYWNrYWdlcyA9ICgpID0+IHtcbiAgICAgICAgaWYgKHNvdXJjZVBhY2thZ2VKc29uICYmIGRlc3RQYWNrYWdlSnNvbikge1xuICAgICAgICAgIGxldCBtZXNzYWdlc1RvSW5zdGFsbGVyID0gc291cmNlUGFja2FnZUpzb25bJ21lc3NhZ2VzVG9JbnN0YWxsZXInXTtcbiAgICAgICAgICAvLyBQdXQgYSBsaXR0bGUgaG9vayAobm90IHlldCB1c2VkKSB0byBpbmplY3QgbWVzc2FnZXMgaWYgZXZlciB3ZSBuZWVkXG4gICAgICAgICAgLy8gdG8gdGVsbCBwZW9wbGUgXCJIZXksIHlvdSAtIHRoZSBhdG9tUmVhc29uTG9hZGVyIGF1dG9sb2FkaW5nIHBsdWdpbiB5b3UncmUgdXNpbmdcbiAgICAgICAgICAvLyBpdHNlbGYgbmVlZHMgdG8gYmUgdXBkYXRlZCFcIlxuICAgICAgICAgIGlmIChtZXNzYWdlc1RvSW5zdGFsbGVyICYmIG1lc3NhZ2VzVG9JbnN0YWxsZXJbdmVyc2lvbk9mQXRvbVJlYXNvbkxvYWRlcl0pIHtcbiAgICAgICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRJbmZvKCdNZXNzYWdlIEZyb206YCcgKyBwYWNrYWdlTmFtZSArICdgJywge2RldGFpbDptZXNzYWdlc1RvSW5zdGFsbGVyW3ZlcnNpb25PZkF0b21SZWFzb25Mb2FkZXJdfSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzb3VyY2VQYWNrYWdlSnNvbi52ZXJzaW9uID09PSBkZXN0UGFja2FnZUpzb24udmVyc2lvbikge1xuICAgICAgICAgICAgZGVidWdMb2coXG4gICAgICAgICAgICAgICdCb3RoICcgKyBkZXN0UGFja2FnZUpzb25QYXRoICsgJyBhbmQgJyArIHNvdXJjZVBhY2thZ2VKc29uUGF0aCArXG4gICAgICAgICAgICAgICcgZXhpc3Qgd2l0aCBlcXVhbCB2ZXJzaW9uczonICsgZGVzdFBhY2thZ2VKc29uLnZlcnNpb25cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICBhbmRUaGVuKG51bGwsIENvbXBhdFJlc3VsdC5yaWdodFZlcnNpb25JbkRlc3QpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBkZWJ1Z0xvZyhcbiAgICAgICAgICAgICAgJ0JvdGggJyArIGRlc3RQYWNrYWdlSnNvblBhdGggKyAnIGFuZCAnICsgc291cmNlUGFja2FnZUpzb25QYXRoICtcbiAgICAgICAgICAgICAgJ2V4aXN0IHdpdGggZGlmZmVyZW50IHZlcnNpb25zOicgKyBkZXN0UGFja2FnZUpzb24udmVyc2lvbiArXG4gICAgICAgICAgICAgICcgdnMuICcgKyBzb3VyY2VQYWNrYWdlSnNvbi52ZXJzaW9uXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYW5kVGhlbihudWxsLCBDb21wYXRSZXN1bHQud3JvbmdWZXJzaW9uSW5EZXN0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICBmcy5yZWFkRmlsZShzb3VyY2VQYWNrYWdlSnNvblBhdGgsIChlcnIsIGRhdGEpID0+IHtcbiAgICAgICAgZXJyID8gYW5kVGhlbihlcnIpIDpcbiAgICAgICAgICAoc291cmNlUGFja2FnZUpzb24gPSBKU09OLnBhcnNlKGRhdGEudG9TdHJpbmcoKSkpICYmIGFuYWx5emVQYWNrYWdlcygpO1xuICAgICAgfSk7XG4gICAgICBmcy5yZWFkRmlsZShkZXN0UGFja2FnZUpzb25QYXRoLCAoZXJyLCBkYXRhKSA9PiB7XG4gICAgICAgIGVyciA/IGFuZFRoZW4oZXJyKSA6XG4gICAgICAgICAgKGRlc3RQYWNrYWdlSnNvbiA9IEpTT04ucGFyc2UoZGF0YS50b1N0cmluZygpKSkgJiYgYW5hbHl6ZVBhY2thZ2VzKCk7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGZzLmV4aXN0c1N5bmMoZGVzdERpcikpIHtcbiAgICAgICAgLy8gVGhlIGRpcmVjdG9yeSBpcyB0aGVyZSwgYnV0IGNvcnJ1cHQgLSBubyBwYWNrYWdlLmpzb25cbiAgICAgICAgYW5kVGhlbihudWxsLCBDb21wYXRSZXN1bHQuaW52YWxpZEF0RGVzdCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBhbmRUaGVuKG51bGwsIENvbXBhdFJlc3VsdC5ub3RoaW5nSW5EZXN0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufTtcblxuLy8gVE9ETzogRG8gdGhlIGluc3RhbGxhdGlvbjpcbmNvbnN0IGNvcHlQbHVnaW5BbmRJbnN0YWxsID0gKHBhY2thZ2VOYW1lLCBzb3VyY2VEaXIsIGRlc3REaXIsIGFuZFRoZW4pID0+IHtcbiAgY29uc3QgbG9hZGluZ01zZyA9XG4gICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEluZm8oXG4gICAgICAnSW5zdGFsbGluZyAnICsgcGFja2FnZU5hbWUgKyAnIC0gVGhpcyBtaWdodCB0YWtlIGEgd2hpbGVcXG5cXG4nICtcbiAgICAgICctIFRoaXMgbWVzc2FnZSB3aWxsIGNsb3NlIHdoZW4gY29tcGxldGVcXG4nICtcbiAgICAgICctIEluc3RhbGxpbmcgaW50byBgJyArIGRlc3REaXIgKyAnYFxcbicsXG4gICAgICB7ZGlzbWlzc2FibGU6IHRydWV9XG4gICAgKTtcbiAgLy8gTm90ZSB0aGF0IGxhbmd1YWdlLXJlYXNvbiBkb2Vzbid0IHJlcXVpcmUgYW55IG5wbSBpbnN0YWxsICh5ZXQpLlxuICBjaGlsZF9wcm9jZXNzLmV4ZWMoXG4gICAgJ2NwIC1yIFwiJyArIHNvdXJjZURpciArICdcIiBcIicgKyBkZXN0RGlyICsgJ1wiICYmIGNkIFwiJyArIGRlc3REaXIgKyAnXCIgJiYgXCInICsgYXBtUGF0aCArICdcIiAtLWNvbG9yIGZhbHNlIGluc3RhbGwnLFxuICAgIHtlbnY6IGZpeGVkRW52fSxcbiAgICAoZXJyLCBzdGRvdXQsIHN0ZGVycikgPT4ge1xuICAgICAgbG9hZGluZ01zZy5kaXNtaXNzKCk7XG4gICAgICBpZiAoZXJyKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoZXJyLCBzdGRlcnIpO1xuICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoJ0Vycm9yIGluc3RhbGxpbmcgJyArIHBhY2thZ2VOYW1lICsgJyAnICsgZXJyLCB7ZGV0YWlsOiBzdGRlcnJ9KTtcbiAgICAgICAgYW5kVGhlbihlcnIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZFN1Y2Nlc3MoJ1N1Y2Nlc3NmdWxseSBJbnN0YWxsZWQgJyArIHBhY2thZ2VOYW1lICsgJ1xcJ3MgZGVwZW5kZW5jaWVzLicpO1xuICAgICAgICBhbmRUaGVuKG51bGwpO1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn07XG5cbi8qKlxuICogYW5kVGhlbiB3aWxsIGJlIGludm9rZWQgd2l0aCAoZXJyb3IsIEluc3RhbGxTdGF0dXMpXG4gKi9cbmNvbnN0IGVuc3VyZUluc3RhbGxlZCA9IChwYWNrYWdlTmFtZSwgc291cmNlRGlyLCBkZXN0RGlyLCByZXMsIGFuZFRoZW4pID0+IHtcbiAgLy8gR2l2ZSBjaGFuY2UgdG8gZmlyc3QgdW5pbnN0YWxsIHRoZSB3cm9uZyB2ZXJzaW9uIHRvIG1ha2Ugcm9vbSBmb3IgdGhlIHJpZ2h0IG9uZS5cbiAgaWYgKHJlcyA9PT0gQ29tcGF0UmVzdWx0Lndyb25nVmVyc2lvbkluRGVzdCB8fCByZXMgPT09IENvbXBhdFJlc3VsdC5pbnZhbGlkQXREZXN0KSB7XG4gICAgYXRvbS5wYWNrYWdlcy5kZWFjdGl2YXRlUGFja2FnZShwYWNrYWdlTmFtZSk7XG4gICAgZGVidWdMb2coJ1RyeWluZyB0byByZWluc3RhbGwgJyArIHBhY2thZ2VOYW1lICsgJyBiZWNhdXNlIHRoZSB3cm9uZy9pbnZhbGlkIHZlcnNpb24gaXMgY3VycmVudGx5IGluc3RhbGxlZFsnICsgcmVzICsgJ10nKTtcbiAgICBjb25zdCBtc2cgPSBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkV2FybmluZyhcbiAgICAgIFwiSGVscCB1cyB1cGdyYWRlIGBcIiArIHBhY2thZ2VOYW1lICsgXCJgLlxcblxcblwiICtcbiAgICAgIFwiLSBVbmluc3RhbGwgYFwiICsgcGFja2FnZU5hbWUgKyBcImAgKGBQYWNrYWdlcyA+IFNldHRpbmdzIFZpZXcgPiBNYW5hZ2UgUGFja2FnZXNgKS5cXG5cIiArXG4gICAgICBcIi0gKipBZnRlciB1bmluc3RhbGxpbmcqKiwgY2xvc2UgdGhpcyBkaWFsb2cgYW5kIHRoZSBuZXcgdmVyc2lvbiB3aWxsIGJlIGluc3RhbGxlZCBhdXRvbWF0aWNhbGx5LlxcblwiLFxuICAgICAge1xuICAgICAgICBkaXNtaXNzYWJsZTogdHJ1ZSxcbiAgICAgICAgaWNvbjogJ3N5bmMnLFxuICAgICAgICBkZXRhaWw6IFwiSW5zdGFsbGluZyBuZXcgdmVyc2lvbiBmcm9tIFwiICsgc291cmNlRGlyICsgXCIgdG8gXCIgKyBkZXN0RGlyICsgXCIuXCIsXG4gICAgICB9XG4gICAgKTtcbiAgICBtc2cub25EaWREaXNtaXNzKCgpID0+IHtcbiAgICAgIC8vIEdpdmUgaXQgb25lIGZpbmFsIGNoYW5jZVxuICAgICAgY2hlY2tWZXJzaW9uQ29tcGF0KHBhY2thZ2VOYW1lLCBzb3VyY2VEaXIsIGRlc3REaXIsIChlcnIsIHNlY29uZEF0dGVtcHRSZXMpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGFuZFRoZW4oZXJyKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoc2Vjb25kQXR0ZW1wdFJlcyA9PT0gQ29tcGF0UmVzdWx0Lndyb25nVmVyc2lvbkluRGVzdCB8fCBzZWNvbmRBdHRlbXB0UmVzID09PSBDb21wYXRSZXN1bHQuaW52YWxpZEF0RGVzdCkge1xuICAgICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKFxuICAgICAgICAgICAgICBcImBcIiArIHBhY2thZ2VOYW1lICsgXCJgIG5vdCBpbnN0YWxsZWQgYmVjYXVzZSBwcmV2aW91cyB2ZXJzaW9uIG5vdCByZW1vdmVkLlxcblxcblwiICtcbiAgICAgICAgICAgICAgXCItIFJlc3RhcnQgQXRvbSB0byB0cnkgYWdhaW4uXFxuXCIsXG4gICAgICAgICAgICAgIHtkaXNtaXNzYWJsZTogZmFsc2V9XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYW5kVGhlbihudWxsLCBJbnN0YWxsU3RhdHVzLmluc3RhbGxOZWVkZWRBbmREZWNsaW5lZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRPRE86IERvIHRoZSBpbnN0YWxsYXRpb246XG4gICAgICAgICAgICBjb3B5UGx1Z2luQW5kSW5zdGFsbChwYWNrYWdlTmFtZSwgc291cmNlRGlyLCBkZXN0RGlyLCAoZXJyKSA9PiB7XG4gICAgICAgICAgICAgIGFuZFRoZW4oZXJyLCBlcnIgPyBudWxsIDogSW5zdGFsbFN0YXR1cy5pbnN0YWxsTmVlZGVkQW5kQ29tcGxldGVkKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAocmVzID09PSBDb21wYXRSZXN1bHQucmlnaHRWZXJzaW9uSW5EZXN0KSB7XG4gICAgYW5kVGhlbihudWxsLCBJbnN0YWxsU3RhdHVzLm5vSW5zdGFsbE5lZWRlZCk7XG4gIH0gZWxzZSBpZiAocmVzID09PSBDb21wYXRSZXN1bHQubm90aGluZ0luRGVzdCkge1xuICAgIC8vIFRPRE86IERvIHRoZSBpbnN0YWxsYXRpb246XG4gICAgZGVidWdMb2coJ0NvcHlpbmcgYW5kIGluc3RhbGxpbmcgJyArIHBhY2thZ2VOYW1lICsgJyBpbnRvICcgKyBkZXN0RGlyKTtcbiAgICBjb3B5UGx1Z2luQW5kSW5zdGFsbChwYWNrYWdlTmFtZSwgc291cmNlRGlyLCBkZXN0RGlyLCAoZXJyKSA9PiB7XG4gICAgICBhbmRUaGVuKG51bGwsIGVyciA/IG51bGwgOiBJbnN0YWxsU3RhdHVzLmluc3RhbGxOZWVkZWRBbmRDb21wbGV0ZWQpO1xuICAgIH0pO1xuICB9XG59O1xuXG5jb25zdCBnZXRSZWFzb25TaGFyZURpciA9ICgpID0+IHtcbiAgLy8gRXZlbnR1YWxseSB3aWxsIGFsbG93IGNvbmZpZ3VyaW5nIHRoZXNlIGFzIHdlbGwsIHBlcmhhcHMuXG4gIGNvbnN0IHJlYXNvbkJpbkRpckNvbmZpZyA9IG51bGw7XG4gIGNvbnN0IHJlYXNvblNoYXJlRGlyQ29uZmlnID0gbnVsbDtcbiAgbGV0IHJlYXNvbkJpbkRpciA9IHJlYXNvbkJpbkRpckNvbmZpZyAhPT0gJycgPyByZWFzb25CaW5EaXJDb25maWcgOiBudWxsO1xuICBsZXQgcmVhc29uU2hhcmVEaXIgPSByZWFzb25TaGFyZURpckNvbmZpZyAhPT0gJycgPyByZWFzb25TaGFyZURpckNvbmZpZyA6IG51bGw7XG4gIGlmIChyZWFzb25CaW5EaXIgPT0gbnVsbCB8fCByZWFzb25TaGFyZURpciA9PSBudWxsKSB7XG4gICAgLy8gVGhlbiBsb29rIHVwIHRoZSBvcGFtIGJpbiBkaXIsIGFuZCBiYXNlIGFueSBtaXNzaW5nIHJlYXNvbiBkaXJzIGJhc2VkIG9uIHRoYXQuXG4gICAgbGV0IG9wYW1CaW5EaXIgPSBudWxsO1xuICAgIHRyeSB7XG4gICAgICBvcGFtQmluRGlyID0gY2hpbGRfcHJvY2Vzcy5leGVjU3luYyhcbiAgICAgICAgJ29wYW0gY29uZmlnIHZhciBiaW4nLFxuICAgICAgICB7ZW52OiBmaXhlZEVudn1cbiAgICAgICkudG9TdHJpbmcoKS50cmltKCk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkNvdWxkIG5vdCBmaW5kIE9QQU0gaW4gcGF0aC4gRG8geW91IGhhdmUgYG9wYW1gIGluc3RhbGxlZCBhbmQgaW4geW91ciBQQVRIPyBcIiArXG4gICAgICAgIFwiUmVwb3J0IHRoaXMgZXJyb3IgaWYgeW91IGRvIGhhdmUgT1BBTSBpbnN0YWxsZWQgYW5kIGluIHlvdXIgUEFUSC5cIlxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG9wYW1CaW5EaXIpIHtcbiAgICAgIHJlYXNvbkJpbkRpciA9IHJlYXNvbkJpbkRpciB8fCBwYXRoLmpvaW4ob3BhbUJpbkRpciwgJ3JlYXNvbicpO1xuICAgICAgcmVhc29uU2hhcmVEaXIgPSByZWFzb25TaGFyZURpciB8fCBwYXRoLmpvaW4ob3BhbUJpbkRpciwgJy4uJywgJ3NoYXJlJywgJ3JlYXNvbicpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmVhc29uU2hhcmVEaXI7XG59O1xuY29uc3Qgc3luY1BsdWdpbnMgPSAoKSA9PiB7XG4gIGxldCByZWFzb25TaGFyZURpciA9IGdldFJlYXNvblNoYXJlRGlyKCk7XG4gIGlmICghcmVhc29uU2hhcmVEaXIpIHtcbiAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoXCJDb3VsZCBub3QgZmluZCBSZWFzb24gc2hhcmUgZGlyZWN0b3J5XCIpO1xuICB9IGVsc2Uge1xuICAgIGxldCBhdG9tUmVhc29uRGlyID0gcGF0aC5qb2luKHJlYXNvblNoYXJlRGlyLCAnZWRpdG9yU3VwcG9ydCcsICdhdG9tLXJlYXNvbicpO1xuICAgIGxldCBsYW5ndWFnZVJlYXNvbkRpciA9IHBhdGguam9pbihyZWFzb25TaGFyZURpciwgJ2VkaXRvclN1cHBvcnQnLCAnbGFuZ3VhZ2UtcmVhc29uJyk7XG4gICAgaWYgKCFmcy5leGlzdHNTeW5jKGxhbmd1YWdlUmVhc29uRGlyKSB8fCAhZnMuZXhpc3RzU3luYyhhdG9tUmVhc29uRGlyKSkge1xuICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKFxuICAgICAgICBcIkNvdWxkIG5vdCBmaW5kIFJlYXNvbiBBdG9tIHBsdWdpbiBhdCBcIiArIGF0b21SZWFzb25EaXIgKyBcIiBhbmQgXCIgKyBsYW5ndWFnZVJlYXNvbkRpcixcbiAgICAgICAge2RldGFpbDogXCJNYWtlIHN1cmUgeW91IGhhdmUgaW5zdGFsbGVkL3Bpbm5lZCB0aGUgbGF0ZXN0IHZlcnNpb24gb2YgUmVhc29uIHZpYSBPUEFNXCJ9XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgYXRvbVJlYXNvbkluc3RhbGxlZCA9IEluc3RhbGxTdGF0dXMubm90RGV0ZXJtaW5lZDtcbiAgICAgIGxldCBsYW5ndWFnZVJlYXNvbkluc3RhbGxlZCA9IEluc3RhbGxTdGF0dXMubm90RGV0ZXJtaW5lZDtcbiAgICAgIGNvbnN0IGxvYWRBbmRBY3RpdmF0ZUlmUG9zc2libGUgPSAoKSA9PiB7XG4gICAgICAgIC8vIFdlJ2xsIG9ubHkgYWN0aXZhdGUvbG9hZCB0aGUgcGFja2FnZXMgaWYgd2UgYWN0dWFsbHkgY29wcGllZCBhdCBsZWFzdCBvbmUgb3ZlcixcbiAgICAgICAgLy8gYW5kIGlmIHdlJ3ZlIHJlY2VpdmVkIHJlc3BvbnNlcyBiYWNrLiBJdCBzaG91bGRuJ3QgaHVydCB0byBsb2FkIHRoZW0gdHdpY2UuXG4gICAgICAgIGlmIChhdG9tUmVhc29uSW5zdGFsbGVkICE9PSBJbnN0YWxsU3RhdHVzLm5vdERldGVybWluZWQgJiZcbiAgICAgICAgICAgIGxhbmd1YWdlUmVhc29uSW5zdGFsbGVkICE9PSBJbnN0YWxsU3RhdHVzLm5vdERldGVybWluZWQgJiZcbiAgICAgICAgICAgIChhdG9tUmVhc29uSW5zdGFsbGVkID09PSBJbnN0YWxsU3RhdHVzLmluc3RhbGxOZWVkZWRBbmRDb21wbGV0ZWQgfHxcbiAgICAgICAgICAgIGxhbmd1YWdlUmVhc29uSW5zdGFsbGVkID09PSBJbnN0YWxsU3RhdHVzLmluc3RhbGxOZWVkZWRBbmRDb21wbGV0ZWQpKSB7XG4gICAgICAgICAgYXRvbS5wYWNrYWdlcy5sb2FkUGFja2FnZShhdG9tUmVhc29uRGVzdERpcik7XG4gICAgICAgICAgYXRvbS5wYWNrYWdlcy5sb2FkUGFja2FnZShsYW5ndWFnZVJlYXNvbkRlc3REaXIpO1xuICAgICAgICAgIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCdhdG9tLXJlYXNvbicpO1xuICAgICAgICAgIGF0b20ucGFja2FnZXMuYWN0aXZhdGVQYWNrYWdlKCdsYW5ndWFnZS1yZWFzb24nKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIGNoZWNrVmVyc2lvbkNvbXBhdCgnYXRvbS1yZWFzb24nLCBhdG9tUmVhc29uRGlyLCBhdG9tUmVhc29uRGVzdERpciwgKGVyciwgcmVzKSA9PiB7XG4gICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICBhdG9tLm5vdGlmaWNhdGlvbnMuYWRkRXJyb3IoJ0Vycm9yIGNoZWNraW5nIGN1cnJlbnRseSBpbnN0YWxsZWQgYXRvbS1yZWFzb24uIFRyeSB1bmluc3RhbGxpbmcgaXQuJywge2RldGFpbDogZXJyfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW5zdXJlSW5zdGFsbGVkKCdhdG9tLXJlYXNvbicsIGF0b21SZWFzb25EaXIsIGF0b21SZWFzb25EZXN0RGlyLCByZXMsIChlcnIsIGluc3RhbGxTdGF0dXMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKCdFcnJvciBhdHRlbXB0aW5nIHRvIGluc3RhbGwgYXRvbS1yZWFzb24uJywge2RldGFpbDogZXJyfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBhdG9tUmVhc29uSW5zdGFsbGVkID0gaW5zdGFsbFN0YXR1cztcbiAgICAgICAgICAgICAgbG9hZEFuZEFjdGl2YXRlSWZQb3NzaWJsZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgY2hlY2tWZXJzaW9uQ29tcGF0KCdsYW5ndWFnZS1yZWFzb24nLCBsYW5ndWFnZVJlYXNvbkRpciwgbGFuZ3VhZ2VSZWFzb25EZXN0RGlyLCAoZXJyLCByZXMpID0+IHtcbiAgICAgICAgaWYgKGVycikge1xuICAgICAgICAgIGF0b20ubm90aWZpY2F0aW9ucy5hZGRFcnJvcignRXJyb3IgY2hlY2tpbmcgY3VycmVudGx5IGluc3RhbGxlZCBsYW5ndWFnZS1yZWFzb24uIFRyeSB1bmluc3RhbGxpbmcgaXQuJywge2RldGFpbDogZXJyfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZW5zdXJlSW5zdGFsbGVkKCdsYW5ndWFnZS1yZWFzb24nLCBsYW5ndWFnZVJlYXNvbkRpciwgbGFuZ3VhZ2VSZWFzb25EZXN0RGlyLCByZXMsIChlcnIsIGluc3RhbGxTdGF0dXMpID0+IHtcbiAgICAgICAgICAgIGlmIChlcnIpIHtcbiAgICAgICAgICAgICAgYXRvbS5ub3RpZmljYXRpb25zLmFkZEVycm9yKCdFcnJvciBhdHRlbXB0aW5nIHRvIGluc3RhbGwgYXRvbS1yZWFzb24uJywge2RldGFpbDogZXJyfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsYW5ndWFnZVJlYXNvbkluc3RhbGxlZCA9IGluc3RhbGxTdGF0dXM7XG4gICAgICAgICAgICAgIGxvYWRBbmRBY3RpdmF0ZUlmUG9zc2libGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgYWN0aXZhdGUoKSB7XG4gICAgaWYgKGF0b20uY29uZmlnLmdldCgnYXRvbS1yZWFzb24tbG9hZGVyLmF1dG9tYXRpY2FsbHlJbnN0YWxsUGx1Z2luc0Zyb21PcGFtJykpIHtcbiAgICAgIHN5bmNQbHVnaW5zKCk7XG4gICAgfVxuICB9LFxuXG4gIGRlYWN0aXZhdGUoKSB7XG4gICAgdW5sb2FkQXRvbVJlYXNvbigpO1xuICB9LFxuXG4gIGNvbmZpZzoge1xuICAgIC8vIFRoZXNlIGZpcnN0IHRocmVlIGNvbmZpZyB2YWx1ZXMgZGV0ZXJtaW5lIHdoZXJlIHRvIGxvYWQgdGhlICphY3R1YWwqIHBsdWdpblxuICAgIC8vIGZyb20gT1BBTS5cbiAgICBcImF1dG9tYXRpY2FsbHlJbnN0YWxsUGx1Z2luc0Zyb21PcGFtXCI6IHtcbiAgICAgIFwidGl0bGVcIjogXCJBdXRvbWF0aWNhbGx5IGtlZXAgcGx1Z2luIGluIHN5bmMgd2l0aCBpbnN0YWxsZWQgUmVhc29uXCIsXG4gICAgICBcInR5cGVcIjogXCJib29sZWFuXCIsXG4gICAgICBcImRlZmF1bHRcIjogdHJ1ZSxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjpcbiAgICAgICAgXCJXaWxsIGNvcHkgdXBkYXRlZCB2ZXJzaW9ucyBpbnRvIHRoZSB+Ly5hdG9tL3BhY2thZ2VzIGRpcmVjdG9yeS4gSWYgZGV2ZWxvcGluZyBcIiArXG4gICAgICAgIFwiIFRoZSBSZWFzb24gcGx1Z2lucyB0aGVtc2VsdmVzLCB5b3UnZCB3YW50IHRvIHVuY2hlY2sgdGhpcyBib3gsIGFuZCB0aGVuIG1hbnVhbGx5IFwiICtcbiAgICAgICAgXCIgcG9pbnQgc3ltbGlua3MgZnJvbSB+Ly5hdG9tL3BhY2thZ2VzIHRvIHRoZSByZXNwZWN0aXZlIHBhY2thZ2VzIHVuZGVyIGRldmVsb3BtZW50LlwiXG4gICAgfSxcbiAgICBcIm91dHB1dERlYnVnRGF0YVRvQ29uc29sZVwiOiB7XG4gICAgICBcInRpdGxlXCI6IFwiT3V0cHV0IHBsdWdpbiBkZWJ1ZyBkYXRhIHRvIGNvbnNvbGVcIixcbiAgICAgIFwidHlwZVwiOiBcImJvb2xlYW5cIixcbiAgICAgIFwiZGVmYXVsdFwiOiBmYWxzZSxcbiAgICAgIFwiZGVzY3JpcHRpb25cIjpcbiAgICAgICAgXCJJZiB5b3UncmUgaGF2aW5nIHByb2JsZW1zIHdpdGggdGhlIGxvYWRpbmcgb2YgdGhlIFJlYXNvbiBwbHVnaW5zLCBcIiArXG4gICAgICAgIFwiZW5hYmxlIHRoaXMgdG8gc2VlIGRlYnVnIGRhdGEgaW4gY29uc29sZS5cIlxuICAgIH0sXG4gIH1cbn07XG4iXX0=
//# sourceURL=/home/charles/.atom/packages/atom-reason-loader/lib/atom-reason-loader.js
