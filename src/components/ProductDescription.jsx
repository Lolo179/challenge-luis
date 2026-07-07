export default function ProductDescription({ product }) {
  return (
    <div className="product-description" data-testid="product-description">
      <h1>{product.brand} {product.model}</h1>
      <ul>
        <li><strong>Brand:</strong> {product.brand}</li>
        <li><strong>Model:</strong> {product.model}</li>
        <li><strong>Price:</strong> {product.price} €</li>
        <li><strong>CPU:</strong> {product.cpu}</li>
        <li><strong>RAM:</strong> {product.ram}</li>
        <li><strong>OS:</strong> {product.os}</li>
        <li><strong>Display resolution:</strong> {product.displayResolution}</li>
        <li><strong>Battery:</strong> {product.battery}</li>
        <li><strong>Cameras:</strong> {product.cameras}</li>
        <li><strong>Dimensions:</strong> {product.dimentions}</li>
        <li><strong>Weight:</strong> {product.weight}</li>
      </ul>
    </div>
  )
}
