const path = require('path');

module.exports = {
    entry: './src/index.ts', // Entry point for your TypeScript file
    output: {
        filename: 'index.js',
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2', // Ensure the output is compatible with Node.js
    },
    target: 'node', // Target Node.js environment
    resolve: {
        extensions: ['.ts', '.js'], // Resolve both .ts and .js files
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: 'ts-loader', // Use ts-loader for TypeScript files
            },
        ],
    },
    externals: [ // Avoid bundling Node.js built-in modules
        function ({ request }, callback) {
            if (/^[a-z\-0-9]+$/.test(request)) {
                return callback(null, 'commonjs ' + request);
            }
            callback();
        },
    ],
};
