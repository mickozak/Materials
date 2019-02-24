//GlideUser

//Example 1

var hasITIL = g_user.hasRole('itil')
if(!hasITIL){
    alert('You do not have ...')
}

//Example 2

alert(g_user.firstName + g_user.lastName)
alert(g_user.getFullName())
alert(g_user.hasRoles())
alert(g_user.hasRole('itil'))
alert(g_user.userName)
