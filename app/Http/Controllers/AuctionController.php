<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\AuctionTransformer;
use App\Repositories\BaseRepository;
use App\Auction;
use App\Http\Requests;
use App\AuctionMongo;

class AuctionController extends Controller
{

    private $model , $transformer , $repository ,$mongo;

    public function __construct(
        Auction $auction,
        AuctionTransformer $auctionTransformer,
        BaseRepository $baseRepository,
        AuctionMongo $auctionMongo
    )
    {
        $this->model = $auction;
        $this->transformer = $auctionTransformer;
        $this->repository = $baseRepository;
        $this->mongo = $auctionMongo;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $auction = $this->model->all();
        return $this->repository->collection($auction,$this->transformer);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        dd(\DB::connection('mongodb')->collection('auctions')->get());

        $auction = $this->model->create([
            'start'=> $request->start,
            'stop'=> $request->stop,
            'product_id'=> $request->product,
            'startPrice'=> $request->startPrice
            ]);

        return $this->repository->show($auction,$this->transformer);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function socket(){
        return 'test';
    }
}
