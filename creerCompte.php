<?php
session_start();

$email =  isset($_POST['email'])?($_POST['email']):'';
$mdp =  isset($_POST['mdp'])?($_POST['mdp']):'';
$msg = '';

if (count($_POST) == 0)
    require("creerCompte.html");
else {
    if  (!createAccount($email,$mdp)) {
        $msg ="Impossible de créer le compte. Vérifiez que vous n'ayez pas déjà un compte associé à cette adresse mail.";
        require ("creerCompte.html");
    }
    else {
        $_SESSION['email'] = $email;
        $url = "accueil.php";
        header("Location:" . $url) ;
    }
}

function createAccount($email,$mdp) {
    require('connectSQL.php'); //$pdo est défini dans ce fichier
    $sql="INSERT INTO `Utilisateur`(email, mdp) VALUES (:email,:mdp)";
    try {
        $commande = $pdo->prepare($sql);
        $commande->bindParam(':email', $email);
        $commande->bindParam(':mdp', $mdp);
        $bool = $commande->execute();
    }
    catch (PDOException $e) {
        echo ("Vous possédez déjà un compte relié à cette adresse email.");
        die(); // On arrête tout.
    }
    if ($bool) return true;
    else return false;
}
?>