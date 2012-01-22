<?php
  use CommonQuery as CQ;
  use Database as DB;
  
  require 'lib/commonquery.php';
  $page    = intval($_GET["page"]);
  $page    = $page ? $page : 1;
  $maxDisplayed = 20;
  $maxpage = mysql_fetch_array(DB\queryResult("SELECT COUNT(*) FROM Status"));
  $maxpage = $maxpage[0];
  $maxpage = ceil($maxpage/$maxDisplayed);
  $page    = $page <= 0 ? 1 : $page;
  $page    = $page > $maxpage ? $maxpage : $page;
  $result  = CQ\status($maxDisplayed, $maxDisplayed, $page);
?>
<!DOCTYPE HTML>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Storico B.I.T.S.</title>
  <link rel="stylesheet" type="text/css" href="./css/default.css" />
  <link rel="icon" href="img/open.ico" id="favicon" />
</head>
<body>
  <header class="logo" onclick="location.href = 'http://bits.poul.org'">
    <h1>B.I.T.S.</h1>
    <h2>Storico</h2>
  </header>
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
          <a href="storico.php" disabled="disabled">Leggi i log degli accessi</a>
        </li>
      </ul>
    </nav>
  </aside>
  <article class="storico">
    <ul class="status">
      <?php
        while($status = mysql_fetch_array($result)) {
          $value = $status[1] ? "open" : "close";
          $timestamp = $status[0];
          echo "<li class='$value'>$status[0]</li>";
        }
      ?>
    </ul>
    <nav id="prec_next">
      <ul>
        <?php
          if($page > 1) echo "<li><a href='storico.php?page=".($page-1)."'>Previous</a></li>";
          if($page < $maxpage) echo "<li><a href='storico.php?page=".($page+1)."'>Next</a></li>";
        ?>
    	</ul>
    </nav>
  </article>
</body>
</html>
