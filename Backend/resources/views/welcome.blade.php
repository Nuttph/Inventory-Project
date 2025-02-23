<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>API Documentation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 20px;
            padding: 20px;
            background-color: #f4f4f4;
        }
        h1 {
            text-align: center;
        }
        .container {
            max-width: 800px;
            margin: auto;
            background: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #333;
            color: white;
        }
        a {
            color: #007BFF;
            text-decoration: none;
        }
        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>API Documentation</h1>
        <table>
            <thead>
                <tr>
                    <th>Method</th>
                    <th>Endpoint</th>
                    <th>Controller</th>
                </tr>
            </thead>
            <tbody>
                <tr><td>GET|HEAD</td><td>/api/inventory</td><td>InvenController@index</td></tr>
                <tr><td>POST</td><td>/api/inventory</td><td>InvenController@store</td></tr>
                <tr><td>GET|HEAD</td><td>/api/inventory/{inventory}</td><td>InvenController@show</td></tr>
                <tr><td>PUT|PATCH</td><td>/api/inventory/{inventory}</td><td>InvenController@update</td></tr>
                <tr><td>DELETE</td><td>/api/inventory/{inventory}</td><td>InvenController@destroy</td></tr>
                <tr><td>POST</td><td>/api/login</td><td>AuthController@login</td></tr>
                <tr><td>POST</td><td>/api/logout</td><td>AuthController@logout</td></tr>
                <tr><td>POST</td><td>/api/register</td><td>AuthController@register</td></tr>
                <tr><td>GET|HEAD</td><td>/api/stock</td><td>StockController@index</td></tr>
                <tr><td>POST</td><td>/api/stock</td><td>StockController@store</td></tr>
                <tr><td>GET|HEAD</td><td>/api/stock/{stock}</td><td>StockController@show</td></tr>
                <tr><td>PUT|PATCH</td><td>/api/stock/{stock}</td><td>StockController@update</td></tr>
                <tr><td>DELETE</td><td>/api/stock/{stock}</td><td>StockController@destroy</td></tr>
                <tr><td>GET|HEAD</td><td>/api/users</td><td>UserController@index</td></tr>
                <tr><td>POST</td><td>/api/users</td><td>UserController@store</td></tr>
                <tr><td>GET|HEAD</td><td>/api/users/{user}</td><td>UserController@show</td></tr>
                <tr><td>PUT|PATCH</td><td>/api/users/{user}</td><td>UserController@update</td></tr>
                <tr><td>DELETE</td><td>/api/users/{user}</td><td>UserController@destroy</td></tr>
            </tbody>
        </table>
    </div>
</body>
</html>
