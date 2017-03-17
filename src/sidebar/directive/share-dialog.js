'use strict';

var VIA_PREFIX = 'https://via.hypothes.is/';

// @ngInject
function ShareDialogController($scope, $element, annotationUI) {
  var self = this;

  function updateViaLink(frames) {
    if (!frames.length) {
      self.viaPageLink = '';
      return;
    }

    // Check to see if we are on a via page. If so, we just return the URI.
    if (frames[0].uri.indexOf(VIA_PREFIX) === 0) {
      self.viaPageLink = frames[0].uri;
    } else {
      self.viaPageLink = VIA_PREFIX + frames[0].uri;
    }
  }

  var viaInput = $element[0].querySelector('.js-via');
  viaInput.focus();
  viaInput.select();

  $scope.$watch(function () { return annotationUI.frames(); },
    updateViaLink);
}

module.exports = {
  controller: ShareDialogController,
  controllerAs: 'vm',
  bindings: {
    onClose: '&',
  },
  template: require('../templates/share_dialog.html'),
};
