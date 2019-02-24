//GlideSystem

//Example 1

var incidentGRSeventeen = new GlideRecord('incident')
incidentGRSeventeen.addQuery('caller', gs.getUserID())
incidentGRSeventeen.query()

var greetingMessage = ''

if(currentHour >= 3 && currentHour < 11){
    greetingMessage = 'Good Morning'
} else if (greetingMessage > 11 && customElements < 17) {
    greetingMessage = 'Good Afternoon'
} else {
    greetingMessage = 'Good Evening'
}

greetingMessage += gs.getUserDisplayName()

gs.print(greetingMessage)

//Example 2

var name = 'Michal'
gs.print(name)

//Example 3

gs.log('This is a log message', 'michal_logs')

//Example 4

gs.error('This is error!')

//Example 5

gs.warn('This is warn!')

//Example 6 - addErrorMessage or addInfoMessage

gs.addErrorMessage('This is error! STOP!')
gs.addInfoMessage('Go, go, go...')

//Powyższe ma zastosowanie w przypadku np.: reguł biznesowych.

//Example 7 - beginningOfLastMonth

gs.print(gs.beginningOfLastMonth())

//Example 8 

gs.print(gs.generateGUID())

//Example 9

gs.print(gs.getMessage('ago'))

//Example 10

gs.print('Hello ' + gs.getProperty('servicenow.201.hello.world'))

//W tabeli sys_properies.LIST tworzymy nowy rekord gdzie w value zapisujemy 'world!'. Pobiera Property.

//Example 11

gs.setProperty('servicenow.201.hello.world','Michal!')

//Podmieni poprzedni property 'world!' na 'Michal!'.

//Example 12

gs.print(gs.getUser().getDisplayName())
gs.print(gs.getUser().getFirstName())
gs.print(gs.getUser().getLocation())
gs.print(gs.getUser().getUserRoles())

//Pobiera dane użytkownika.

//Example 13

gs.print(gs.getUserID())

//Example 14

var incidentGREighteen = new GlideRecord('incident')
incidentGREighteen.addQuery('caller',gs.getUserID())
incidentGREighteen.query()
while(incidentGREighteen.next()){
    gs.print('Incident: ' + incidentGREighteen.number)
}

var incidentGREighteen = new GlideRecord('incident')
incidentGREighteen.addQuery('caller',gs.getUserID())
incidentGREighteen.query()
gs.print(incidentGREighteen.getEncodedQuery())

//Example 15

if(gs.hasRole('itil')||gs.hasRole('admin')){
    gs.print('This is admin or itil!')
}

//Example 16

gs.print(gs.getSession().isLoggedIn())

//Example 17

var incidentGRNineteen = new GlideRecord('incident')
incidentGRNineteen.query()
while(incidentGRNineteen.next()){
    if(gs.nil(incidentGRNineteen.short_description)){
        gs.print('This is true!' + ' ' + incidentGRNineteen.number)
    }
}

//Example 18 

gs.print(gs.tableExist('incident'))

//Czy argument jest tabelą w systemie.
