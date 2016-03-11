var React = require('react');
var ReactDOM = require('react-dom');

var Todo = require('./components/todo');

ReactDOM.render(
    <Todo text="Ceci est une tâche à réaliser."/>,
    document.getElementById('main')
);

// Version utilisant directement la fonction createElement() de React
/*
ReactDOM.render(
    React.createElement(
        Todo,
        {text:'Ceci est une tâche à réaliser.'}
    ),
    document.getElementById('main')
);
*/
