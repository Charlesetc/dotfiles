(function() {
  var BufferedProcess, Runner,
    __slice = [].slice;

  BufferedProcess = require('atom').BufferedProcess;

  module.exports = Runner = (function() {
    Runner.prototype.commandString = null;

    Runner.prototype.process = null;

    Runner.prototype.useGitGrep = false;

    Runner.prototype.columnArg = false;

    Runner.prototype.env = process.env;

    function Runner() {
      atom.config.observe('atom-fuzzy-grep.grepCommandString', (function(_this) {
        return function() {
          _this.commandString = atom.config.get('atom-fuzzy-grep.grepCommandString');
          return _this.columnArg = _this.detectColumnFlag();
        };
      })(this));
      atom.config.observe('atom-fuzzy-grep.detectGitProjectAndUseGitGrep', (function(_this) {
        return function() {
          return _this.useGitGrep = atom.config.get('atom-fuzzy-grep.detectGitProjectAndUseGitGrep');
        };
      })(this));
    }

    Runner.prototype.run = function(search, rootPath, callback) {
      var args, command, exit, listItems, options, stderr, stdout, _ref;
      this.search = search;
      this.rootPath = rootPath;
      listItems = [];
      if (this.useGitGrep && this.isGitRepo()) {
        this.commandString = atom.config.get('atom-fuzzy-grep.gitGrepCommandString');
        this.columnArg = false;
      }
      _ref = this.commandString.split(/\s/), command = _ref[0], args = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
      args.push(this.search);
      options = {
        cwd: this.rootPath,
        stdio: ['ignore', 'pipe', 'pipe'],
        env: this.env
      };
      stdout = (function(_this) {
        return function(output) {
          if (listItems.length > atom.config.get('atom-fuzzy-grep.maxCandidates')) {
            _this.destroy();
            return;
          }
          listItems = listItems.concat(_this.parseOutput(output));
          return callback(listItems);
        };
      })(this);
      stderr = function(error) {
        return callback([
          {
            error: error
          }
        ]);
      };
      exit = function(code) {
        if (code === 1) {
          return callback([]);
        }
      };
      this.process = new BufferedProcess({
        command: command,
        exit: exit,
        args: args,
        stdout: stdout,
        stderr: stderr,
        options: options
      });
      return this.process;
    };

    Runner.prototype.parseOutput = function(output, callback) {
      var content, contentRegexp, item, items, line, path, _i, _len, _ref, _ref1;
      items = [];
      contentRegexp = this.columnArg ? /^(\d+):\s*/ : /^\s+/;
      _ref = output.split(/\n/);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        item = _ref[_i];
        if (!item.length) {
          break;
        }
        _ref1 = item.split(':'), path = _ref1[0], line = _ref1[1], content = 3 <= _ref1.length ? __slice.call(_ref1, 2) : [];
        content = content.join(':');
        items.push({
          filePath: path,
          fullPath: this.rootPath + '/' + path,
          line: line - 1,
          column: this.getColumn(content),
          content: content.replace(contentRegexp, '')
        });
      }
      return items;
    };

    Runner.prototype.getColumn = function(content) {
      var error, match, _ref, _ref1;
      if (this.columnArg) {
        return ((_ref = content.match(/^(\d+):/)) != null ? _ref[1] : void 0) - 1;
      }
      try {
        match = (_ref1 = content.match(new RegExp(this.search, 'gi'))) != null ? _ref1[0] : void 0;
      } catch (_error) {
        error = _error;
        match = false;
      }
      if (match) {
        return content.indexOf(match);
      } else {
        return 0;
      }
    };

    Runner.prototype.destroy = function() {
      var _ref;
      return (_ref = this.process) != null ? _ref.kill() : void 0;
    };

    Runner.prototype.isGitRepo = function() {
      return atom.project.repositories.some((function(_this) {
        return function(item) {
          var _ref, _ref1;
          if (item) {
            return (_ref = _this.rootPath) != null ? _ref.startsWith((_ref1 = item.repo) != null ? _ref1.openedWorkingDirectory : void 0) : void 0;
          }
        };
      })(this));
    };

    Runner.prototype.detectColumnFlag = function() {
      return /(ag|pt|ack)$/.test(this.commandString.split(/\s/)[0]) && ~this.commandString.indexOf('--column');
    };

    Runner.prototype.setEnv = function(env) {
      this.env = env;
    };

    return Runner;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY2hhcmxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLWZ1enp5LWdyZXAvbGliL3J1bm5lci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsdUJBQUE7SUFBQSxrQkFBQTs7QUFBQSxFQUFDLGtCQUFtQixPQUFBLENBQVEsTUFBUixFQUFuQixlQUFELENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUNRO0FBQ0oscUJBQUEsYUFBQSxHQUFlLElBQWYsQ0FBQTs7QUFBQSxxQkFDQSxPQUFBLEdBQVMsSUFEVCxDQUFBOztBQUFBLHFCQUVBLFVBQUEsR0FBWSxLQUZaLENBQUE7O0FBQUEscUJBR0EsU0FBQSxHQUFXLEtBSFgsQ0FBQTs7QUFBQSxxQkFJQSxHQUFBLEdBQUssT0FBTyxDQUFDLEdBSmIsQ0FBQTs7QUFNYSxJQUFBLGdCQUFBLEdBQUE7QUFDWCxNQUFBLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBWixDQUFvQixtQ0FBcEIsRUFBeUQsQ0FBQSxTQUFBLEtBQUEsR0FBQTtlQUFBLFNBQUEsR0FBQTtBQUN2RCxVQUFBLEtBQUMsQ0FBQSxhQUFELEdBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQixtQ0FBaEIsQ0FBakIsQ0FBQTtpQkFDQSxLQUFDLENBQUEsU0FBRCxHQUFhLEtBQUMsQ0FBQSxnQkFBRCxDQUFBLEVBRjBDO1FBQUEsRUFBQTtNQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBekQsQ0FBQSxDQUFBO0FBQUEsTUFHQSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQVosQ0FBb0IsK0NBQXBCLEVBQXFFLENBQUEsU0FBQSxLQUFBLEdBQUE7ZUFBQSxTQUFBLEdBQUE7aUJBQ25FLEtBQUMsQ0FBQSxVQUFELEdBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFaLENBQWdCLCtDQUFo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

//# sourceURL=/home/charles/.atom/packages/atom-fuzzy-grep/lib/runner.coffee
