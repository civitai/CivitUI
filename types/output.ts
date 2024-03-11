/**
 * Flow Types
 * - 'MODEL' Model
 * - 'CONDITIONING' Vector Guidance
 * - 'CLIP' CLIP
 * - 'IMAGE' Image
 * - 'LATENT' Latent Space
 * - 'CONTROL_NET' Control Network
 * - 'MASK' Mask
 * - 'VAE' Variational Autoencoder
 * - 'INT' Integer
 * - 'FLOAT' Floating Point
 * - 'STRING' String
 * - '*' All
 */
export type Flow =
  | "MODEL"
  | "CONDITIONING"
  | "CLIP"
  | "IMAGE"
  | "LATENT"
  | "CONTROL_NET"
  | "MASK"
  | "VAE"
  | "INT"
  | "FLOAT"
  | "STRING"
  | "*";
