(function() {
  var GrepView;

  GrepView = null;

  module.exports = {
    activate: function() {
      return this.commandSubscription = atom.commands.add('atom-workspace', {
        'fuzzy-grep:toggle': (function(_this) {
          return function() {
            return _this.createView().toggle();
          };
        })(this),
        'fuzzy-grep:toggleLastSearch': (function(_this) {
          return function() {
            return _this.createView().toggleLastSearch();
          };
        })(this)
      });
    },
    deactivate: function() {
      var _ref, _ref1;
      if ((_ref = this.commandSubscription) != null) {
        _ref.dispose();
      }
      this.commandSubscription = null;
      if ((_ref1 = this.grepView) != null) {
        _ref1.destroy();
      }
      return this.grepView = null;
    },
    createView: function() {
      if (GrepView == null) {
        GrepView = require('./atom-fuzzy-grep-view');
      }
      return this.grepView != null ? this.grepView : this.grepView = new GrepView();
    },
    consumeEnvironment: function(env) {
      var _ref;
      if (this.shouldFixEnv()) {
        return (_ref = this.grepView) != null ? _ref.setEnv(env) : void 0;
      }
    },
    shouldFixEnv: function() {
      return atom.config.get('atom-fuzzy-grep.fixEnv') && process.platform === 'darwin';
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY2hhcmxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLWZ1enp5LWdyZXAvbGliL2F0b20tZnV6enktZ3JlcC5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsUUFBQTs7QUFBQSxFQUFBLFFBQUEsR0FBVyxJQUFYLENBQUE7O0FBQUEsRUFFQSxNQUFNLENBQUMsT0FBUCxHQUVFO0FBQUEsSUFBQSxRQUFBLEVBQVUsU0FBQSxHQUFBO2FBQ1IsSUFBQyxDQUFBLG1CQUFELEdBQXVCLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBZCxDQUFrQixnQkFBbEIsRUFDckI7QUFBQSxRQUFBLG1CQUFBLEVBQXFCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUMsQ0FBQSxVQUFELENBQUEsQ0FBYSxDQUFDLE1BQWQsQ0FBQSxFQUFIO1VBQUEsRUFBQTtRQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FBckI7QUFBQSxRQUNBLDZCQUFBLEVBQStCLENBQUEsU0FBQSxLQUFBLEdBQUE7aUJBQUEsU0FBQSxHQUFBO21CQUFHLEtBQUMsQ0FBQSxVQUFELENBQUEsQ0FBYSxDQUFDLGdCQUFkLENBQUEsRUFBSDtVQUFBLEVBQUE7UUFBQSxDQUFBLENBQUEsQ0FBQSxJQUFBLENBRC9CO09BRHFCLEVBRGY7SUFBQSxDQUFWO0FBQUEsSUFLQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsVUFBQSxXQUFBOztZQUFvQixDQUFFLE9BQXRCLENBQUE7T0FBQTtBQUFBLE1BQ0EsSUFBQyxDQUFBLG1CQUFELEdBQXVCLElBRHZCLENBQUE7O2FBRVMsQ0FBRSxPQUFYLENBQUE7T0FGQTthQUdBLElBQUMsQ0FBQSxRQUFELEdBQVksS0FKRjtJQUFBLENBTFo7QUFBQSxJQVdBLFVBQUEsRUFBWSxTQUFBLEdBQUE7O1FBQ1YsV0FBWSxPQUFBLENBQVEsd0JBQVI7T0FBWjtxQ0FDQSxJQUFDLENBQUEsV0FBRCxJQUFDLENBQUEsV0FBZ0IsSUFBQSxRQUFBLENBQUEsRUFGUDtJQUFBLENBWFo7QUFBQSxJQWVBLGtCQUFBLEVBQW9CLFNBQUMsR0FBRCxHQUFBO0FBQ2xCLFVBQUEsSUFBQTtBQUFBLE1BQUEsSUFBMEIsSUFBQyxDQUFBLFlBQUQsQ0FBQSxDQUExQjtvREFBUyxDQUFFLE1BQVgsQ0FBa0IsR0FBbEIsV0FBQTtPQURrQjtJQUFBLENBZnBCO0FBQUEsSUFrQkEsWUFBQSxFQUFjLFNBQUEsR0FBQTthQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBWixDQUFnQix3QkFBaEIsQ0FBQSxJQUE4QyxPQUFPLENBQUMsUUFBUixLQUFvQixTQUR0RDtJQUFBLENBbEJkO0dBSkYsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/charles/.atom/packages/atom-fuzzy-grep/lib/atom-fuzzy-grep.coffee
