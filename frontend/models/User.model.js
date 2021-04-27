(function () {
    angular.module('TaskifyApp').service('UserModel', UserModel);

    function UserModel() {
        function Model(data = {}) {
            this.name = data.name;
            this.surname = data.surname;
            this.token = data.token;
        }

        Model.prototype = {
            getFullName() {
                return `${this.name} ${this.surname}`;
            }
        };

        return Model;
    }
}());
