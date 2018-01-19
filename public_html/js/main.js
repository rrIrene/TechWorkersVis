var pcp;

function updateViews() {
    if (map.selectedCountry) {
        //A country is selected on the map.
        
        //Update the country dropdown
        $('#countryFilter').prev().html(map.selectedCountry.name + ' <span class="caret"></span>');
        
        //TODO: update bubble chart
        
        //update PCP
        if (pcp) pcp.empty();   //empty the pcp first, otherwise the axes might get messed up.
        
        pcp = new PCPlot({
            data: map.data,
            country: map.selectedCountry.name,
            satisfactionType: map.type
        });
        
    } else {
        //No country is selected so reset everything.
        
        //Update the country dropdown
        $('#countryFilter').prev().html('Select country... <span class="caret"></span>');
        
        //TODO: update bubble chart
        
        //empty PCP
        pcp.empty();
        pcp = null;
    }
}
