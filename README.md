# Installation

    bower install --save dugun-search-filter

# Usage

    angular.module('app', ['dugun.search']);

    <tr ng-repeat="item in list | dgSearch:filters">
