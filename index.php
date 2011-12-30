<?php
  use CommonQuery as CQ;
  use Database    as DB;

  require 'lib/commonquery.php';

  //Database queries
  $retdata = mysql_fetch_array(CQ\status());
  $rettemp_last = mysql_fetch_array(CQ\temp());
  $retmess = mysql_fetch_array(CQ\mess());

  // Status variables
  $status       = $retdata[1] ? "open" : "close";
  $tipo_stato   = $retdata[2] ? "manuale" : "bits";
  $timestamp    = $retdata[0];

  // Temp variables
  $temp         = round($rettemp_last[2],2);
  $temp_quality = $temp > 20 ? "high" : "low";
  $temp        .= "°C";

  // Msg variables
  $msg_user          = htmlspecialchars($retmess[0]);
  $msg_timestamp     = $retmess[1];
  $msg_value         = htmlspecialchars(base64_decode($retmess[2]));
  $urgent_class = false;
?>
<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>BITS 2.0</title>
  <link rel="stylesheet" type="text/css" href="./css/default.css" />
  <link rel="icon" href="img/favicon.ico" />
  <script src="js/strftime.js" type="text/javascript"></script>
  <script src="js/parification.js" type="text/javascript"></script>
  <script src="js/ws.js" type="text/javascript"></script>
</head>
<body>
  <a href="/">
    <header class="logo">
      <h1>B.I.T.S.</h1>
      <h2>System&nbsp;&nbsp;2.0</h2>
      <?php
        echo $rettemp_count;
      ?>
    </header>
  </a>
  <aside>
    <nav>
      <ul class="link">
        <li>
          <a href="http://www.poul.org">Cos'è il POul</a>
        </li>
        <li>
          <a href="bits_info.html">Cos'è BITS</a>
        </li>
        <li>
          <a href="storico.php">Leggi i log degli accessi</a>
        </li>
      </ul>
    </nav>
  </aside>
  <article class="status">
    <ul>
      <li id="sede">
        <div class="value <?php echo $status ?>"></div>
        <div class="timestamp"><?php
          echo $timestamp;
        ?></div>
        <div class="modified_by"><?php
          echo $tipo_stato;
        ?></div>
      </li>
      <li id="temp" class="<?php echo $temp_quality; ?>">
        <?php echo $temp; ?>
      </li>
      <li id="last" class="msg <?php echo $urgent_class; ?>">
        <div class="user"><?php
          echo $msg_user;
        ?></div>
        <div class="timestamp"><?php
          echo $msg_timestamp;
        ?></div>
        <div class="value"><?php
          echo $msg_value;
        ?></div>
      </li>
      <li id="graph">
        <img src="http://bits.poul.org/bits_presence.png" alt="Grafico delle presenze" />
      </li>
    </ul>
  </article>
</body>
</html>
