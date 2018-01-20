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
        if (row.Country === self.country)  return row;
    });
    
    //Now filter to only the default columns
    this.data = this.data.map(function(d) {
        var newColumns = {};
        if (self.satisfactionType === 'job')
            newColumns['JobSatisfaction'] = d.JobSatisfaction;
        else if (self.satisfactionType === 'career')
            newColumns['CareerSatisfaction'] = d.CareerSatisfaction;
        newColumns['Overpaid'] = d.Overpaid;
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
    
    //Show the change axes button
    $('#pcpBtn').show();

}

PCPlot.prototype.empty = function() {
    $('#pcPlotMsg').show();
    $('#pcpBtn').hide();
    $('#pcPlot').empty();
    $('#pcPlot').height(0);
}