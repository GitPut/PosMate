import React, { useState, useEffect } from "react";

interface ProductImageProps {
  source: string;
  style?: React.CSSProperties;
  alt?: string;
}

const ProductImage = ({
  source,
  style = {},
  alt = "Description unavailable",
}: ProductImageProps) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = source;
    img.onload = () => setLoaded(true); // Set loaded to true when the image is fully loaded

    // Cleanup to remove the onload handler to avoid memory leaks
    return () => {
      img.onload = null;
    };
  }, [source]); // Run this effect only when the source changes

  // Inline styles for loading and loaded states
  const imageStyle: React.CSSProperties = {
    ...style,
    opacity: loaded ? 1 : 0, // Use opacity to transition from skeleton to image
    transition: "opacity 0.5s ease-in-out", // Smooth transition for opacity change
    objectFit: "contain", // Ensures the image scales correctly within its container
  };

  // Render both the skeleton and the image in the same div to avoid layout shift
  return (
    <div style={{ position: "relative", ...style }}>
      {!loaded && (
        <div
          className="image-skeleton"
          style={{ ...style, position: "absolute", top: 0, left: 0 }}
        />
      )}
      <img
        src={source}
        alt={alt}
        style={imageStyle}
        onLoad={() => setLoaded(true)} // Additional onLoad to handle quick cache loads
      />
    </div>
  );
};

export default ProductImage;
