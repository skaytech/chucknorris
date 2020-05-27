document.querySelector('#button').addEventListener('click', fetchJokes);
document.querySelector('#clear').addEventListener('click', clearContent);

function fetchJokes() {

    const num = document.querySelector('input[type="text"]').value;

    if (num === '') {
        showError('Please enter a number');
        setTimeout(clearError, 1000);
    } else {
        const xhr = new XMLHttpRequest();

        xhr.open('GET',
            `https://api.icndb.com/jokes/random/${num}`, true);


        xhr.onload = function() {
            if (this.status === 200) {
                let output = '';
                const response = JSON.parse(this.responseText);
                if (response.type === 'success') {
                    const jokes = response.value;
                    jokes.forEach(function(joke) {
                        output += `<li>${joke.joke}</li>`
                    })
                } else {
                    output += '<li>Something went wrong. Try Again.</li>'
                }
                document.querySelector('.joke-list').innerHTML = output;
            }
        }
        xhr.send();
    }
}

function showError(msg) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'danger';
    errorDiv.style.color = 'red';
    errorDiv.appendChild(document.createTextNode(msg));

    const parent = document.querySelector('.container');
    parent.insertBefore(errorDiv, document.querySelector('.before'));
}

function clearError() {
    document.querySelector('.danger').remove();
}

function clearContent() {
    document.querySelector('input[type="text"]').value = '';
    const lis = document.querySelectorAll('li');

    let i;
    for (i = 0; i < lis.length; i++) {
        lis[i].remove();
    }
}