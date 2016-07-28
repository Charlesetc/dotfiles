Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

// Copyright (c) 2016 GitHub Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining
// a copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to
// permit persons to whom the Software is furnished to do so, subject to
// the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

var _child_process = require('child_process');

var _os = require('os');

var _os2 = _interopRequireDefault(_os);

// Gets a dump of the user's configured shell environment.
//
// Returns the output of the `env` command or `undefined` if there was an error.
'use babel';function getRawShellEnv() {
  var shell = getUserShell();

  // The `-ilc` set of options was tested to work with the OS X v10.11
  // default-installed versions of bash, zsh, sh, and ksh. It *does not*
  // work with csh or tcsh.
  var results = (0, _child_process.spawnSync)(shell, ['-ilc', 'env'], { encoding: 'utf8' });
  if (results.error || !results.stdout || results.stdout.length <= 0) {
    return;
  }

  return results.stdout;
}

function getUserShell() {
  if (process.env.SHELL) {
    return process.env.SHELL;
  }

  return '/bin/bash';
}

// Gets the user's configured shell environment.
//
// Returns a copy of the user's shell enviroment.
function getFromShell() {
  var shellEnvText = getRawShellEnv();
  if (!shellEnvText) {
    return;
  }

  var env = {};

  for (var line of shellEnvText.split(_os2['default'].EOL)) {
    if (line.includes('=')) {
      var components = line.split('=');
      if (components.length === 2) {
        env[components[0]] = components[1];
      } else {
        var k = components.shift();
        var v = components.join('=');
        env[k] = v;
      }
    }
  }

  return env;
}

function needsPatching() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? { platform: process.platform, env: process.env } : arguments[0];

  if (options.platform === 'darwin' && !options.env.PWD) {
    var shell = getUserShell();
    if (shell.endsWith('csh') || shell.endsWith('tcsh')) {
      return false;
    }
    return true;
  }

  return false;
}

function normalize() {
  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

  if (options && options.env) {
    process.env = options.env;
  }

  if (!options.env) {
    options.env = process.env;
  }

  if (!options.platform) {
    options.platform = process.platform;
  }

  if (needsPatching(options)) {
    // Patch the `process.env` on startup to fix the problem first documented
    // in #4126. Retain the original in case someone needs it.
    var shellEnv = getFromShell();
    if (shellEnv && shellEnv.PATH) {
      process._originalEnv = process.env;
      process.env = shellEnv;
    }
  }
}

