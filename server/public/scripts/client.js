$(document).on(onReady);

console.log('Javascript linked');


//renders whatever inputted within function onto DOM when loaded
function onReady(){
    getTaskList();
}

//get lists of task to populate on DOM
function getTaskList(){
    $.ajax({
        type: "GET",
        url: "/tasks"
    }) .then ((res) => {
        renderTaskList(res)
        console.log('GET request successful');
        }) .catch((error) => {
            console.log('Error server response', error);
        });
}


// function clearInputs(){
//     console.log('inputs have been cleared');
//     $('#numberOne').val('');
//     $('#numberTwo').val('');
//     operator='';
// }

function renderTaskList(){
    $('#taskTableBody').empty();
    for( let item of res) {
        $('#taskTableBody').append(`
        <tr>
            <td> ${item.task} </td>
            <td data-id='completion'> ${item.complete} </td>
            <td> <button id="completedTask" data-id= ${item.id}> Mark as Complete </button> </td>
            <td> <button id="deleteTask" data-id= ${item.id}> Delete </button> </td>
        </tr>`);
    }

};