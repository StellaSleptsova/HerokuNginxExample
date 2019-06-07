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
  userId = generateId(8);
  //var urlParams = new URLSearchParams(window.location.search);

  /*var id = urlParams.get("serviceType")
  if (id == null || id == "") {
      $("#backendConnection").html("'serviceType' was not provided");
      return;
  }*/

  //selectedServiceTemplateId = urlParams.get("serviceTemplate");

  //$("#backendConnection").html("Loading...");
  var query = $.get("/backend/api/ctl/main_model/random/" + userId);
  query.done(function (data) {
      //renderFormulaData(data["formula"]);
      renderSubFormulaData(data["formulas"]);
      renderGraphData(data["ks"]);
      renderQuestion(data["question"])
      //$("#backendConnection").addClass("hidden");
  });
  query.fail(function (jqXHR, errtext) {
      //TODO: 
      //$("#backendConnection").html(formatError(jqXHR, errtext));
  });
});

function renderGraphData(data) {
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
    inputElement.id = formula["num"];
    inputElement.name = "oneofsubformulas";
    inputElement.style = "width=100%; height=100%;";

    var subDiv = document.createElement("div");
    subDiv.style = "margin:2%";
    var boxLabel = document.createElement("label");
    boxLabel.style = "font-size:150%;color:#4f4f4f";
    boxLabel.innerHTML = formula["value"];

    subDiv.appendChild(inputElement);
    subDiv.appendChild(boxLabel);
    document.getElementById('formulas').appendChild(subDiv);
  }
}

function renderFormulaData(data) {
  $("#formulas").multiline(data);
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
  var checkboxes = document.getElementsByName("oneofsubformulas");
  var checkedFormulas = [];
  for(var i = 0; i < checkboxes.length; i++)  
  {
    if(checkboxes[i].checked)
    {
      checkedFormulas.push(i);
    }
  }
  
  var url = "/backend/api/ctl/verify/" + userId;
  var body = JSON.stringify({ values: checkedFormulas});
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
  /*var s0 = cy.getElementById('s0');
  var s1 = cy.getElementById('s1');
  var s2 = cy.getElementById('s2');
  var s3 = cy.getElementById('s3');
  var s4 = cy.getElementById('s4');
  var s5 = cy.getElementById('s5');

  var makeTippy = function(node, text){
    return tippy( node.popperRef(), {
      content: function(){
        var div = document.createElement('div');
        div.innerHTML = text;
        return div;
      },
      trigger: 'manual',
      arrow: true,
      placement: 'bottom',
      hideOnClick: false,
      multiple: true,
      sticky: true
    } );
  };

  var tippyS0 = makeTippy(s0, 'S0');  tippyS0.show();
  var tippyS1 = makeTippy(s1, 'S1');  tippyS1.show();
  var tippyS2 = makeTippy(s2, 'S2');  tippyS2.show();
  var tippyS3 = makeTippy(s3, 'S3');  tippyS3.show();
  var tippyS4 = makeTippy(s4, 'S4');  tippyS4.show();
  var tippyS5 = makeTippy(s5, 'S5');  tippyS5.show();*/

