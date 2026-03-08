<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\CraftsmanResource;
use App\Models\Provider;
use App\Traits\ApiResponses;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class CraftsmanApprovalController extends Controller
{
    use ApiResponses;
    private const DOCUMENT_DISK = 'local';

    /**
     * List providers, filtered by status (default: pending).
     * GET /api/admin/craftsmen?status=pending
     */
    public function index(Request $request)

    {
      
        $status = $request->query('status', 'pending');

        $providers = Provider::with('user')
            ->when($status !== 'all', fn ($q) => $q->where('application_status', $status))
            ->latest()
            ->paginate(15);

        return CraftsmanResource::collection($providers);
    }

    /**
     * View a single provider's details.
     * GET /api/admin/craftsmen/{provider}
     */
    public function show(Provider $provider): JsonResponse
    {
        
        $provider->load('user');

        return $this->ok('Provider details.', ['provider' => CraftsmanResource::make($provider)]);
    }

    /**
     * Approve a provider's application.
     * PATCH /api/admin/craftsmen/{provider}/approve
     */
    public function approve(Provider $provider): JsonResponse
    {
        if ($provider->application_status === 'approved') {
            return $this->ok('Provider is already approved.');
        }

        $provider->update(['application_status' => 'approved']);

        return $this->ok('Provider has been approved successfully.');
    }

    /**
     * Reject a provider's application.
     * PATCH /api/admin/craftsmen/{provider}/reject
     */
    public function reject(Request $request, Provider $provider): JsonResponse
    {
        
        if ($provider->application_status === 'rejected') {
            return $this->ok('Provider is already rejected.');
        }

        $provider->update(['application_status' => 'rejected']);

        return $this->ok('Provider has been rejected.');
    }

    /**
     * Download/view provider verification document.
     * GET /api/admin/craftsmen/{provider}/document
     */
    public function document(Provider $provider): StreamedResponse|JsonResponse
    {
        $path = $provider->verification_document_path;

        if (! $path || ! Storage::disk(self::DOCUMENT_DISK)->exists($path)) {
            return $this->error('Verification document not found.', 404);
        }

        return Storage::disk(self::DOCUMENT_DISK)->download($path, basename($path));
    }
}
