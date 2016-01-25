/**
 * Created by juan on 21/01/16.
 */
/**
 * Created by juan on 15/01/16.
 */
'use strict';

(function () {
        var tool = angular.module('toolmodule', []);

        tool.controller('ToolController', function ($scope, $rootScope, toolService, Auth, $stateParams, $location, _) {

                var tool_ID = parseInt($stateParams.toolID);

                $scope.tool_ID = tool_ID;
                $scope.editingTool = {};

                toolService.getTool(tool_ID).then(function (result) {
                        $scope.editingTool = result.data;
                }, function (response) {
                        switch (response.status) {
                                case 404:
                                        Materialize.toast('La herramienta no existe.', 4000, 'rounded');
                                        $location.path('/admin');
                                        break;
                                default:
                                        Materialize.toast('Ha ocurrido un problema.', 4000, 'rounded');
                        }
                });

                $scope.updateTool = function (tool){

                };

                $scope.deleteTool = function () {
                        if (confirm('Está seguro?')){
                                toolService.deleteTool(tool_ID).then(function(){
                                        $scope.tools.splice(_.findIndex($scope.tools, {'id': tool_ID}), 1);
                                        $scope.editingTool = {};
                                        $state.transitionTo('admin');
                                        Materialize.toast('La herramienta ha sido eliminado exitosamente.', 4000, 'rounded');
                                }, function (){
                                        Materialize.toast('Ha ocurrido un error en la operación.', 4000, 'rounded');
                                });
                        }
                };


        });

        tool.service('toolService', function ($http, getServerName) {

                var requestSvc = {};

                requestSvc.getTool = function (id) {
                        return $http({
                                method: "GET",
                                skipAuthorization: false,
                                url: getServerName + "/tools/" + id + '/'
                        })
                };

                requestSvc.editTool = function (tool) {
                        return $http({
                                method: "PUT",
                                skipAuthorization: false,
                                url: getServerName + "/tools/" + tool.id + '/',
                                data: tool
                        })
                };

                requestSvc.deleteTool = function (id) {
                        return $http({
                                method: "DELETE",
                                skipAuthorization: false,
                                url: getServerName + "/tools/" + id + '/'
                        })

                };

                return requestSvc;
        })

})();