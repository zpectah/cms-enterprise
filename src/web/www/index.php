<?php
const PATH_ROOT = '../../';
require PATH_ROOT . 'core/index.php';
?>
<!doctype html>
<html lang="<?=(WEB_VIEW['meta']['lang']) ?>">
<head>
    <meta charset="<?=(WEB_VIEW['meta']['charset']) ?>">
    <meta name="viewport" content="<?=(WEB_VIEW['meta']['viewport']) ?>">
    <title><?=(WEB_VIEW['meta']['title']) ?></title>
    <meta name="description" content="<?=(WEB_VIEW['meta']['description']) ?>">
    <meta name="keywords" content="<?=(WEB_VIEW['meta']['keywords']) ?>">
    <meta name="robots" content="<?=(WEB_VIEW['meta']['robots']) ?>">
    <meta name="og:url" content="<?=(WEB_VIEW['meta']['url']) ?>">

    <link href="<?=(WEB_VIEW['styles'] . '?v=' . TIMESTAMP) ?>" rel="stylesheet">
    <script>
        window.APPENV = window.APPENV || '<?=(ENV)?>';
        window.APPTIMESTAMP = window.APPTIMESTAMP || '<?=(TIMESTAMP)?>';
    </script>
</head>
<body class="page">
<div id="App">
    <div>static page web ...</div>
</div>

<script src="<?=(WEB_VIEW['scripts'] . '?v=' . TIMESTAMP) ?>"></script>
</body>
</html>

