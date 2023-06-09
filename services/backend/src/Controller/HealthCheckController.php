<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/health', name: 'health_')]
class HealthCheckController extends AbstractController
{
    #[Route('/check', name: 'get_health_check', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return new JsonResponse([
            'status' => "I'm alive",
            'code' => 'ok'
        ]);
    }
}