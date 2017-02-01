import React, { Component, PropTypes } from 'react'

import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import './ProductsList.scss'

import ProductListItem from './ProductListItem'

@observer
class ProductsList extends Component {
  @observable pageSize = 10

  @action updatePageSize = (event) => {
    this.pageSize = event.target.value
    this.props.productsStore.setPageSize(this.pageSize)
  }

  @action goBack = () => {
    const { page } = this.props.productsStore
    this.props.productsStore.setPage(page - 1)
  }

  @action goFoward = () => {
    const { page } = this.props.productsStore
    this.props.productsStore.setPage(page + 1)
  }

  renderPaginator(pagesTotal) {
    // const paginator = `<button onClick=${this.goBack}><</button>`

    // for (let i = 0; i < pagesTotal; i++) {

    // }

    return pagesTotal
  }

  renderLoading() { // eslint-disable-line
    return <div>Carregando...</div>
  }

  renderBlank() { // eslint-disable-line
    return <div>Nenhum produto encontrado.</div>
  }

  render() {
    const { isFetching, products, totalProducts, pagesTotal } = this.props.productsStore

    if (isFetching) {
      return this.renderLoading()
    }

    if (products.length <= 0) {
      return this.renderBlank()
    }

    return (
      <div className="container products">
        <span className="products-total">{totalProducts} produtos encontrados</span>
        <ul className="products-list">
          {products.map(product => <ProductListItem key={`product-${product.id}`} product={product} />)}
        </ul>
        <div className="products-paginator">
          <div className="products-paginator-page-size">
            <select name="pageSize" id="pageSize" onChange={this.updatePageSize}>
              <option value="10" checked={this.pageSize === 10}>10 produtos por página</option>
              <option value="15" checked={this.pageSize === 15}>15 produtos por página</option>
              <option value="30" checked={this.pageSize === 30}>30 produtos por página</option>
            </select>
          </div>
          <div className="products-paginator-pages">
            {this.renderPaginator(pagesTotal)}
          </div>
        </div>
      </div>
    )
  }
}

ProductsList.propTypes = {
  productsStore: PropTypes.object.isRequired, // eslint-disable-line
}

export default ProductsList
