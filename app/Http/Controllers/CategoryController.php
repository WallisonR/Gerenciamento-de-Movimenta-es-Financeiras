namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class CategoryController extends Controller
{
    public function index()
    {
        return Category::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255|unique:categories',
            'description' => 'nullable|string|max:255'
        ]);

        return Category::create($validated);
    }

    public function show(Category $category)
    {
        return $category;
    }

    public function update(Request $request, Category $category)
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('categories')->ignore($category->id)],
            'description' => 'nullable|string|max:255'
        ]);

        $category->update($validated);
        return $category;
    }

    public function destroy(Category $category)
    {
        if ($category->transactions()->exists()) {
            return response()->json([
                'message' => 'Não é possível excluir uma categoria que possui movimentações associadas'
            ], 422);
        }

        $category->delete();
        return response()->noContent();
    }
} 