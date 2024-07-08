const { Router } = require('express');
const { addPost, deletePost, editPost, getPost, getPosts } = require('../controllers/post');
const { addComment, deleteComment } = require('../controllers/comment');
const mapPost = require('../helpers/mapPost');
const mapComment = require('../helpers/mapComment');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');

const router = Router({ mergeParams: true });

router.get('/', async (req, res) => {
  const { posts, lastPage } = await getPosts(req.query.search, req.query.limit, req.query.page);

  res.json({ data: { posts: posts.map(mapPost), lastPage } });
});

router.get('/:id', async (req, res) => {
  const post = await getPost(req.params.id);

  res.json({ data: mapPost(post) });
});

// authenticated

router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const { title, imageUrl, content } = req.body;
  const newPost = await addPost({ title, imageUrl, content });

  res.json({ data: mapPost(newPost) });
});

router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const { title, imageUrl, content } = req.body;
  const updatedPost = await editPost(req.params.id, { title, imageUrl, content });

  res.json({ data: mapPost(updatedPost) });
});

router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  await deletePost(req.params.id);

  res.json({ error: null });
});

router.post('/:id/comments', authenticated, async (req, res) => {
  const newComment = await addComment(req.params.id, {
    content: req.body.content,
    author: req.user.id,
  });

  res.json({ data: mapComment(newComment) });
});

router.delete(
  '/:postId/comments/:commentId',
  authenticated,
  hasRole([ROLES.ADMIN, ROLES.MODERATOR]),
  async (req, res) => {
    await deleteComment(req.params.postId, req.params.commentId);

    res.json({ error: null });
  }
);

module.exports = router;
