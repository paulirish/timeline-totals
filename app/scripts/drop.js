/*global define */
define(function(require, exports, module) {

    "use strict";

    function setup(){
        var holder = document.getElementById('holder');
        holder.ondragover = function () { return false; };
        holder.ondragenter = function () { return false; };
        holder.ondrop = function (e) {
            e = e || window.event;

            // Read from e.files, as well as e.dataTransfer
            var files = (e.files || e.dataTransfer.files);

            for (var i = 0; i < files.length; i++) {
                (function (i) {
                    var reader = new FileReader();
                    reader.onload = function (event) {
                        $(holder).remove();
                        $(window).trigger('dataready', { text: event.target.result });
                    };
                    reader.readAsText(files[i]);
                })(i);
            }

            return false;
        };

    }

    return {
        setup : setup
    }

});
