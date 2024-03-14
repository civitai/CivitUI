import { ImagePreview } from "@/components/node";
import { getBackendUrl } from "@/utils";
import Image from "next/image";
import queryString from "query-string";
import React, { useCallback } from "react";

interface NodeImgPreviewProps {
  data?: ImagePreview[];
}

const NodeImgPreview: React.FC<NodeImgPreviewProps> = ({ data }) => {
  const renderImage = useCallback(
    ({ image, index }: ImagePreview) => (
      <Image
        width={100}
        height={100}
        key={index}
        alt={"image"}
        src={getBackendUrl(
          queryString.stringifyUrl({ url: `/view`, query: image })
        )}
      />
    ),
    []
  );

  if (!data || data.length === 0) return null;
  return <div>{data.map(renderImage).reverse()}</div>;
};

export default React.memo(NodeImgPreview);
