import connectToMongoose from "@/lib/db";
import { User } from "@/model/user.model";

const { GoogleGenerativeAI } = require("@google/generative-ai");

export default  async function Home() {

  

// Access your API key as an environment variable (see "Set up your API key" above)
const genAI = new GoogleGenerativeAI("AIzaSyBG5phnK2u_bjmENghqWsOCC4jSPfVI9ns");

async function run() {
  // "use server"
  // The Gemini 1.5 models are versatile and work with both text-only and multimodal prompts
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
  const prompt = "Write a story about a magic backpack."
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
}

// await connectToMongoose();
// const user= await User.find();
// console.log(user);

  return (
    <div>
      {/* <button onClick={run}>submit</button> */}
      <h1>Hellow boy</h1>
    </div>
  );
}
