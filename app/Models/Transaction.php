namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Transaction extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'type',
        'amount',
        'category_id',
        'description'
    ];

    protected $casts = [
        'amount' => 'decimal:2'
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
} 