<?php
const PATH_ROOT = '../../';
require PATH_ROOT . 'core/index.php';
?>
<!doctype html>
<html lang="<?=(ADMIN_VIEW['meta']['lang']) ?>">
<head>
    <meta charset="<?=(ADMIN_VIEW['meta']['charset']) ?>">
    <meta name="viewport" content="<?=(ADMIN_VIEW['meta']['viewport']) ?>">
    <title><?=(ADMIN_VIEW['meta']['title']) ?></title>
    <meta name="description" content="<?=(ADMIN_VIEW['meta']['description']) ?>">
    <meta name="keywords" content="<?=(ADMIN_VIEW['meta']['keywords']) ?>">
    <meta name="robots" content="<?=(ADMIN_VIEW['meta']['robots']) ?>">
    <meta name="og:url" content="<?=(ADMIN_VIEW['meta']['url']) ?>">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">

    <script>
        window.APPENV = window.APPENV || '<?=(ENV)?>';
        window.APPTIMESTAMP = window.APPTIMESTAMP || '<?=(TIMESTAMP)?>';
        window.TMP_TOKEN = window.TMP_TOKEN || '<?=(TMP_TOKEN)?>';
    </script>
</head>
<body class="page">
<div id="App"></div>

<script src="<?=(ADMIN_VIEW['scripts'] . '?v=' . TIMESTAMP) ?>"></script>
</body>
</html>
