/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function PCPlot(args) {
    $.extend(this, args);
    this.init();
}

/* Creates the parallel coordinates plot for the specified country and 'job' or 'career' satisfaction.
 * 
 * @param {string} country
 * @param {string} satisfaction
 * @return {undefined}
 */
PCPlot.prototype.init = function() {
    $('#pcPlotMsg').hide();
    $('#pcPlot').height(($('#pcPlot').width() / 2) - 10);
    
    //Filter the data to only the filtered country
    var self = this;
    this.data = this.data.filter(function(row) {
        if (row.Country === self.country 
                && row.Overpaid !== 'NA'
                && row.DeveloperType !== 'NA'
                && row.CompanyType !== 'NA'
                && row.CompanySize !== 'NA'
                && row.YearsCodedJob !== 'NA')  return row;
    });
    
    //Now filter to only the default columns
    this.data = this.data.map(function(d) {
        var newColumns = {};
        if (self.satisfactionType === 'job')
            newColumns['JobSatisfaction'] = d.JobSatisfaction;
        else if (self.satisfactionType === 'career')
            newColumns['CareerSatisfaction'] = d.CareerSatisfaction;
        newColumns['Overpaid'] = d.Overpaid;
        newColumns['FormalEducation'] = d.FormalEducation;
        var expIsRange = d.YearsCodedJob.toLowerCase().indexOf('more') < 0 && d.YearsCodedJob.toLowerCase().indexOf('less than') < 0;
        if (expIsRange) {
            var parsedYearsJob = parseInt(d.YearsCodedJob);
            if (parsedYearsJob < 5)  newColumns['Experience'] = '1-5 years';
            else if (parsedYearsJob < 10)   newColumns['Experience'] = '6-10 years';
            else if (parsedYearsJob < 20)   newColumns['Experience'] = '11-20 years';
        }
        else {
            newColumns['Experience'] = d.YearsCodedJob;
        }
        if (d.DeveloperType.indexOf(';') < 0)
            newColumns['DeveloperType'] = d.DeveloperType;
        else
            newColumns['DeveloperType'] = '2 or more';
        newColumns['CompanyType'] = d.CompanyType;
        newColumns['CompanySize'] = d.CompanySize;
        
        return newColumns;
    });

      this.pc2 = d3.parcoords()("#pcPlot");

      this.pc2
        .data(this.data)
        .color("rgb(31, 119, 180)")
        .alpha(0.2)
        .margin({ top: 24, left: 0, bottom: 12, right: 0 })
        .render()
        .reorderable()
        .brushMode("1D-axes")   //this option gives highlight function
        .alphaOnBrushed(1)
        .brushedColor("red");

    //Correct the appearance of the plot
    $('#pcPlot canvas').css('position', 'absolute');
    $('#pcPlot svg').css('bottom', '0px');
    $('#pcPlot text').css('font-size', 'x-small')
    
    //Show the change axes button
    $('#pcpBtn').show();

}

PCPlot.prototype.empty = function() {
    $('#pcPlotMsg').show();
    $('#pcpBtn').hide();
    $('#pcPlot').empty();
    $('#pcPlot').height(0);
}