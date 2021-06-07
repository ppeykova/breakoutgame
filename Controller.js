function Controller() {
    var view = new View();

    this.init = function () {
        view.init();
    };
}

var controller = new Controller();
window.addEventListener("load", controller.init);