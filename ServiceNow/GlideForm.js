//GlideForm

//Example 1

var category = g_form.getValue('category')

var newCategory = 'software'
g_form.setValue('category',newCategory)

//Example 2

var caller = g_form.getReference('caller_id',callback)

function callback(caller){
    g_form.setValue('description' + ' ' + caller.first_name + ' ' + caller.last_name + ' say hello.')
}

//Example 3

var categoryIncident = g_form.getValue('category')
alert(categoryIncident)

//Example 4

g_form.setValue('category','hardware')

//Example 5

g_form.clearValue('category')

//Example 6

g_form.save()

//Example 7

g_form.setDisabled('category',true)

//Example 8

g_form.hideRelatedList()
g_form.showRelatedList()

//Example 9

g_form.setMandatory('category',true)
alert(g_form.isMandatory('category'))

//Example 10

var isNewRecord = g_form.isNewRecord()
alert('Is this a new record' + isNewRecord)

//Example 11

g_form.addErrorMessage('Hello!')
g_form.addInfoMessage('Yes yes yes :-)')
g_form.clearMessage()

//Example 12

var tableName = g_form.getTableName()
alert(tableName)
