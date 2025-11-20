<?php

namespace App\Http\Controllers\Api\Docs;

use OpenApi\Annotations as OA;

class VenteDoc
{
    /**
     * @OA\Post(
     *     path="/ventes",
     *     tags={"Ventes"},
     *     summary="Créer une nouvelle vente",
     *     description="Enregistre une vente avec ses produits et paiements",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="user_id", type="integer", example=1),
     *             @OA\Property(property="total", type="number", format="float", example=150.50),
     *             @OA\Property(
     *                 property="produits",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="id", type="integer", example=2),
     *                     @OA\Property(property="quantite", type="integer", example=3),
     *                     @OA\Property(property="prix", type="number", format="float", example=50.00)
     *                 )
     *             ),
     *             @OA\Property(
     *                 property="paiements",
     *                 type="array",
     *                 @OA\Items(
     *                     type="object",
     *                     @OA\Property(property="montant", type="number", format="float", example=150.50),
     *                     @OA\Property(property="methode", type="string", example="chèque"),
     *                     @OA\Property(property="statut", type="string", example="terminé"),
     *                     @OA\Property(
     *                         property="cheque",
     *                         type="object",
     *                         nullable=true,
     *                         @OA\Property(property="numero", type="string", example="CHQ12345"),
     *                         @OA\Property(property="banque", type="string", example="Attijari"),
     *                         @OA\Property(property="date_encaissement", type="string", format="date", example="2025-11-20")
     *                     )
     *                 )
     *             )
     *         )
     *     ),
     *     @OA\Response(
     *         response=201,
     *         description="Vente enregistrée avec succès",
     *         @OA\JsonContent(
     *             type="object",
     *             @OA\Property(property="message", type="string", example="Vente enregistrée avec succès"),
     *             @OA\Property(property="vente_id", type="integer", example=1)
     *         )
     *     ),
     *     security={{"bearerAuth": {}}}
     * )
     */
    public function store() {
        // Cette fonction est juste pour Swagger, pas besoin de code
    }
}
