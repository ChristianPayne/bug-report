
export async function encrypt (input: string): Promise<string> {
  const bcrypt = require('bcrypt');
  const saltRounds = 10;
  // console.log(`>>> encrypt (${input})`);
  let hash: string = await bcrypt.hash(input, saltRounds)
  if(hash == undefined) {
    console.log("We have an error in bcrypt")
    throw new Error("Encryption Failed!")
  }
  // console.log(`>>> encrypt result: ${hash}`);
  return hash
}

export async function check (input: string, hash: string): Promise<boolean> {
  const bcrypt = require('bcrypt');
  console.log(`>>> check (${input}, ${hash})`);
  
  let result: boolean = await bcrypt.compare(input, hash);
  if(result == undefined) {
    console.log("We have an error in bcrypt")
    throw new Error("Encryption Check Failed!")
  }
  console.log(`>>> check result: ${result}`);
  return result
}