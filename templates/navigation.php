<nav class="navbar">
    <div class="logo">
        <img src="img/logo.png" alt="Logo">
    </div>
    <div class="nav-links">
        <div class="menu">
            <a href="#">🏠 ?</a>
            <a href="#">📰 ?</a>
            <a href="#">🧐 ?</a>
            <a href="#">🌍 ?</a>
        </div>
        <div class="auth-links">
            <a href="connexion.php" class="non_connecte">Se connecter</a>
            <a href="creerCompte.php" class="non_connecte">Pas encore de compte ?</a>
            <a href="deconnexion.php" class="connecte">Se déconnecter</a>
        </div>
    </div>
    <div id ="nomCompte" class="connecte">
        <?php echo $email?>
    </div>
</nav>

<?php
$email = isset($_SESSION["email"])?($_SESSION["email"]):'';

if ($email == '') {
    echo '<style>.deconnecte {display: none;}</style>';
    echo '<style>.connecte {display: flex;}</style>';
} else {
    echo '<style>.connecte {display: none;}</style>';
    echo '<style>.deconnecte {display: flex;}</style>';
}
?>