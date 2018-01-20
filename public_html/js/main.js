var pcp;
var bc;

function updateViews() {
    if (map.selectedCountry) {
        //A country is selected on the map.
        
        //Update the country dropdown
        $('#countryFilter').prev().html(map.selectedCountry.name + ' <span class="caret"></span>');
        
        //update bubble chart
        if (bc) bc.empty();
        bc = new bubblechart({country: map.selectedCountry.name, minSalary: 0, maxSalary: 0});
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
        
        //empty bubble chart
        bc.empty();
        
        //empty PCP
        pcp.empty();
        pcp = null;
    }
}
