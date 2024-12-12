document.querySelector('#btn').onclick = function() {

    const xmlhttp = new XMLHttpRequest();
    const countryName = document.querySelector('input[type="text"]').value.trim();
    const resultDiv = document.querySelector('.result');                    

    if (!countryName) {
        resultDiv.innerHTML = 'Please enter a country name';
        return;
    }

    resultDiv.innerHTML = ''; 

    xmlhttp.onreadystatechange = function() {
        console.log(xmlhttp.readyState, xmlhttp.status);

        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            
                var ansFromAPI = JSON.parse(xmlhttp.responseText);
               
                if (Array.isArray(ansFromAPI) && ansFromAPI.length > 0) {
                    ansFromAPI.forEach(function(val) {
                        var {name, flags,capital} = val;

                        var div = document.createElement('div');
                        div.className = 'col-3 text-center';

                        var h1Tag = document.createElement('h1');
                        var pTag = document.createElement('h4');
                        var imgTag = document.createElement('img');

                        imgTag.src = flags ? flags.png : '';
                        imgTag.className = 'img-fluid';
                        h1Tag.innerHTML = name.common;
                        pTag.innerHTML = `Capital: ${capital[0]}`;

                        div.append(imgTag);
                        div.append(h1Tag);
                        div.append(pTag);

                        resultDiv.append(div);
                    });
                } else {
                    resultDiv.innerHTML = 'No results found';
                }
        }
    };

    xmlhttp.open('GET', `https://restcountries.com/v3.1/name/${countryName}`, true);
    xmlhttp.send();
};

window.onload = async function() {
    
    try{
        const response = await fetch('https://restcountries.com/v3.1/all');
        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
        const data = await response.json();
        console.log(data);
        const countriesDiv = document.querySelector('.result'); 
            
                    if (Array.isArray(data) && data.length > 0) {
                        data.forEach(function(val) {
                            var {name, flags,capital} = val;
        
                            var div = document.createElement('div');
                            div.className = 'col-3 text-center';
        
                            var h1Tag = document.createElement('h1');
                            var pTag = document.createElement('p');
                            var imgTag = document.createElement('img');
        
                            imgTag.src = flags ? flags.png : '';
                            imgTag.className = 'img-fluid';
                            h1Tag.innerHTML = name.common;
                            pTag.innerHTML = `Capital: ${capital[0]}`;
        
                            div.append(imgTag);
                            div.append(h1Tag);
                            div.append(pTag);
        
                            countriesDiv.append(div);
                        });
                    } else {
                        countriesDiv.innerHTML = 'No results found';
                    }

    }
   
        catch(error){
            console.error('There was an error fetching the data:', error);
        };
};
// window.onload = function() {
//     fetch('https://restcountries.com/v3.1/all')
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error(`HTTP error! status: ${response.status}`);
//             }
//             return response.json();
//         })
//         .then(data => {
//             const countriesDiv = document.querySelector('.result'); 
            
//             if (Array.isArray(data) && data.length > 0) {
//                 data.forEach(function(val) {
//                     var {name, flags} = val;

//                     var div = document.createElement('div');
//                     div.className = 'col-3 text-center';

//                     var h1Tag = document.createElement('h1');
//                     var imgTag = document.createElement('img');

//                     imgTag.src = flags ? flags.png : '';
//                     imgTag.className = 'img-fluid';
//                     h1Tag.innerHTML = name.common;

//                     div.append(imgTag);
//                     div.append(h1Tag);

//                     countriesDiv.append(div);
//                 });
//             } else {
//                 countriesDiv.innerHTML = 'No results found';
//             }
//         })
//         .catch(error => {
//             console.error('There was an error fetching the data:', error);
//         });
// };