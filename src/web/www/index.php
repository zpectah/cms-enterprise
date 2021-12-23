<?php
const PATH_ROOT = '../../';
require PATH_ROOT . 'core/index.php';
require PATH_ROOT . 'web/app/index.php';

$view = new \app\controller\ViewController;
?>
<!doctype html>
<html lang="<?=(WEB_VIEW['meta']['lang']) ?>">
<head>
    <meta charset="<?=(WEB_VIEW['meta']['charset']) ?>">
    <meta name="viewport" content="<?=(WEB_VIEW['meta']['viewport']) ?>">
    <title><?=($view -> get_view_meta_data()['title']) ?></title>
    <meta name="description" content="<?=($view -> get_view_meta_data()['description']) ?>">
    <meta name="keywords" content="<?=($view -> get_view_meta_data()['keywords']) ?>">
    <meta name="robots" content="<?=($view -> get_view_meta_data()['robots']) ?>">
    <meta name="og:url" content="<?=($view -> get_view_meta_data()['url']) ?>">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@300;400;700&family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">

    <link href="<?=(WEB_VIEW['styles'] . '?v=' . TIMESTAMP) ?>" rel="stylesheet">
    <script>
        window.APPENV = window.APPENV || '<?=(ENV)?>';
        window.APPTIMESTAMP = window.APPTIMESTAMP || '<?=(TIMESTAMP)?>';
        window.TMP_TOKEN = window.TMP_TOKEN || '<?=(TMP_TOKEN)?>';
    </script>
</head>
<body id="page">
<?php $view -> render_page() ?>

    <script src="<?=(WEB_VIEW['scripts'] . '?v=' . TIMESTAMP) ?>"></script>
</body>
</html>

