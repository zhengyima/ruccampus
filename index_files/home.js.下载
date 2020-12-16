


function PlotSimpleBarChart(controlId, name, data) {
        
    var x = d3.scale.linear()
        .domain([0, d3.max(data, function(d) { return d.freq; })])
        .range([0, 420]);

    d3.select('#' + controlId)
        .selectAll("div")
        .data(data)
        .enter().append("div")
        .attr("class", "bar")
        .style("width",
        function (d) {
            return x(d.freq) + "px";
        })
        .style("background-color","blue")
        .text(function(d) { return d.text; });
}

function PlotSVGBarChart(controlId, name, data) {
    var width = 420,
    barHeight = 20;

    //for zooming the chart
    var x = d3.scale.linear()
        .range([0, width]);
    x.domain([0, d3.max(data, function (d) { return d.freq; })]);

    var chart = d3.select('#' + controlId)
        .append("svg")
        .attr("width", width);

    chart.attr("height", barHeight * data.length);

    var bar = chart.selectAll("g")
        .data(data)
        .enter().append("g")
        .attr("transform", function (d, i) { return "translate(0," + i * barHeight + ")"; });

    bar.append("rect")
        .attr("width", function (d) { return x(d.freq); })
        .attr("height", barHeight - 1)
        .attr("fill", "green")
        .on('mouseover', function(d) {
            d3.select(this)
              .attr('fill', 'blue');
        })
      .on('mouseout', function(d) {
          d3.select(this)
            .attr('fill', 'green');
      });

    bar.append("text")
        //.attr("x", function (d) { return x(d.freq) - 3; })
        .attr("x", function (d) { return 5; })
        .attr("y", barHeight / 2)
        .attr("dy", ".35em")
        .text(function (d) { return d.text; });



}
function PlotBarCharts(controlId, name, keys, values) {
    if (keys && keys.length > 0) {
        $('#' + controlId).highcharts({
            chart: {
                type: 'bar'
            },
            title: {
                text: name
            },
            //subtitle: {
            //    text: 'Source: Wikipedia.org'
            //},
            xAxis: {
                categories: keys,
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Freq',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                }
            },
            tooltip: {
                valueSuffix: ' records'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true
                    }
                }
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: -40,
                y: 100,
                floating: true,
                borderWidth: 1,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: true,
                enabled:false
            },
            credits: {
                enabled: false
            },
            series: [{
                name: 'freq',
                data: values
            }
                //, {
            //    name: 'Year 1900',
            //    data: [133, 156, 947, 408, 6]
            //}, {
            //    name: 'Year 2008',
            //    data: [973, 914, 4054, 732, 34]
            //}
            ]
        });
    }
}