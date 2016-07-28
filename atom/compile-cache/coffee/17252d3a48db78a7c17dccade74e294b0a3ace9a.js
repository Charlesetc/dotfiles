(function() {
  var AtomReasonLoader;

  AtomReasonLoader = require('../lib/atom-reason-loader');

  describe("AtomReasonLoader", function() {
    var activationPromise, workspaceElement, _ref;
    _ref = [], workspaceElement = _ref[0], activationPromise = _ref[1];
    beforeEach(function() {
      workspaceElement = atom.views.getView(atom.workspace);
      return activationPromise = atom.packages.activatePackage('atom-reason-loader');
    });
    return describe("when the atom-reason-loader:toggle event is triggered", function() {
      it("hides and shows the modal panel", function() {
        expect(workspaceElement.querySelector('.atom-reason-loader')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'atom-reason-loader:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var atomReasonLoaderElement, atomReasonLoaderPanel;
          expect(workspaceElement.querySelector('.atom-reason-loader')).toExist();
          atomReasonLoaderElement = workspaceElement.querySelector('.atom-reason-loader');
          expect(atomReasonLoaderElement).toExist();
          atomReasonLoaderPanel = atom.workspace.panelForItem(atomReasonLoaderElement);
          expect(atomReasonLoaderPanel.isVisible()).toBe(true);
          atom.commands.dispatch(workspaceElement, 'atom-reason-loader:toggle');
          return expect(atomReasonLoaderPanel.isVisible()).toBe(false);
        });
      });
      return it("hides and shows the view", function() {
        jasmine.attachToDOM(workspaceElement);
        expect(workspaceElement.querySelector('.atom-reason-loader')).not.toExist();
        atom.commands.dispatch(workspaceElement, 'atom-reason-loader:toggle');
        waitsForPromise(function() {
          return activationPromise;
        });
        return runs(function() {
          var atomReasonLoaderElement;
          atomReasonLoaderElement = workspaceElement.querySelector('.atom-reason-loader');
          expect(atomReasonLoaderElement).toBeVisible();
          atom.commands.dispatch(workspaceElement, 'atom-reason-loader:toggle');
          return expect(atomReasonLoaderElement).not.toBeVisible();
        });
      });
    });
  });

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY2hhcmxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLXJlYXNvbi1sb2FkZXIvc3BlYy9hdG9tLXJlYXNvbi1sb2FkZXItc3BlYy5jb2ZmZWUiCiAgXSwKICAibmFtZXMiOiBbXSwKICAibWFwcGluZ3MiOiAiQUFBQTtBQUFBLE1BQUEsZ0JBQUE7O0FBQUEsRUFBQSxnQkFBQSxHQUFtQixPQUFBLENBQVEsMkJBQVIsQ0FBbkIsQ0FBQTs7QUFBQSxFQU9BLFFBQUEsQ0FBUyxrQkFBVCxFQUE2QixTQUFBLEdBQUE7QUFDM0IsUUFBQSx5Q0FBQTtBQUFBLElBQUEsT0FBd0MsRUFBeEMsRUFBQywwQkFBRCxFQUFtQiwyQkFBbkIsQ0FBQTtBQUFBLElBRUEsVUFBQSxDQUFXLFNBQUEsR0FBQTtBQUNULE1BQUEsZ0JBQUEsR0FBbUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFYLENBQW1CLElBQUksQ0FBQyxTQUF4QixDQUFuQixDQUFBO2FBQ0EsaUJBQUEsR0FBb0IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFkLENBQThCLG9CQUE5QixFQUZYO0lBQUEsQ0FBWCxDQUZBLENBQUE7V0FNQSxRQUFBLENBQVMsdURBQVQsRUFBa0UsU0FBQSxHQUFBO0FBQ2hFLE1BQUEsRUFBQSxDQUFHLGlDQUFILEVBQXNDLFNBQUEsR0FBQTtBQUdwQyxRQUFBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixxQkFBL0IsQ0FBUCxDQUE2RCxDQUFDLEdBQUcsQ0FBQyxPQUFsRSxDQUFBLENBQUEsQ0FBQTtBQUFBLFFBSUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5QywyQkFBekMsQ0FKQSxDQUFBO0FBQUEsUUFNQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxrQkFEYztRQUFBLENBQWhCLENBTkEsQ0FBQTtlQVNBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFDSCxjQUFBLDhDQUFBO0FBQUEsVUFBQSxNQUFBLENBQU8sZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IscUJBQS9CLENBQVAsQ0FBNkQsQ0FBQyxPQUE5RCxDQUFBLENBQUEsQ0FBQTtBQUFBLFVBRUEsdUJBQUEsR0FBMEIsZ0JBQWdCLENBQUMsYUFBakIsQ0FBK0IscUJBQS9CLENBRjFCLENBQUE7QUFBQSxVQUdBLE1BQUEsQ0FBTyx1QkFBUCxDQUErQixDQUFDLE9BQWhDLENBQUEsQ0FIQSxDQUFBO0FBQUEsVUFLQSxxQkFBQSxHQUF3QixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQWYsQ0FBNEIsdUJBQTVCLENBTHhCLENBQUE7QUFBQSxVQU1BLE1BQUEsQ0FBTyxxQkFBcUIsQ0FBQyxTQUF0QixDQUFBLENBQVAsQ0FBeUMsQ0FBQyxJQUExQyxDQUErQyxJQUEvQyxDQU5BLENBQUE7QUFBQSxVQU9BLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsMkJBQXpDLENBUEEsQ0FBQTtpQkFRQSxNQUFBLENBQU8scUJBQXFCLENBQUMsU0FBdEIsQ0FBQSxDQUFQLENBQXlDLENBQUMsSUFBMUMsQ0FBK0MsS0FBL0MsRUFURztRQUFBLENBQUwsRUFab0M7TUFBQSxDQUF0QyxDQUFBLENBQUE7YUF1QkEsRUFBQSxDQUFHLDBCQUFILEVBQStCLFNBQUEsR0FBQTtBQU83QixRQUFBLE9BQU8sQ0FBQyxXQUFSLENBQW9CLGdCQUFwQixDQUFBLENBQUE7QUFBQSxRQUVBLE1BQUEsQ0FBTyxnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixxQkFBL0IsQ0FBUCxDQUE2RCxDQUFDLEdBQUcsQ0FBQyxPQUFsRSxDQUFBLENBRkEsQ0FBQTtBQUFBLFFBTUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFkLENBQXVCLGdCQUF2QixFQUF5QywyQkFBekMsQ0FOQSxDQUFBO0FBQUEsUUFRQSxlQUFBLENBQWdCLFNBQUEsR0FBQTtpQkFDZCxrQkFEYztRQUFBLENBQWhCLENBUkEsQ0FBQTtlQVdBLElBQUEsQ0FBSyxTQUFBLEdBQUE7QUFFSCxjQUFBLHVCQUFBO0FBQUEsVUFBQSx1QkFBQSxHQUEwQixnQkFBZ0IsQ0FBQyxhQUFqQixDQUErQixxQkFBL0IsQ0FBMUIsQ0FBQTtBQUFBLFVBQ0EsTUFBQSxDQUFPLHVCQUFQLENBQStCLENBQUMsV0FBaEMsQ0FBQSxDQURBLENBQUE7QUFBQSxVQUVBLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBZCxDQUF1QixnQkFBdkIsRUFBeUMsMkJBQXpDLENBRkEsQ0FBQTtpQkFHQSxNQUFBLENBQU8sdUJBQVAsQ0FBK0IsQ0FBQyxHQUFHLENBQUMsV0FBcEMsQ0FBQSxFQUxHO1FBQUEsQ0FBTCxFQWxCNkI7TUFBQSxDQUEvQixFQXhCZ0U7SUFBQSxDQUFsRSxFQVAyQjtFQUFBLENBQTdCLENBUEEsQ0FBQTtBQUFBIgp9

//# sourceURL=/home/charles/.atom/packages/atom-reason-loader/spec/atom-reason-loader-spec.coffee
