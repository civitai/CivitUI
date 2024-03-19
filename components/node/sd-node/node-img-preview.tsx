import { ImagePreview } from "@/components/node";
import { getBackendUrl } from "@/utils";
import Image from "next/image";
import queryString from "query-string";
import React, { useCallback } from "react";

interface NodeImgPreviewProps {
  data?: ImagePreview[];
}

const NodeImgPreview = ({ data }: NodeImgPreviewProps) => {
  const renderImage = useCallback(
    ({ image, index }: ImagePreview) => (
      <Image
        width={500}
        height={500}
        key={index}
        alt={"image"}
        src={getBackendUrl(
          queryString.stringifyUrl({ url: `/view`, query: image })
        )}
        unoptimized
      />
    ),
    []
  );

  if (!data || data.length === 0) return null;
  return <div>{data.map(renderImage).reverse()}</div>;
};

export default React.memo(NodeImgPreview);
