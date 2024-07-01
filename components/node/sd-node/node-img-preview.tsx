import { useState } from "react";
import { ImagePreview } from "@/components/node";
import { getBackendUrl } from "@/utils";
import Image from "next/image";
import queryString from "query-string";
import React, { useCallback } from "react";

interface NodeImgPreviewProps {
  data?: ImagePreview[];
}

const NodeImgPreviewComponent = ({ data }: NodeImgPreviewProps) => {
  const [error, setError] = useState<boolean>(false);

  const renderImage = useCallback(
    ({ image, index }: ImagePreview) =>
      <Image
        width={500}
        height={500}
        key={index}
        alt={"image"}
        src={getBackendUrl(
          queryString.stringifyUrl({ url: `/view`, query: image })
        )}
        onError={() => setError(true)}
        unoptimized
      />, []
  );

  if (!data || data.length === 0 || error) return null;
  return <div>{data.map(renderImage).reverse()}</div>;
};

export const NodeImgPreview = React.memo(NodeImgPreviewComponent);
