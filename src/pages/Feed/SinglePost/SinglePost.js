import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

class SinglePost extends Component {
  state = {
    title: '',
    previewText: '',
    postType: '',
    interestTags: '',
    sheets: '',
    author: '',
    date: '',
    image: '',
    content: ''
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    fetch('http://localhost:8081/feed/post/' + postId, {
      headers: {
        Authorization: 'Bearer ' + this.props.token
      }
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Failed to fetch status');
        }
        return res.json();
      })
      .then(resData => {
        // console.log('resData: ', resData);
        this.setState({
          title: resData.post.title,
          previewText: resData.post.previewText,
          postType: resData.post.postType,
          interestTags: resData.post.interestTags,
          sheets: resData.post.sheets,
          author: resData.post.creator.name,
          image: 'http://localhost:8081/' + resData.post.imageUrl,
          date: new Date(resData.post.createdAt).toLocaleDateString('en-US'),
          content: resData.post.content
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
        <h1>{this.state.title}</h1>
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={this.state.image} />
        </div>
        <p>{this.state.previewText}</p>
        <p>{this.state.postType}</p>
        <p>{this.state.interestTags}</p>
        <p>{this.state.content}</p>
        <div>{this.state.sheets}</div>
      </section>
    );
  }
}

export default SinglePost;
