const { response } = require("express");

console.log('Javascript linked');

$(document).on(onReady);


//renders whatever inputted within function onto DOM when loaded
function onReady(){

}


function getTaskList(){
    $.ajax({
        type: "GET",
        url: "/tasks"
    }) .then ((res) => {
        console.log('getting tasks', res);
        for( let i=0; i<response.length; i++) {
            $('#taskTableBody').append(`
            <tr>
                <td> ${response[i].} </td>
            
            
            
            
            </tr>`)
        }
    })
}