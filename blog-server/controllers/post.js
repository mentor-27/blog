const Post = require('../models/Post');

// add

async function addPost(post) {
  const newPost = await Post.create(post);

  await newPost.populate({
    path: 'comments',
    populate: 'author',
  });

  return newPost;
}

// edit

async function editPost(id, post) {
  const newPost = await Post.findOneAndUpdate(
    { _id: id },
    { $set: post },
    { returnDocument: 'after' }
  );

  await newPost.populate({
    path: 'comments',
    populate: 'author',
  });

  return newPost;
}

// delete

function deletePost(id) {
  return Post.deleteOne({ _id: id });
}

// get list with search and pagination

async function getPosts(search = '', limit = 9, page = 1) {
  const [posts, count] = await Promise.all([
    Post.find({ title: { $regex: search, $options: 'i' } })
      .limit(limit)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 }),
    Post.countDocuments({ title: { $regex: search, $options: 'i' } }),
  ]);

  return { posts, lastPage: Math.ceil(count / limit) };
}

// get item

function getPost(id) {
  return Post.findOne({ _id: id }).populate({
    path: 'comments',
    populate: 'author',
  });
}

module.exports = {
  addPost,
  editPost,
  deletePost,
  getPosts,
  getPost,
};
