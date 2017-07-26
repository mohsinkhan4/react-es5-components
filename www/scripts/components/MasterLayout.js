define([
    'react',
    'react-dom',
    'browser',
    './scripts/components/Table'
], function(React, ReactDOM, Browser, Table){

    var MasterLayout = React.createClass({
        getInitialState: function() {
            return { rowData : this.props.rowData };
        },
        render: function() {
            const { columnData } = this.props;

            // uncomment to continue
            // var table = React.createElement(Table,
            //     {columnData: columnData, rowData: this.state.rowData, addRow: this.addRow, removeRow: this.removeRow}, null);
            return React.createElement('div', null, 'table');
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

    return MasterLayout;

})
