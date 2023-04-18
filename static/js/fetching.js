function inputsubmit() {
    var formElement = document.getElementById('inputMic');
    var data = new FormData(formElement);
}
function outputsubmit() {
  var formElement = document.getElementById('OutputMic');
  var data = new FormData(formElement);
  fetch('/submit', {
    method: 'POST',
    body: data,
  })
  .then(response => response.text())
  .then(data => {
    document.getElementById("output").innerHTML = data;
   
   })
  .catch(error => {
    console.error(error);
  });

}