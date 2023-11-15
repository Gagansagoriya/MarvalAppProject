
var response; // create a variable to hold the response from the API
var favItem = []; // create an empty array 
var getfavItem = JSON.parse(localStorage.getItem("favItem")); // get favorite items from local storage and parse it as JSON


favItem = getfavItem ? [...getfavItem] : [];

// create an asynchronous function to fetch data from API
const fetchApiHandeler = async () => {
  let searchItem = document.getElementById("searchItem").value; // get the search item value from the input field

  // create the URL with the search item value and API key
  let url = `https://gateway.marvel.com:443/v1/public/characters?name=${searchItem}&ts=1&apikey=8fc6f978258fe23fb428f93d3a84e90c&hash=6f9f5d9b79f33bf48fe66627f30100c1`;
  let body = await fetch(url); // fetch data from the URL
  response = await body.json(); 


  if (response.code == 409) {
    document.getElementById("main").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("message").innerHTML =
      "Please enter something before search!!";
  }
  if (response.data.count) {
    const filteredData = favItem.filter(
      (item) => item.id === response.data.results[0].id
    );

   
    if (filteredData.length > 0) {
      document.getElementById("FavButtonLink").innerHTML = "Already Added";
      document.getElementById("FavButtonLink").disabled = true;
    } else {
      document.getElementById("FavButtonLink").innerHTML = "Add to favorites";
      document.getElementById("FavButtonLink").disabled = false;
    }
    document.getElementById("main").style.display = "block";
    document.getElementById("error").style.display = "none";
  } else {
    document.getElementById("main").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("message").innerHTML =
      "You have entered wrong name!!";
  }

  document.getElementById("img").src =
    response.data.results[0].thumbnail.path +
    "/portrait_xlarge." +
    response.data.results[0].thumbnail.extension;
  document.getElementById("title").innerHTML = response?.data?.results[0]?.name
    ? response?.data?.results[0]?.name
    : "Not Found";
  document.getElementById("discription").innerHTML = response?.data?.results[0]
    ?.description
    ? response?.data?.results[0]?.description
    : "Not Available";
  document.getElementById("urlLink").href =
    response?.data?.results[0]?.urls[0]?.url;
};

function favStorage() {
  favItem.push(response.data.results[0]);
  localStorage.setItem("favItem", JSON.stringify(favItem));
  console.log("button clicked");
  const filteredData = favItem.filter(
    (item) => item.id === response.data.results[0].id
  );

  if (filteredData.length > 0) {
    document.getElementById("FavButtonLink").innerHTML = "Already Added";
    document.getElementById("FavButtonLink").disabled = true;
  } else {
    document.getElementById("FavButtonLink").innerHTML = "Add to favorites";
    document.getElementById("FavButtonLink").disabled = false;
  }
  getFavCount();
}

function getFavCount() {
  document.getElementById("favCount").innerHTML = JSON.parse(
    localStorage.getItem("favItem")
  ).length;
}
getFavCount(); // Call getFavCount() function to update the display of the favorite count on page load !