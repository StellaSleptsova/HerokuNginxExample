/* global document, window, fetch, cytoscape */
var userId;

function generateId(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

$(document).ready(function () {
  userId = generateId(10);
  //var urlParams = new URLSearchParams(window.location.search);

  /*var id = urlParams.get("serviceType")
  if (id == null || id == "") {
      $("#backendConnection").html("'serviceType' was not provided");
      return;
  }*/

  //selectedServiceTemplateId = urlParams.get("serviceTemplate");

  //---- var toJson = function(res){ return res.json(); };
  //---- var data1=fetch('data.json').then(toJson);
  //---- renderGraphKsData(data1);
  //---- var data2 = fetch('data1.json').then(toJson);
  //---- renderGraphLtlData(data2);
  //$("#backendConnection").html("Loading...");
  var query = $.get("/backend/api/ltl/main_model/random/" + userId);
  query.done(function (data) {
      //renderFormulaData(data["formula"]);
      renderGraphKsData(data["baKs"]);
      renderGraphLtlData(data["baLtl"]);
      renderQuestion(data["question"]);
      renderSubFormulaData(data["states"]);
      //$("#backendConnection").addClass("hidden");
  });
  query.fail(function (jqXHR, errtext) {
      //TODO: 
    alert(errtext);
      //$("#backendConnection").html(formatError(jqXHR, errtext));
  });
});

function renderGraphKsData(data) {
  var toJson = function(res){ return res.json(); };

  var cy = window.cy = cytoscape({
           container: document.getElementById('cy'),           
           layout: {
             name: 'grid',
             columns: 2
            },
            style: fetch('cy-style.json').then(toJson),
            elements: data
  });
};

function renderSubFormulaData(data) {

  for(var i=0; i<data.length; i++)
  {
    var formula = data[i];
    var inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = "check"+formula["num"];
    inputElement.name = formula["value"];
    inputElement.style = "width=100%; height=100%;";

    var subStateText = document.getElementById("sumittedStates");
    subStateText.value = "Check states";

    inputElement.onclick= function() {
      
            var elem = document.getElementById("sumittedStates");

            if(elem.value=="Check states"){
              elem.value = this.name;
            } 
            else{
              elem.value= elem.value + " - " + this.name;
            }
    }
    var subDiv = document.createElement("div");
    subDiv.style = "margin:2%";
    var boxLabel = document.createElement("label");
    boxLabel.style = "font-size:150%;color:#4f4f4f";
    boxLabel.innerHTML = formula["value"];

    subDiv.appendChild(inputElement);
    subDiv.appendChild(boxLabel);
    document.getElementById('formulas').appendChild(subDiv);
  }
};

function SubmitClear(){
  
  var elem = document.getElementById("sumittedStates");
  elem.value = "Check states";

  document.getElementById("check1").checked = false;
  document.getElementById("check2").checked = false;
  document.getElementById("check3").checked = false;
  document.getElementById("check4").checked = false;
  document.getElementById("check5").checked = false;
  document.getElementById("check6").checked = false;
  document.getElementById("check7").checked = false;
  document.getElementById("check8").checked = false;
  document.getElementById("check9").checked = false;
  document.getElementById("check10").checked = false;
  document.getElementById("check11").checked = false;
  document.getElementById("check12").checked = false;
}

function handleClick(cb) {
  var elem = document.getElementById("sumittedStates");
  elem.value = elem.value + "-" + cb.value;
}

function renderGraphLtlData(data) {
  var toJson = function(res){ return res.json(); };

  var cy = window.cyltl = cytoscape({
           container: document.getElementById('cyltl'),           
           layout: {
             name: 'grid',
             columns: 2
            },
            style: fetch('cy-style.json').then(toJson),
            elements: data
  });
};

function renderQuestion(data) {
  $("#question").multiline(data);
};

$.fn.multiline = function(text){
  this.text(text);
  this.html(this.html().replace(/\n/g,'<br/>'));
  return this;
}

function SubmitVerify()
{
  var elem = document.getElementById("sumittedStates");
  var url = "/backend/api/ltl/verify/" + userId;
  var body = JSON.stringify({ values: elem.value});
  /*$.post( url,body, function( data ) {
    alert(data);
  });*/


  $.ajax({
    type: "POST",
    url: url,
    data: body,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    success: function(data) {
      alert(data);
    }
  });
}