// File: src/components/YouTubeComponent.jsx

import React, { useState, useEffect } from 'react';
import { Search, ThumbsUp, MessageCircle, Share2, Send } from 'lucide-react';

// Correctly access the environment variable
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const API_BASE_URL = 'https://www.googleapis.com/youtube/v3';

const YouTubeComponent = ({ darkMode }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const searchVideos = async (query) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}/search?part=snippet&q=${query}&type=video&key=${API_KEY}&maxResults=10`);
      if (!response.ok) throw new Error('Failed to fetch videos');
      const data = await response.json();
      setVideos(data.items);
    } catch (err) {
      setError('Error fetching videos. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchVideoDetails = async (videoId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/videos?part=statistics&id=${videoId}&key=${API_KEY}`);
      if (!response.ok) throw new Error('Failed to fetch video details');
      const data = await response.json();
      return data.items[0].statistics;
    } catch (err) {
      console.error('Error fetching video details:', err);
      return null;
    }
  };

  const fetchComments = async (videoId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/commentThreads?part=snippet,replies&videoId=${videoId}&key=${API_KEY}&maxResults=20`);
      if (!response.ok) throw new Error('Failed to fetch comments');
      const data = await response.json();
      setComments(data.items);
    } catch (err) {
      console.error('Error fetching comments:', err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      searchVideos(searchQuery);
    }
  };

  const handleVideoSelect = async (video) => {
    setSelectedVideo(video);
    const statistics = await fetchVideoDetails(video.id.videoId);
    setSelectedVideo((prev) => ({ ...prev, statistics }));
    fetchComments(video.id.videoId);
  };

  const handleLikeVideo = () => {
    if (selectedVideo) {
      setSelectedVideo((prev) => ({
        ...prev,
        statistics: {
          ...prev.statistics,
          likeCount: (parseInt(prev.statistics.likeCount) + 1).toString(),
        },
      }));
    }
  };

  const handleLikeComment = (commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) => {
        if (comment.id === commentId) {
          const newLikeCount = parseInt(comment.snippet.topLevelComment.snippet.likeCount) + 1;
          return {
            ...comment,
            snippet: {
              ...comment.snippet,
              topLevelComment: {
                ...comment.snippet.topLevelComment,
                snippet: {
                  ...comment.snippet.topLevelComment.snippet,
                  likeCount: newLikeCount.toString(),
                },
              },
            },
          };
        }
        return comment;
      })
    );
  };

  const handlePostComment = () => {
    if (newComment.trim() && selectedVideo) {
      const newCommentObject = {
        id: Date.now().toString(),
        snippet: {
          topLevelComment: {
            snippet: {
              authorDisplayName: 'User',
              textDisplay: newComment,
              likeCount: '0',
              publishedAt: new Date().toISOString(),
            },
          },
          totalReplyCount: 0,
          replies: { comments: [] },
        },
      };
      setComments((prevComments) => [newCommentObject, ...prevComments]);
      setNewComment('');
    }
  };

  const handleReplyToComment = (commentId) => {
    if (replyText.trim()) {
      setComments((prevComments) =>
        prevComments.map((comment) => {
          if (comment.id === commentId) {
            const newReply = {
              id: Date.now().toString(),
              snippet: {
                authorDisplayName: 'User',
                textDisplay: replyText,
                likeCount: '0',
                publishedAt: new Date().toISOString(),
              },
            };
            return {
              ...comment,
              snippet: {
                ...comment.snippet,
                totalReplyCount: comment.snippet.totalReplyCount + 1,
                replies: {
                  comments: [...(comment.snippet.replies?.comments || []), newReply],
                },
              },
            };
          }
          return comment;
        })
      );
      setReplyText('');
      setReplyingTo(null);
    }
  };

  return (
    <section
      className={`py-8 ${
        darkMode
          ? 'bg-gradient-to-br from-gray-900 via-pink-500 to-gray-800'
          : 'bg-gradient-to-br from-gray-700 via-pink-500 to-gray-700'
      } text-white`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-8 text-center text-sky-400 italic">YouTube Explorer</h2>
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex rounded-lg overflow-hidden">
            <input
              type="text"
              className="flex-grow py-2 px-4 bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-pink-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for videos, playlists, or channels..."
            />
            <button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 hover:bg-pink-600 transition-colors duration-300"
            >
              <Search size={24} />
            </button>
          </div>
        </form>

        {isLoading && <div className="text-center">Loading...</div>}
        {error && <p className="text-red-500 text-center bg-red-100 p-4 rounded-lg">{error}</p>}

        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-3/4 lg:pr-4 mb-8 lg:mb-0">
            {selectedVideo && (
              <div className="mb-8">
                <div className="w-full aspect-w-16 aspect-h-9 mb-4">
                  <iframe
                    src={`https://www.youtube.com/embed/${selectedVideo.id.videoId}`}
                    title={selectedVideo.snippet.title}
                    allowFullScreen
                    className="w-full h-full"
                    style={{ minHeight: '480px' }}
                  ></iframe>
                </div>
                <h3 className="text-2xl font-semibold mb-2">{selectedVideo.snippet.title}</h3>
                <p className="text-gray-300 mb-4 italic">{selectedVideo.snippet.description}</p>
                {selectedVideo.statistics && (
                  <div className="flex items-center space-x-4 text-sm">
                    <button
                      onClick={handleLikeVideo}
                      className="flex items-center space-x-1 text-pink-300 hover:text-pink-400"
                    >
                      <ThumbsUp size={18} />
                      <span>{selectedVideo.statistics.likeCount}</span>
                    </button>
                    <span className="flex items-center space-x-1">
                      <MessageCircle size={18} />
                      <span>{selectedVideo.statistics.commentCount}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Share2 size={18} />
                      <span>{selectedVideo.statistics.viewCount} views</span>
                    </span>
                  </div>
                )}
              </div>
            )}

            {selectedVideo && (
              <div>
                <h4 className="text-xl font-semibold mb-4">Comments</h4>
                <div className="mb-4">
                  <textarea
                    className="w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-white"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Add a comment..."
                    rows="3"
                  ></textarea>
                  <button
                    onClick={handlePostComment}
                    className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-300"
                  >
                    <Send size={18} />
                  </button>
                </div>

                {comments.map((comment) => (
                  <div key={comment.id} className="mb-6">
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0">
                        <img
                          src={`https://ui-avatars.com/api/?name=${comment.snippet.topLevelComment.snippet.authorDisplayName}`}
                          alt="Avatar"
                          className="w-10 h-10 rounded-full"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-semibold">{comment.snippet.topLevelComment.snippet.authorDisplayName}</h5>
                          <button
                            onClick={() => handleLikeComment(comment.id)}
                            className="flex items-center space-x-1 text-pink-300 hover:text-pink-400"
                          >
                            <ThumbsUp size={18} />
                            <span>{comment.snippet.topLevelComment.snippet.likeCount}</span>
                          </button>
                        </div>
                        <p className="text-gray-300 mb-2">{comment.snippet.topLevelComment.snippet.textDisplay}</p>
                        <button
                          onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                          className="text-pink-400 hover:text-pink-500"
                        >
                          Reply
                        </button>

                        {replyingTo === comment.id && (
                          <div className="mt-2">
                            <textarea
                              className="w-full p-2 border border-gray-300 rounded-md bg-gray-800 text-white"
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Write a reply..."
                              rows="2"
                            ></textarea>
                            <button
                              onClick={() => handleReplyToComment(comment.id)}
                              className="mt-2 bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600 transition-colors duration-300"
                            >
                              Reply
                            </button>
                          </div>
                        )}

                        {comment.snippet.replies && (
                          <div className="mt-4 space-y-2 pl-6 border-l border-gray-700">
                            {comment.snippet.replies.comments.map((reply) => (
                              <div key={reply.id} className="flex items-start space-x-3">
                                <div className="flex-shrink-0">
                                  <img
                                    src={`https://ui-avatars.com/api/?name=${reply.snippet.authorDisplayName}`}
                                    alt="Avatar"
                                    className="w-8 h-8 rounded-full"
                                  />
                                </div>
                                <div className="flex-1">
                                  <h6 className="font-semibold">{reply.snippet.authorDisplayName}</h6>
                                  <p className="text-gray-300">{reply.snippet.textDisplay}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:w-1/4">
            <h4 className="text-xl font-semibold mb-4">Search Results</h4>
            <div className="space-y-4 max-h-screen overflow-y-auto">
              {videos.map((video) => (
                <div
                  key={video.id.videoId}
                  className="cursor-pointer hover:bg-gray-700 p-2 rounded-lg transition-colors duration-300"
                  onClick={() => handleVideoSelect(video)}
                >
                  <img
                    src={video.snippet.thumbnails.medium.url}
                    alt={video.snippet.title}
                    className="w-full rounded-lg mb-2"
                  />
                  <h5 className="font-semibold text-sm">{video.snippet.title}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YouTubeComponent;