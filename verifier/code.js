/* global document, window, fetch, cytoscape */

(function(){
  var toJson = function(res){ return res.json(); };

  var cy = window.cy = cytoscape({
           container: document.getElementById('cy'),           
           layout: {
             name: 'grid',
             columns: 2
            },
            style: fetch('cy-style.json').then(toJson),
            elements: fetch('data.json').then(toJson)
  });

  var s0 = cy.getElementById('s0');
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
  var tippyS5 = makeTippy(s5, 'S5');  tippyS5.show();
})();