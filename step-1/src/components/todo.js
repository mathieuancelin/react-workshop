var React = require('react');

var Todo = React.createClass({
    propTypes: {
        text: React.PropTypes.string.isRequired
    },

    render: function () {
        return (
            <div className="todo">
                {this.props.text}
            </div>
        );
    }

    // Version utilisant directement la fonction createElement() de React
    /*
    render: function () {
        return React.createElement(
            'div',
            {className: 'todo'},
            this.props.text
        );
    }
    */

});

module.exports = Todo;
