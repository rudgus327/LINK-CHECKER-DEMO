import {LinkChecker} from 'linkinator'
import chalk from 'chalk'
export { lChecker };
// const BASE_URL = 'https://www.clearyst.com/'

const checker = new LinkChecker()

async function lChecker(url){

console.log("checker_test:"+url);
    const LOGGER_MAP ={
        OK:chalk.green('.'),
        BROKEN : chalk.red('!'),
        SKIPPED: chalk.yellow('?'),
    }

    let brokenlinks = [];

    var cnt = 0;
    checker.on('link',(link)=>{
        cnt+=1;
        console.log("file+_path("+cnt+"):::"+link.parent);
        if(link.state === "BROKEN") {
            console.log("BROKE!!!!");
            brokenlinks.push(link);


        }
    }) 
    let pagesChecked = [];
    checker.on('pagestart',(url)=>{
        pagesChecked.push(url);
        console.log("pagestart:"+pagesChecked)
    })

    await checker.check({path: url, recurse :true,concurrency :2});
    var result = {};
    var resultMsg = "success";
    var arr = [];
    console.log("checking start");
    if(brokenlinks.length > 0){
        console.log("");
        console.log(`Found ${brokenlinks.length} broken links:`);
        for(const brokenlink of brokenlinks){
            var linkData = {};
            console.log(brokenlink);
            var details = brokenlink.failureDetails[0];
            var msg = details.status == 0 ? details.statusText :details.status+" "+ details.statusText;
            var status_text = "";
            
            linkData.url = brokenlink.url;    
            linkData.status = msg;    
            linkData.parent = brokenlink.parent;    
            linkData.source = new URL(brokenlink.parent).pathname;    
            
            arr.push(linkData);
        }
        
    }else{
        resultMsg = "failed";

    }

    result.resultMsg = resultMsg;
    result.data = arr;

    console.log('');
    // console.log(`Checked ${pagesChecked.length} pages:`);
    // for(const page of pagesChecked){
    //     console.log('   ',new URL(page).pathname);
    // }

    // 리턴을 넣어주기 (03:10)
    return result; 
}