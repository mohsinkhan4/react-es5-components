var Checkbox = React.createClass({
    getInitialState: function() {
        return { checked :  false };
    },
    render: function() {
        const { checked } = this.state;
        return (
            <input type="checkbox" checked={ checked } onChange={ this.onChange }/>
        );
    },
    onChange: function(e) {
        const checked = !this.state.checked;
        this.setState({ checked });

        const { todoKey, onCheckboxChange } = this.props;
        onCheckboxChange(todoKey, checked);
    }
});
