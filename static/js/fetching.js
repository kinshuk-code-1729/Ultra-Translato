function audioSubmit() {
    var formElement = document.getElementById('mic');
    var data = new FormData(formElement);
    
    fetch('/audio.html', {
        method: 'POST',
        body: data,
      })
      .then(response => response.text())
      .then(data => {
        document.getElementById("result").innerHTML = data;
       
       })
      .catch(error => {
        console.error(error);
      });

}