import React, { Component, PropTypes } from 'react'

import { observable, action } from 'mobx'
import { observer } from 'mobx-react'

import './Header.scss'

@observer
class Header extends Component {
  @observable search = ''

  @action updateSearch = (event) => {
    this.search = event.target.value
    this.props.productsStore.setSearch(this.search)
  }

  render() {
    return (
      <div>
        <div className="header">
          <a href="" className="header-logo">
            <img src="/images/mmartan.png" alt="mmartan logo" />
          </a>
          <input
            type="text"
            name="search"
            className="header-search"
            placeholder="Buscar"
            onChange={this.updateSearch}
          />
        </div>
        <div className="page-title">
          <span>{this.search || 'Produtos'}</span>
        </div>
      </div>
    )
  }
}

Header.propTypes = {
  productsStore: PropTypes.object.isRequired, // eslint-disable-line
}

export default Header
