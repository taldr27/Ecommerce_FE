import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

const ProductImageZoom = ({ image }) => (
  <InnerImageZoom
    src={image}
    zoomSrc={image}
    zoomType="hover"
    className="max-w-full rounded-lg shadow-md"
    width={800}
    zoomScale={1}
  />
);

export default ProductImageZoom;
