<?php
  use CommonQuery as CQ;

  require 'lib/commonquery.php';

  $status_query = CQ\status();
  $retdata = mysql_fetch_array($status_query);

  $format = $_GET["format"];
  if ($format == "text") {
    header("Content-Type: text/plain");
    echo ($retdata["value"] ? 1 : 0);
  }
?>
