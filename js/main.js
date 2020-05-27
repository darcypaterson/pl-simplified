const search = document.getElementById('search');
const match = document.getElementById('match-list');
const coSummary = document.getElementById('coSummary');


//Search states.json and filter it
const searchCompanies = async searchText => {
    const res = await fetch('data/companies.json');
    const companies = await res.json();

    

    // Get matches to current text input
    let matches = companies.filter(company => {

        const regex = new RegExp(`^${searchText}`, 'gi'); 
        return company.Name.match(regex) || company.Symbol.match(regex);

    });



    if (searchText.length === 0) {

        matches = [];
        match.innerHTML = '';

    }




    //Show results in HTML
    outputHtml(matches);

};

const outputHtml = matches => {

    if (matches.length > 0) {



        const html = matches.map( match => `

            <a class="listResultItem" onclick="returnTicker('${match.Symbol}', '${match.Name}', '${match['PEG Ratio']}')" href="#">
                <div class="card card-body mb-1">

                    <h4>${match.Name} (${match.Symbol})</h4>
                    

                </div>
            </a>
            

            `).join('');

        match.innerHTML = html;

    


        //Show results
        // const listResultItem = document.getElementsByClassName('listResultItem');

        // for (var i = 0; i < listResultItem.length; i++) {

        //    listResultItem[i].addEventListener('click', function() {

        //         search.value = makeStuff();

        //     });
        // }

    }
}



function returnTicker(args, args2, args3) {

    search.value = args + ' ' + args2;
    matches = [];
    match.innerHTML = '';

    coSummary.innerHTML = 
    '<h4>' + args + ' ' + args2 + '</h4><br>' + 
    'PEG Ratio: ' + args3;

}



search.addEventListener('input', () => searchCompanies(search.value));

