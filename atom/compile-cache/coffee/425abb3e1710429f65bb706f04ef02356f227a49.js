(function() {
  var $$, BufferedProcess, CompositeDisposable, GrepView, Runner, SelectListView, View, escapeStringRegexp, fuzzyFilter, path, _ref, _ref1,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  _ref = require('space-pen'), $$ = _ref.$$, View = _ref.View;

  SelectListView = require('atom-space-pen-views').SelectListView;

  _ref1 = require('atom'), BufferedProcess = _ref1.BufferedProcess, CompositeDisposable = _ref1.CompositeDisposable;

  path = require('path');

  Runner = require('./runner');

  escapeStringRegexp = require('escape-string-regexp');

  fuzzyFilter = null;

  module.exports = GrepView = (function(_super) {
    __extends(GrepView, _super);

    function GrepView() {
      this.pasteEscaped = __bind(this.pasteEscaped, this);
      this.toggleFileFilter = __bind(this.toggleFileFilter, this);
      this.escapeFieldText = __bind(this.escapeFieldText, this);
      return GrepView.__super__.constructor.apply(this, arguments);
    }

    GrepView.prototype.preserveLastSearch = false;

    GrepView.prototype.maxItems = 100;

    GrepView.prototype.minFilterLength = 3;

    GrepView.prototype.showFullPath = false;

    GrepView.prototype.runner = null;

    GrepView.prototype.lastSearch = '';

    GrepView.prototype.isFileFiltering = false;

    GrepView.prototype.escapeOnPaste = true;

    GrepView.prototype.initialize = function() {
      GrepView.__super__.initialize.apply(this, arguments);
      this.subscriptions = new CompositeDisposable;
      this.subscriptions.add(atom.commands.add(this.filterEditorView.element, 'fuzzy-grep:toggleFileFilter', this.toggleFileFilter));
      this.subscriptions.add(atom.commands.add(this.filterEditorView.element, 'fuzzy-grep:pasteEscaped', this.pasteEscaped));
      this.panel = atom.workspace.addModalPanel({
        item: this,
        visible: false
      });
      this.addClass('atom-fuzzy-grep');
      this.runner = new Runner;
      return this.setupConfigs();
    };

    GrepView.prototype.setupConfigs = function() {
      this.subscriptions.add(atom.config.observe('atom-fuzzy-grep.minSymbolsToStartSearch', (function(_this) {
        return function(minFilterLength) {
          _this.minFilterLength = minFilterLength;
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('atom-fuzzy-grep.maxCandidates', (function(_this) {
        return function(maxItems) {
          _this.maxItems = maxItems;
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('atom-fuzzy-grep.preserveLastSearch', (function(_this) {
        return function(preserveLastSearch) {
          _this.preserveLastSearch = preserveLastSearch;
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('atom-fuzzy-grep.escapeSelectedText', (function(_this) {
        return function(escapeSelectedText) {
          _this.escapeSelectedText = escapeSelectedText;
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('atom-fuzzy-grep.showFullPath', (function(_this) {
        return function(showFullPath) {
          _this.showFullPath = showFullPath;
        };
      })(this)));
      this.subscriptions.add(atom.config.observe('atom-fuzzy-grep.inputThrottle', (function(_this) {
        return function(inputThrottle) {
          _this.inputThrottle = inputThrottle;
        };
      })(this)));
      return this.subscriptions.add(atom.config.observe('atom-fuzzy-grep.escapeOnPaste', (function(_this) {
        return function(escapeOnPaste) {
          _this.escapeOnPaste = escapeOnPaste;
        };
      })(this)));
    };

    GrepView.prototype.getFilterKey = function() {
      if (this.isFileFiltering) {
        return 'filePath';
      } else {
        return '';
      }
    };

    GrepView.prototype.getFilterQuery = function() {
      if (this.isFileFiltering) {
        return this.filterEditorView.getText();
      } else {
        return '';
      }
    };

    GrepView.prototype.viewForItem = function(_arg) {
      var content, error, filePath, line, that;
      filePath = _arg.filePath, line = _arg.line, content = _arg.content, error = _arg.error;
      that = this;
      if (error) {
        this.setError(error);
        return;
      }
      return $$(function() {
        return this.li({
          "class": 'two-lines'
        }, (function(_this) {
          return function() {
            var displayedPath;
            displayedPath = that.showFullPath ? filePath : path.basename(filePath);
            _this.div("" + displayedPath + ":" + (line + 1), {
              "class": 'primary-line file icon icon-file-text',
              'data-name': displayedPath
            });
            return _this.div(content, {
              "class": 'secondary-line'
            });
          };
        })(this));
      });
    };

    GrepView.prototype.confirmed = function(item) {
      this.lastSearch = this.filterEditorView.getText();
      this.openFile(item.fullPath, item.line, item.column);
      return this.cancelled();
    };

    GrepView.prototype.openFile = function(filePath, line, column) {
      if (!filePath) {
        return;
      }
      return atom.workspace.open(filePath, {
        initialLine: line,
        initialColumn: column
      }).then(function(editor) {
        var editorElement, top;
        editorElement = atom.views.getView(editor);
        top = editorElement.pixelPositionForBufferPosition(editor.getCursorBufferPosition()).top;
        return editorElement.setScrollTop(top - editorElement.getHeight() / 2);
      });
    };

    GrepView.prototype.cancelled = function() {
      this.items = [];
      this.isFileFiltering = false;
      this.panel.hide();
      return this.killRunner();
    };

    GrepView.prototype.grepProject = function() {
      if (this.minFilterLength && this.filterEditorView.getText().length < this.minFilterLength) {
        return;
      }
      this.killRunner();
      return this.runner.run(this.filterEditorView.getText(), this.getProjectPath(), this.setItems.bind(this));
    };

    GrepView.prototype.killRunner = function() {
      var _ref2;
      return (_ref2 = this.runner) != null ? _ref2.destroy() : void 0;
    };

    GrepView.prototype.getProjectPath = function() {
      var editor, homeDir;
      homeDir = require('os').homedir();
      editor = atom.workspace.getActiveTextEditor();
      if (!editor) {
        return atom.project.getPaths()[0] || homeDir;
      }
      if (editor.getPath()) {
        return atom.project.relativizePath(editor.getPath())[0] || path.dirname(editor.getPath());
      } else {
        return atom.project.getPaths()[0] || homeDir;
      }
    };

    GrepView.prototype.setSelection = function() {
      var editor;
      editor = atom.workspace.getActiveTextEditor();
      if (editor != null ? editor.getSelectedText() : void 0) {
        this.filterEditorView.setText(editor.getSelectedText());
        if (this.escapeSelectedText) {
          return this.escapeFieldText();
        }
      }
    };

    GrepView.prototype.escapeFieldText = function() {
      var escapedString;
      escapedString = escapeStringRegexp(this.filterEditorView.getText());
      return this.filterEditorView.setText(escapedString);
    };

    GrepView.prototype.destroy = function() {
      var _ref2;
      if ((_ref2 = this.subscriptions) != null) {
        _ref2.dispose();
      }
      this.subscriptions = null;
      return this.detach();
    };

    GrepView.prototype.toggle = function() {
      var _ref2, _ref3;
      if ((_ref2 = this.panel) != null ? _ref2.isVisible() : void 0) {
        return (_ref3 = this.panel) != null ? _ref3.show() : void 0;
      } else {
        this.storeFocusedElement();
        if (this.preserveLastSearch) {
          this.filterEditorView.setText(this.lastSearch || '');
        }
        this.panel.show();
        this.focusFilterEditor();
        return this.setSelection();
      }
    };

    GrepView.prototype.toggleLastSearch = function() {
      this.toggle();
      return this.filterEditorView.setText(this.lastSearch || '');
    };

    GrepView.prototype.toggleFileFilter = function() {
      this.isFileFiltering = !this.isFileFiltering;
      if (this.isFileFiltering) {
        this.tmpSearchString = this.filterEditorView.getText();
        return this.filterEditorView.setText('');
      } else {
        this.filterEditorView.setText(this.tmpSearchString);
        return this.tmpSearchString = '';
      }
    };

    GrepView.prototype.pasteEscaped = function(e) {
      var target;
      target = e.target;
      atom.commands.dispatch(target, "core:paste");
      if (this.escapeOnPaste) {
        return this.escapeFieldText();
      }
    };

    GrepView.prototype.schedulePopulateList = function() {
      var filterMethod, populateCallback;
      clearTimeout(this.scheduleTimeout);
      filterMethod = this.isFileFiltering ? this.populateList : this.grepProject;
      populateCallback = (function(_this) {
        return function() {
          if (_this.isOnDom()) {
            return filterMethod.bind(_this)();
          }
        };
      })(this);
      return this.scheduleTimeout = setTimeout(populateCallback, this.inputThrottle);
    };

    GrepView.prototype.setEnv = function(env) {
      var _ref2;
      return (_ref2 = this.runner) != null ? _ref2.setEnv(env) : void 0;
    };

    return GrepView;

  })(SelectListView);

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY2hhcmxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLWZ1enp5LWdyZXAvbGliL2F0b20tZnV6enktZ3JlcC12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxvSUFBQTtJQUFBOzttU0FBQTs7QUFBQSxFQUFBLE9BQWEsT0FBQSxDQUFRLFdBQVIsQ0FBYixFQUFDLFVBQUEsRUFBRCxFQUFLLFlBQUEsSUFBTCxDQUFBOztBQUFBLEVBQ0MsaUJBQWtCLE9BQUEsQ0FBUSxzQkFBUixFQUFsQixjQURELENBQUE7O0FBQUEsRUFFQSxRQUF5QyxPQUFBLENBQVEsTUFBUixDQUF6QyxFQUFDLHdCQUFBLGVBQUQsRUFBa0IsNEJBQUEsbUJBRmxCLENBQUE7O0FBQUEsRUFHQSxJQUFBLEdBQU8sT0FBQSxDQUFRLE1BQVIsQ0FIUCxDQUFBOztBQUFBLEVBSUEsTUFBQSxHQUFTLE9BQUEsQ0FBUSxVQUFSLENBSlQsQ0FBQTs7QUFBQSxFQUtBLGtCQUFBLEdBQXFCLE9BQUEsQ0FBUSxzQkFBUixDQUxyQixDQUFBOztBQUFBLEVBTUEsV0FBQSxHQUFjLElBTmQsQ0FBQTs7QUFBQSxFQVFBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDSiwrQkFBQSxDQUFBOzs7Ozs7O0tBQUE7O0FBQUEsdUJBQUEsa0JBQUEsR0FBb0IsS0FBcEIsQ0FBQTs7QUFBQSx1QkFDQSxRQUFBLEdBQVUsR0FEVixDQUFBOztBQUFBLHVCQUVBLGVBQUEsR0FBaUIsQ0FGakIsQ0FBQTs7QUFBQSx1QkFHQSxZQUFBLEdBQWMsS0FIZCxDQUFBOztBQUFBLHVCQUlBLE1BQUEsR0FBUSxJQUpSLENBQUE7O0FBQUEsdUJBS0EsVUFBQSxHQUFZLEVBTFosQ0FBQTs7QUFBQSx1QkFNQSxlQUFBLEdBQWlCLEtBTmpCLENBQUE7O0FBQUEsdUJBT0EsYUFBQSxHQUFl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

//# sourceURL=/home/charles/.atom/packages/atom-fuzzy-grep/lib/atom-fuzzy-grep-view.coffee
