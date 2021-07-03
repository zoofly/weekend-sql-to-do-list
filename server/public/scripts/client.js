$(document).on(onReady);

console.log('Javascript linked');


//renders whatever inputted within function onto DOM when loaded
function onReady(){
    getTaskList();
}


function getTaskList(){
    $('#taskTableBody').empty();
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
                <td data-id='completion'> ${res[i].complete} </td>
                <td> <input  > </td>
            </tr>`)
        }
    });
}