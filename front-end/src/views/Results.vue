<template>
  <div class="results">
    <h4>Quiz Results</h4>

    <div class="loop" v-for="question in questions" :key="question.id">
        <h5>{{question.question}}</h5>
        <h3>{{question.totalVotes}} Total Votes</h3>
        <br>
        <h3>The winner is...</h3>
        <img :src="question.winner" width="500" height="333"/>
        <h3>with {{question.percent}}% of the votes</h3>
        <br>
        <br>
        <br>
    </div>

<br>
<br>
    <h4>Comments</h4>

    <div class="form">
      <input size="48" v-model="newAuthor" placeholder="Name"/>
      <br>
      <textarea rows="6" cols="48" v-model="newComment" placeholder="Your controversial thoughts..."/>
      <br>
      <br>
      <button @click="submitComment()">Submit</button>
    </div>

    <div class="commentList" v-for="comment in comments" :key="comment.id">
        <h6>"{{comment.comment}}"</h6>
        <div class="h7"> - {{comment.author}}</div>
        <br>
        <br>
        <button @click="deleteComment(comment)">Delete offensive comment</button>
    </div>

  </div>
</template>


<script>
import axios from 'axios';
export default {
  name: 'Results',
  data() {
    return {
      questions: [],
      question: "",
      vote1: 0,
      vote2: 0,
      totalVotes: 0,
      path1: "",
      path2: "",
      percent: 0,
      winner: "",

      comments: [],
      newAuthor: "",
      newComment: "",
    }
  },
  created() {
    this.getQuestions();
    this.getComments();
  },
  methods: {
    async getQuestions() {
      try {
        let response = await axios.get("/api/quiz");
        this.questions = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getComments() {
      try {
        let response = await axios.get("/api/comments");
        this.comments = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteComment(comment) {
      try {
        await axios.delete("/api/comments/" + comment._id);
        this.getComments();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async submitComment() {
      try {
        await axios.post("/api/comments", {
          comment: this.newComment,
          author: this.newAuthor,
        });
        this.newComment = "";
        this.newAuthor = "";
        this.getComments();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>


<style>

.results {
  text-align: center;
  justify-content: center;
}

h4 {
  font-size: 40px;
}

h6 {
  font-size: 15px;
}

.h7 {
  font-size: 13px;
}

.loop {
  justify-content: center;
}

.loop h5 {
  padding-left: 4%;
  padding-right: 4%;
}

.commentList {
  text-align: center;
  justify-content: center;
  background: #ffdf78;
  padding-bottom: 5%;
  padding-top: 1%;
  padding-left: 10%;
  padding-right: 10%;
  margin-left: 25%;
  margin-right: 25%;
  margin-top: 5%;
}

/* Mobile Styles */
@media only screen and (max-width: 500px) {
  .loop img {
    width: 312.5px;
    height: 208.1px;
  }

  .commentList {
    text-align: center;
    justify-content: center;
    background: #ffdf78;
    padding-left: 10%;
    padding-right: 10%;
    padding-bottom: 5%;
    margin-left: 10%;
    margin-right: 10%;
    margin-top: 5%;
  }
}

</style>
