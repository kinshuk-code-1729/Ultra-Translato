document.getElementById('inpBtnLang').addEventListener('click', function() {
    const mySelect = document.getElementById('langSelect');
    mySelect.classList.replace('d-none', 'd-block');
});
const mySelect = document.getElementById('langSelect');
console.log(mySelect);
mySelect.addEventListener('change', function() {
    const selectedOption = mySelect.options[mySelect.selectedIndex];
    console.log("/////////////////// "+selectedOption.textContent);
    document.getElementById('a').value = selectedOption.textContent;
    console.log(`a input tag value is ${document.getElementById('a').value}`);

    // generate one input box... 
    const div = document.createElement('div');
    const start = document.createElement('button');
    const stop = document.createElement('button');
    const btnDiv = document.createElement('div');
    const gifDiv = document.createElement('div');
    const gif = document.createElement('img');
    gif.src = "url('{{ url_for('static', path='/img/audioGif1.gif') }}')";
    btnDiv.classList.add('container', 'd-flex', 'justify-content-center', 'align-items-center');
    gifDiv.classList.add('container', 'd-flex', 'justify-content-center', 'align-items-center', 'mt-4');
    start.classList.add('btn', 'btn-outline-dark');
    start.textContent = 'start';
    stop.classList.add('btn', 'btn-outline-dark', 'mx-2', 'd-none');
    stop.textContent = 'stop';
    btnDiv.appendChild(start);
    btnDiv.appendChild(stop);
    div.innerHTML = "";
    div.appendChild(btnDiv);
    div.style.backgroundImage = "url('{{ url_for('static', path='/img/audio.png') }}')";
    div.style.backgroundRepeat = 'no-repeat';
    div.style.backgroundSize = 'cover';
    div.classList.add('shadow', 'p-3', 'mb-5', 'bg-white', 'rounded', 'm-4', 'h-50');
    document.getElementById('inputBox').innerHTML = "";
    document.getElementById('inputBox').appendChild(div);

    // jaise hi user start button par click karta hai... 
    start.addEventListener('click', function() {
        gifDiv.appendChild(gif);
        div.appendChild(gifDiv);
        div.style.backgroundImage = "url('{{ url_for('static', path='/img/black.png') }} ')";
        stop.classList.replace('d-none', 'd-inline');
        stop.classList.replace('btn-outline-dark', 'btn-outline-light');
        start.classList.replace('btn-outline-dark', 'btn-outline-light');
        start.classList.add('d-none');
    });
    // jaise hi user stop button par click karta hai... 
    stop.addEventListener('click', function() {

        div.removeChild(gifDiv);
        div.style.backgroundImage = "url('{{ url_for('static', path='/img/audio.png') }}')";
        stop.classList.replace('btn-outline-light', 'btn-outline-dark');
        start.classList.replace('btn-outline-light', 'btn-outline-dark');   

        const userInput = document.createElement('div');
        userInput.id = 'ui';
        userInput.classList.add('shadow', 'p-3', 'mb-5', 'rounded', 'm-4', 'h-50', 'bg-dark');
        const p = document.createElement('p');
        p.textContent = "In this example, we first get a reference to the HTML div element with the ID of myDiv using the document.getElementById() method. We then set the backgroundColor property of the div element to the color blue using the style property. You can replace blue with any valid CSS color value, such as a hexadecimal color code, an RGB color value, or a color name.";
        p.style.color = 'white';
        userInput.appendChild(p);
        document.getElementById('result').innerHTML = "";
        document.getElementById('result').appendChild(userInput);
        document.getElementById('ui').scrollIntoView();

        const outBtn = document.createElement('button');
        outBtn.id = 'outputBtn';
        outBtn.classList.add('btn', 'btn-outline-primary', 'mx-auto', 'd-block');
        outBtn.textContent = 'Choose Output Language';
        result.appendChild(outBtn);
        document.getElementById('outputBtn').scrollIntoView();

        // jaise hi use outBtn par click kare...  
        // outBtn.addEventListener('click', function() {
        //     const op = document.getElementById('output');
        //     op.classList.replace('d-none', 'd-block');
        //     op.classList.add('shadow', 'p-3', 'mb-5', 'bg-white', 'rounded', 'm-4');
        //     const mySelectOp = document.getElementById('langSelectOp');
        //     mySelectOp.addEventListener('change', ()=>{
        //         console.log(mySelectOp);
        //         const selectedOption = mySelectOp.options[mySelectOp.selectedIndex];
        //         console.log(selectedOption);
        //         const opText = document.createElement('div');
        //         console.log(opText);
        //         opText.classList.add('shadow', 'p-3', 'mb-5', 'rounded', 'm-4', 'h-50', 'bg-dark');

        //         document.getElementById('output').appendChild(opText);
        //     });
        // });
        outBtn.addEventListener('click', function(){
            const opLang = document.getElementById('outLang');
            opLang.classList.replace('d-none', 'd-block');
            document.getElementById('outLang').scrollIntoView();
            const selectOp = document.getElementById('langSelectOp');
            selectOp.addEventListener('change', function(){
                const selectedOption = selectOp.options[selectOp.selectedIndex];
                console.log("/////////////////// "+selectedOption.textContent);
                document.getElementById('b').value = selectedOption.textContent;
                console.log(`b input tag value is ${document.getElementById('b').value}`);
                const opText = document.createElement('div');
                opText.id = 'ot';
                opText.classList.add('shadow', 'p-3', 'mb-5', 'rounded', 'm-4', 'h-50', 'bg-dark');
                const p = document.createElement('p');
                p.textContent = "In this example, we first get a reference to the HTML div element with the ID of myDiv using the document.getElementById() method. We then set the backgroundColor property of the div element to the color blue using the style property. You can replace blue with any valid CSS color value, such as a hexadecimal color code, an RGB color value, or a color name.";
                p.style.color = 'white';
                opText.appendChild(p);
                document.getElementById('output').innerHTML = "";
                document.getElementById('output').appendChild(opText);
                document.getElementById('output').scrollIntoView();

            });
        });
    }); 
});