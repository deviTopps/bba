"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

/** Retry the original asset if the image optimization endpoint fails. */
export default function SiteImage({ src, alt, onError, unoptimized, ...props }: ImageProps) {
  const [failedSrc, setFailedSrc] = useState<ImageProps["src"] | null>(null);

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      unoptimized={unoptimized || failedSrc === src}
      onError={(event) => {
        setFailedSrc(src);
        onError?.(event);
      }}
    />
  );
}
