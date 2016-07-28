(function() {
  var AtomReasonLoader, AtomReasonLoaderView, CompositeDisposable;

  AtomReasonLoaderView = require('./atom-reason-loader-view');

  CompositeDisposable = require('atom').CompositeDisposable;

  module.exports = AtomReasonLoader = {
    atomReasonLoaderView: null,
    modalPanel: null,
    subscriptions: null,
    activate: function(state) {
      this.atomReasonLoaderView = new AtomReasonLoaderView(state.atomReasonLoaderViewState);
      this.modalPanel = atom.workspace.addModalPanel({
        item: this.atomReasonLoaderView.getElement(),
        visible: false
      });
      return this.subscriptions = new CompositeDisposable;
    },
    deactivate: function() {
      this.modalPanel.destroy();
      this.subscriptions.dispose();
      return this.atomReasonLoaderView.destroy();
    },
    serialize: function() {
      return {
        atomReasonLoaderViewState: this.atomReasonLoaderView.serialize()
      };
    },
    toggle: function() {
      console.log('AtomReasonLoader was toggled!');
      if (this.modalPanel.isVisible()) {
        return this.modalPanel.hide();
      } else {
        return this.modalPanel.show();
      }
    }
  };

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY2hhcmxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLXJlYXNvbi1sb2FkZXIvbGliL2F0b20tcmVhc29uLWxvYWRlci5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsMkRBQUE7O0FBQUEsRUFBQSxvQkFBQSxHQUF1QixPQUFBLENBQVEsMkJBQVIsQ0FBdkIsQ0FBQTs7QUFBQSxFQUNDLHNCQUF1QixPQUFBLENBQVEsTUFBUixFQUF2QixtQkFERCxDQUFBOztBQUFBLEVBR0EsTUFBTSxDQUFDLE9BQVAsR0FBaUIsZ0JBQUEsR0FDZjtBQUFBLElBQUEsb0JBQUEsRUFBc0IsSUFBdEI7QUFBQSxJQUNBLFVBQUEsRUFBWSxJQURaO0FBQUEsSUFFQSxhQUFBLEVBQWUsSUFGZjtBQUFBLElBSUEsUUFBQSxFQUFVLFNBQUMsS0FBRCxHQUFBO0FBQ1IsTUFBQSxJQUFDLENBQUEsb0JBQUQsR0FBNEIsSUFBQSxvQkFBQSxDQUFxQixLQUFLLENBQUMseUJBQTNCLENBQTVCLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxVQUFELEdBQWMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFmLENBQTZCO0FBQUEsUUFBQSxJQUFBLEVBQU0sSUFBQyxDQUFBLG9CQUFvQixDQUFDLFVBQXRCLENBQUEsQ0FBTjtBQUFBLFFBQTBDLE9BQUEsRUFBUyxLQUFuRDtPQUE3QixDQURkLENBQUE7YUFJQSxJQUFDLENBQUEsYUFBRCxHQUFpQixHQUFBLENBQUEsb0JBTFQ7SUFBQSxDQUpWO0FBQUEsSUFjQSxVQUFBLEVBQVksU0FBQSxHQUFBO0FBQ1YsTUFBQSxJQUFDLENBQUEsVUFBVSxDQUFDLE9BQVosQ0FBQSxDQUFBLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxhQUFhLENBQUMsT0FBZixDQUFBLENBREEsQ0FBQTthQUVBLElBQUMsQ0FBQSxvQkFBb0IsQ0FBQyxPQUF0QixDQUFBLEVBSFU7SUFBQSxDQWRaO0FBQUEsSUFtQkEsU0FBQSxFQUFXLFNBQUEsR0FBQTthQUNUO0FBQUEsUUFBQSx5QkFBQSxFQUEyQixJQUFDLENBQUEsb0JBQW9CLENBQUMsU0FBdEIsQ0FBQSxDQUEzQjtRQURTO0lBQUEsQ0FuQlg7QUFBQSxJQXNCQSxNQUFBLEVBQVEsU0FBQSxHQUFBO0FBQ04sTUFBQSxPQUFPLENBQUMsR0FBUixDQUFZLCtCQUFaLENBQUEsQ0FBQTtBQUVBLE1BQUEsSUFBRyxJQUFDLENBQUEsVUFBVSxDQUFDLFNBQVosQ0FBQSxDQUFIO2VBQ0UsSUFBQyxDQUFBLFVBQVUsQ0FBQyxJQUFaLENBQUEsRUFERjtPQUFBLE1BQUE7ZUFHRSxJQUFDLENBQUEsVUFBVSxDQUFDLElBQVosQ0FBQSxFQUhGO09BSE07SUFBQSxDQXRCUjtHQUpGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/charles/.atom/packages/atom-reason-loader/lib/atom-reason-loader.coffee
