
/*
 Sistema de Ranqueamento ngRating
 ================================

 Campos:
 size.....: Quantidade de símbolos a mostrar. Default - 5
 value....: Valor do ranqueamento. Determina quantos símbolos aparecerão ligados. Default - 0
 field....: Nome da variável no escopo pai que receberá o valor do campo 'value'.
 readonly.: Se o usuário pode interagir com esta diretiva. Default - false (ou seja, o usuário interage)
 */

// Diretiva
angular.module('angular-ratings', [])
.directive('ratings', function() {

    var directive = {};
    directive.restrict = 'E';
    directive.template = '<ul><li class="ratingzero" ng-click="rateClick(-1)"></li><li ng-repeat="s in stars track by $index" class="rating" ng-class="{ ratingSel: s }" ng-click="rateClick($index)" ' +
        'ng-mouseenter="rateIn($index)" ng-mouseleave="rateOut()"></li></ul>';
    directive.scope = {};
    directive.compile = function() {

        return function($scope, element, attrs) {

            var parentVar = attrs.field || 'rated';

            $scope.stars = [];
            $scope.value = attrs.value || 0;
            $scope.size = attrs.size || 5;
            $scope.$parent[parentVar] = $scope.value;
            $scope.readonly = (attrs.readonly != '');

            for (var i = 0; i < $scope.size; i++) {
                $scope.stars.push(i <= $scope.value - 1);
            };

            var update = function(ind) {
                for (var i = 0; i < $scope.size; i++) {
                    $scope.stars[i] = (i <= ind);
                };
            };

            $scope.rateClick = function(ind) {
                if (!$scope.readonly) {
                    update(ind);
                    $scope.value = ind + 1;
                    attrs.value = ind + 1;
                    $scope.$parent[parentVar] = $scope.value;
                }
            };

            $scope.rateIn = function(ind) {
                if (!$scope.readonly) { update(ind); }
            };

            $scope.rateOut = function() {
                if (!$scope.readonly) { update($scope.value - 1); }
            };
        };
    }
    return directive;
});