function listString() {

    var type = document.getElementById('type');


    for (var i = 0; i < info.company.length; i++) {

        
        // Fast Grower
        if ( 
                (
                    (searchText == info.company[i].Symbol) ||
                    (searchText == (info.company[i].Name.toUpperCase()).includes(searchText) )


                ) && 

                (
                    (info.company[i]["PEG Ratio"] <= 1) && 
                    (info.company[i]["PEG Ratio"] !== null)

                ) 
            ) 
        {

            result.innerHTML = info.company[i].Name + '<br>' + info.company[i]["PEG Ratio"];
            type.innerHTML = 'Fast Grower';
            return;
            
        //Stalwarts
        } else if ( 
            (searchText == info.company[i].Symbol) && (
                (info.company[i]["Market Cap"] >= 50000) && 
                (info.company[i]["EPS LT Growth Estimates"] !== null) && 
                (info.company[i]["EPS LT Growth Estimates"] >= 0.04) && 
                (info.company[i]["EPS LT Growth Estimates"] <= 0.08)


                ) ) {

            result.innerHTML = info.company[i].Name + '<br>' + (info.company[i]["EPS LT Growth Estimates"] * 100).toFixed(2) + '%';
            type.innerHTML = 'Stalwart';
            return;

        // Slow Growers
        } else if ( 
                (searchText == info.company[i].Symbol) &&

                (
                    (info.company[i]["Market Cap"] >= 50000) && 
                    (info.company[i]["EPS LT Growth Estimates"] !== null) && 
                    (info.company[i]["EPS LT Growth Estimates"] >= 0) && 
                    (info.company[i]["EPS LT Growth Estimates"] <= 0.3999) &&
                    (info.company[i]["Dividend Yield"] !== null ) && 
                    (info.company[i]["Dividend Yield"] > 0) && 
                    (info.company[i]["Dividend Yield"] <= 1) &&
                    (info.company[i]["PE Ratio"] !== null) &&
                    (info.company[i]["PE Ratio"] <= 14.999)


                ) 
            ) 
        {

            result.innerHTML = info.company[i].Name + '<br>' + (info.company[i]["EPS LT Growth Estimates"] * 100).toFixed(2) + '%';
            type.innerHTML = 'Slow Grower';
            return;

        // Turnarounds
        } else if ( 
                ( 
                    (searchText == info.company[i].Symbol) ||
                    (searchText == (info.company[i].Name.toUpperCase()).includes(searchText) )

                ) &&

                (
                    (info.company[i]["Springate Score (TTM)"] <= 0.862) && 
                    (info.company[i]["Springate Score (TTM)"] !== null) 

                ) 
            ) 
        {

            result.innerHTML = info.company[i].Name + '<br>' + (info.company[i]["EPS LT Growth Estimates"] * 100).toFixed(2) + '%';
            type.innerHTML = 'Turnaround';
            return;

        

        // Cyclicals
        } else if ( 
                (searchText == info.company[i].Symbol) &&

                (
                    (info.company[i]["Sector"] == "Consumer Cyclical") || 
                    (info.company[i]["Sector"] == "Energy") ||
                    (info.company[i]["Sector"] == "Basic Materials")


                ) 
            ) 
        {

            result.innerHTML = info.company[i].Name + '<br>' + (info.company[i]["EPS LT Growth Estimates"] * 100).toFixed(2) + '%';
            type.innerHTML = 'Cyclical';
            return;

        } else {


            result.innerHTML = 'Sorry, ' + searchText + ' does not qualify as a Peter Lynch stock.' + '<br>' + 'Try another search.';

        }

    }

}