# CivitUI - A comfier worfklow for generating with Civitai models
https://github.com/civitai/CivitUI/assets/34775928/61f8662f-5a52-46ac-aac2-c751b0f8b02d

## Local Development

### 1. Set up ComfyUI server

First, clone and setup [ComfyUI](https://github.com/comfyanonymous/ComfyUI) if you haven't already.

```bash
git clone https://github.com/comfyanonymous/ComfyUI
```

Then, modify `ComfyUI/server.py` to add CORS (Cross-Origin Resource Sharing) headers to responses from the server. Adding the below code blocks will allow our CivitUI Next.js app to access resources on the ComfyUI server.

```python
@web.middleware
async def cors_handler(request: web.Request, handler):
    response = await handler(request)
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization, x-requested-with'
    return response
```

```python
class PromptServer():
...
    self.app = web.Application(client_max_size=20971520, middlewares=[cache_control, cors_handler]) # Add cors_handler middleware
...
```

Finally, start the ComfyUI server:

```bash
python main.py
```

### 2. Set up CivitUI

Now, clone the CivitUI repository to your local machine:

```bash
https://github.com/civitai/CivitUI.git
```

Add a `.env` file with the environment variables from [`.env.example`](.env.example).

```
NEXT_PUBLIC_COMFYUI_SERVER_URL=http://127.0.0.1:8188
CIVITAI_API_KEY=
```

Then, install the dependencies and run the development server:

```bash
npm install
# or
bun install
```

```bash
npm run dev
# or
bun dev
```

With your ComfyUI server running in `http://127.0.0.1:8188`, open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Voila! 🫡

### Contributing

After making your changes:

1. Push your changes to your fork.
2. Open a pull request against the main repository.
3. Describe your changes and how they improve the project or fix issues.

Your contributions will be reviewed, and if accepted, merged into the project.

Thank you for contributing to CivitUI! 🥹🤭
