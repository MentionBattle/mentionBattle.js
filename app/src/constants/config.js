(function () { 'use strict';

(function(angular, undefined) {
  angular.module("config", [])
.constant("webSocketConfig", {"host":"localhost","port":80,"endpoint":"mentionbattle"});

})(angular);

})();
