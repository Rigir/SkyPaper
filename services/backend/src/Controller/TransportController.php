<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/transport', name: 'transport_')]
class TransportController extends AbstractController
{
    #[Route('/aircraft/types', name: 'get_aircraft_types', methods: ['GET'])]
    public function index(): JsonResponse
    {
        return new JsonResponse([
            'aircraft_types' => [
                [
                    'name' =>  'Airbus A380',
                    'max_weight_in_kg' => 35000
                ],
                [
                    'name' =>  'Boeing 747',
                    'max_weight_in_kg' => 38000
                ]
            ]
        ]);
    }
}
