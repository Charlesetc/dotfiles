(function() {
  var AtomReasonLoaderView;

  module.exports = AtomReasonLoaderView = (function() {
    function AtomReasonLoaderView(serializedState) {
      var message;
      this.element = document.createElement('div');
      this.element.classList.add('atom-reason-loader');
      message = document.createElement('div');
      message.textContent = "The AtomReasonLoader package is Alive! It's ALIVE!";
      message.classList.add('message');
      this.element.appendChild(message);
    }

    AtomReasonLoaderView.prototype.serialize = function() {};

    AtomReasonLoaderView.prototype.destroy = function() {
      return this.element.remove();
    };

    AtomReasonLoaderView.prototype.getElement = function() {
      return this.element;
    };

    return AtomReasonLoaderView;

  })();

}).call(this);

//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAiZmlsZSI6ICIiLAogICJzb3VyY2VSb290IjogIiIsCiAgInNvdXJjZXMiOiBbCiAgICAiL2hvbWUvY2hhcmxlcy8uYXRvbS9wYWNrYWdlcy9hdG9tLXJlYXNvbi1sb2FkZXIvbGliL2F0b20tcmVhc29uLWxvYWRlci12aWV3LmNvZmZlZSIKICBdLAogICJuYW1lcyI6IFtdLAogICJtYXBwaW5ncyI6ICJBQUFBO0FBQUEsTUFBQSxvQkFBQTs7QUFBQSxFQUFBLE1BQU0sQ0FBQyxPQUFQLEdBQ007QUFDUyxJQUFBLDhCQUFDLGVBQUQsR0FBQTtBQUVYLFVBQUEsT0FBQTtBQUFBLE1BQUEsSUFBQyxDQUFBLE9BQUQsR0FBVyxRQUFRLENBQUMsYUFBVCxDQUF1QixLQUF2QixDQUFYLENBQUE7QUFBQSxNQUNBLElBQUMsQ0FBQSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQW5CLENBQXVCLG9CQUF2QixDQURBLENBQUE7QUFBQSxNQUlBLE9BQUEsR0FBVSxRQUFRLENBQUMsYUFBVCxDQUF1QixLQUF2QixDQUpWLENBQUE7QUFBQSxNQUtBLE9BQU8sQ0FBQyxXQUFSLEdBQXNCLG9EQUx0QixDQUFBO0FBQUEsTUFNQSxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQWxCLENBQXNCLFNBQXRCLENBTkEsQ0FBQTtBQUFBLE1BT0EsSUFBQyxDQUFBLE9BQU8sQ0FBQyxXQUFULENBQXFCLE9BQXJCLENBUEEsQ0FGVztJQUFBLENBQWI7O0FBQUEsbUNBWUEsU0FBQSxHQUFXLFNBQUEsR0FBQSxDQVpYLENBQUE7O0FBQUEsbUNBZUEsT0FBQSxHQUFTLFNBQUEsR0FBQTthQUNQLElBQUMsQ0FBQSxPQUFPLENBQUMsTUFBVCxDQUFBLEVBRE87SUFBQSxDQWZULENBQUE7O0FBQUEsbUNBa0JBLFVBQUEsR0FBWSxTQUFBLEdBQUE7YUFDVixJQUFDLENBQUEsUUFEUztJQUFBLENBbEJaLENBQUE7O2dDQUFBOztNQUZGLENBQUE7QUFBQSIKfQ==

//# sourceURL=/home/charles/.atom/packages/atom-reason-loader/lib/atom-reason-loader-view.coffee
