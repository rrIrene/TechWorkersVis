var pcp;

function updateViews() {
    if (map.selectedCountry) {
        //A country is selected on the map.
        
        //Update the country dropdown
        $('#countryFilter').prev().html(map.selectedCountry.name + ' <span class="caret"></span>');
        
        //TODO: update bubble chart
        
        //update PCP
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
