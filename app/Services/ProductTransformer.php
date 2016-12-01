<?php

namespace App\Services;

use League\Fractal\TransformerAbstract;
use App\Product;

class ProductTransformer extends  TransformerAbstract{

    function transform(Product $product){

        return [
            'id' => $product->id,
            'name' => $product->name,
            'description' => $product->description,
            'price' => $product->price,
            'images' => $this->images($product->id)
        ];
    }

    private function images($id){

        if(file_exists('images/upload/product/'.$id)){
            $files = \File::allFiles('images/upload/product/'.$id);
            $imgUrl  = [];
            foreach ($files as $file){
                $imgPath = pathinfo($file);
                $imgUrl[] = $imgPath['dirname'] .'/'.  $imgPath['basename'];
            }

            return $imgUrl;
        }

    }
}