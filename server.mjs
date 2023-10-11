import express, { json } from "express"
import {lChecker} from "./index.mjs" // 
import cors from "express"
const app = express();

/* localhost:3000/ 접속시 나올 메시지 */
app.get("/", (request, response) => { 
  
  response.send(`<h1>코드짜는 문과녀</h1>`);
});

/* localhost:3000/main 접속시 나올 메시지 */
app.get("/main", (request, response) => {  
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers","x-requested-with");
  response.header("Access-Control-Allow-Methods","POST, GET, OPTIONS, DELETE");
  // var url = request.params('url');
  var url = request.query.url;
  var html = {};
  
  if(url !== undefined){
    // console.log(url);
    lChecker(url).then((result)=>{
      console.log("result::"+JSON.stringify(result));
      html = result;
      response.send(
        JSON.stringify(html)
        );
    }).catch((err)=>{
      console.log(err);
      html.resultMsg = "failed";
      response.send(
        JSON.stringify(html)
        );
    });

    
  }
  
  

});



/* localhost:3000/ 혹은 localhost:3000/main 외의
get하지 않은 페이지 접속시 나올 메시지. */
// app.use((request, response) => {
//   response.send(`<h1>Sorry, page not found :(</h1>`);
// });

app.use(function(req,res,next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers","x-requested-with");
  res.header("Access-Control-Allow-Methods","POST, GET, OPTIONS, DELETE");
  next();
});

/* start : 3000포트에서 서버 구동 */
app.listen(3000, () => {
  console.log("localhost:3000 에서 서버가 시작됩니다.");
});