import { observable } from 'mobx'

class Product {
  id
  store
  @observable name
  @observable description
  @observable category
  @observable size
  @observable price
  @observable discountPrice

  constructor(
    store,
    id, name, description,
    category, size, images,
    price, discountPrice,
  ) {
    this.store = store
    this.id = id
    this.name = name
    this.description = description
    this.category = category
    this.size = size
    this.images = images
    this.price = price
    this.discountPrice = discountPrice
  }

  destroy() {
    this.store.products.remove(this)
  }

  static fromJS(store, object) {
    return new Product(
      store,
      object.id, object.name, object.description,
      object.category, object.size, object.images, object.price, object.discountPrice,
    )
  }
}

export default Product
