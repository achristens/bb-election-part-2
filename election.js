document.addEventListener("DOMContentLoaded", function() {
  var list = document.querySelector('#candidate-list');

  $.ajax({
    url: 'https://bb-election-api.herokuapp.com/',
    method: 'GET',
    dataType: 'JSON'
  }).done(function(responseData){
    var array = responseData.candidates;

    array.forEach(function(each){
      // Add each candidate name and votes:
      var candidateName  = each.name;
      var votes          = each.votes;
      var listItem       = document.createElement('li');
      listItem.className = 'candidate'
      listItem.innerText = candidateName + ": " + votes + " votes"
      list.append(listItem);
      var form = document.createElement('form');

      // Create form for each candidate to allow votes:
      form.className = "candidate-form"
      var hidden = document.createElement('input')
      hidden.type  = "hidden"
      hidden.name  = each.name
      hidden.value = each.id
      var submit = document.createElement('input')
      submit.type = "submit"
      form.append(hidden)
      form.append(submit)
      listItem.append(form);

      // Add event listener for each form:
      form.addEventListener('submit', function(e){
        e.preventDefault();
        $.ajax({
          url: 'https://bb-election-api.herokuapp.com/vote',
          method: 'POST',
          data: {"name" : candidateName }
        });
      });
    });
  });


});
