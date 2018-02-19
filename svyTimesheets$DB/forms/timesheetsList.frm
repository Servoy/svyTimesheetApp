customProperties:"formComponent:false,\
layout:{\
responsive:true\
}",
dataSource:"db:/timesheet/timesheet",
encapsulation:60,
initialSort:"week desc",
items:[
{
customProperties:"attributes:{\
class:\"container-fluid\"\
},\
properties:{\
packagename:\"12grid\",\
specname:\"container\"\
}",
items:[
{
customProperties:"attributes:{\
class:\"row messageNoteRow\"\
},\
properties:{\
packagename:\"12grid\",\
specname:\"row\"\
}",
items:[
{
customProperties:"attributes:{\
class:\"col-md-12\"\
},\
properties:{\
packagename:\"12grid\",\
specname:\"column\"\
}",
items:[
{
json:{
onActionMethodID:"FE915500-D08F-49C5-9E3C-8C812C462DA7",
styleClass:"btn btn-default addButton fa fa-plus",
text:" "
},
location:"2,2",
name:"buttonAddWorksheet",
size:"100,100",
typeName:"bootstrapcomponents-button",
typeid:47,
uuid:"7F51EDCF-7CD5-40AA-A0E7-6FA18416CFB5"
},
{
json:{
text:"There are no Timesheets created for this year.",
visible:false
},
location:"3,3",
name:"noTimesheetsMessage",
size:"100,100",
typeName:"bootstrapcomponents-label",
typeid:47,
uuid:"E4F2F48F-2CCC-4C6C-9938-60F8E38DBBAF",
visible:false
}
],
location:"1,1",
typeid:46,
uuid:"2441E98E-D779-4896-A8F2-75D3A664F796"
}
],
location:"5,5",
typeid:46,
uuid:"1F8A0F5A-6A43-49C7-BF6C-3AB479830631"
},
{
customProperties:"attributes:{\
class:\"row headerRow\"\
},\
properties:{\
packagename:\"12grid\",\
specname:\"row\"\
}",
items:[
{
customProperties:"attributes:{\
class:\"col-md-12 headerColumn text-center\"\
},\
properties:{\
packagename:\"12grid\",\
specname:\"column\"\
}",
items:[
{
json:{
styleClass:"headerTitle",
text:"Servoy Timesheets"
},
location:"1,1",
name:"label_2",
size:"100,100",
typeName:"bootstrapcomponents-label",
typeid:47,
uuid:"1B1F4F2B-9E62-4BF8-9B9A-67B94D3F308B"
},
{
json:{
onActionMethodID:"217D7268-2739-413D-AE51-015D2FD50581",
styleClass:"btn btn-default logoutButton",
text:"Logout",
visible:false
},
name:"button",
typeName:"bootstrapcomponents-button",
typeid:47,
uuid:"C392D851-DA73-4446-999D-BCA46AC1A878",
visible:false
}
],
location:"1,1",
typeid:46,
uuid:"45915613-29E1-45B0-819C-805A0DD554DC"
}
],
location:"2,2",
typeid:46,
uuid:"5F860569-A61B-4D7E-9AEC-3F688E6E3D26"
},
{
customProperties:"attributes:{\
class:\"row subHeaderRow\"\
},\
properties:{\
packagename:\"12grid\",\
specname:\"row\"\
}",
items:[
{
customProperties:"attributes:{\
class:\"col-md-12\"\
},\
properties:{\
packagename:\"12grid\",\
specname:\"column\"\
}",
items:[
{
json:{
styleClass:"text-left",
text:"Year:"
},
location:"1,1",
name:"label_3",
size:"100,100",
typeName:"bootstrapcomponents-label",
typeid:47,
uuid:"0356B55E-6DCF-4335-87CD-4B44B64CC295"
},
{
json:{
dataProviderID:"currentYear",
onActionMethodID:"DE7F880E-AAF6-411D-9D9E-3DEEC9F9D55D",
styleClass:"form-control yearSelectBox text-left",
valuelistID:"C8D540B1-5216-4EEA-B09B-D5F310A56351"
},
location:"2,2",
name:"selectYear",
size:"100,100",
typeName:"bootstrapcomponents-select",
typeid:47,
uuid:"5BCBD99D-563B-4552-9252-D44B6120B6E4"
}
],
location:"1,1",
typeid:46,
uuid:"7A1720C2-BDF8-4CC1-8393-724EDFE52A6B"
}
],
location:"3,3",
typeid:46,
uuid:"A2AFBCAA-B29B-408F-AC20-8FF5D2A4B5CB"
},
{
customProperties:"attributes:{\
class:\"row\"\
},\
properties:{\
packagename:\"12grid\",\
specname:\"row\"\
}",
items:[
{
customProperties:"attributes:{\
class:\"col-md-12\"\
},\
properties:{\
packagename:\"12grid\",\
specname:\"column\"\
}",
items:[
{
json:{
columns:[
{
autoResize:true,
dataprovider:"week",
headerText:"Week",
svyUUID:"EAC7879F-A779-4C72-89D0-42CECB2E75EF"
},
{
autoResize:true,
dataprovider:"calculateStatus",
headerText:"Status",
styleClass:"statusColumn",
svyUUID:"AB69617A-9DD6-44A9-90DF-E78F105F2406"
},
{
autoResize:true,
dataprovider:"calculateWeekDate",
headerText:"Date",
svyUUID:"40B243E3-5D7E-44C2-ABFE-9F97B393E513"
},
{
autoResize:true,
dataprovider:"timesheet_to_timespent.hours_sum",
headerText:"Hours",
svyUUID:"2F9393E0-5079-4E05-9903-217B7CDA80D7"
}
],
enableSort:false,
onCellClick:"D57A909E-CB24-43BB-804C-F16238EF1862",
visible:true
},
location:"1,1",
name:"timesheetTable",
size:"100,100",
typeName:"servoyextra-table",
typeid:47,
uuid:"5BE7DF14-76C6-408B-B17A-C9D4173A9B85"
}
],
location:"1,1",
typeid:46,
uuid:"D75EA79F-237C-4272-B52D-BC77D4D13812"
}
],
location:"4,4",
typeid:46,
uuid:"B68C2821-DE6C-4B5E-A833-E4F3153F3F48"
},
{
customProperties:"attributes:{\
class:\"row\"\
},\
properties:{\
packagename:\"12grid\",\
specname:\"row\"\
}",
items:[
{
customProperties:"attributes:{\
class:\"sideBarColumn\"\
},\
properties:{\
packagename:\"12grid\",\
specname:\"column\"\
}",
items:[
{
json:{
animate:false,
onMenuItemSelected:"BD45C031-5063-444D-9FC7-287E872DA758",
open:false,
slidePosition:"right"
},
name:"sidenav",
typeName:"servoyextra-sidenav",
typeid:47,
uuid:"B8884CF0-B4EF-4826-89B9-AF2F1B95BFCB"
}
],
location:"1,1",
typeid:46,
uuid:"9404A37E-CBA7-4217-8DCF-5A334472C58A"
}
],
location:"1,1",
typeid:46,
uuid:"DBF1F500-8D87-433D-8CBC-BE9FB26C338C"
}
],
location:"1,1",
typeid:46,
uuid:"5DE01147-44B2-47EB-9EAD-6849456351B8"
}
],
name:"timesheetsList",
navigatorID:"-1",
onLoadMethodID:"-1",
onShowMethodID:"7DB5C6E7-FC56-4858-A9B0-6EA3598889A8",
showInMenu:true,
typeid:3,
uuid:"4B27E612-5358-4B5D-B1B0-4AFF9CAF6FB1"