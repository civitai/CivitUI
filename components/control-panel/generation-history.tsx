import { useAppStore } from "@/store";
import { getBackendUrl } from "@/utils";
import Image from "next/image";
import queryString from "query-string";
import React, { useCallback } from "react";
import styled from "styled-components";

const ImgList = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GalleryComponent: React.FC = () => {
  const gallery = useAppStore((state) => state.gallery);
  const renderImage = useCallback(({ image }: any) => {
    const src = getBackendUrl(
      queryString.stringifyUrl({ url: `/view`, query: image })
    );
    return (
      <Image
        key={image.filename}
        alt="gallery"
        src={src}
        width={125}
        height={125}
      />
    );
  }, []);

  return !gallery.length ? (
    <p>No images!</p>
  ) : (
    <ImgList>{gallery.reverse().map(renderImage)}</ImgList>
  );
};

export const Gallery = React.memo(GalleryComponent);
