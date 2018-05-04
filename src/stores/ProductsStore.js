import { observable, action, computed, autorun } from 'mobx'
import axios from 'axios'

import Product from '../models/Product'

const API_BASE = 'http://localhost:3000/'

class ProductStore {
  @observable products = []
  @observable totalProducts = 0
  @observable search = ''
  @observable page = 1
  @observable pageSize = 10
  @observable isFetching = false

  constructor() {
    this.setFetching(true)

    axios
      .get(`${API_BASE}products?pageSize=${this.pageSize}&page=${this.page}`)
      .then(response => {
        const result = response.data

        this.setTotalProducts(result.count)
        this.setProductsFromJSON(result.data)
        this.setFetching(false)
      })
      .catch(err => {
        console.log(err)
        this.setFetching(false)
      })

    autorun(this.doUpdate)
  }

  @action
  setFetching(fetching) {
    this.isFetching = fetching
  }

  @action
  setTotalProducts(total) {
    this.totalProducts = total
  }

  @action
  setProductsFromJSON(products) {
    this.products = products.map(product => Product.fromJS(this, product))
  }

  @action
  setSearch(search) {
    this.setPage(1) // reset to first page
    this.search = search
  }

  @action
  setPageSize(pageSize) {
    this.setPage(1) // reset to first page
    this.pageSize = pageSize
  }

  @action
  setPage(page) {
    this.page = page
  }

  @computed
  get totalPages() {
    return Math.ceil(this.totalProducts / this.pageSize)
  }

  doUpdate = () => {
    axios
      .get(
        `${API_BASE}products?search=${this.search}&pageSize=${
          this.pageSize
        }&page=${this.page}`
      )
      .then(response => {
        const result = response.data

        this.setTotalProducts(result.count)
        this.setProductsFromJSON(result.data)
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export default ProductStore
