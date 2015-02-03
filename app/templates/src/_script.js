'use strict';

angular.module('adf.widget.<%= widgetName %>', ['adf.provider'])
  .config(function(dashboardProvider){
    dashboardProvider
      .widget('<%= widgetName %>', {
        title: '<%= widgetName %> Title',
        description: 'Description of <%= widgetName %>',
        templateUrl: '{widgetsPath}/<%= widgetName %>/src/view.html',
        edit: {
          templateUrl: '{widgetsPath}/<%= widgetName %>/src/edit.html'
        }
      });
  });
