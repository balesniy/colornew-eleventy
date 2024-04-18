import { CohereClient } from "cohere-ai";

const cohere = new CohereClient({
    token: process.env.MY_IMPORTANT_VARIABLE,
});

export default async (req, context) => {
  const url = new URL(req.url);

 // Use URLSearchParams to work with the query string
 const params = new URLSearchParams(url.search);

 // Get a specific query parameter
 const query = params.get('query');

const chat = await cohere.chat({
        model: "command-r-plus",
        message: `suggest one best name for pizza with ${query || '🥬,🍄,🥓'} return only name in italian language`,
    });

  console.log(chat)

  return new Response(chat, {
    headers: {
       'access-control-allow-origin': '*'
    }
  });
};
