define([
    'react',
    'react-dom',
    'browser',
    './scripts/components/TableHeader',
    './scripts/components/TableBody'
], function(React, ReactDOM, Browser, TableHeader){

    var Table = React.createClass({
        getInitialState: function() {
            return { currentData :  '' };
        },
        componentWillMount: function() {
            this.selectedCheckboxes = new Set();
        },
        render: function() {
            const { rowData, columnData } = this.props;

            return (
                <div className="form-inline">
                    <input className="form-control" value={ this.state.currentData } onChange={ this.onCurrentDataChange }/>
                    <button className="btn btn-success"  onClick={ this.addTodo }>Add</button>
                    <button className="btn btn-danger" onClick={ this.removeTodo }>Remove</button>
                    <table className="table table-striped table-hover">
                        <TableHeader columnData={ columnData }/>
                        <TableBody rowData={ rowData } onCheckboxChange={ this.onCheckboxChange }/>
                    </table>
                </div>
            );
        },
        onCurrentDataChange: function(e) {
            this.setCurrentData(e.target.value);
        },
        setCurrentData: function(currentData) {
            this.setState({ currentData });
        },
        addTodo: function() {
            const { rowData } = this.props;
            const keys = rowData.map( row => row.key ).sort().reverse();
            const newKey = keys.length > 0 ? ++(keys[0]) : 0;
            this.setCurrentData('');
            this.props.addRow({
                key: newKey,
        		text: this.state.currentData
        	});
        },
        removeTodo: function() {
            this.props.removeRow(this.selectedCheckboxes);
            this.selectedCheckboxes = new Set();
        },
        onCheckboxChange(key, checked) {
            if(!checked && this.selectedCheckboxes.has(key)) {
                this.selectedCheckboxes.delete(key);
            } else if(checked && !this.selectedCheckboxes.has(key)){
                this.selectedCheckboxes.add(key);
            }
        }
    });

    return Table;

})
