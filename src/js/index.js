import "../sass/index.sass";
import "../index.html";
import "@babel/polyfill";
import axios from "axios";

console.log("hello hihi index");

async function asyncApiRes() {
  console.log("async: 1");
  let res1 = await axios.get(
    "https://www.instagram.com/explore/tags/LeagueofLegends/?__a=1"
  );
  console.log("async: 2");
  let res2 = await axios.get(
    "https://www.instagram.com/explore/tags/Avengers/?__a=1"
  );
  console.log("async: 3");
  console.log({
    res1: res1.data,
    res2: res2.data
  });
  console.log("async: 4");
}
asyncApiRes();
