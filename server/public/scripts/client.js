$(document).ready(onReady);

console.log('Javascript linked');


//renders whatever inputted within function onto DOM when loaded
function onReady(){
    console.log("Page loaded");
    getTaskList();
    $('#addTask').on('click', addNewTask);
    $('#taskBody').on('click', deleteTaskHandler);
}

//get lists of task to populate on DOM
function getTaskList(){
    console.log('in getTaskList');
    $.ajax({
        type: "GET",
        url: "/tasks"
    }) .then (function (res){
        renderTaskList(res)
        console.log('GET request successful');
        }) .catch((error) => {
            console.log('Error server response', error);
        });
}

//post new task to database and clear input field
function addNewTask(){
    console.log("in addNewTask");
    const newTask= {
        task: $('#enterTaskIn').val()
    };
    console.log( newTask);
    $.ajax({
        type: "POST",
        url:'/tasks',
        data: newTask
    }) .then( function (res){
        console.log(res);
        getTaskList();
        clearInputs();
    }) .catch( function (err){
        console.log('error in posting new task', err);
        alert ('Unable to add new task. Please try again later.');
    });
}

function clearInputs(){
    console.log('inputs have been cleared');
    $('#enterTaskIn').val('');
}

function renderTaskList(taskList){
    $('#taskBody').empty();
    for( let item of taskList) {
        $('#taskBody').append(`
        <li class=">
            ${item.task} 
            STATUS : ${item.complete}
            <button id="completedTaskBtn" data-complete= ${item.id}> Complete </button> 
            <button id="deleteTaskBtn" data-delete= ${item.id}> Delete Task </button> 
        </li>`);
        if(item.complete === true){
            $('li').css("background-color", "green");
        }
    }

};

//DELETE REQUEST
function deleteTaskHandler(){
    deleteTask($(this).data('delete'));
}

function deleteTask(taskId){
    $.ajax({
        type: "DELETE",
        url: `/tasks/${taskId}`
    }) .then (function (res){
        console.log("Successfully deleted task.", res);
        getTaskList();
    }) .catch( function (err){
        console.log('Error in deleting task', err);
    });
};