(function () { 'use strict';

(function(angular, undefined) {
  angular.module("config", [])
.constant("webSocketConfig", {"host":"localhost","port":8080,"endpoint":"mentionbattle"});

})(angular);

})();
