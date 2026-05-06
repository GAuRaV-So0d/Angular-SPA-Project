(function () {
  'use strict';

  angular
    .module('campusSpa')
    .controller('MainController', MainController)
    .controller('HomeController', HomeController)
    .controller('AboutController', AboutController)
    .controller('ContactController', ContactController);

  MainController.$inject = ['$location'];

  function MainController($location) {
    var vm = this;

    vm.isActive = function (path) {
      return $location.path() === path;
    };
  }

  function HomeController() {
    var vm = this;

    vm.studentName = 'Aarav Mehta';
    vm.selectedProgram = 'Computer Science';
    vm.programs = ['Computer Science', 'Business Administration', 'Design', 'Data Analytics'];
    vm.quickStats = [
      { label: 'Courses', value: 6 },
      { label: 'Credits', value: 18 },
      { label: 'Attendance', value: '94%' }
    ];
  }

  function AboutController() {
    var vm = this;

    vm.features = [
      'Hash-based routing with angular-route',
      'Controller-as syntax for clear templates',
      'Two-way data binding with live UI updates',
      'Bootstrap layout for responsive pages',
      'AngularJS form validation and submit handling'
    ];
  }

  function ContactController() {
    var vm = this;

    vm.formData = {
      name: '',
      email: '',
      topic: '',
      message: ''
    };
    vm.submissions = [];
    vm.wasSubmitted = false;

    vm.submitForm = function (form) {
      vm.wasSubmitted = true;

      if (form.$invalid) {
        angular.forEach(form.$error, function (fields) {
          angular.forEach(fields, function (field) {
            field.$setTouched();
          });
        });
        return;
      }

      vm.submissions.unshift(angular.copy(vm.formData));
      vm.successMessage = 'Thanks, ' + vm.formData.name + '. Your message was submitted.';

      vm.formData = {
        name: '',
        email: '',
        topic: '',
        message: ''
      };
      vm.wasSubmitted = false;
      form.$setPristine();
      form.$setUntouched();
    };
  }
})();
