<?php
  $json = json_decode(http_get("http://bits.poul.org/data.json"));
  echo ($json["value"] ? 1 : 0);
?>
