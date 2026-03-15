<?php

namespace App\Policies;

use App\Models\CustomerOrder;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CustomerOrderPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->customer !== null;
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, CustomerOrder $customerOrder): bool
    {
       return $user->customer?->id === $customerOrder->customer_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->customer !== null;
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, CustomerOrder $customerOrder): bool
    {
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, CustomerOrder $customerOrder): bool
    {
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, CustomerOrder $customerOrder): bool
    {
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, CustomerOrder $customerOrder): bool
    {
        return false;
    }
   public function cancel(User $user, CustomerOrder $customerOrder): bool
{
    return $this->view($user, $customerOrder)
        && in_array($customerOrder->status, ['pending', 'confirmed'], true);
}

}
