<?php

/** @var \App\Model\Comment $comment */
/** @var \App\Service\Router $router */

$title = 'Edit Comment';
$bodyClass = 'edit';

ob_start(); ?>
    <h1>Edit Comment</h1>

    <form method="post" action="<?= $router->generatePath('comment-edit', ['id' => $comment->getId()]) ?>">
        <div>
            <label for="content">Content:</label>
            <textarea id="content" name="comment[content]"><?= htmlspecialchars($comment->getContent()) ?></textarea>
        </div>
        <button type="submit">Save</button>
    </form>

    <a href="<?= $router->generatePath('comment-index') ?>">Back to list</a>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
