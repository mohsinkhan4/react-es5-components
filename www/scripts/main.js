requirejs.config({
    paths: {
        'react' : 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react',
        'react-dom': 'https://cdnjs.cloudflare.com/ajax/libs/react/0.14.8/react-dom',
        'browser': 'https://cdnjs.cloudflare.com/ajax/libs/babel-core/5.6.16/browser'
    }
});

requirejs(['react', 'react-dom', 'browser', './scripts/components/MasterLayout'], function(React, ReactDOM, Browser, MasterLayout){
    var rowData = [
    	{ key: 0, text : 'Sample 1' },
    	{ key: 1, text : 'Sample 2' }
    ];

    var columnData = [
    	{ key: 0, text: 'Select'},
    	{ key: 1, text: 'Item Name'}
    ];

    ReactDOM.render(
        React.createElement(MasterLayout, { rowData: rowData, columnData: columnData }, null),
        document.getElementById('content')
    );

})
