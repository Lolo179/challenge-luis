export default function ProductDescription({ product }) {
  const specs = [
    { label: 'Brand', value: product.brand },
    { label: 'Model', value: product.model },
    { label: 'Price', value: `${product.price} €` },
    { label: 'CPU', value: product.cpu },
    { label: 'RAM', value: product.ram },
    { label: 'OS', value: product.os },
    { label: 'Display', value: product.displayResolution },
    { label: 'Battery', value: product.battery },
    { label: 'Cameras', value: product.cameras },
    { label: 'Dimensions', value: product.dimentions },
    { label: 'Weight', value: product.weight },
  ]

  return (
    <div data-testid="product-description">
      <h1 className="text-2xl font-bold text-slate-900 mb-4">
        {product.brand} {product.model}
      </h1>
      <div className="divide-y divide-slate-100">
        {specs.map(({ label, value }) => (
          <div key={label} className="flex justify-between py-2 text-sm">
            <span className="font-medium text-slate-500 w-28 shrink-0">{label}</span>
            <span className="text-slate-800 text-right">{value}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

