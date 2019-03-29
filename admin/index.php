<?php
$no_balls = 'true';
//include 'header.php';
session_start();
if(isset($_SESSION['user'])){
  header('location: admin.php');
  exit();
}

?>
<!--
Code taken from https://codepen.io/colorlib/pen/rxddKy
-->



<div class="login-page">
  <div class="form">
    <form method="POST" action="" class="register-form hidden" id="register-form">
      <input type="text" required placeholder="namn" name="name"/>
      <input type="text" required placeholder="användarnamn" name="username"/>
      <input type="password" required placeholder="lösenord" name="password"/>
      <input type="text" required placeholder="email address" name="email" />
      <button>Skapa konto</button>
      <p class="errorMSG"></p>
      <p class="message">Redan registrerad? <a href="#">Logga in</a></p>
    </form>
    <form class="login-form" id="loginForm">
      <input type="text" placeholder="användarnamn" name="username"/>
      <input type="password" placeholder="lösenord" name="password"/>
      <button>Logga in</button>
      <p class="errorMSG"></p>
      <p class="message">Inte registrerad? <a href="#">Skapa ett konto</a></p>
    </form>
  </div>
</div>

<script type="text/javascript" src="js/logIn.js"></script>
<?php
	//include 'footer.php';
?>