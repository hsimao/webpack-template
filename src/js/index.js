import "index.sass";
import "@babel/polyfill";

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

console.log("[jQuery $] ", $);
axios.get("https://api.github.com/zen").then(val => {
  console.log("[axios get data] ", val.data);
});
