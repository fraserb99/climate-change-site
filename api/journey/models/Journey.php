<?php

class Journey {
    public $id;
    public $userId;
    public $type;
    public $distance;
    public $carbon;

    public function __construct(){}

    public static function fromRow($row) {
        $journey = new self();
        try {
            $journey->id = $row['id'];
            $journey->userId = $row['userId'];
            $journey->type = $row['journeyType'];
            $journey->distance = $row['distance'];
            $journey->carbon = $row['carbon'];

            return $journey;
        } catch (exception $e) {
            echo json_encode(array('response' => 'Invalid input'));
            die();
        }
    }

    public static function fromInput($data) {
        $journey = new self();
        $journey->userId = $data->userId;
        $journey->type = $data->type;
        $journey->distance = $data->distance;
        $journey->carbon = $data->carbon;

        return $journey;
    }
}