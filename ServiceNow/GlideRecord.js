//GlideRecord

//Example 1 - addQuery

var incidentGR = new GlideRecord ('incident')
incidentGR.addQuery('priority',1)
incidentGR.query()
while(incidentGR.next()){
    gs.print('Incydent: ' + incidentGR.number + ':' + incidentGR.priority.getDisplayValue())
}

//Example 2 - get

var incidentGRTwo = new GlideRecord('incident')
incidentGRTwo.get('a9e428cac61122760075710592216c58')
gs.print('Short description: ' + incidentGRTwo.short_description + ' ' + 'Sys_ID:' + incidentGRTwo.sys_id) 

//Example 3 - addEncodeQuery

var incidentGRThree = new GlideRecord('incident')
incidentGRThree.addEncodedQuery('priority=1^state=3')
incidentGRThree.query()
while(incidentGRThree.next()){
    gs.print(incidentGRThree.number)
}

//Example 4 - newRecord

var incidentGRFour = new GlideRecord('incident')
incidentGRFour.newRecord()
incidentGRFour.short_description = 'Hello Word!'
var incidentGRFiveSysID = incidentGRFour.insert()
gs.print(incidentGRFiveSysID)

//Example 5 - newRecord

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

//Example 6 - deleteRecord

var incidentSeven = new GlideRecord('incident')
incidentSeven.addQuery('short_description','This is #3record')
incidentSeven.query()
while(incidentSeven.next()){
    incidentSeven.deleteRecord()
}

//Example 7 - orderBy or orderByDesc

var incidentGREight = new GlideRecord('incident')
incidentGREight.orderBy('short_description')
incidentGREight.query()
while(incidentGREight.next()){
    gs.print(incidentGREight.number + ' : ' + incidentGREight.short_description)
}

//Example 8 - setLimit

var problemGR = new GlideRecord('problem')
problemGR.setLimit(5)
problemGR.query()
while(problemGR.next()){
    gs.print(problemGR.number)
}

//Example 9 - canCreate, canWrite, canRead, canDelete

var problemGROne = new GlideRecord('problem')
problemGROne.query()
if(problemGROne.canCreate && problemGROne.canWrite && problemGROne.canRead && problemGROne.canDelete){
    gs.print('I have access!')
}

//Example 10 - getRowCount

var incidentGRNine = new GlideRecord('incident')
incidentGRNine.query()
gs.print(incidentGRNine.getRowCount())

//Example 11 - hasNext

var incidentGRTen = new GlideRecord('incident')
incidentGRTen.query()
gs.print(incidentGRTen.hasNext())

//Example 12 - get

var incidentGREleven = new GlideRecord('incident')
incidentGREleven.get('number','INC0000019')
gs.print(incidentGREleven.number)

//Example 13 = getLink

var incidentGRTwelve = new GlideRecord('incident')
incidentGRTwelve.get('number','INC000019')
gs.print(incidentGRTwelve.getLink())

//Example 14 - deleteMultiple

var incidentGRThirteen = new GlideRecord('incident')
incidentGRThirteen.addEncodedQuery('short_descriptionLIKEThis is #')
incidentGRThirteen.query()
while(incidentGRThirteen.next()){
    incidentGRThirteen.deleteMultiple()
}

//Example 15 - update

var incidentGRFourteen = new GlideRecord('incident')
incidentGRFourteen.get('number','INC0010024')
incidentGRFourteen.urgency = 2
incidentGRFourteen.update()

//Example 16 - update

var incidentGRFiveteen = new GlideRecord('incident')
incidentGRFiveteen.addQuery('impact',5)
incidentGRFiveteen.query()
while(incidentGRFiveteen.next()){
    incidentGRFiveteen.impact = 1
    incidentGRFiveteen.update()
}

//Example 17 - addNullQuery or addNotNullQuery

var incidentGRSixteen = new GlideRecord('incident')
incidentGRSixteen.addNullQuery('short_description')
incidentGRSixteen.query()
while(incidentGRSixteen.next()){
    gs.print(incidentGRSixteen.number)
}

