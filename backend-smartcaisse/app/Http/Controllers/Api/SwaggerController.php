<?php

namespace App\Http\Controllers\Api;

use OpenApi\Annotations as OA;

/**
 * @OA\SecurityScheme(
 *     type="http",
 *     scheme="bearer",
 *     securityScheme="sanctum"
 * )
 */

/**
 * @OA\SecurityScheme(
 *     securityScheme="cookieAuth",
 *     type="apiKey",
 *     in="cookie",
 *     name="XSRF-TOKEN"
 * )
 */

/**
 * @OA\Info(
 *     title="SmartCaisse API",
 *     version="1.0.0"
 * )
 *
 * @OA\Server(
 *     url="http://127.0.0.1:8000/api",
 *     description="Local API server"
 * )
 */
class SwaggerController {}
