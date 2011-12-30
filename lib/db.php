<?php 
  namespace Database;

  $conn = null;

  function connect( $db_host, $db_user, $db_pass, $db_name) {
    $conn = mysql_connect($db_host, $db_user, $db_pass);
    mysql_select_db($db_name);
    return $conn;
  }

  function paginate($query, $numpag, $maxperpag = 20) {
    $max = 'LIMIT ' .($numpag - 1) * $maxperpag .',' .$maxperpag;
    return queryResult("$query $max");
  }

  function queryResult($query, $conn = null) {
    include 'config.php';
    global $conn;
    $conn = $conn ? $conn : connect($DB_HOST,$DB_USER,$DB_PASS,$DB_NAME);
    return mysql_query($query);
  }

  function convertIterToArray($result, $fields_num = null) {
    $max_cols = $fields_num ? $fields_num : mysql_num_fields($result);
    for($rows = 0; $tupla = mysql_fetch_array($result); $rows++) {
      for($cols = 0; $cols <= $max_cols; $cols++) {
        $export[$rows][$cols] = $tupla[$cols];
      }
    }
    return $export;
  }
?>
