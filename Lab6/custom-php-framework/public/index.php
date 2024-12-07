<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'autoload.php';

$config = new \App\Service\Config();

$templating = new \App\Service\Templating();
$router = new \App\Service\Router();

$action = $_REQUEST['action'] ?? null;
switch ($action) {
    case 'comment-index':
    case null: // Domyślna akcja
        $controller = new \App\Controller\CommentController();
        $view = $controller->indexAction($templating, $router);
        break;
    case 'comment-create':
        $controller = new \App\Controller\CommentController();
        $view = $controller->createAction($_REQUEST['comment'] ?? null, $templating, $router);
        break;
    case 'comment-edit':
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\CommentController();
        $view = $controller->editAction($_REQUEST['id'], $_REQUEST['comment'] ?? null, $templating, $router);
        break;
    case 'comment-show':
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\CommentController();
        $view = $controller->showAction($_REQUEST['id'], $templating, $router);
        break;
    case 'comment-delete':
        if (! $_REQUEST['id']) {
            break;
        }
        $controller = new \App\Controller\CommentController();
        $view = $controller->deleteAction($_REQUEST['id'], $router);
        break;

    default:
        $view = 'Not found';
        break;
}

if ($view) {
    echo $view;
}
