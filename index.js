var React = require('react');
var createReactClass = require('create-react-class');

var Notifier = createReactClass({
  statics: {
    start: function(title, context, url, icon, name) {
      name=name||("notiwin"+(function(n) {
        var rnd = "";
        for (var i = 0; i < n; i++)
          rnd += Math.floor(Math.random() * 10);
        return rnd;
      })(5));
      if (!Notification) {
        console.log("Your browser is not support desktop notifications, please try Chrome or Firefox.");
        return false;
      }

      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      } else {
        icon=(icon&&icon.match(/^.*\.(jpeg|jpg|gif|png)/gi))?icon:"https://openclipart.org/image/300px/svg_to_png/283602/alert-bell.png"
        var notification = new Notification(title, {
          icon: icon,
          body: context,
        });
        notification.onclick = function() {
          window.open(url, name);
        };
      }
    },
    focus:function(title, context, url, icon){
      if (!Notification) {
        console.log("Your browser is not support desktop notifications, please try Chrome or Firefox.");
        return false;
      }

      if (Notification.permission !== "granted") {
        Notification.requestPermission();
      } else {
        icon=(icon&&icon.match(/^.*\.(jpeg|jpg|gif|png)/gi))?icon:"https://openclipart.org/image/300px/svg_to_png/283602/alert-bell.png"
        var notification = new Notification(title, {
          icon: icon,
          body: context,
        });
        notification.onclick = function() {
          parent.focus();
          window.focus(); //just in case, older browsers
          this.close();
        };
      }
    }
  },

  shouldComponentUpdate: function() {
    return false;
  },

  getScript: function() {
    var script = 'document.addEventListener("DOMContentLoaded", function () { if (Notification.permission !== "granted") Notification.requestPermission(); });';
    return script;
  },

  render: function() {
    return React.createElement("script", {
      type: "text/javascript",
      dangerouslySetInnerHTML: {
        __html: this.getScript()
      }
    });
  }
});

module.exports = Notifier;
