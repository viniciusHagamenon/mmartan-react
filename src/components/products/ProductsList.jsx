import React, { Component, PropTypes } from 'react'
import { observer } from 'mobx-react'

import './ProductsList.scss'

import Paginator from '../shared/Paginator'
import ProductListItem from './ProductListItem'

@observer
class ProductsList extends Component {
  updatePageSize = (event) => {
    const pageSize = event.target.value

    this.props.productsStore.setPageSize(pageSize)
  }

  goBack = () => {
    const { page } = this.props.productsStore

    if (page <= 1) {
      return
    }

    this.props.productsStore.setPage(page - 1)
  }

  goFoward = () => {
    const { page, totalPages } = this.props.productsStore

    if (page >= totalPages) {
      return
    }

    this.props.productsStore.setPage(page + 1)
  }

  goToPage = (page) => {
    this.props.productsStore.setPage(page)
  }

  renderLoading() { // eslint-disable-line
    return <div className="container feedback"><p>Carregando...</p></div>
  }

  renderBlank() { // eslint-disable-line
    return <div className="container feedback"><p>Nenhum produto encontrado.</p></div>
  }

  render() {
    const { isFetching, products, totalProducts, totalPages, page } = this.props.productsStore

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
          <select
            name="pageSize"
            onChange={this.updatePageSize}
            className="products-paginator-page-size"
          >
            <option value="10" checked={this.pageSize === 10}>10 produtos por página</option>
            <option value="15" checked={this.pageSize === 15}>15 produtos por página</option>
            <option value="30" checked={this.pageSize === 30}>30 produtos por página</option>
          </select>
          <div className="products-paginator-pages">
            <Paginator
              activePage={page}
              totalPages={totalPages}
              onBack={this.goBack}
              onFoward={this.goFoward}
              onPage={this.goToPage}
            />
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
