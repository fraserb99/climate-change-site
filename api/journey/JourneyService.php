<?php

include_once 'models/Journey.php';
include_once 'models/Leaderboard.php';

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

    public function getById($id) {
        $query = "SELECT * FROM journeys
                WHERE id = :id";

        $statement = $this->conn->prepare($query);

        $statement->bindValue(':id', $id);

        if ($statement->execute()) {
            if ($statement->rowCount() <= 0) {
                http_response_code(404);
                echo json_encode(array("response" => "Journey not found"));
                exit(0);
            }
            $row = $statement->fetch();
            $journey = Journey::fromRow($row);

            return $journey;
        } else {
            http_response_code(500);
            echo json_encode($statement->errorInfo());
            exit(0);
        }
    }

    public function delete($journey) {
        $query = "DELETE FROM journeys
                WHERE id = :id";

        $statement = $this->conn->prepare($query);

        $statement->bindValue(':id', $journey->id);

        if ($statement->execute()) {
            http_response_code(200);
            echo json_encode(array("response" => "Journey deleted"));
        } else {
            http_response_code(500);
            echo json_encode($statement->errorInfo());
            exit(0);
        }
    }

    public function getLeaderboard() {
        $query = "SELECT id, username FROM users";
        $co2Query = "SELECT userId, journeyType, carbon FROM journeys
                WHERE userId = :userId";

        $result = $this->conn->query($query);
        
        if ($result) {
            $statement = $this->conn->prepare($co2Query);
            $userId;
            $statement->bindParam(':userId', $userId);

            $leaderboard = [];
            while ($row = $result->fetch()) {
                $userId = $row['id'];
                $leaderboardRow = new LeaderboardRow();
                $leaderboardRow->userId = $row['id'];
                $leaderboardRow->username = $row['username'];

                if ($statement->execute()) {
                    $netCO2 = 0;
                    while ($co2Row = $statement->fetch()) {
                        if ($co2Row['journeyType'] === 'car') {
                            $netCO2 += $co2Row['carbon'];
                        } else {
                            $netCO2 -= $co2Row['carbon'];
                        }
                    }
                    $leaderboardRow->netCO2 = $netCO2;
                }

                array_push($leaderboard, $leaderboardRow);
            }

            echo json_encode($leaderboard);
        }
    }
}