<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Vente;
use App\Models\Produit;
use App\Models\Paiement;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Cache;

class DashboardController extends Controller
{
    // Summary: CA today, month, ventes count, produits faibles, recent ventes
    public function summary(Request $request)
    {
        $user = $request->user();

        // Cache 30s pour réduire charge
        $summary = Cache::remember('dashboard_summary', 30, function () {
            $todayStart = Carbon::today()->startOfDay();
            $monthStart = Carbon::now()->startOfMonth();
            $weekStart = Carbon::now()->startOfWeek();

            $caToday = Vente::where('created_at', '>=', $todayStart)->sum('total');
            $caMonth = Vente::where('created_at', '>=', $monthStart)->sum('total');
            $caWeek = Vente::where('created_at', '>=', $weekStart)->sum('total');

            $ventesCountToday = Vente::where('created_at', '>=', $todayStart)->count();

            $recentVentes = Vente::with('user', 'produits')
                                ->orderBy('created_at', 'desc')
                                ->take(8)
                                ->get();

            $topProducts = DB::table('vente_produit')
                        ->select('produit_id', DB::raw('SUM(quantite) as total_qty'))
                        ->groupBy('produit_id')
                        ->orderByDesc('total_qty')
                        ->limit(5)
                        ->get()
                        ->map(function($row){
                            $p = Produit::find($row->produit_id);
                            return [
                                'produit_id' => $row->produit_id,
                                'nom' => $p ? $p->nom : 'Produit supprimé',
                                'quantite_vendue' => (int)$row->total_qty
                            ];
                        });

            $lowStock = Produit::where('quantite_stock', '<=', 5)
                        ->orderBy('quantite_stock','asc')
                        ->take(10)
                        ->get(['id','nom','quantite_stock']);

            return [
                'ca_today' => (float) $caToday,
                'ca_week' => (float) $caWeek,
                'ca_month' => (float) $caMonth,
                'ventes_count_today' => $ventesCountToday,
                'recent_ventes' => $recentVentes,
                'top_products' => $topProducts,
                'low_stock' => $lowStock,
            ];
        });

        return response()->json($summary);
    }

    // Revenue chart data (last N days)
    public function revenueChart(Request $request)
    {
        $days = (int) $request->query('days', 7);
        $start = Carbon::today()->subDays($days - 1);

        $data = Vente::select(
                    DB::raw("DATE(created_at) as date"),
                    DB::raw("SUM(total) as total")
                )
                ->where('created_at', '>=', $start)
                ->groupBy(DB::raw("DATE(created_at)"))
                ->orderBy('date', 'asc')
                ->get()
                ->map(function($row){
                    return ['date' => $row->date, 'total' => (float)$row->total];
                });

        // Ensure days with zero are present
        $series = [];
        for ($i = 0; $i < $days; $i++) {
            $d = $start->copy()->addDays($i)->toDateString();
            $found = $data->firstWhere('date', $d);
            $series[] = [
                'date' => $d,
                'total' => $found ? $found['total'] : 0,
            ];
        }

        return response()->json(['series' => $series]);
    }

    public function topProducts()
    {
        $top = DB::table('vente_produit')
                ->select('produit_id', DB::raw('SUM(quantite) as total_qty'), DB::raw('SUM(prix * quantite) as revenue'))
                ->groupBy('produit_id')
                ->orderByDesc('total_qty')
                ->limit(10)
                ->get()
                ->map(function($row){
                    $p = Produit::find($row->produit_id);
                    return [
                        'produit_id' => $row->produit_id,
                        'nom' => $p ? $p->nom : 'Produit supprimé',
                        'quantite_vendue' => (int)$row->total_qty,
                        'revenue' => (float)$row->revenue,
                    ];
                });

        return response()->json(['top_products' => $top]);
    }

    public function paymentBreakdown()
    {
        $data = Paiement::select('methode', DB::raw('SUM(montant) as total'))
                ->groupBy('methode')
                ->get()
                ->map(fn($r) => ['methode' => $r->methode, 'total' => (float)$r->total]);

        $totalAll = array_sum($data->pluck('total')->toArray());

        return response()->json(['breakdown' => $data, 'total' => $totalAll]);
    }
}
