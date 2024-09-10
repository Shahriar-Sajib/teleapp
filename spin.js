notNumber.innerText=localStorage.getItem("notPoinst");

var padding = { top: 20, right: 40, bottom: 0, left: 0 },
  w = 300 - padding.left - padding.right,
  h = 300 - padding.top - padding.bottom,
  r = Math.min(w, h) / 2,
  rotation = 0,
  oldrotation = 0,
  picked = 100000,
  color = d3.scale.category20();
var data = [
  {
    label: "8 NOT",
    value: 1,
  }, // padding
  {
    label: "1.5 NOT",
    value: 1.5,
  }, //font-family
  {
    label: "1 NOT",
    value: 1,
  }, //color
  {
    label: "0.5 NOT",
    value: 0.5,
  }, //font-weight
  {
    label: "-2 NOT",
    value: -2,
  }, //font-size
  {
    label: "1 NOT",
    value: 1,
   }, //background-color
];
var svg = d3
  .select("#chart")
  .append("svg")
  .data([data])
  .attr("width", w + padding.left + padding.right)
  .attr("height", h + padding.top + padding.bottom);
var container = svg
  .append("g")
  .attr("class", "chartholder")
  .attr(
    "transform",
    "translate(" + (w / 2 + padding.left) + "," + (h / 2 + padding.top) + ")"
  );
var vis = container.append("g");

var pie = d3.layout
  .pie()
  .sort(null)
  .value(function (d) {
    return 1;
  });
// declare an arc generator function
var arc = d3.svg.arc().outerRadius(r);
// select paths, use arc generator to draw
var arcs = vis
  .selectAll("g.slice")
  .data(pie)
  .enter()
  .append("g")
  .attr("class", "slice");

arcs
  .append("path")
  .attr("fill", function (d, i) {
    return color(i);
  })
  .attr("d", function (d) {
    return arc(d);
  });
// add the text
arcs
  .append("text")
  .attr("transform", function (d) {
    d.innerRadius = 0;
    d.outerRadius = r;
    d.angle = (d.startAngle + d.endAngle) / 2;
    return (
      "rotate(" +
      ((d.angle * 180) / Math.PI - 90) +
      ")translate(" +
      (d.outerRadius - 10) +
      ")"
    );
  })
  .attr("text-anchor", "end")
  .text(function (d, i) {
    return data[i].label;
  });
container.on("click", spin);
function spin(d) {
  
  if(+localStorage.getItem("chances")==0){
    container.on("spin",null);
    Toastify({text:"You do not have any chance left 😪"}).showToast();
    return;
  }else{
    let tamp = +localStorage.getItem("chances")-1;
    localStorage.setItem("chances",tamp);
    
    ticketNumber.innerText=tamp;
  }
  
  var ps = 360 / data.length,
    pieslice = Math.round(1440 / data.length),
    rng = Math.floor(Math.random() * 1440 + 360);

  rotation = Math.round(rng / ps) * ps;

  picked = Math.round(data.length - (rotation % 360) / ps);
  picked = picked >= data.length ? picked % data.length : picked;

  if (picked === 0) {
    d3.select(this).call(spin);
    return;
  }
  rotation += 90 - Math.round(ps / 2);
  vis
    .transition()
    .duration(1000)
    .attrTween("transform", rotTween)
    .each("end", function () {
      //mark question as seen
      d3.select(".slice:nth-child(" + (picked + 1) + ") path");
      //populate question
      Toastify({text:"You have got "+data[picked].value+" NOT"}).showToast();
      let newPoints = +localStorage.getItem("notPoinst")+data[picked].value;
      if(newPoints<0){
        newPoints = 0;
      }
      localStorage.setItem("notPoinst",newPoints);
      notNumber.innerText=localStorage.getItem("notPoinst");
      
      oldrotation = rotation;

      /* Comment the below line for restrict spin to sngle time */
      container.on("click", spin);
    });
}
//make arrow
svg
  .append("g")
  .attr(
    "transform",
    "translate(" +
      (w + padding.left + padding.right-25) +
      "," +
      (h / 2 + padding.top) +
      ")"
  )
  .append("path")
  .attr("d", "M-" + r * 0.15 + ",0L0," + r * 0.05 + "L0,-" + r * 0.05 + "Z")
  .style({ fill: "red" });
//draw spin circle
container
  .append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 30)
  .style({ fill: "lightgreen", cursor: "pointer" });
//spin text
container
  .append("text")
  .attr("x", 0)
  .attr("y", 5)
  .attr("text-anchor", "middle")
  .text("SPIN")
  .style({ "font-weight": "bold", "font-size": "15px"});

function rotTween(to) {
  var i = d3.interpolate(oldrotation % 360, rotation);
  return function (t) {
    return "rotate(" + i(t) + ")";
  };
}

// function getRandomNumbers() {
//   var array = new Uint16Array(1000);
//   var scale = d3.scale.linear().range([360, 1440]).domain([0, 100000]);
//   if (
//     window.hasOwnProperty("crypto") &&
//     typeof window.crypto.getRandomValues === "function"
//   ) {
//     window.crypto.getRandomValues(array);
//     console.log("works");
//   } else {
//     //no support for crypto, get crappy random numbers
//     for (var i = 0; i < 1000; i++) {
//       array[i] = Math.floor(Math.random() * 100000) + 1;
//     }
//   }
//   return array;
// }
// 