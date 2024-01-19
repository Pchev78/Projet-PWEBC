<?php
session_start();
$email = isset($_SESSION["email"])?($_SESSION["email"]):'';
$feedback = isset($_POST["text"])?($_POST["text"]):"error in the feedback";

if  (!postFeedback($email,$feedback)) {
    $msg ="You already posted the same feedback.";
}
else {
    $_SESSION['email'] = $email;
    $url = "home.php";
    header("Location:" . $url) ;
}

function postFeedback($email,$feedback) {
    require('connectSQL.php'); //$pdo est défini dans ce fichier
    $sql="INSERT INTO `formulaire`(mail, commentaire) VALUES (:email,:feedback)";
    try {
        $commande = $pdo->prepare($sql);
        $commande->bindParam(':email', $email);
        $commande->bindParam(':feedback', $feedback);
        $bool = $commande->execute();
    }
    catch (PDOException $e) {
        echo ("You already posted the same feedback.");
        die(); // On arrête tout.
    }
    if ($bool) return true;
    else return false;
}