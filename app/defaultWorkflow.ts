import type { PersistedGraph } from "@/types";

const defaultWorkflow: PersistedGraph = {
  "data": {
    "1ab1ba4a-5dfb-4ced-bc06-2b55af930969": {
      "value": {
        "widget": "CheckpointLoaderSimple",
        "fields": {
          "ckpt_name": "Aniverse.safetensors"
        }
      },
      "position": {
        "x": -269.3325424523291,
        "y": 1036.3999742057622
      },
      "width": 317,
      "height": 148
    },
    "18d73b78-7fd7-4411-a39e-b8a17e677892": {
      "value": {
        "widget": "CLIPTextEncode",
        "fields": {
          "text": "best quality,masterpiece,highres,original,extremely detailed wallpaper,perfect lighting,extremely detailed CG,blurry background, pbcmf,bodysuit,cleavage,pink hair,coif,bcmf,jacket,red hair,black coif"
        },
        "modify": {
          "nickname": "Positive"
        }
      },
      "position": {
        "x": 365.1056570095522,
        "y": 829.0623046524952
      },
      "width": 278,
      "height": 154
    },
    "03e009af-40ce-40f8-8678-ee811fe31f41": {
      "value": {
        "widget": "CLIPTextEncode",
        "fields": {
          "text": "(worst quality:1.2), (low quality:1.2)"
        },
        "modify": {
          "nickname": "Negative"
        }
      },
      "position": {
        "x": 364.94750305419154,
        "y": 1238.9188592484923
      },
      "width": 280,
      "height": 228
    },
    "3ab52db7-7835-409b-9742-cdbb84283789": {
      "value": {
        "widget": "KSampler",
        "fields": {
          "seed": 13316703440321622000,
          "steps": 24,
          "cfg": 8,
          "sampler_name": "dpm_2",
          "scheduler": "normal",
          "denoise": 0.99
        }
      },
      "position": {
        "x": 852.5481575303295,
        "y": 1036.0737133524628
      },
      "width": 240,
      "height": 461
    },
    "df10802c-dcb3-45cb-b61a-ed21c9435e54": {
      "value": {
        "widget": "VAEDecode",
        "fields": {}
      },
      "position": {
        "x": 1193.2869359712133,
        "y": 1125.515155272075
      },
      "width": 240,
      "height": 96
    },
    "2d69027b-18cb-4fba-a6f7-3cc6191da27a": {
      "value": {
        "widget": "EmptyLatentImage",
        "fields": {
          "width": 512,
          "height": 512,
          "batch_size": 1
        }
      },
      "position": {
        "x": 450.1747371550397,
        "y": 1618.5429203591423
      },
      "width": 240,
      "height": 246
    },
    "2e19ea7c-a469-4aee-ba5f-50546f7b6856": {
      "value": {
        "widget": "PreviewImage",
        "fields": {},
        "images": [
          {
            "filename": "ComfyUI_00015_.png",
            "subfolder": "",
            "type": "temp"
          }
        ]
      },
      "position": {
        "x": 1507.9636589722825,
        "y": 1049.33749334103
      },
      "width": 535,
      "height": 574
    },
    "d6488046-7e3d-45ce-b0cb-fc461ded790d": {
      "value": {
        "widget": "VAELoader",
        "fields": {
          "vae_name": "vae-ft-mse-840000-ema-pruned.safetensors"
        }
      },
      "position": {
        "x": 789.4195199284518,
        "y": 1662.4628083814446
      },
      "width": 319,
      "height": 120
    }
  },
  "connections": [
    {
      "source": "1ab1ba4a-5dfb-4ced-bc06-2b55af930969",
      "sourceHandle": "MODEL",
      "target": "3ab52db7-7835-409b-9742-cdbb84283789",
      "targetHandle": "model"
    },
    {
      "source": "1ab1ba4a-5dfb-4ced-bc06-2b55af930969",
      "sourceHandle": "CLIP",
      "target": "18d73b78-7fd7-4411-a39e-b8a17e677892",
      "targetHandle": "clip"
    },
    {
      "source": "1ab1ba4a-5dfb-4ced-bc06-2b55af930969",
      "sourceHandle": "CLIP",
      "target": "03e009af-40ce-40f8-8678-ee811fe31f41",
      "targetHandle": "clip"
    },
    {
      "source": "03e009af-40ce-40f8-8678-ee811fe31f41",
      "sourceHandle": "CONDITIONING",
      "target": "3ab52db7-7835-409b-9742-cdbb84283789",
      "targetHandle": "negative"
    },
    {
      "source": "18d73b78-7fd7-4411-a39e-b8a17e677892",
      "sourceHandle": "CONDITIONING",
      "target": "3ab52db7-7835-409b-9742-cdbb84283789",
      "targetHandle": "positive"
    },
    {
      "source": "2d69027b-18cb-4fba-a6f7-3cc6191da27a",
      "sourceHandle": "LATENT",
      "target": "3ab52db7-7835-409b-9742-cdbb84283789",
      "targetHandle": "latent_image"
    },
    {
      "source": "3ab52db7-7835-409b-9742-cdbb84283789",
      "sourceHandle": "LATENT",
      "target": "df10802c-dcb3-45cb-b61a-ed21c9435e54",
      "targetHandle": "samples"
    },
    {
      "source": "d6488046-7e3d-45ce-b0cb-fc461ded790d",
      "sourceHandle": "VAE",
      "target": "df10802c-dcb3-45cb-b61a-ed21c9435e54",
      "targetHandle": "vae"
    },
    {
      "source": "df10802c-dcb3-45cb-b61a-ed21c9435e54",
      "sourceHandle": "IMAGE",
      "target": "2e19ea7c-a469-4aee-ba5f-50546f7b6856",
      "targetHandle": "images"
    }
  ]
};

export default defaultWorkflow;
