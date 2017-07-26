var rowData = [
	{ key: 0, text : 'Sample 1' },
	{ key: 1, text : 'Sample 2' }
];

var columnData = [
	{ key: 0, text: 'Select'},
	{ key: 1, text: 'Item Name'}
];

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

var TableHeader = React.createClass({
    render: function() {
        const { columnData } = this.props;

        return (
            <thead>
                <tr>
                    {
                        columnData.map( col => <th key={ col.key } className="col-md-4">{ col.text }</th>)
                    }
                </tr>
            </thead>
        );
    }
});

var TableBody = React.createClass({
    render: function() {
        const { rowData, onCheckboxChange } = this.props;

        return (
            <tbody>
                {
                    rowData.map( todo =>
                        <tr key={ todo.key }>
                            <td className="col-md-4">
                                <Checkbox todoKey={ todo.key } onCheckboxChange={ onCheckboxChange } />
                            </td>
                            <td className="col-md-4">{ todo.text }</td>
                        </tr>
                    )
                }
            </tbody>
        );
    }
});

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

var MasterLayout = React.createClass({
    getInitialState: function() {
        return { rowData : this.props.rowData };
    },
    render: function() {
        const { columnData } = this.props;

        return (
            <div>
                <Table columnData={ columnData } rowData={ this.state.rowData } addRow={ this.addRow } removeRow={ this.removeRow }/>
            </div>
        );
    },
    addRow: function(row) {
        const { rowData } = this.state;

        rowData.push(row);
        this.setState({ rowData });
    },
    removeRow: function(key) {
        const { rowData } = this.state;

        const newRowData = rowData.filter(todo => !key.has(todo.key));
        this.setState({ rowData: newRowData });
    }
});

ReactDOM.render(
    <MasterLayout rowData={ rowData } columnData={ columnData } />,
    document.getElementById('content')
);
