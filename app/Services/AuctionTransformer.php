<?php

namespace App\Services;

use League\Fractal\TransformerAbstract;
use App\Auction;
use Carbon\Carbon;

class AuctionTransformer extends  TransformerAbstract{

    function transform(Auction $auction){
        return [
            'id' => $auction->id,
            'start' => Carbon::parse($auction->start)->format('h:i:s A'),
            'startPrice' => $auction->startPrice,
            'product' => $auction->product
        ];
    }

}