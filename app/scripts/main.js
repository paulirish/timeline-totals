require.config({
    paths: {
        jquery: '../components/jquery/jquery',
        bootstrap: 'vendor/bootstrap',
        d3: '../components/d3/d3'
    },
    shim: {
        bootstrap: {
            deps: ['jquery'],
            exports: 'jquery'
        },
        d3: {
            exports: 'd3'
        }
    }
});

require(['app'], function (app) {
    'use strict';
    // use app here
    console.log(app);
});
