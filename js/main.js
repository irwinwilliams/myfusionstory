//add button to end of html document
// var button = document.createElement("button");
// button.innerHTML = "Show Markers";
// button.addEventListener("click", showMarkers);
// document.body.appendChild(button);
// //set absolute position of button
// var button = document.getElementsByTagName("button")[0];
// button.style.position = "absolute";
// button.style.top = "0px";
// button.style.left = "0px";
//var points = decode(activities[0].map.summaryPolyline)
//for(var i=0;i<points.length;i++) markers += `${points[i].latitude},${points[i].longitude}|`;

function showMarkers(e)
{
    console.log(e);
    var target = e.target;
    var aria = target.getAttribute("aria-label")
    var xPos = 41+activityDisplay[aria];
    var cameraPosition = cameraRig.attributes["position"].value;
    var pos = cameraPosition.split(" ");
    cameraRig.setAttribute("position", `${xPos} ${pos[1]} ${pos[2]}`);
    
}

AFRAME.registerComponent("faders", {
    schema: {
          starter: {type: 'selector'},
          ender: {type: 'selector'}
        },
    init: function() {
      var self = this.el
      var fadeInAnim = this.attributes["animation"];
      var fadeOutAnim = this.attributes["animation__2"];
      var images = [this.data.starter,this.data.ender]
      var switchflip = 1
      fadeOutAnim.addEventListener("animationcomplete", (e) => {
        self.setAttribute("src", images[switchflip])
        switchflip = switchflip === 1 ? 0 : 1
        self.emit('fadein')
      })
      fadeInAnim.addEventListener("animationcomplete", (e) => {
        setTimeout(function() {
        self.emit('fadeout')
      }, 5000)
      })
      setTimeout(function() {
        self.emit('fadeout')
      }, 5000)
    }
  })
