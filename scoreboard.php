<body style="background-color:#D6FFCD;">

<header>
<h1 align="center">Score</h1>
</header>
<style>
.board {
width: 100%;
}   
</style>
<center class="board">
	<?php

  echo file_get_contents("https://spreadsheets.google.com/tq?tqx=out:html&tq=SELECT%20B%2CC%20ORDER%20BY%20C%20DESC%2C%20B%20ASC%20LIMIT%2010%0A&key=1jxu_-FvWdRQT_SSnDS8CY-mBTeHgq_CV7THxCRwbITc&gid=0");

?>
</center>

</body>