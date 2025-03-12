namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    public function index()
    {
        return Transaction::with('category')->latest()->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'type' => 'required|in:entrada,saida',
            'amount' => 'required|numeric|min:0.01',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string|max:255'
        ]);

        return Transaction::create($validated);
    }

    public function show(Transaction $transaction)
    {
        return $transaction->load('category');
    }

    public function update(Request $request, Transaction $transaction)
    {
        $validated = $request->validate([
            'type' => 'required|in:entrada,saida',
            'amount' => 'required|numeric|min:0.01',
            'category_id' => 'required|exists:categories,id',
            'description' => 'required|string|max:255'
        ]);

        $transaction->update($validated);
        return $transaction->load('category');
    }

    public function destroy(Transaction $transaction)
    {
        $transaction->delete();
        return response()->noContent();
    }
} 