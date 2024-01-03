<?php

session_start();

$email =  isset($_POST['email'])?($_POST['email']):'';
$mdp =  isset($_POST['mdp'])?($_POST['mdp']):'';
$msg = '';

if  (count($_POST)==0)
    require("connexion.html");
else {

    if  (!connexion($email,$mdp)) {
        $msg ="Erreur dans l'adresse mail ou dans le mot de passe.";
        require("connexion.html");
    }
    else {
        $_SESSION['email'] = $email;
        $url = "accueil.php";
        header("Location:" . $url) ;
    }

}

function connexion($email,$mdp) {
    require('connectSQL.php'); //$pdo est défini dans ce fichier
    $sql="SELECT * FROM `utilisateur` WHERE email=:email AND mdp=:mdp";
    try {
        $commande = $pdo->prepare($sql);
        $commande->bindParam(':email', $email);
        $commande->bindParam(':mdp', $mdp);
        $bool = $commande->execute();
        if ($bool)
            $resultat = $commande->fetchAll(PDO::FETCH_ASSOC);
    }
    catch (PDOException $e) {
        echo "Vous n'avez pas de compte associé à cette adresse mail.";
        die();
    }
    if (count($resultat) == 0) return false;
    else return true;
}
?>