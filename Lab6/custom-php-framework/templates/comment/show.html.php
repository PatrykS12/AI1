<?php

/** @var \App\Model\Comment $comment */
/** @var \App\Service\Router $router */

$title = 'Comment Details';
$bodyClass = 'show';

ob_start(); ?>
    <h1>Comment Details</h1>

    <p><strong>ID:</strong> <?= htmlspecialchars($comment->getId()) ?></p>
    <p><strong>Content:</strong> <?= htmlspecialchars($comment->getContent()) ?></p>

    <a href="<?= $router->generatePath('comment-index') ?>">Back to list</a>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
