<?php
  namespace CommonQuery;
  use Database as DB;
  
  require './db.php';


  function auth($user, $pass) {
    require './config.php';
    return mysql_fetch_array(DB\queryResult("SELECT userid, username, password, accesslevel FROM $TB_USER WHERE username = '$username' AND password = '$password'"));
  }
  
  function status($numofdata = 1, $pagiperpage = false, $page = 1, $schema = "timestamp, value, modifiedby") {
    require './config.php';
    if($pagiperpage) {
      return DB\paginate("SELECT $schema FROM $TB_STAT ORDER BY timestamp DESC",$page, $pagiperpage);
    } else {
      return DB\queryResult("SELECT $schema FROM $TB_STAT ORDER BY timestamp DESC LIMIT $numofdata");
    }
  }

  function temp($numofdata = 1, $sensor = false, $pagiperpage = false, $page = 1, $orderby = "ORDER BY timestamp DESC", $schema = "timestamp, sensor, value")
  {
    require './config.php';
    $wherest = $sensor ? "WHERE sensor = '$sensor'" : "";
    if ($pagiperpage) {
      return DB\paginate("SELECT $schema FROM $TB_TEMP $wherest $orderby", $page, $paginate);
    } else {
      return DB\queryResult("SELECT $schema FROM $TB_TEMP $wherest $orderby LIMIT $numofdata");
    }
  }

  function avg_temp() {
    require './config.php';
    return DB\queryResult("SELECT AVG(value) FROM $TB_TEMP");
  }
  
  function mess($numofdata = 1, $pagiperpage = false, $page = 1, $orderby = "ORDER BY timestamp DESC", $schema = "username, timestamp, message")
  {
    require './config.php';
    if ($pagiperpage) {
      return DB\paginate("SELECT $schema FROM $TB_MESS JOIN $TB_USER $orderby", $page, $paginate);
    } else {
      return DB\queryResult("SELECT $schema FROM $TB_MESS JOIN $TB_USER $orderby LIMIT $numofdata");
    }
  }

  function presence()
  {
    require './config.php';
    return DB\QueryResult("SELECT username, login FROM $TB_PRES WHERE logout IS NULL AND login > (SELECT MAX(timestamp) FROM $TB_STAT WHERE value = 1) AND login > (SELECT MAX(timestamp) FROM $TB_STAT WHERE value = 0) ORDER BY username");
  }

  function temp_array($interval = null) {
    require './config.php';
    if(!$interval) {
      return  DB\queryResult("SELECT TIME(from_unixtime(round(unix_timestamp(timestamp)/(60*10))*(60*10))) as time, value FROM $TB_TEMP WHERE timestamp > CURDATE()");
    } else {
      return DB\queryResult("SELECT TIME(from_unixtime(round(unix_timestamp(timestamp)/(60*10))*(60*10))) as time, AVG(value) FROM Temperature WHERE timestamp > CURDATE() - INTERVAL $interval GROUP BY time");
    }
  }
?>
