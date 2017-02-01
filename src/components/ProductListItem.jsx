import React, { Component, PropTypes } from 'react'

import './ProductListItem.scss'

class ProductListItem extends Component {
  toMoney(value) { // eslint-disable-line
    return `R$ ${value.toFixed(2).toString().replace('.', ',')}`
  }

  render() {
    const { product } = this.props

    return (
      <li className="product-item">
        <div className="product-images">
          {product.images.map(image => <img key={image.id} src={image.image} alt="" />)}
        </div>
        <div className="product-description">
          <h2 className="product-title">{product.name}</h2>
          <span className="product-category">{product.category} - {product.size}</span>
        </div>
        <div className="product-price">
          <span className="product-old-price">
            <span className="line-through">{this.toMoney(product.price)}</span> por&nbsp;
          </span>
          <span className="product-new-price">{this.toMoney(product.discountPrice)}</span>
        </div>
      </li>
    )
  }
}

ProductListItem.propTypes = {
  product: PropTypes.object.isRequired, // eslint-disable-line
}

export default ProductListItem
