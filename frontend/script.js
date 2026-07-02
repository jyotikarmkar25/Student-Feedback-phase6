const form = document.getElementById("feedbackForm");
const container = document.getElementById("feedbackContainer");
const search = document.getElementById("search");
const message = document.getElementById("message");

const stars = document.querySelectorAll(".stars span");

const themeToggle = document.getElementById("themeToggle");

const API_URL = "http://localhost:5000/api/feedback";

let selectedRating = 0;
let allFeedbacks = [];

stars.forEach(star => {

  star.addEventListener("click", () => {

    selectedRating = star.dataset.value;

    stars.forEach(s => {
      s.classList.remove("active");
    });

    for(let i=0;i<selectedRating;i++){
      stars[i].classList.add("active");
    }

  });

});

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    rating: selectedRating,
    comment: document.getElementById("comment").value
  };

  if(selectedRating === 0){
    alert("Please select a rating");
    return;
  }

  try{

    const response = await fetch(API_URL,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(data)
    });

    await response.json();

    message.textContent = "Feedback submitted successfully!";

    form.reset();

    stars.forEach(star=>{
      star.classList.remove("active");
    });

    selectedRating = 0;

    getFeedbacks();

  }catch(error){
    console.log(error);
  }

});

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "light"){
  document.body.classList.add("light-mode");
  themeToggle.textContent = "☀️ Light";
}

async function getFeedbacks(){

  try{

    const response = await fetch(API_URL);

    const data = await response.json();

    allFeedbacks = data;

    renderCards(data);

  }catch(error){
    console.log(error);
  }

}

function renderCards(data){

  container.innerHTML = "";

  data.reverse().forEach(item => {

    container.innerHTML += `
      <div class="feedback-card">

        <div class="avatar">
          ${item.name.charAt(0).toUpperCase()}
        </div>

        <h3>${item.name}</h3>

        <div class="rating">
          ${"⭐".repeat(item.rating)}
        </div>

        <p class="comment">
          ${item.comment}
        </p>

      </div>
    `;
  });

}

search.addEventListener("input",()=>{

  const value = search.value.toLowerCase();

  const filtered = allFeedbacks.filter(item =>
    item.name.toLowerCase().includes(value)
  );

  renderCards(filtered);

});

getFeedbacks();

themeToggle.addEventListener("click", () => {

  document.body.classList.toggle("light-mode");

  if(document.body.classList.contains("light-mode")){

    localStorage.setItem("theme","light");

    themeToggle.textContent = "☀️ Light";

  }else{

    localStorage.setItem("theme","dark");

    themeToggle.textContent = "🌙 Dark";

  }

});