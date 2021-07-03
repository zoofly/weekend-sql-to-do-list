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
        for( let i=0; i<res.length; i++) {
            $('#taskTableBody').append(`
            <tr>
                <td> ${res[i].priority} </td>
                <td> ${res[i].task} </td>
                <td> ${res[i].complete} </td>
            </tr>`)
        }
    });
}