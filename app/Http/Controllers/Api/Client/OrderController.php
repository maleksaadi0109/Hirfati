<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Http\Requests\Client\CancelCustomerOrderRequest;
use App\Http\Requests\Client\StoreCustomerOrderRequest;
use App\Http\Resources\CustomerOrderResource;
use App\Models\CustomerOrder;
use App\Traits\ApiResponses;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    use ApiResponses;

    /**
     * List customer's orders, optional filter by status.
     */
    public function index(Request $request)
    {
        $this->authorize('viewAny', CustomerOrder::class);

        $query = $request->user()->customer->orders()
            ->with(['provider.user', 'address']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $orders = $query->latest()->paginate(10);

        return $this->ok('Orders retrieved successfully.', [
            'orders' => CustomerOrderResource::collection($orders),
            'pagination' => [
                'current_page' => $orders->currentPage(),
                'last_page' => $orders->lastPage(),
                'per_page' => $orders->perPage(),
                'total' => $orders->total(),
            ]
        ]);
    }

    /**
     * Get a single order's details.
     */
    public function show(CustomerOrder $order)
    {
        $this->authorize('view', $order);

        $order->load(['provider.user', 'address']);

        return $this->ok('Order details retrieved.', [
            'order' => new CustomerOrderResource($order)
        ]);
    }

    /**
     * Create a new order.
     */
    public function store(StoreCustomerOrderRequest $request)
    {
        $this->authorize('create', CustomerOrder::class);

        $validated = $request->validated();
        
        $order = $request->user()->customer->orders()->create([
            'provider_id' => $validated['provider_id'],
            'address_id' => $validated['address_id'],
            'service_name' => $validated['service_name'],
            'scheduled_at' => $validated['scheduled_at'],
            'notes' => $validated['notes'] ?? null,
            'status' => 'pending',
            'payment_status' => 'pending',
            'subtotal' => 0,
            'fees' => 0,
            'total' => 0, // Placeholder, usually calculated based on provider rate
        ]);

        return $this->success('Order created successfully.', [
            'order' => new CustomerOrderResource($order->load(['provider.user', 'address']))
        ], 201);
    }

    /**
     * Cancel an order.
     */
    public function cancel(CancelCustomerOrderRequest $request, CustomerOrder $order)
    {
        $this->authorize('cancel', $order);

        $order->update(['status' => 'cancelled']);

        return $this->ok('Order cancelled successfully.', [
            'order' => new CustomerOrderResource($order)
        ]);
    }
}
