'use strict';

/**
 * @ngdoc function
 * @name app.controller:PeopleCtrl
 * @description
 * # PeopleCtrl
 * Controller of the app
 */

angular.module('app').controller('PeopleCtrl', PeopleCtrl);

PeopleCtrl.$inject = ['peopleService', '$uibModal', '$log'];

function PeopleCtrl(peopleService, $uibModal, $log) {

    var vm = this;
    vm.people = {};


    // Get all the people data with their results
    vm.gets = function () {

        peopleService.gets()
                .then(
                        function (response) {
                            vm.people = response.data;
                        },
                        function (error) {
                            console.warn(error);
                        }
                );
    };

    vm.gets();



    /* Add Result modal starts */

    vm.animationsEnabled = true;

    vm.addResult = function (people) {


        var modalInstance = $uibModal.open({
            animation: vm.animationsEnabled,
            templateUrl: 'addResultModalContent.html',
            controller: 'addResultModalCtrl',
            resolve: {
                people: function () {
                    return people;
                }
            }
        });

        modalInstance.result
                .then(
                        function (response) {
                            /* On success callback */
                            /* Updated results */
                            if (response.status === 200) {
                                var index = vm.people.indexOf(people);
                                vm.people[index].results = response.data;
                            }
                        },
                        function () {
                            /* On close modal callback */
                            console.log('Modal dismissed');
                        });

    };

    vm.toggleAnimation = function () {
        vm.animationsEnabled = !vm.animationsEnabled;
    };

    /* Add Result modal ends */


    /* Delete result */
    vm.deleteResult = function (people, result) {
        peopleService.deleteResult(people._id, result._id).then(function (response) {

            var peopleIndex = vm.people.indexOf(people);
            var resultIndex = people.results.indexOf(result);

            /* remove deleted result from vm.people array of object */
            vm.people[peopleIndex].results.splice(resultIndex, 1);

        });
    };

}

/* Add Result Modal code */

angular.module('app').controller('addResultModalCtrl', function ($scope, peopleService, $uibModalInstance, people) {

    $scope.people = people;

    $scope.newResult = peopleService.initResult();

    $scope.addResult = function (newResult) {

        peopleService.addResult($scope.people._id, newResult)
                .then(
                        function (response) {
                            // On response notify the parent controller to modify result data
                            $uibModalInstance.close(response);
                        },
                        function (error) {
                            $uibModalInstance.close(error);
                        }
                );

    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});


