import { VercelRequest, VercelResponse } from '@vercel/node';

let serverEntry: any;
let serverEntryError: Error | null = null;

async function getServerEntry() {
  if (serverEntry) return serverEntry;
  if (serverEntryError) throw serverEntryError;

  try {
    // Import the built server entry from dist - server.js exports default with fetch method
    const module = await import('../dist/server/server.js');
    serverEntry = module.default || module;
    return serverEntry;
  } catch (error) {
    serverEntryError = error as Error;
    console.error('Failed to load server entry:', error);
    throw serverEntryError;
  }
}

async function createNodeRequest(req: VercelRequest): Promise<Request> {
  let body: BodyInit | undefined;

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    if (typeof req.body === 'string') {
      body = req.body;
    } else if (req.body) {
      body = JSON.stringify(req.body);
    }
  }

  const protocol = req.headers['x-forwarded-proto'] || 'https';
  const host = req.headers.host || req.headers['x-forwarded-host'] || 'localhost';
  const url = `${protocol}://${host}${req.url}`;

  const headers = new Headers();
  Object.entries(req.headers).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => headers.append(key, v));
    } else if (value !== undefined) {
      headers.set(key, String(value));
    }
  });

  return new Request(url, {
    method: req.method,
    headers,
    body,
  });
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  try {
    const entry = await getServerEntry();
    
    if (!entry.fetch && typeof entry !== 'function') {
      throw new Error('Server entry does not export a fetch function');
    }

    const fetch = entry.fetch || entry;
    const nodeRequest = await createNodeRequest(request);

    const responseFromServer = await fetch(nodeRequest);

    // Copy headers from the server response
    responseFromServer.headers.forEach((value, key) => {
      if (key.toLowerCase() === 'content-encoding') {
        return; // Skip content-encoding, let Vercel handle compression
      }
      response.setHeader(key, value);
    });

    response.status(responseFromServer.status);

    // Send the response body
    const body = await responseFromServer.text();
    response.send(body);
  } catch (error) {
    console.error('Handler error:', error);
    response.status(500).json({
      error: 'Internal Server Error',
      message: process.env.NODE_ENV === 'development' ? String(error) : undefined,
    });
  }
}

