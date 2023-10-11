import {LinkChecker} from 'linkinator'
import chalk from 'chalk'
export { lChecker };
// const BASE_URL = 'https://www.clearyst.com/'

const checker = new LinkChecker()

async function lChecker(url){
// event listeners
// checker.on('link',(link)=>{
//     console.log(link);
// }) 
// checker.on('pagestart',(url)=>{
//     console.log(url);
// })
console.log("checker_test:"+url);
    const LOGGER_MAP ={
        OK:chalk.green('.'),
        BROKEN : chalk.red('!'),
        SKIPPED: chalk.yellow('?'),
    }

    let brokenlinks = [];

    checker.on('link',(link)=>{
        process.stdout.write(LOGGER_MAP[link.state]);
        if(link.state === "BROKEN") brokenlinks.push(link);
    }) 
    let pagesChecked = [];
    checker.on('pagestart',(url)=>{
        pagesChecked.push(url);
    })

    await checker.check({path: url, recurse :true });
    var result = {};
    var resultMsg = "success";
    var arr = [];
    
    if(brokenlinks.length > 0){
        console.log("");
        console.log(`Found ${brokenlinks.length} broken links:`);
        for(const brokenlink of brokenlinks){
            var linkData = {};
            console.log(brokenlink);
            linkData.url = brokenlink.url;    
            linkData.status = brokenlink.status;    
            linkData.state = brokenlink.state;    
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