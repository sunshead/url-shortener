var urlApp = angular.module('urlApp', []);

urlApp.controller('urlController', function($scope, $http) {
    $scope.processForm = function() {
    	$http({
    		method : 'POST',
    		url : '/api/convert',
    		responseType:'json',
    		data : {url : $scope.longUrl },
    		headers : { 'Content-type': 'application/json' }
    	})
    	.success(function(data){
		      $scope.shortUrl = data.shortUrl;
    	});
    };
});