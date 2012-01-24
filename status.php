<?php
  $json = json_decode(file_get_contents("http://bits.poul.org/data.json"));
  echo ($json->status->value == "open" ? 1 : 0);
?>
