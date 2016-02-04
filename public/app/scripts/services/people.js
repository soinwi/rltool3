'use strict';

angular.module('app').factory('peopleService', peopleService);

peopleService.$inject = ['API_URL', '$http'];

function peopleService(API_URL, $http) {

    var service = {
        gets: gets,
        addResult: addResult,
        deleteResult: deleteResult,
        initResult: initResult
    };

    return service;


    // return promise in case of http operation

    function gets() {
        var url = API_URL + '/people/';
        return $http.get(url);
    }

    function addResult(people_id, newResult) {
        var url = API_URL + '/people/' + people_id + '/results';
        return $http.post(url, newResult);
    }

    function deleteResult(people_id, result_id) {
        var url = API_URL + '/people/' + people_id + '/results/' + result_id;
        return $http.delete(url);
    }

    function initResult() {
        this.time = null;
        this.track = null;
    }
}

