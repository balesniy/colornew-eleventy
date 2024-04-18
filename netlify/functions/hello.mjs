export default async (req, context) => {
  console.log('event', req)
    console.log('handler', req.queryStringParameters)

  return new Response(`Hello, ${req.queryStringParameters?.query || Date.now()}`, {
    headers: {
       'access-control-allow-origin': '*'
    }
  });
};
