const search = document.getElementById('search');
const match = document.getElementById('match-list');
const coSummary = document.getElementById('coSummary');
const stockType = document.getElementById('stockType');
const coName = document.getElementById('coName');
const coTicker = document.getElementById('coTicker');
const coSector = document.getElementById('coSector');
const coType = document.getElementsByClassName('type');
const coBord = document.getElementsByClassName('coBord');
const defSlow = document.getElementById('defSlow');
const sumInfo = document.getElementsByClassName('sumInfo');
const typeDefintion = document.getElementsByClassName('typeDefintion');

var cashPos;


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

            <a class="listResultItem" onclick="returnTicker(
            '${match.Symbol}', 
            '${match.Name}', 
            '${match['PEG Ratio']}',
            '${match['Market Cap']}',
            '${match['EPS LT Growth Estimates']}',
            '${match['Dividend Yield']}',
            '${match['PE Ratio']}',
            '${match['Springate Score (TTM)']}',
            '${match['Sector']}',
            '${match['Cash and Equivalents (Quarterly)']}',
            '${match['Shares Outstanding']}',
            '${match['Total Long Term Debt (Quarterly)']}',
            '${match['Price']}'

            

            )" href="#">
                <div class="card card-body mb-1">

                    <h4>${match.Name} (${match.Symbol})</h4>
                    

                </div>
            </a>
            

            `).join('');

        match.innerHTML = html;


    }
}

function cashPosition(cash, shares, ltd, price) {

    cashPos = ( ( (cash - ltd) / shares ) >= (price / 3) );

}

function ifNull(args) {
    if (args == null) {
        args = '&ndash; &ndash;'
    }
}

function returnTicker(comTicker, comName, peg, mCap, ltge, divYield, pe, springate, sector, cash, shares, ltd, price) {

    search.value = comName + ' ' + '(' + comTicker + ')';
    matches = [];
    match.innerHTML = '';

    // coTicker.innerHTML = comTicker;
    // coName.innerHTML = comName;
    // coPeg.innerHTML = peg;
    // coMCAP.innerHTML = mCap;
    // coSector.innerHTML = sector;
    cashPosition(cash, shares, ltd, price);


    

    for (var i = 0; i < coType.length; i++) {
        

        if (coType[i].classList.contains('makeGreen') == true) {

            coType[i].classList.remove('makeGreen');
            coType[i].classList.add('makeGray');
            coType[i].classList.remove('check');
            coType[i].classList.add('neutral');
            coBord[i].classList.remove('border-success');
            coBord[i].classList.add('border');
            typeDefintion[i].classList.remove('d-block');
            typeDefintion[i].classList.add('d-none');

        } 
            
    }



    stockType.innerHTML = '';


    sumInfo[0].innerHTML = peg;
    sumInfo[1].innerHTML = (ltge * 100).toFixed(2) + '%';
    sumInfo[2].innerHTML = (divYield * 100).toFixed(2) + '%';
    sumInfo[3].innerHTML = springate;
    sumInfo[4].innerHTML = '$' + ((cash - ltd) / shares).toFixed(2) + '/share';
    sumInfo[5].innerHTML = sector;
    

    // Fast Grower

    if (

             
            (peg !== null) &&
            (peg <= 1) &&
            (peg > 0) &&
            (ltge !== null) && 
            (ltge >= 0.2) && 
            (ltge <= 0.3) 

        ) 

        {

            
            coType[0].classList.add('makeGreen');
            coType[0].classList.remove('makeGray');
            coType[0].classList.add('check');
            coType[0].classList.remove('neutral');
            coBord[0].classList.add('border-success');
            coBord[0].classList.remove('border'); 

            document.getElementById('defFast').classList.remove('d-none');
            document.getElementById('defFast').classList.add('d-block');     
            

        }

    // Stalwarts

    else if 
        (
            (mCap >= 50000) && 
            (ltge !== null) && 
            (ltge >= 0.04) && 
            (ltge <= 0.1999) &&
            (pe <= 25)

        ) 
        {

            coType[1].classList.add('makeGreen');
            coType[1].classList.remove('makeGray'); 
            coType[1].classList.add('check');
            coType[1].classList.remove('neutral');
            coBord[1].classList.add('border-success');
            coBord[1].classList.remove('border');
 
            document.getElementById('defStalwart').classList.remove('d-none');
            document.getElementById('defStalwart').classList.add('d-block');


        }

    // Slow Growers

    else if 
        (
            (mCap >= 50000) && 
            (ltge !== null) && 
            (ltge >= 0) && 
            (ltge <= 0.03999) &&
            (divYield !== null ) && 
            (divYield > 0) && 
            (pe !== null) &&
            (pe <= 14.999)

        ) 
        {
            
            coType[2].classList.add('makeGreen');
            coType[2].classList.remove('makeGray');
            coType[2].classList.add('check');
            coType[2].classList.remove('neutral');
            coBord[2].classList.add('border-success');
            coBord[2].classList.remove('border');
            
            document.getElementById('defSlow').classList.remove('d-none');
            document.getElementById('defSlow').classList.add('d-block'); 

        }


    // Asset Plays

    else if 
        (

            
            cashPos == true


        ) 
        {

            coType[4].classList.add('makeGreen'); 
            coType[4].classList.remove('makeGray');
            coType[4].classList.add('check');
            coType[4].classList.remove('neutral');
            coBord[4].classList.add('border-success');
            coBord[4].classList.remove('border');

            document.getElementById('defAsset').classList.remove('d-none');
            document.getElementById('defAsset').classList.add('d-block'); 

        }

    // Cyclicals

    else if 
        (


            (sector == "Consumer Cyclical") || 
            (sector == "Energy") ||
            (sector == "Basic Materials")


        ) 
        {

            coType[5].classList.add('makeGreen'); 
            coType[5].classList.remove('makeGray'); 
            coType[5].classList.add('check');
            coType[5].classList.remove('neutral');
            coBord[5].classList.add('border-success');
            coBord[5].classList.remove('border');

            document.getElementById('defCyclical').classList.remove('d-none');
            document.getElementById('defCyclical').classList.add('d-block');
             

        }

    // Turnarounds

    else if 
        (

            (springate <= 0.862) &&
            (springate > 0) && 
            (springate !== null) 
            // && (

            //     (sector !== "Consumer Cyclical") || 
            //     (sector !== "Energy") ||
            //     (sector !== "Basic Materials")

            //     )


        ) 
        {

            coType[3].classList.add('makeGreen');
            coType[3].classList.remove('makeGray'); 
            coType[3].classList.add('check');
            coType[3].classList.remove('neutral');
            coBord[3].classList.add('border-success');
            coBord[3].classList.remove('border');

            document.getElementById('defTurnaround').classList.remove('d-none');
            document.getElementById('defTurnaround').classList.add('d-block'); 

        }

    else 
        {

            stockType.innerHTML = '<i class="fas fa-exclamation-circle"></i> This stock does not fit any category. Try another search.';

        }

                    

}



search.addEventListener('input', () => searchCompanies(search.value));






