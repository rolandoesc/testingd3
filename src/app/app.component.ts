import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as  d3Array from 'd3-array';
import * as d3Scale from 'd3-scale';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.styl']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(){
    var dataset:any = [
      {state: 'Mexico City' },
      {state: 'State of Mexico' },
      {state: 'Oaxaca' },
      {state: 'Queretaro' },
      {state: 'Puebla' },
      {state: 'Campeche' },
      {state: 'Baja California' },
      {state: 'Baja California Sur' },
      {state: 'Aguascaliente' },
      {state: 'Coahuila' },
      {state: 'Colima' },
      {state: 'Chiapas' },
      {state: 'Durango' },
      {state: 'Guanajuato' },
      {state: 'Guerrero' },
      {state: 'Hidalgo' },
      {state: 'Jalisco' },
      {state: 'Michoacán' },
      {state: 'Morelos' },
      {state: 'Nayarit' },
      {state: 'Nuevo León' },
      {state: 'Quintana Roo' },
      {state: 'San Luis Potosí' },
      {state: 'Sinaloa' },
      {state: 'Sonora' },
      {state: 'Tabasco' },
      {state: 'Tamaulipas' },
      {state: 'Tlaxcala' },
      {state: 'Veracruz' },
      {state: 'Yucatán' },
      {state: 'Zacatecas' },
      {state: 'Chihuahua' }];


    var result = dataset.map(function(obj:any){
      obj.value = Math.random()*200;
    });

    console.log(dataset);
   
    // define x & y' scales & axises
    var formatPercent = d3.format(".0%");

    var x_scale = d3.scaleBand()
                    .domain(d3.range(dataset.length))
                    .rangeRound([0,600]);//[0,600], 0.2

    var y_scale = d3.scaleLinear()
    .domain([0, d3.max(dataset)])
                  .range([0, 200]);

    var xAxis = d3.axisBottom(x_scale);

    var yAxis = d3.axisLeft(y_scale)
                .tickFormat(formatPercent);

x_scale.domain(dataset.map(function(d) { return d.state; }));
y_scale.domain([0, d3.max(dataset, function(d) { return d.value; } )]);


    var chart = d3.select('#graphic')
                  .append('svg')
                  .attr('width', 600)
                  .attr('height', 200);

//appending x Axis
        chart.append("g")
              .attr("class", "xAxis")
              .attr("transform", "translate(0, " + 200 + ")").call(xAxis)
              .selectAll("text")
              .attr("y", 0)
              .attr("x", 9)
              .attr("dy", ".35em")
              .attr("transform", "rotate(90)")
              .style("text-anchor", "start");

//appending y Axis

chart.append("g").attr("class", "yAxis").call(yAxis).append("text")
.attr("transform", "rotate(-90)")
.attr("y", 6)
.attr("dy", ".71em")
.style("text-anchor", "end")
.text("IDH");
    
//adding values
chart.selectAll("rect")
.data(dataset)
.enter()
.append("rect")
.attr("class", "bar")
.attr("x",function(d) { return x_scale(d.state); })
.attr("width", x_scale.bandwidth())
.attr("y", function(d) { return y_scale(d.value); })
.attr("height", function(d) { return 200 - y_scale(d.value); })
.attr("fill","steelblue");


        // chart.selectAll('rect')
        // .data(dataset)
        // .enter()
        // .append('rect')
        // .attr('x', function(d:any, i){ return i * (600/32);})
        // .attr('y', function(d:any){ return 200-d.value;})
        // .attr('width', '10px')
        // .attr('height', function(d:any){ return d.value;})
        // .attr('fill', 'blue');






    var sorting = false;
    var delay = function(d,i){
      return i * 50;
    }
    function sortBars(){ //ordena alfabéticamente

      sorting = !sorting;

      d3.select('#graphic')
        .selectAll('rect')
        .sort(function(a:any,b:any){
          if (sorting){
            return d3.ascending(a.state, b.state);
          }//if
          else {
            return d3.descending(a.state, b.state); //b.state - a.state;
          }//else
        })//function
        .transition()
        .delay(delay)
        .duration(1000)
        .attr('x',function(d,i){
          return i*(600/32);
        });
    }//sortBars()

    d3.select('#sorts').on('click',function(){
      sortBars();
    });

    //  var domain = d3.scale(linear)
    //                     .domain([0,500])
    //                     .range([0,100]);

    // var xAxis = d3.svg.axis()
    //                 .scale(domain);

    // var xAxisGroup = chart.append('g')
    //                       .call(xAxis);

  }//ngOnInit
}//Class
