export default async (req, context) => {
  console.log('event', req.path, req.url)
    console.log('handler', req.queryStringParameters)

  return new Response(`Hello, ${req.queryStringParameters?.query || Date.now()}`, {
    headers: {
       'access-control-allow-origin': '*'
    }
  });
};
