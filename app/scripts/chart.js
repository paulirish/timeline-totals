
/*global define */
define(function(require, exports, module) {

    'use strict';

    var d3       = require('d3');

    var svg, color, pie, arc;

    function setup(){
        var width = 960,
        height = 500,
        radius = Math.min(width, height) / 2;

        color = d3.scale.category20();

        arc = d3.svg.arc()
        .outerRadius(radius - 10)
        .innerRadius(0);

        pie = d3.layout.pie()
        .sort(null)
        .value(function(d) { return d.total; });

        if (svg && svg.remove) {
            svg.remove();
        }

        svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');
    }

    function cleanData (data){

        // flatten
        data.forEach(function(d) {
            if (!$.isPlainObject(d)) {
                return true;
            }
            if (d.children && d.children.length){
                data = data.concat(d.children);
                d.children = [];
            }
        });

        // sum
        var sums = {};

        data.forEach(function(d) {
            if (!$.isPlainObject(d)) return true;
            if (!sums[d.type]) sums[d.type] = 0;
            sums[d.type] += (d.endTime - d.startTime)
        });

        delete sums['Program'];

        // array
        var sumarr = [], i = 0;
        for (var x in sums){

            if (isNaN(sums[x])) continue;

            sumarr[i] = {
                name : x,
                total : sums[x],
                i : i
            };
            i++;
        };

        return sumarr;
    }


    function populate(data){

        var sumarr = cleanData(JSON.parse(data));

        // debugger;
        var g = svg.selectAll('.arc')
        .data(pie(sumarr))
        .enter().append('g')
        .attr('class', 'arc');

        g.append('path')
         .attr('d', arc)
         .style('fill', function(d) {
           return color(d.data.i);
         });

        g.append('text')
         .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
         .attr('dy', '.35em')
         .style('text-anchor', 'middle')
         .text(function(d) { return d.data.name; });

    };

    return {
      populate : populate,
      setup    : setup
    }

});
