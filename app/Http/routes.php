<?php


Route::group(['prefix'=>'/','middleware' => 'angular'],function (){
    Route::auth();

    Route::resource('/','UserController');




    Route::group(['prefix'=>'/','middleware' => 'jwt.auth'],function () {

        Route::group(['prefix' => '/', 'middleware' => 'angular'], function () {
            Route::get('/home', 'HomeController@index');
        });
//        Route::get('/test', 'HomeController@test');



        Route::get('/test','UserController@test');
    });
    Route::get('product','ProductController@index');
    Route::resource('auctions','AuctionController' ,['only' => [
        'index'
    ]]);
    Route::resource('products','AuctionController' ,['only' => [
        'index'
    ]]);

    Route::group(['prefix'=>'admin','middleware'=>'angular'],function (){
        Route::resource('/','ProductController');
        Route::resource('product','ProductController');
        Route::resource('auction','AuctionController');
    });
});
