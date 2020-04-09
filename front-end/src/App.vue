<template>
<div id="app">
  <div class="header">
    <div class="title">
      <h1>Controversial Quiz</h1>
      <h2>Find answers to life's greatest questions</h2>
    </div>
  </div>
  <div class="menuOption">
    <router-link to="/">
      <div class="button"><h2>Take the Quiz</h2></div>
    </router-link>
    <router-link to="/Results">
      <div class="button"><h2>Results</h2></div>
    </router-link>
  </div>
  <div class="content">
    <router-view />
  </div>

  <div class='footer-container'>
    <div class='footer'>
      <p><a href="https://github.com/njf26/creative4.git">
        Website github
      </a></p>
    </div>
  </div>

</div>
</template>

<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
  width: 100%;
}

.header {
  display: flex;
  background-color: #4ae0db;
  justify-content: center;
  width: 100%;
  padding-top: 1%;
  padding-bottom: 1%;
}

.title {
  margin-top: 5px;
  align-text: center;
  justify-content: center;
}

.title h1 {
  font-size: 30px;
}
.title h2 {
  align-text: center;
}

.content {
  width: 100%;
}

.menuOption {
  height: 70px;
  padding-top: 10px;
  padding-bottom: 10px;
  background: #ffdf78;
  justify-content: center;
  float: center;
  display: flex;
  align-items: center;
  width: 100%;
}

.menuOption a {
  text-decoration: none;
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}

.button {
  padding: 2%;
  width: 180px;
  text-align: center;
  background-color: #4ae0db;
  font-size: 15px;
  margin: 10px;
}

.button:hover {
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

.footer-container {
  display: flex;
  justify-content: center;
  background-color: #4ae0db;
  color: #fff;
  width: 100%;
  height: 100%;
  margin-top: 5%;
}

.footer {
  text-align: center;
  font-family: Verdana, sans-serif;
  padding-top: 2%;
  padding-bottom: 2%;
}

.footer a {
  color: #000;
}

/* Mobile Styles */
@media only screen and (max-width: 500px) {
  .menuOption {
    height: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    background: #ffdf78;
    justify-content: center;
    width: 100%;
  }

  .button {
    padding: 2%;
    width: 120px;
    text-align: center;
    background-color: #4ae0db;
    font-size: 15px;
    margin: 10px;
  }

}

</style>
