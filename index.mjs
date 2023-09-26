import {LinkChecker} from 'linkinator'
import chalk from 'chalk'

const BASE_URL = 'https://www.clearyst.com/'

const checker = new LinkChecker()

// event listeners
// checker.on('link',(link)=>{
//     console.log(link);
// }) 
// checker.on('pagestart',(url)=>{
//     console.log(url);
// })

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

await checker.check({path: BASE_URL, recurse :true });

if(brokenlinks.length > 0){
    console.log("");
    console.log(`Found ${brokenlinks.length} broken links:`);
    for(const brokenlink of brokenlinks){
        console.log("");
        console.log(brokenlink.url);
        console.log('   ','STATUS',brokenlink.status);
        console.log('   ','SOURCE',new URL(brokenlink.parent).pathname);
    }
}


console.log('');
console.log(`Checked ${pagesChecked.length} pages:`);
for(const page of pagesChecked){
    console.log('   ',new URL(page).pathname);
}