exports['default'] = { getFromShell: getFromShell, needsPatching: needsPatching, normalize: normalize };
module.exports = exports['default'];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2NoYXJsZXMvLmF0b20vcGFja2FnZXMvYXRvbS1yZWFzb24tbG9hZGVyL2xpYi9lbnZpcm9ubWVudC1oZWxwZXJzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs2QkFzQndCLGVBQWU7O2tCQUN4QixJQUFJOzs7Ozs7O0FBdkJuQixXQUFXLENBQUMsQUE0QlosU0FBUyxjQUFjLEdBQUk7QUFDekIsTUFBSSxLQUFLLEdBQUcsWUFBWSxFQUFFLENBQUE7Ozs7O0FBSzFCLE1BQUksT0FBTyxHQUFHLDhCQUFVLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFBRSxFQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFBO0FBQ25FLE1BQUksT0FBTyxDQUFDLEtBQUssSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO0FBQ2xFLFdBQU07R0FDUDs7QUFFRCxTQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUE7Q0FDdEI7O0FBRUQsU0FBUyxZQUFZLEdBQUk7QUFDdkIsTUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRTtBQUNyQixXQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFBO0dBQ3pCOztBQUVELFNBQU8sV0FBVyxDQUFBO0NBQ25COzs7OztBQUtELFNBQVMsWUFBWSxHQUFJO0FBQ3ZCLE1BQUksWUFBWSxHQUFHLGNBQWMsRUFBRSxDQUFBO0FBQ25DLE1BQUksQ0FBQyxZQUFZLEVBQUU7QUFDakIsV0FBTTtHQUNQOztBQUVELE1BQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTs7QUFFWixPQUFLLElBQUksSUFBSSxJQUFJLFlBQVksQ0FBQyxLQUFLLENBQUMsZ0JBQUcsR0FBRyxDQUFDLEVBQUU7QUFDM0MsUUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO0FBQ3RCLFVBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7QUFDaEMsVUFBSSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUMzQixXQUFHLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFBO09BQ25DLE1BQU07QUFDTCxZQUFJLENBQUMsR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUE7QUFDMUIsWUFBSSxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUM1QixXQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFBO09BQ1g7S0FDRjtHQUNGOztBQUVELFNBQU8sR0FBRyxDQUFBO0NBQ1g7O0FBRUQsU0FBUyxhQUFhLEdBQThEO01BQTVELE9BQU8seURBQUcsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRTs7QUFDaEYsTUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO0FBQ3JELFFBQUksS0FBSyxHQUFHLFlBQVksRUFBRSxDQUFBO0FBQzFCLFFBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO0FBQ25ELGFBQU8sS0FBSyxDQUFBO0tBQ2I7QUFDRCxXQUFPLElBQUksQ0FBQTtHQUNaOztBQUVELFNBQU8sS0FBSyxDQUFBO0NBQ2I7O0FBRUQsU0FBUyxTQUFTLEdBQWdCO01BQWQsT0FBTyx5REFBRyxFQUFFOztBQUM5QixNQUFJLE9BQU8sSUFBSSxPQUFPLENBQUMsR0FBRyxFQUFFO0FBQzFCLFdBQU8sQ0FBQyxHQUFHLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQTtHQUMxQjs7QUFFRCxNQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRTtBQUNoQixXQUFPLENBQUMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUE7R0FDMUI7O0FBRUQsTUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUU7QUFDckIsV0FBTyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFBO0dBQ3BDOztBQUVELE1BQUksYUFBYSxDQUFDLE9BQU8sQ0FBQyxFQUFFOzs7QUFHMUIsUUFBSSxRQUFRLEdBQUcsWUFBWSxFQUFFLENBQUE7QUFDN0IsUUFBSSxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTtBQUM3QixhQUFPLENBQUMsWUFBWSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUE7QUFDbEMsYUFBTyxDQUFDLEdBQUcsR0FBRyxRQUFRLENBQUE7S0FDdkI7R0FDRjtDQUNGOztxQkFFYyxFQUFFLFlBQVksRUFBWixZQUFZLEVBQUUsYUFBYSxFQUFiLGFBQWEsRUFBRSxTQUFTLEVBQVQsU0FBUyxFQUFFIiwiZmlsZSI6Ii9ob21lL2NoYXJsZXMvLmF0b20vcGFja2FnZXMvYXRvbS1yZWFzb24tbG9hZGVyL2xpYi9lbnZpcm9ubWVudC1oZWxwZXJzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBiYWJlbCc7XG5cbi8vIENvcHlyaWdodCAoYykgMjAxNiBHaXRIdWIgSW5jLlxuLy8gXG4vLyBQZXJtaXNzaW9uIGlzIGhlcmVieSBncmFudGVkLCBmcmVlIG9mIGNoYXJnZSwgdG8gYW55IHBlcnNvbiBvYnRhaW5pbmdcbi8vIGEgY29weSBvZiB0aGlzIHNvZnR3YXJlIGFuZCBhc3NvY2lhdGVkIGRvY3VtZW50YXRpb24gZmlsZXMgKHRoZVxuLy8gXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbCBpbiB0aGUgU29mdHdhcmUgd2l0aG91dCByZXN0cmljdGlvbiwgaW5jbHVkaW5nXG4vLyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0cyB0byB1c2UsIGNvcHksIG1vZGlmeSwgbWVyZ2UsIHB1Ymxpc2gsXG4vLyBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbCBjb3BpZXMgb2YgdGhlIFNvZnR3YXJlLCBhbmQgdG9cbi8vIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzIGZ1cm5pc2hlZCB0byBkbyBzbywgc3ViamVjdCB0b1xuLy8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuLy8gXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZVxuLy8gaW5jbHVkZWQgaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vLyBcbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsXG4vLyBFWFBSRVNTIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EXG4vLyBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFXG4vLyBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OXG4vLyBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT05cbi8vIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuaW1wb3J0IHtzcGF3blN5bmN9IGZyb20gJ2NoaWxkX3Byb2Nlc3MnXG5pbXBvcnQgb3MgZnJvbSAnb3MnXG5cbi8vIEdldHMgYSBkdW1wIG9mIHRoZSB1c2VyJ3MgY29uZmlndXJlZCBzaGVsbCBlbnZpcm9ubWVudC5cbi8vXG4vLyBSZXR1cm5zIHRoZSBvdXRwdXQgb2YgdGhlIGBlbnZgIGNvbW1hbmQgb3IgYHVuZGVmaW5lZGAgaWYgdGhlcmUgd2FzIGFuIGVycm9yLlxuZnVuY3Rpb24gZ2V0UmF3U2hlbGxFbnYgKCkge1xuICBsZXQgc2hlbGwgPSBnZXRVc2VyU2hlbGwoKVxuXG4gIC8vIFRoZSBgLWlsY2Agc2V0IG9mIG9wdGlvbnMgd2FzIHRlc3RlZCB0byB3b3JrIHdpdGggdGhlIE9TIFggdjEwLjExXG4gIC8vIGRlZmF1bHQtaW5zdGFsbGVkIHZlcnNpb25zIG9mIGJhc2gsIHpzaCwgc2gsIGFuZCBrc2guIEl0ICpkb2VzIG5vdCpcbiAgLy8gd29yayB3aXRoIGNzaCBvciB0Y3NoLlxuICBsZXQgcmVzdWx0cyA9IHNwYXduU3luYyhzaGVsbCwgWyctaWxjJywgJ2VudiddLCB7ZW5jb2Rpbmc6ICd1dGY4J30pXG4gIGlmIChyZXN1bHRzLmVycm9yIHx8ICFyZXN1bHRzLnN0ZG91dCB8fCByZXN1bHRzLnN0ZG91dC5sZW5ndGggPD0gMCkge1xuICAgIHJldHVyblxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdHMuc3Rkb3V0XG59XG5cbmZ1bmN0aW9uIGdldFVzZXJTaGVsbCAoKSB7XG4gIGlmIChwcm9jZXNzLmVudi5TSEVMTCkge1xuICAgIHJldHVybiBwcm9jZXNzLmVudi5TSEVMTFxuICB9XG5cbiAgcmV0dXJuICcvYmluL2Jhc2gnXG59XG5cbi8vIEdldHMgdGhlIHVzZXIncyBjb25maWd1cmVkIHNoZWxsIGVudmlyb25tZW50LlxuLy9cbi8vIFJldHVybnMgYSBjb3B5IG9mIHRoZSB1c2VyJ3Mgc2hlbGwgZW52aXJvbWVudC5cbmZ1bmN0aW9uIGdldEZyb21TaGVsbCAoKSB7XG4gIGxldCBzaGVsbEVudlRleHQgPSBnZXRSYXdTaGVsbEVudigpXG4gIGlmICghc2hlbGxFbnZUZXh0KSB7XG4gICAgcmV0dXJuXG4gIH1cblxuICBsZXQgZW52ID0ge31cblxuICBmb3IgKGxldCBsaW5lIG9mIHNoZWxsRW52VGV4dC5zcGxpdChvcy5FT0wpKSB7XG4gICAgaWYgKGxpbmUuaW5jbHVkZXMoJz0nKSkge1xuICAgICAgbGV0IGNvbXBvbmVudHMgPSBsaW5lLnNwbGl0KCc9JylcbiAgICAgIGlmIChjb21wb25lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBlbnZbY29tcG9uZW50c1swXV0gPSBjb21wb25lbnRzWzFdXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgayA9IGNvbXBvbmVudHMuc2hpZnQoKVxuICAgICAgICBsZXQgdiA9IGNvbXBvbmVudHMuam9pbignPScpXG4gICAgICAgIGVudltrXSA9IHZcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gZW52XG59XG5cbmZ1bmN0aW9uIG5lZWRzUGF0Y2hpbmcgKG9wdGlvbnMgPSB7IHBsYXRmb3JtOiBwcm9jZXNzLnBsYXRmb3JtLCBlbnY6IHByb2Nlc3MuZW52IH0pIHtcbiAgaWYgKG9wdGlvbnMucGxhdGZvcm0gPT09ICdkYXJ3aW4nICYmICFvcHRpb25zLmVudi5QV0QpIHtcbiAgICBsZXQgc2hlbGwgPSBnZXRVc2VyU2hlbGwoKVxuICAgIGlmIChzaGVsbC5lbmRzV2l0aCgnY3NoJykgfHwgc2hlbGwuZW5kc1dpdGgoJ3Rjc2gnKSkge1xuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfVxuICAgIHJldHVybiB0cnVlXG4gIH1cblxuICByZXR1cm4gZmFsc2Vcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplIChvcHRpb25zID0ge30pIHtcbiAgaWYgKG9wdGlvbnMgJiYgb3B0aW9ucy5lbnYpIHtcbiAgICBwcm9jZXNzLmVudiA9IG9wdGlvbnMuZW52XG4gIH1cblxuICBpZiAoIW9wdGlvbnMuZW52KSB7XG4gICAgb3B0aW9ucy5lbnYgPSBwcm9jZXNzLmVudlxuICB9XG5cbiAgaWYgKCFvcHRpb25zLnBsYXRmb3JtKSB7XG4gICAgb3B0aW9ucy5wbGF0Zm9ybSA9IHByb2Nlc3MucGxhdGZvcm1cbiAgfVxuXG4gIGlmIChuZWVkc1BhdGNoaW5nKG9wdGlvbnMpKSB7XG4gICAgLy8gUGF0Y2ggdGhlIGBwcm9jZXNzLmVudmAgb24gc3RhcnR1cCB0byBmaXggdGhlIHByb2JsZW0gZmlyc3QgZG9jdW1lbnRlZFxuICAgIC8vIGluICM0MTI2LiBSZXRhaW4gdGhlIG9yaWdpbmFsIGluIGNhc2Ugc29tZW9uZSBuZWVkcyBpdC5cbiAgICBsZXQgc2hlbGxFbnYgPSBnZXRGcm9tU2hlbGwoKVxuICAgIGlmIChzaGVsbEVudiAmJiBzaGVsbEVudi5QQVRIKSB7XG4gICAgICBwcm9jZXNzLl9vcmlnaW5hbEVudiA9IHByb2Nlc3MuZW52XG4gICAgICBwcm9jZXNzLmVudiA9IHNoZWxsRW52XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IHsgZ2V0RnJvbVNoZWxsLCBuZWVkc1BhdGNoaW5nLCBub3JtYWxpemUgfSJdfQ==
//# sourceURL=/home/charles/.atom/packages/atom-reason-loader/lib/environment-helpers.js
