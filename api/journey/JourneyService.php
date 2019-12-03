<?php

include_once 'models/Journey.php';

class JourneyService {
    private $conn;

    public function __construct($db) {
        $this->conn = $db;
    }

    public function create_journey($journey) {
        $query = "INSERT INTO journeys
                SET 
                    userId = :userId,
                    journeyType = :journeyType,
                    distance = :distance,
                    carbon = :carbon";
        
        $statement = $this->conn->prepare($query);

        $statement->bindValue(':userId', $journey->userId);
        $statement->bindValue(':journeyType', $journey->type);
        $statement->bindValue(':distance', $journey->distance);
        $statement->bindValue(':carbon', $journey->carbon);

        if ($statement->execute()) {
            return $journey;
        } else {
            http_response_code(500);
            echo json_encode($statement->errorInfo());
            exit(0);
        }
    }

    public function getAll($userId) {
        $query = "SELECT * FROM journeys
                WHERE userId = :userId";

        $statement = $this->conn->prepare($query);

        $statement->bindValue(':userId', $userId);

        if ($statement->execute()) {
            $journeys = array();

            while ($row = $statement->fetch()) {
                $journey = Journey::fromRow($row);
                array_push($journeys, $journey);
            }

            return $journeys;
        } else {
            http_response_code(500);
            echo json_encode($statement->errorInfo());
            exit(0);
        }
    }
}