import type { PersistedGraph } from "@/types";

const defaultWorkflow = {
  last_node_id: 85,
  last_link_id: 21,
  nodes: [
    {
      id: 5,
      type: "EmptyLatentImage",
      pos: [100, 130],
      size: {
        "0": 315,
        "1": 106,
      },
      flags: {},
      order: 0,
      mode: 0,
      outputs: [
        {
          name: "LATENT",
          type: "LATENT",
          links: [10],
          shape: 3,
        },
      ],
      properties: {
        "Node name for S&R": "EmptyLatentImage",
      },
      widgets_values: [512, 768, 1],
    },
    {
      id: 8,
      type: "VAEDecode",
      pos: [2201.7999877929688, 386],
      size: {
        "0": 210,
        "1": 46,
      },
      flags: {},
      order: 11,
      mode: 0,
      inputs: [
        {
          name: "samples",
          type: "LATENT",
          link: 1,
        },
        {
          name: "vae",
          type: "VAE",
          link: 2,
        },
      ],
      outputs: [
        {
          name: "IMAGE",
          type: "IMAGE",
          links: [12],
          shape: 3,
        },
      ],
      properties: {
        "Node name for S&R": "VAEDecode",
      },
    },
    {
      id: 39,
      type: "PixelKSampleUpscalerProviderPipe",
      pos: [1771.7999877929688, 130],
      size: {
        "0": 330,
        "1": 314,
      },
      flags: {},
      order: 8,
      mode: 0,
      inputs: [
        {
          name: "basic_pipe",
          type: "BASIC_PIPE",
          link: 3,
        },
        {
          name: "upscale_model_opt",
          type: "UPSCALE_MODEL",
          link: 4,
        },
        {
          name: "pk_hook_opt",
          type: "PK_HOOK",
          link: null,
        },
      ],
      outputs: [
        {
          name: "UPSCALER",
          type: "UPSCALER",
          links: [6],
          shape: 3,
        },
      ],
      properties: {
        "Node name for S&R": "PixelKSampleUpscalerProviderPipe",
      },
      widgets_values: [
        "nearest-exact",
        935725782488268,
        "randomize",
        20,
        9,
        "euler",
        "karras",
        0.4,
        false,
        512,
      ],
    },
    {
      id: 40,
      type: "UpscaleModelLoader",
      pos: [100, 366],
      size: {
        "0": 315,
        "1": 58,
      },
      flags: {},
      order: 1,
      mode: 0,
      outputs: [
        {
          name: "UPSCALE_MODEL",
          type: "UPSCALE_MODEL",
          links: [4],
          shape: 3,
        },
      ],
      properties: {
        "Node name for S&R": "UpscaleModelLoader",
      },
      widgets_values: ["RealESRGAN_x4plus.pth"],
    },
    {
      id: 41,
      type: "IterativeLatentUpscale",
      pos: [2201.7999877929688, 130],
      size: {
        "0": 344.3999938964844,
        "1": 126,
      },
      flags: {},
      order: 10,
      mode: 0,
      inputs: [
        {
          name: "samples",
          type: "LATENT",
          link: 5,
        },
        {
          name: "upscaler",
          type: "UPSCALER",
          link: 6,
        },
      ],
      outputs: [
        {
          name: "latent",
          type: "LATENT",
          links: [7],
          shape: 3,
        },
        {
          name: "vae",
          type: "VAE",
          links: [8],
          shape: 3,
        },
      ],
      properties: {
        "Node name for S&R": "IterativeLatentUpscale",
      },
      widgets_values: [3, 3, ""],
    },
    {
      id: 43,
      type: "VAEDecode",
      pos: [2616.7999877929688, 130],
      size: {
        "0": 210,
        "1": 46,
      },
      flags: {},
      order: 12,
      mode: 0,
      inputs: [
        {
          name: "samples",
          type: "LATENT",
          link: 7,
        },
        {
          name: "vae",
          type: "VAE",
          link: 8,
        },
      ],
      outputs: [
        {
          name: "IMAGE",
          type: "IMAGE",
          links: [11],
          shape: 3,
        },
      ],
      properties: {
        "Node name for S&R": "VAEDecode",
      },
    },
    {
      id: 50,
      type: "ImpactKSamplerBasicPipe",
      pos: [1771.7999877929688, 574],
      size: {
        "0": 315,
        "1": 242,
      },
      flags: {},
      order: 9,
      mode: 0,
      inputs: [
        {
          name: "basic_pipe",
          type: "BASIC_PIPE",
          link: 9,
        },
        {
          name: "latent_image",
          type: "LATENT",
          link: 10,
        },
      ],
      outputs: [
        {
          name: "BASIC_PIPE",
          type: "BASIC_PIPE",
          links: null,
          shape: 3,
        },
        {
          name: "LATENT",
          type: "LATENT",
          links: [1, 5],
          shape: 3,
        },
        {
          name: "VAE",
          type: "VAE",
          links: [2],
          shape: 3,
        },
      ],
      properties: {
        "Node name for S&R": "ImpactKSamplerBasicPipe",
      },
      widgets_values: [
        1023466088563284,
        "randomize",
        20,
        7,
        "euler",
        "normal",
        1,
      ],
    },
    {
      id: 82,
      type: "SaveImage",
      pos: [2926.7999877929688, 130],
      size: {
        "0": 315,
        "1": 270,
      },
      flags: {},
      order: 14,
      mode: 0,
      inputs: [
        {
          name: "images",
          type: "IMAGE",
          link: 11,
        },
      ],
      properties: {},
      widgets_values: ["ComfyUI"],
    },
    {
      id: 85,
      type: "PreviewImage",
      pos: [2616.7999877929688, 306],
      size: {
        "0": 210,
        "1": 246,
      },
      flags: {},
      order: 13,
      mode: 0,
      inputs: [
        {
          name: "images",
          type: "IMAGE",
          link: 12,
        },
      ],
      properties: {
        "Node name for S&R": "PreviewImage",
      },
    },
    {
      id: "93:1",
      type: "VAELoader",
      pos: [100, 782],
      size: {
        "0": 315,
        "1": 58,
      },
      flags: {},
      order: 2,
      mode: 0,
      outputs: [
        {
          name: "VAE",
          type: "VAE",
          links: [19],
          shape: 3,
        },
      ],
      properties: {
        "Node name for S&R": "VAELoader",
      },
      widgets_values: ["vae-ft-mse-840000-ema-pruned.safetensors"],
    },
    {
      id: "93:2",
      type: "LoraLoader",
      pos: [515, 130],
      size: {
        "0": 315,
        "1": 126,
      },
      flags: {},
      order: 4,
      mode: 0,
      inputs: [
        {
          name: "model",
          type: "MODEL",
          link: 13,
        },
        {
          name: "clip",
          type: "CLIP",
          link: 14,
        },
      ],
      outputs: [
        {
          name: "MODEL",
          type: "MODEL",
          links: [17],
          shape: 3,
        },
        {
          name: "CLIP",
          type: "CLIP",
          links: [15, 16, 18],
          shape: 3,
        },
      ],
      properties: {
        "Node name for S&R": "LoraLoader",
      },
      widgets_values: ["Ahri.safetensors", 1, 1],
    },
    {
      id: "93:5",
      type: "ToBasicPipe",
      pos: [1430, 130],
      size: {
        "0": 241.79998779296875,
        "1": 106,
      },
      flags: {},
      order: 7,
      mode: 0,
      inputs: [
        {
          name: "model",
          type: "MODEL",
          link: 17,
        },
        {
          name: "clip",
          type: "CLIP",
          link: 18,
        },
        {
          name: "vae",
          type: "VAE",
          link: 19,
        },
        {
          name: "positive",
          type: "CONDITIONING",
          link: 20,
        },
        {
          name: "negative",
          type: "CONDITIONING",
          link: 21,
        },
      ],
      outputs: [
        {
          name: "basic_pipe",
          type: "BASIC_PIPE",
          links: [3, 9],
          shape: 3,
        },
      ],
      properties: {
        "Node name for S&R": "ToBasicPipe",
      },
    },
    {
      id: "93:0",
      type: "CheckpointLoaderSimple",
      pos: [100, 554],
      size: {
        "0": 315,
        "1": 98,
      },
      flags: {},
      order: 3,
      mode: 0,
      outputs: [
        {
          name: "MODEL",
          type: "MODEL",
          links: [13],
          shape: 3,
        },
        {
          name: "CLIP",
          type: "CLIP",
          links: [14],
          shape: 3,
        },
        {
          name: "VAE",
          type: "VAE",
          links: null,
          shape: 3,
        },
      ],
      properties: {
        "Node name for S&R": "CheckpointLoaderSimple",
      },
      widgets_values: ["MajicMixReverie.safetensors"],
    },
    {
      id: "93:4",
      type: "CLIPTextEncode",
      pos: [933, 460],
      size: {
        "0": 400,
        "1": 200,
      },
      flags: {},
      order: 6,
      mode: 0,
      inputs: [
        {
          name: "clip",
          type: "CLIP",
          link: 16,
        },
      ],
      outputs: [
        {
          name: "CONDITIONING",
          type: "CONDITIONING",
          links: [21],
          shape: 3,
        },
      ],
      properties: {
        "Node name for S&R": "CLIPTextEncode",
      },
      widgets_values: ["(low quality:1.4), (worst quality:1.4), bad anatomy"],
    },
    {
      id: "93:3",
      type: "CLIPTextEncode",
      pos: [934, 108],
      size: {
        "0": 400,
        "1": 200,
      },
      flags: {},
      order: 5,
      mode: 0,
      inputs: [
        {
          name: "clip",
          type: "CLIP",
          link: 15,
        },
      ],
      outputs: [
        {
          name: "CONDITIONING",
          type: "CONDITIONING",
          links: [20],
          shape: 3,
        },
      ],
      properties: {
        "Node name for S&R": "CLIPTextEncode",
      },
      widgets_values: [
        "best quality,masterpiece,highres,original,extremely detailed wallpaper,perfect lighting,extremely detailed CG,blurry background, pbcmf,bodysuit,cleavage,pink hair,coif,bcmf,jacket,red hair,black coif,",
      ],
    },
  ],
  links: [
    [1, 50, 1, 8, 0, "LATENT"],
    [2, 50, 2, 8, 1, "VAE"],
    [3, "93:5", 0, 39, 0, "BASIC_PIPE"],
    [4, 40, 0, 39, 1, "UPSCALE_MODEL"],
    [5, 50, 1, 41, 0, "LATENT"],
    [6, 39, 0, 41, 1, "UPSCALER"],
    [7, 41, 0, 43, 0, "LATENT"],
    [8, 41, 1, 43, 1, "VAE"],
    [9, "93:5", 0, 50, 0, "BASIC_PIPE"],
    [10, 5, 0, 50, 1, "LATENT"],
    [11, 43, 0, 82, 0, "IMAGE"],
    [12, 8, 0, 85, 0, "IMAGE"],
    [13, "93:0", 0, "93:2", 0, "MODEL"],
    [14, "93:0", 1, "93:2", 1, "CLIP"],
    [15, "93:2", 1, "93:3", 0, "CLIP"],
    [16, "93:2", 1, "93:4", 0, "CLIP"],
    [17, "93:2", 0, "93:5", 0, "MODEL"],
    [18, "93:2", 1, "93:5", 1, "CLIP"],
    [19, "93:1", 0, "93:5", 2, "VAE"],
    [20, "93:3", 0, "93:5", 3, "CONDITIONING"],
    [21, "93:4", 0, "93:5", 4, "CONDITIONING"],
  ],
  groups: [],
  config: {},
  extra: {},
  version: 0.4,
};

export default defaultWorkflow;
