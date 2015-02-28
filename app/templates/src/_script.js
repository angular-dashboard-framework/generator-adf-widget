'use strict';

angular.module('adf.widget.<%= widgetName %>', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('<%= widgetName %>', {
        title: '<%= widgetTitle %>',
        description: '<%= widgetDescription %>',
        templateUrl: '{widgetsPath}/<%= widgetName %>/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/<%= widgetName %>/src/edit.html'
        }
      });
  });
