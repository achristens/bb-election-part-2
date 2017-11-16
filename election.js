document.addEventListener("DOMContentLoaded", function() {
  var list = document.querySelector('#candidate-list');

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'JSON'
  }).done(function(responseData){
    var array = responseData.candidates;

    array.forEach(function(each){
      var candidateName  = each.name;
      var votes          = each.votes;
      var listItem       = document.createElement('li');
      listItem.className = 'candidate'
      listItem.innerText = candidateName + ": " + votes + " votes"
      list.append(listItem);
    });

    var candidates = document.querySelectorAll('.candidate');

    candidates.forEach(function(each){
      var form = document.createElement('form');
        each.append(form);
    })
  });

});
