"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var authors = [{ id: 1, firstName: "Tom", lastName: "Coleman" }, { id: 2, firstName: "Sashko", lastName: "Stubailo" }];

var _posts = [{ id: 1, authorId: 1, title: "Introduction to GraphQL", votes: 2 }, { id: 2, authorId: 2, title: "GraphQL Rocks", votes: 3 }, { id: 3, authorId: 2, title: "Advanced GraphQL", votes: 1 }];

var resolveFunctions = {
  Query: {
    posts: function posts() {
      return _posts;
    },
    author: function author(_, _ref) {
      var id = _ref.id;

      return authors.find(function (author) {
        return author.id === id;
      });
    }
  },
  Mutation: {
    upvotePost: function upvotePost(_, _ref2) {
      var postId = _ref2.postId;

      var post = _posts.find(function (post) {
        return post.id === postId;
      });
      if (!post) {
        throw new Error("Couldn't find post with id " + postId);
      }
      post.votes += 1;
      // pubsub.publish('postUpvoted', post);
      return post;
    }
  },
  Author: {
    posts: function posts(author) {
      return _posts.filter(function (post) {
        return post.authorId === author.id;
      });
    }
  },
  Post: {
    author: function author(post) {
      return authors.find(function (author) {
        return author.id === post.authorId;
      });
    }
  }
};

exports.default = resolveFunctions;