export default async (req, context) => {
  const url = new URL(req.url);

 // Use URLSearchParams to work with the query string
 const params = new URLSearchParams(url.search);

 // Get a specific query parameter
 const query = params.get('query');

  return new Response(`Hello, ${query || Date.now()}`, {
    headers: {
       'access-control-allow-origin': '*'
    }
  });
};
