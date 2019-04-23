angular.module('myApp', ['ngAnimate', 'ui.bootstrap']);

angular.module('myApp').service('records', function() {

    this.data = [{
        'orderNumber':"253",
        'orderDueDate' :new Date(),
        'customerBuyerName':"himali",
        'customerAddress':"Gachibowli",
        'customerPhone':"958924001",
        'orderTotal':9
    }];

    this.fetch = function() {
        return this.data;
    };
    
    this.save = function(record) {
        this.data.push(record);
    };
    
    this.delete = function(index) {
        this.data.splice(index, 1);
    };
});

angular.module('myApp').controller('HomeController', function($scope, $uibModal, records, $filter) {

    $scope.records = records.data;
    
    $scope.init = function(){
        console.log($scope.record.orderDueDate);
        // $scope.record.orderDueDate = null;
        $scope.datepickerOptions = {
        //   minDate: new Date('2010-05-01'),
        //   initDate: new Date()
        };
      };
    //ADD THE RECORD
    $scope.openModal = function() {
        $uibModal.open({
            resolve: {record: null},
            templateUrl: 'modaldialog.html',
            controller: 'ModalController'
        }).result.then(function(newRecord) {
            console.log(newRecord);
            records.save(newRecord);
        });
    };

    //EDIT THE RECORD
    $scope.edit = function(record) {
        $uibModal.open({
            resolve: {
                record: record
            },
            templateUrl: 'modaldialog.html',
            controller: 'ModalController'
        }).result.then(function(updatedRecord) {
            console.log(record);
            angular.extend(record, updatedRecord);
        });
    };
    
    //DELETE THE RECORD
    $scope.delete = function(index) {
      console.log(index + " in delete function");
      $uibModal.open({
        resolve: {record: index},
        template: '<div class="modal-title">' + '<p>Do you want to delete this records?</p>'+'</div>'+
                  '<div class="modal-body">' +'<button class="btn btn-danger" type="button" ng-click="deleteRecord(index)">Yes</button>' + 
                  '<button class="btn btn-default" type="button" ng-click="cancel()">No</button>' + 
                  '</div>',
        controller: 'ModalController'
      }).result.then(function(deleteIndex) {
        console.log(deleteIndex);
        records.delete(deleteIndex, 1);
      });
    };

});

angular.module('myApp').controller('ModalController', function($scope, $uibModalInstance, record) {
    
    $scope.record = angular.copy(record);
    
    // SAVE THE INPUT
    $scope.save = function() {
        $uibModalInstance.close($scope.record);
    };

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };
    
    // DELETE POPUP
    $scope.deleteRecord = function() {
      $uibModalInstance.close($scope.record);
    };
});

//CUSTOM DIRECTIVE FOR DATE
angular.module('myApp').directive('dateDirective', function() {
    return {
        scope: {
            model: '=ngModel'
        },
        restrict: 'A',
        templateUrl: 'date.html',
        controller: function($scope) {
            $scope.format = 'dd-MMM-yy';

            $scope.open = function() {
                $scope.status.opened = true;
            };

            $scope.status = {
                opened: false
            };
        }
    }
});


