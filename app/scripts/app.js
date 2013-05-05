

/*global define */
define(function(require, exports, module) {

    'use strict';

    var chart    = require('chart'),
        drop     = require('drop'),
        $        = require('jquery');

    drop.setup();
    chart.setup();

    $(window).on('dataready', function(e, data){
        chart.populate(data.text);
    });

    return '<3z';
});
