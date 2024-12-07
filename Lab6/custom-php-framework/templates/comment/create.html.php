<?php

/** @var \App\Model\Comment $comment */
/** @var \App\Service\Router $router */

$title = 'Create Comment';
$bodyClass = 'create';

ob_start(); ?>
    <h1>Create a New Comment</h1>

    <form method="post" action="<?= $router->generatePath('comment-create') ?>">
        <div>
            <label for="content">Content:</label>
            <textarea id="content" name="comment[content]"><?= htmlspecialchars($comment->getContent()) ?></textarea>
        </div>
        <div>
            <label for="post_id">Post ID:</label>
            <input id="post_id" type="number" name="comment[post_id]" value="<?= htmlspecialchars($comment->getPostId()) ?>">
        </div>
        <button type="submit">Save</button>
    </form>


    <a href="<?= $router->generatePath('comment-index') ?>">Back to list</a>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
