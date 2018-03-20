//inject into controller to make available in functions
app.controller('labController', [
    '$scope', '$timeout', '$q', '$http', 'gitHub',
    function ($scope, $timeout, $q, $http, gitHub) {
        $scope.model = {
            number: 0,
            result: 'Ready'
        };

        $scope.getRepos = getRepos;
        $scope.loadDetail = loadDetail;

        function loadDetail(name) {
            //clear detail before grabbing new
            $scope.model.detail = null;
            //set api param to name
            $scope.model.detail = gitHub.getDetail({ id: name });

            //no longer needed with factory implementation, DO NOT DELETE
          /* var url = 'https://api.github.com/repos/angular/' + name;
            $http.get(url)
                .then(function (response) {
                    $scope.model.detail = response.data;
                }, function (response) {
                    $scope.model.detail = { error: true, message: 'Error: ' + response.data.message };
                });*/
        }

        function getRepos(val) {
            //set org to search result value
            $scope.model.repos = gitHub.getAll({org: val});

            //see above why.
            /* $http.get('https://api.github.com/orgs/angular/repos')
                .then(function (response) {
                    $scope.model.repos = response.data;
                }, function (response) {
                    $scope.model.repos = 'Error: ' + response.data.message;
                }); */
        }

        
        //Promise test for angularJS for testing only:
        function checkOddNumber(input) {
            $scope.model.result = 'Working...';
            checkOddNumberHandler(input).then(function (result) {
                $scope.model.result = 'Success: ' + result;
            }, function (result) {
                $scope.model.result = 'Error: ' + result;
            })
        }

        function checkOddNumberHandler(input) {
            var defer = $q.defer();

            $timeout(function () {
                if (isNumberOdd(input)) {
                    defer.resolve('Yes, an odd number');
                } else {
                    defer.reject('Not an odd number');
                }
            }, 1000);

            return defer.promise;
        }

        function isNumberOdd(input) {
            return !isNaN(input) && input % 2 == 1;
        }
    }
]);