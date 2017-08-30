/*
* v0.1
* create by wdj @2017/03/22 @home
* v0.2
* modified by wdj @2017/03/29 @home
* all rights reserved!
* dougie.J.wang@gmail.com
*/
Curve = {
  init:function(div){
    return new this.Curve(div);
  },
  Curve:function(div){
    function $(id){
      return document.getElementById(id);
    }
    this.setOption = function(option){
      this.option = {
        margin:[70, 30, 70 ,35],
        xAxis:240,
        roadWidth:6,
        paramData:[],
        statusData:[]
      };
      if(option.margin){
        this.option.margin = option.margin;
      }
      if(option.xAxis){
        this.option.xAxis = option.xAxis;
      }
      if(option.paramData){
        this.option.paramData = option.paramData;
      }
      if(option.statusData){
        this.option.statusData = option.statusData;
      }
      initData.apply(this);
    }
    this.clear = function(){
      //this.cxt.setTransform(1, 0, 0, 1, this.option.margin[0], this.H - this.option.margin[3]);
      this.cxt.clearRect(-1*this.option.margin[0], this.option.margin[3], this.W, -1*this.H);
      this.cxt.strokeStyle = "#C3C3C3";
      this.cxt.fillStyle = "#C3C3C3";
      this.cxt.fillRect(-1*this.option.margin[0], this.option.margin[3], this.W, -1*this.H);
      //this.cxt.setTransform(1, 0, 0, 1, this.option.margin[0], this.H - this.option.margin[3]);
    }
    this.redraw = function(){
      this.clear();
      initData.apply(this);
    }
    function initBody(){
      var canvas = document.createElement("canvas");
      this.container.appendChild(canvas);
      this.body = canvas;
      this.cxt = this.body.getContext("2d");

      if(this.container.clientHeight > 0){
        this.W = this.container.clientWidth;
        this.H = this.container.clientHeight;
      }else{
        this.W = 300;
        this.H = 200;
      }
      this.body.setAttribute("width", this.W);
      this.body.setAttribute("height", this.H);
      this.cxt.strokeStyle = "#C3C3C3";
      this.cxt.fillStyle = "#C3C3C3";
      this.cxt.fillRect(0, 0, this.W, this.H);
    }
    function initData(){
      this.cxt.setTransform(1, 0, 0, 1, this.option.margin[0], this.H - this.option.margin[3]);
      this.lineW = this.option.roadWidth;
      this.basedata = [];
      this.data = {};
      var maxPlace = 0;
      if(this.option.statusData.length >= this.option.paramData.length){
        for(var i = 0; i < this.option.paramData.length; i++){
          var d = this.option.paramData[i];
          if(maxPlace < d[3]){
            maxPlace = d[3];
          }
          var id = d[0];
          var direction = d[2];
          var sobj = [];
          for(var j = 0; j < this.option.statusData.length; j++){
            var ds = this.option.statusData[j];
            if(ds[0] == id && ds[1] == direction){
              sobj = ds;
              break;
            }
          }
          var cyclesequence = [];
          var cycletime = [];
          var cycle = [];
          for(var j = 4; j < d.length; j++){
            if(d[j].constructor == String){
              cyclesequence[cyclesequence.length] = d[j];
            }else{
              cycletime[cycletime.length] = d[j];
            }
          }
          if(cyclesequence.length == cycletime.length){
            for(var j = 0; j < cyclesequence.length; j++){
              var co = {"name":cyclesequence[j],
                        "d":cyclesequence[j][0],
                        "c":cyclesequence[j][1],
                        "time":cycletime[j]};
              cycle[cycle.length] = co;
            }
          }
          var obj = {"id":d[0],
            "place":d[3]};
          obj[d[2]] = {"direction":d[2],
                    "place": d[3],
                    "cycleduration":d[1],
                    "cyclesequence":cyclesequence,
                    "cycletime":cycletime,
                    "cycle":cycle,
                    "speed":45,
                    "currentStatus":0,
                    "currentTime":0
               };
          if(sobj.length >= 5){
            obj[d[2]]["speed"] = sobj[2];
            obj[d[2]]["currentStatus"] = sobj[3];
            obj[d[2]]["currentTime"] = sobj[4];
          }
          var exist = false;
          for(var j = 0; j < this.basedata.length; j++){
            if(this.basedata[j]["id"] == id){
              exist = true;
              if(!this.basedata[j].hasOwnProperty(d[2])){
                this.basedata[j][d[2]] = obj[d[2]];
              }
              break;
            }
          }
          if(!exist){
            this.basedata[this.basedata.length] = obj;
          }
        }
      }
      this.data["maxPlace"] = maxPlace;
      this.data["xAxis"] = this.option.xAxis;
      this.basedata.sort(function(a,b){return a["place"] - b["place"];});
      this.clientW = this.W - this.option.margin[0] - this.option.margin[2];
      this.clientH = this.H - this.option.margin[1] - this.option.margin[3];
      var flagH = maxPlace + this.option.roadWidth*4;
      var flagW = this.option.xAxis;
      var hFactor = this.clientH/flagH;
      var wFactor = this.clientW/flagW;
      var clientW = this.clientW;
      var clientH = this.clientH;
      this.filter1 = [];
      this.filter2 = [];
      for(var i = 0; i < this.basedata.length; i++){
        var filter1 = {};
        var filter2 = {};
        var obj = this.basedata[i];
        var place = obj["place"]*hFactor;
        var x = 0;
        var y = 0;
        var len = 0;
        var loopc = 0;
        var ci = 0;
        var clen = 0;
        var ddash = 0;
        var c = "";
        if(obj.hasOwnProperty(1)){
          x = 0;
          y = -1*place;
          filter1["s"] = obj[1]["speed"];
          filter1["p"] = obj["place"];
          filter1["d"] = [];
          ci = obj[1]["currentStatus"];
          clen = (obj[1]["cycle"][ci]["time"] - obj[1]["currentTime"])*wFactor;
          ddash = 0;
          if(obj[1]["cycle"][ci]["d"] == "l"){
            ddash = 1;
          }
          c = obj[1]["cycle"][ci]["c"];
          if(c != "r" && obj[1]["cycle"][ci]["name"][0] != "l"){
            filter1["d"][filter1["d"].length] = [0,obj[1]["cycle"][ci]["time"] - obj[1]["currentTime"]];
          }
          if(ddash == 0 && c == "g"){
            c = "b";
          }
          drawLine.apply(this, [x, y, clen, c, ddash]);
          x+= clen;
          loopc = 0;
          while((x) < clientW && loopc < 1000){
            ci += 1;
            if(ci >= obj[1]["cycle"].length){
              ci = 0;
            }
            clen = obj[1]["cycle"][ci]["time"]*wFactor;
            if(x+clen>clientW){
              clen = clientW - x;
            }
            ddash = 0;
            if(obj[1]["cycle"][ci]["d"] == "l"){
              ddash = 1;
            }
            c = obj[1]["cycle"][ci]["c"];
            if(c != "r" && obj[1]["cycle"][ci]["name"][0] != "l"){
              filter1["d"][filter1["d"].length] = [x/wFactor,clen/wFactor];
            }
            if(ddash == 0 && c == "g"){
              c = "b";
            }
            drawLine.apply(this, [x, y, clen, c, ddash]);
            x+= clen;
            loopc += 1;
          }
        }
        if(obj.hasOwnProperty(2)){
          x = 0;
          y = -1*place-this.lineW;
          filter2["s"] = obj[2]["speed"];
          filter2["p"] = obj["place"];
          filter2["d"] = [];
          ci = obj[2]["currentStatus"];
          clen = (obj[2]["cycle"][ci]["time"] - obj[2]["currentTime"])*wFactor;
          ddash = 0;
          if(obj[2]["cycle"][ci]["d"] == "l"){
            ddash = -1;
          }
          c = obj[2]["cycle"][ci]["c"];
          if(c != "r" && obj[2]["cycle"][ci]["name"][0] != "l"){
            filter2["d"][filter2["d"].length] = [0,obj[2]["cycle"][ci]["time"] - obj[2]["currentTime"]];
          }
          if(ddash == -1 && c == "g"){
            c = "b";
          }
          drawLine.apply(this, [x, y, clen, c, ddash]);
          x+= clen;
          loopc = 0;
          while((x) < clientW && loopc < 1000){
            ci += 1;
            if(ci >= obj[2]["cycle"].length){
              ci = 0;
            }
            clen = obj[2]["cycle"][ci]["time"]*wFactor;
            if(x+clen>clientW){
              clen = clientW - x;
            }
            ddash = 0;
            if(obj[2]["cycle"][ci]["d"] == "l"){
              ddash = -1;
            }
            c = obj[2]["cycle"][ci]["c"];
            if(c != "r" && obj[2]["cycle"][ci]["name"][0] != "l"){
              filter2["d"][filter2["d"].length] = [x/wFactor, clen/wFactor];
            }
            if(ddash == -1 && c == "g"){
              c = "b";
            }
            drawLine.apply(this, [x, y, clen, c, ddash]);
            x+= clen;
            loopc += 1;
          }
        }
        this.filter1[this.filter1.length] = filter1;
        this.filter2[this.filter2.length] = filter2;
      }
      for(var i =0; i < this.filter1.length; i++){
        var obj = this.filter1[i];
        var ndata = [];
        var b = 0;
        var e = 0;
        for(var j = 0; j < obj["d"].length - 1; j++){
          var d = obj["d"][j];
          var nd = obj["d"][j+1];
          if(b == 0){
            b = d[0];
            e = b + d[1];
          }
          if(e == nd[0]){
            e = e + nd[1];
          }else{
            ndata[ndata.length] = [b, e];
            b = nd[0];
            e = nd[0] + nd[1];
          }
        }
        ndata[ndata.length] = [b, e];
        obj["d"] = ndata;
      }
      for(var i =0; i < this.filter2.length; i++){
        var obj = this.filter2[i];
        var ndata = [];
        var b = 0;
        var e = 0;
        for(var j = 0; j < obj["d"].length - 1; j++){
          var d = obj["d"][j];
          var nd = obj["d"][j+1];
          if(b == 0){
            b = d[0];
            e = b + d[1];
          }
          if(e == nd[0]){
            e = e + nd[1];
          }else{
            ndata[ndata.length] = [b, e];
            b = nd[0];
            e = nd[0] + nd[1];
          }
        }
        ndata[ndata.length] = [b, e];
        obj["d"] = ndata;
      }
      for(var i =1; i < this.filter1.length; i++){
        var pobj = this.filter1[i-1];
        var obj = this.filter1[i];
        obj["pp"] = pobj["p"];
        var tdiff = obj["p"] - pobj["p"];
        if(pobj["s"] != 0){
          tdiff = tdiff/pobj["s"];
        }else{
          tdiff = 0;
        }
        obj["diffd"] = [];
        obj["rd"] = [];
        obj["tdiff"] = tdiff;
        var b = 0;
        var e = 0;
        for(var j = 0; j < pobj["d"].length; j++){
          obj["diffd"][obj["diffd"].length] = [pobj["d"][j][0]+tdiff, pobj["d"][j][1]+tdiff];
          for(var k = 0; k < obj["d"].length; k++){
            if(obj["d"][k][0] > obj["diffd"][obj["diffd"].length - 1][1]){
              break;
            }
            b = obj["d"][k][0];
            if( b < obj["diffd"][obj["diffd"].length - 1][0]){
              b = obj["diffd"][obj["diffd"].length - 1][0];
            }
            e = obj["diffd"][obj["diffd"].length - 1][1];
            if(e > obj["d"][k][1]){
              e = obj["d"][k][1];
            }
            if(e > b){
              obj["rd"][obj["rd"].length] = [b, e];
            }
          }
        }
      }
      for(var i =0; i < this.filter2.length-1; i++){
        var pobj = this.filter2[i+1];
        var obj = this.filter2[i];
        obj["pp"] = pobj["p"];
        var tdiff = pobj["p"] - obj["p"];
        if(pobj["s"] != 0){
          tdiff = tdiff/pobj["s"];
        }else{
          tdiff = 0;
        }
        obj["diffd"] = [];
        obj["rd"] = [];
        obj["tdiff"] = tdiff;
        var b = 0;
        var e = 0;
        for(var j = 0; j < pobj["d"].length; j++){
          obj["diffd"][obj["diffd"].length] = [pobj["d"][j][0]+tdiff, pobj["d"][j][1]+tdiff];
          for(var k = 0; k < obj["d"].length; k++){
            if(obj["d"][k][0] > obj["diffd"][obj["diffd"].length - 1][1]){
              break;
            }
            b = obj["d"][k][0];
            if( b < obj["diffd"][obj["diffd"].length - 1][0]){
              b = obj["diffd"][obj["diffd"].length - 1][0];
            }
            e = obj["diffd"][obj["diffd"].length - 1][1];
            if(e > obj["d"][k][1]){
              e = obj["d"][k][1];
            }
            if(e > b){
              obj["rd"][obj["rd"].length] = [b, e];
            }
          }
        }
      }
      for(var i =1; i < this.filter1.length; i++){
        var obj = this.filter1[i];
        for(var j = 0; j < obj["rd"].length; j++){
          var rd = obj["rd"][j];
          drawTransRect.apply(this, [[
          [(rd[0] - obj["tdiff"])*wFactor, -1*obj["pp"]*hFactor - this.lineW*2],
          [(rd[1] - obj["tdiff"])*wFactor, -1*obj["pp"]*hFactor - this.lineW*2],
          [rd[1]*wFactor, -1*obj["p"]*hFactor],
          [rd[0]*wFactor, -1*obj["p"]*hFactor]
          ], "blue"]);
        }
      }
      for(var i =0; i < this.filter2.length-1; i++){
        var obj = this.filter2[i];
        for(var j = 0; j < obj["rd"].length; j++){
          var rd = obj["rd"][j];
          drawTransRect.apply(this, [[
          [(rd[0] - obj["tdiff"])*wFactor, -1*obj["pp"]*hFactor],
          [(rd[1] - obj["tdiff"])*wFactor, -1*obj["pp"]*hFactor],
          [rd[1]*wFactor, -1*obj["p"]*hFactor - this.lineW*2],
          [rd[0]*wFactor, -1*obj["p"]*hFactor - this.lineW*2]
          ], "green"]);
        }
      }
      var x = 0;
      var y = 0;
      var w = this.clientW;
      var h = this.clientH;
      var s = this.clientH/11;
      var dw = this.option.margin[0];
      var ts = this.clientW/10;
      var mx = flagH;
      var mxs = mx/11;
      var mts = flagW/10;
      var dh = this.option.margin[3];
      if(mxs > 10){
        var diff = Math.ceil(mxs/10);
        s = diff*10/mxs*s;
        mxs = diff*10;
      }else{
        var diff = Math.ceil(mxs);
        s = diff/mxs*s;
        mxs = diff;
      }
      if(mts > 10){
        var diff = Math.ceil(mts/10);
        ts = diff*10/mts*ts;
        mts = diff*10;
      }else{
        var diff = Math.ceil(mts);
        ts = diff/mts*ts;
        mts = diff;
      }
      this.cxt.strokeStyle = "#000000";
      this.cxt.fillStyle = "#000000";
      //this.cxt.font="18px simsun";
      this.cxt.font="12px Verdana";
      this.cxt.beginPath();
      this.cxt.moveTo(x-5, y - h - dh/4 + 5);
      this.cxt.lineTo(x, y - h - dh/4);
      this.cxt.lineTo(x+5, y - h - dh/4 +5);
      this.cxt.moveTo(x, y - h - dh/4);
      this.cxt.lineTo(x, y);
      this.cxt.lineTo(x+w+dw/2, y);
      this.cxt.lineTo(x+w+dw/2-5, y+5);
      this.cxt.moveTo(x+w+dw/2, y);
      this.cxt.lineTo(x+w+dw/2-5, y-5);
      this.cxt.fillText("m", x - dw/2 , y - h );
      this.cxt.fillText("s", x+w+dw/2, y +15);

      mx = 0;

      for(var i = 0; i < h/s; i++){
        this.cxt.moveTo(x, y);
        this.cxt.lineTo(x - dw/5, y);
        this.cxt.fillText(mx + "", x - dw + 5, y);
        mx += mxs;
        y -= s;
      }
      y = 0;
      mx = 0;
      for(var i = 0; i < w/ts+1; i++){
        this.cxt.moveTo(x, y);
        this.cxt.lineTo(x, y+dh/5);
        this.cxt.fillText(mx + "", x, y + dh*0.4);
        mx += mts;
        x += ts;
      }
      this.cxt.closePath();
      this.cxt.stroke();

    }
    function drawTransRect(args, c){
      this.cxt.fillStyle = c;
      this.cxt.globalAlpha=0.5;
      this.cxt.beginPath();
      if(args && args.length > 0){
        this.cxt.moveTo(args[0][0], args[0][1]);
      }
      for(var i = 1; i < args.length; i++){
        this.cxt.lineTo(args[i][0], args[i][1]);
      }
      this.cxt.closePath();
      this.cxt.fill();
      this.cxt.globalAlpha=1;
    }
    function drawYP(data){
      this.cxt.strokeStyle = "#FFFF00";
      this.cxt.fillStyle = "#FFFF00";
      var x = 70;
      this.cxt.beginPath();
      for(var i = 0; i < data.length; i++){
        this.cxt.moveTo(data[i][0] + x, data[i][1]);
        this.cxt.arc(data[i][0] + x, data[i][1], 2, 0, 2*Math.PI);
      }
      this.cxt.closePath();
      this.cxt.stroke();
        this.cxt.fill();
    }
    function drawP(data){
      this.cxt.strokeStyle = "#FFFFFF";
      this.cxt.fillStyle = "#FFFFFF";
      //this.cxt.beginPath();
      var x = 70;
      for(var i = 0; i < data.length; i++){
        this.cxt.moveTo(data[i][0] + x, data[i][1]);
        this.cxt.arc(data[i][0] + x, data[i][1], 1, 0, 2*Math.PI);
        this.cxt.stroke();
      }
      //this.cxt.endPath();
    }
    function drawRect(x, y, w, h, c = "#FF0000"){
      this.cxt.fillStyle = c;
      this.cxt.fillRect(x, y, w, h);
    }
    function drawLine(x, y, w, c = "#FF0000", d = 0){
      if(c == "red" || c == "r"){
        c = "#FF0000";
      }else if(c == "blue" || c == "b"){
        c = "#0000FF";
      }else if(c == "yellow" || c == "y"){
        c = "#FFFF00";
      }else if(c == "green" || c == "g"){
        c = "#00FF00";
      }
      this.cxt.strokeStyle = "#000000";
      this.cxt.fillStyle = c;
      this.cxt.lineWidth = 0.15;
      this.cxt.rect(x, y-this.lineW, w, this.lineW);
      this.cxt.stroke();
      this.cxt.fillRect(x, y-this.lineW, w, this.lineW);

      if(d != 0){
        drawDash.apply(this, [x, y-this.lineW, w, d]);
      }
    }
    function drawRedLine(x, y, w){
      drawLine.apply(this, [x,y,w]);
    }
    function drawGreenLine(x, y, w){
      drawLine.apply(this, [x,y,w,"#00FF00"]);
    }
    function drawYellowLine(x, y, w){
      drawLine.apply(this, [x,y,w,"#FFFF00"]);
    }
    function drawBlueLine(x, y, w){
      drawLine.apply(this, [x,y,w, "#0000FF"]);
    }
    function drawDash(x, y, w, d){
      var c = w/this.lineW;
      this.cxt.lineWidth = 1;
      this.cxt.strokeStyle = "#FF0000";
      for(var i = 0; i < c - 1; i++){
        if(d>0){
          this.cxt.moveTo(x + i * this.lineW, y);
          this.cxt.lineTo(x + this.lineW * (i + 1), y + this.lineW);
        }else{
          this.cxt.moveTo(x + i * this.lineW, y + this.lineW);
          this.cxt.lineTo(x + this.lineW * (i + 1), y);
        }
      }
      this.cxt.stroke();
    }
    function drawRedDashLine(x, y, w, d){
      drawLine.apply(this, [x,y,w]);
      drawDash.apply(this, [x,y,w,d]);
    }
    function drawGreenDashLine(x, y, w, d){
      drawLine.apply(this, [x,y,w,"#00FF00"]);
      drawDash.apply(this, [x,y,w,d]);
    }
    function drawBlueDashLine(x, y, w, d){
      drawLine.apply(this, [x,y,w, "#0000FF"]);
      drawDash.apply(this, [x,y,w,d]);
    }
    function drawYellowDashLine(x, y, w, d){
      drawLine.apply(this, [x,y,w, "#FFFF00"]);
      drawDash.apply(this, [x,y,w,d]);
    }
    if(div){
      this.container = "";
      if(div.constructor == String){
        this.container = $(div);
      }else{
        this.container = div;
      }
    }
    if(this.container){
      initBody.apply(this);
    }else{
      return null;
    }
  }
}
