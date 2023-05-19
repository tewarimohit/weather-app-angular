// Module
const forecastApp = angular.module("myApp", ["ngRoute", "ngResource"]);

// Routes

forecastApp.config(function ($routeProvider) {
  $routeProvider
    .when("/", {
      templateUrl: "/pages/home.htm",
      controller: "homeController",
    })
    .when("/forecast", {
      templateUrl: "/pages/forecast.htm",
      controller: "forecastController",
    });
});

// Services

forecastApp.service("cityWeatherService", function () {
  this.city = "Bangalore, Karnataka";
});

// Controller

forecastApp.controller("homeController", [
  "$scope",
  "cityWeatherService",
  function ($scope, cityWeatherService) {
    $scope.city = cityWeatherService.city;
    $scope.$watch("city", function () {
      cityWeatherService.city = $scope.city;
    });
  },
]);
forecastApp.controller("forecastController", [
  "$scope",
  "$resource",
  "cityWeatherService",
  function ($scope, $resource, cityWeatherService) {
    $scope.city = cityWeatherService.city;
    const url = `https://goweather.herokuapp.com/weather/${$scope.city}`;
    $scope.weatherAPI = $resource(url);
    $scope.weatherResults = $scope.weatherAPI.get();

    console.log($scope.weatherResults);
  },
]);
