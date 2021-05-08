
var boerdData = await bored()

document.getElementById("newIdea").addEventListener("click", function() {
    document.getElementById("addidea").innerHTML = "Just something to do if you are bored: " + boerdData;
  });

export async function bored() {
    const result = await axios({
      method: 'get',
      url: 'http://www.boredapi.com/api/activity/'
    });
    return result.data.activity;
  };

var hi = await hello();
document.getElementById("hello").addEventListener("click", function() {
    document.getElementById("addhey").innerHTML = "And the website knows the native language - " + hi.hello;
  });

export async function hello() {
    const result = await axios({
      method: 'get',
      url: 'https://fourtonfish.com/hellosalut/?mode=auto'
    });
    return result.data;
  };

var joke = await jokes();
document.getElementById("cnjokes").addEventListener("click", function() {
    document.getElementById("addjoke").innerHTML = "A Chuck Norris joke at it's finest: " + joke;
  });

export async function jokes() {
    const result = await axios({
      method: 'get',
      url: 'http://api.icndb.com/jokes/random'
    });
    return result.data.value.joke;
  };

  var country = await countries();
document.getElementById("country").addEventListener("click", function() {
    document.getElementById("addcountry").innerHTML = "This website already knew you were playing from " + country;
  });

export async function countries() {
    const result = await axios({
      method: 'get',
      url: 'https://api.country.is/'
    });
    return result.data.country;
  };


  var quote = await quotes();
document.getElementById("ron").addEventListener("click", function() {
    document.getElementById("addquote").innerHTML = "Ron Swanson: " + quote;
  });

export async function quotes() {
    const result = await axios({
      method: 'get',
      url: "https://ron-swanson-quotes.herokuapp.com/v2/quotes"
    });
    return result.data;
  };