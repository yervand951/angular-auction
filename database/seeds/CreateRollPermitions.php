<?php

use Illuminate\Database\Seeder;
use App\User;
use App\Role;
use App\Permission;

class CreateRollPermitions extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $admin = new Role();
        $admin->name         = 'admin';
        $admin->display_name = 'User Administrator';
        $admin->description  = 'User is allowed to manage and edit other users';
        $admin->save();

        $user = new Role();
        $user->name         = 'user';
        $user->display_name = 'User';
        $user->description  = '';
        $user->save();

        $userObj = User::where('id', 1)->first();


        $userObj->attachRole($admin);


        $createProduct = new Permission();
        $createProduct->name         = 'create-product';
        $createProduct->display_name = 'Create Product';
        $createProduct->description  = '';
        $createProduct->save();

        $orderProduct = new Permission();
        $orderProduct->name         = 'order-product';
        $orderProduct->display_name = 'Order Product';
        $orderProduct->description  = '';
        $orderProduct->save();

        $user->attachPermission($orderProduct);


        $admin->attachPermissions(array($createProduct, $orderProduct));
    }
}
