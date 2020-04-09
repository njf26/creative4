<template>
  <div class="questions">
    <h4>Quiz Questions</h4>
    <br>


<div class="totals" v-for="question in questions" :key="question.id">
    <h5>{{question.question}}</h5>
    <br>
    <div class="picturesHolder">
      <div class="picButton" @click="vote(1, question)">
        <img :src="question.path1"/>
      </div>
      <div class="picButton" @click="vote(2, question)">
        <img :src="question.path2"/>
      </div>
    </div>

    <h3>{{question.totalVotes}} Votes</h3>
    <br>
    <br>
    <br>
</div>

  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Questions',
  data() {
    return {
      questions: [],
      question: "",
      vote1: 0,
      vote2: 0,
      totalVotes: 0,
      path1: "",
      path2: "",
    }
  },
  created() {
    this.getQuestions();
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
    async vote(number, question) {
      try {
        if(number === 1){
          await axios.put("/api/quiz/" + question._id, {
              vote1: question.vote1 + 1,
              vote2: question.vote2,
              totalVotes: question.totalVotes + 1,
          });
        } else if(number === 2){
          await axios.put("/api/quiz/" + question._id, {
              vote1: question.vote1,
              vote2: question.vote2 + 1,
              totalVotes: question.totalVotes + 1,
          });
        }
        this.getQuestions();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>



<style>

.questions {
  text-align: center;
  justify-content: center;
}

.picturesHolder {
  justify-content: center;
  display: flex;
}

.picButton:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.picButton img {
  width: 500px;
  height: 333px;
}

h4 {
  font-size: 40px;
}

h5 {
  font-size: 20px;
}

.totals {
  justify-content: center;
}

.totals h5 {
  padding-left: 4%;
  padding-right: 4%;
}

/* Mobile Styles */
@media only screen and (max-width: 500px) {
  .picButton img {
    width: 151.5px;
    height: 101px;
  }
}

</style>
