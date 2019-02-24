//GlideRecord

//Example 1

var incidentGR = new GlideRecord ('incident')
incidentGR.addQuery('priority',1)
incidentGR.query()
while(incidentGR.next()){
    gs.print('Incydent: ' + incidentGR.number + ':' + incidentGR.priority.getDisplayValue())
}

//Example 2

var incidentGRTwo = new GlideRecord('incident')
incidentGRTwo.get('a9e428cac61122760075710592216c58')
gs.print('Short description: ' + incidentGRTwo.short_description + ' ' + 'Sys_ID:' + incidentGRTwo.sys_id) 

//Example 3

var incidentGRThree = new GlideRecord('incident')
incidentGRThree.addEncodedQuery('priority=1^state=3')
incidentGRThree.query()
while(incidentGRThree.next()){
    gs.print(incidentGRThree.number)
}

//Example 4

var incidentGRFour = new GlideRecord('incident')
incidentGRFour.newRecord()
incidentGRFour.short_description = 'Hello Word!'
var incidentGRFiveSysID = incidentGRFour.insert()
gs.print(incidentGRFiveSysID)

//Example 5

var incidents = []
var counter = 1
var incidentGRSix = new GlideRecord('incident')
while(counter<=5){
    incidentGRSix.newRecord()
    incidentGRSix.short_description = 'This is #' + counter + 'record'
    counter++
    incidents.push(incidentGRSix.insert())
}
gs.print(incidents)

//Example 6

var incidentSeven = new GlideRecord('incident')
incidentSeven.addQuery('short_description','This is #3record')
incidentSeven.query()
while(incidentSeven.next()){
    incidentSeven.deleteRecord()
}
