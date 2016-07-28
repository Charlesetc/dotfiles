(function() {
  var CompositeDisposable, Hidpi, WebFrame;

  CompositeDisposable = require('atom').CompositeDisposable;

  WebFrame = require('web-frame');

  Hidpi = (function() {
    Hidpi.prototype.subscriptions = null;

    Hidpi.prototype.currentScaleFactor = 1.0;

    Hidpi.prototype.config = {
      scaleFactor: {
        title: 'Hidpi Scale Factor',
        type: 'number',
        "default": 2.0
      },
      defaultScaleFactor: {
        title: 'Default Scale Factor',
        type: 'number',
        "default": 1.0
      },
      cutoffWidth: {
        title: 'Cutoff Width',
        type: 'integer',
        "default": 2300
      },
      cutoffHeight: {
        title: 'Cutoff Height',
        type: 'integer',
        "default": 1500
      },
      updateOnResize: {
        title: 'Update On Resize',
        type: 'boolean',
        "default": true
      },
      reopenCurrentFile: {
        title: 'Reopen Current File',
        type: 'boolean',
        "default": false
      },
      startupDelay: {
        title: 'Startup Delay',
        type: 'integer',
        "default": 200
      },
      manualResolutionScaleFactors: {
        title: 'Manual Resolution Scale Factors',
        type: 'string',
        "default": ''
      },
      osScaleFactor: {
        title: 'Operating System Scale Factor',
        type: 'number',
        "default": 1.0
      }
    };

    function Hidpi() {
      setTimeout(this.update.bind(this), this.config.startupDelay);
    }

    Hidpi.prototype.activate = function(state) {
      var that;
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add('atom-workspace', {
        'hidpi:update': (function(_this) {
          return function() {
            return _this.update();
          };
        })(this)
      }));
      if (this.config.updateOnResize) {
        that = this;
        return window.onresize = function(e) {
          return that.update();
        };
      }
    };

    Hidpi.prototype.deactivate = function() {
      return this.subscriptions.dispose();
    };

    Hidpi.prototype.serialize = function() {
      return {
        hidpiViewState: this.hidpiView.serialize()
      };
    };

    Hidpi.prototype.update = function() {
      var adjustedScreenHeight, adjustedScreenWidth, cutoffHeight, cutoffWidth, defaultScaleFactor, manualResolutionScaleFactor, manualResolutions, osScaleFactor, previousScaleFactor, reopenCurrentFile, scaleFactor;
      manualResolutions = this.parseResolutions(atom.config.get('hidpi.manualResolutionScaleFactors'));
      osScaleFactor = atom.config.get('hidpi.osScaleFactor');
      cutoffWidth = atom.config.get('hidpi.cutoffWidth');
      cutoffHeight = atom.config.get('hidpi.cutoffHeight');
      scaleFactor = atom.config.get('hidpi.scaleFactor');
      defaultScaleFactor = atom.config.get('hidpi.defaultScaleFactor');
      reopenCurrentFile = atom.config.get('hidpi.reopenCurrentFile');
      adjustedScreenWidth = screen.width * osScaleFactor;
      adjustedScreenHeight = screen.height * osScaleFactor;
      manualResolutionScaleFactor = manualResolutions['' + adjustedScreenWidth + 'x' + adjustedScreenHeight];
      previousScaleFactor = this.currentScaleFactor;
      if (manualResolutionScaleFactor) {
        this.scale(manualResolutionScaleFactor);
      } else if ((adjustedScreenWidth > cutoffWidth) || (adjustedScreenHeight > cutoffHeight)) {
        this.scale(scaleFactor);
      } else {
        this.scale(defaultScaleFactor);
      }
      if (previousScaleFactor !== this.currentScaleFactor) {
        if (reopenCurrentFile) {
          return this.reopenCurrent();
        }
      }
    };

    Hidpi.prototype.parseResolutions = function(resolutionString) {
      var match, matches, resolutionRegex;
      resolutionRegex = /"?(\d*x\d*)"?:\s*(\d+\.?\d*)/g;
      matches = {};
      match = resolutionRegex.exec(resolutionString);
      while (match) {
        if (match) {
          matches[match[1]] = parseFloat(match[2]);
        }
        match = resolutionRegex.exec(resolutionString);
      }
      return matches;
    };

    Hidpi.prototype.scale = function(factor) {
      WebFrame.setZoomFactor(factor / atom.config.get('hidpi.osScaleFactor'));
      return this.currentScaleFactor = factor;
    };

    Hidpi.prototype.reopenCurrent = function() {
      this.activeEditor = atom.workspace.getActiveTextEditor();
      if (this.activeEditor) {
        this.activePath = this.activeEditor.getPath();
        atom.workspace.getActivePane().destroyActiveItem();
        if (this.activePath) {
          return atom.workspace.open(this.activePath);
        }
      }
    };

    return Hidpi;

  })();

  module.exports = new Hidpi();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY2hhcmxlcy8uYXRvbS9wYWNrYWdlcy9oaWRwaS9saWIvaGlkcGkuY29mZmVlIgogIF0sCiAgIm5hbWVzIjogW10sCiAgIm1hcHBpbmdzIjogIkFBQUE7QUFBQSxNQUFBLG9DQUFBOztBQUFBLEVBQUMsc0JBQXVCLE9BQUEsQ0FBUSxNQUFSLEVBQXZCLG1CQUFELENBQUE7O0FBQUEsRUFDQSxRQUFBLEdBQVcsT0FBQSxDQUFRLFdBQVIsQ0FEWCxDQUFBOztBQUFBLEVBRU07QUFDSixvQkFBQSxhQUFBLEdBQWUsSUFBZixDQUFBOztBQUFBLG9CQUNBLGtCQUFBLEdBQW9CLEdBRHBCLENBQUE7O0FBQUEsb0JBRUEsTUFBQSxHQUNFO0FBQUEsTUFBQSxXQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxvQkFBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFFBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxHQUZUO09BREY7QUFBQSxNQUlBLGtCQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxzQkFBUDtBQUFBLFFBQ0EsSUFBQSxFQUFNLFFBRE47QUFBQSxRQUVBLFNBQUEsRUFBUyxHQUZUO09BTEY7QUFBQSxNQVFBLFdBQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPLGNBQVA7QUFBQSxRQUNBLElBQUEsRUFBTSxTQUROO0FBQUEsUUFFQSxTQUFBLEVBQVMsSUFGVDtPQVRGO0FBQUEsTUFZQSxZQUFBLEVBQ0U7QUFBQSxRQUFBLEtBQUEsRUFBTyxlQUFQO0FBQUEsUUFDQSxJQUFBLEVBQU0sU0FETjtBQUFBLFFBRUEsU0FBQSxFQUFTLElBRlQ7T0FiRjtBQUFBLE1BZ0JBLGNBQUEsRUFDRTtBQUFBLFFBQUEsS0FBQSxFQUFPLGtCQUFQO0FBQUEsUUFDQSxJQUFBLEVBQU0sU0FETjtBQUFBLFFBRUEsU0FBQSxFQUFTLElBRlQ7T0FqQkY7QUFBQSxNQW9CQSxpQkFBQSxF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

//# sourceURL=/home/charles/.atom/packages/hidpi/lib/hidpi.coffee
